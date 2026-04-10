#!/usr/bin/env bash
# test-bug-004.sh
#
# Regression test for BUG-004: All colour values in CSS token files must use
# oklch() format. Checks that no non-exempt rgba() or hex (#) colour values
# remain in the token declarations of public.css or admin.css.
#
# Exempt lines:
#   --*-rgb tokens  — raw RGB tuples used for rgba() composition
#   --hex-*         — intentional hex values for SVG/illustration use
#   --stroke-*      — may be hex for SVG use
#   @import lines   — not colour values
#   Lines that are entirely a CSS comment — not declarations
#
# Strategy: for each line, strip inline /* ... */ comments first so that
# "converted from rgba(...)" annotations do not trigger a false positive.
# Then check the stripped value for rgba() or bare hex colours.

set -euo pipefail

# Resolve script directory so the test can be run from any working directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_CSS="$SCRIPT_DIR/public.css"
ADMIN_CSS="$SCRIPT_DIR/admin.css"

check_file() {
	local file="$1"
	local label="$2"
	local found_violations=false

	while IFS= read -r line_with_number; do
		# Extract line number and content from grep -n output ("NNN:content")
		lineno="${line_with_number%%:*}"
		content="${line_with_number#*:}"

		# Skip lines that are purely comments (trimmed line starts with /*)
		trimmed="${content#"${content%%[![:space:]]*}"}"
		if [[ "$trimmed" == /\** ]]; then
			continue
		fi

		# Skip @import lines
		if echo "$content" | grep -q "@import"; then
			continue
		fi

		# Skip exempt token lines: --*-rgb, --hex-*, --stroke-*
		if echo "$content" | grep -qE "^\s*--[a-zA-Z0-9_-]*-rgb\s*:"; then
			continue
		fi
		if echo "$content" | grep -qE "^\s*--(hex|stroke)-"; then
			continue
		fi

		# Strip inline /* ... */ comments before testing
		# Using a greedy match to remove everything from /* to */ on the same line
		value_only=$(echo "$content" | sed 's|/\*.*\*/||g')

		# Test for violations in the stripped value
		if echo "$value_only" | grep -qE "rgba\(|rgb\(|: #[0-9a-fA-F]{3,8}([^0-9a-fA-F]|$)"; then
			echo "  Line $lineno: $content"
			found_violations=true
		fi
	done < <(grep -n "" "$file")

	if [ "$found_violations" = true ]; then
		echo "FAIL: Non-oklch colour values found in $label (see lines above)"
		return 1
	fi

	return 0
}

overall_pass=true

echo "Checking public.css..."
check_file "$PUBLIC_CSS" "public.css" || overall_pass=false

echo "Checking admin.css..."
check_file "$ADMIN_CSS" "admin.css" || overall_pass=false

if [ "$overall_pass" = true ]; then
	echo "PASS: BUG-004 regression test passed"
	exit 0
else
	exit 1
fi
