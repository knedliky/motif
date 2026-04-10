#!/usr/bin/env bash
# Regression test for BUG-003
# Verifies that [data-colour-mode='light'] CSS custom property definitions have been
# moved from base.css into public.css, as required by the architectural rule:
# "No CSS custom property definitions in base.css — those belong in public.css and admin.css."

set -euo pipefail

# Resolve paths relative to the repository root, regardless of where the script is invoked from
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
BASE_CSS="${REPO_ROOT}/src/tokens/base.css"
PUBLIC_CSS="${REPO_ROOT}/src/tokens/public.css"

echo "Running BUG-003 regression test..."
echo "  base.css:   ${BASE_CSS}"
echo "  public.css: ${PUBLIC_CSS}"
echo ""

FAILED=0

# ---------------------------------------------------------------------------
# Check 1: base.css must contain no CSS custom property definitions.
# A custom property definition looks like: --some-property: value;
# We match lines that start with optional whitespace then -- and contain a colon,
# but exclude lines that only reference variables via var(--...).
# ---------------------------------------------------------------------------
echo "Check 1: base.css must have no CSS custom property definitions..."

if grep -n "^\s*--" "${BASE_CSS}" | grep -v "var(--" | grep ":"; then
  echo "FAIL: base.css still contains custom property definitions (shown above)"
  FAILED=1
else
  echo "PASS: No custom property definitions found in base.css"
fi

echo ""

# ---------------------------------------------------------------------------
# Check 2: public.css must contain the [data-colour-mode='light'] block.
# ---------------------------------------------------------------------------
echo "Check 2: public.css must contain the [data-colour-mode='light'] block..."

if ! grep -q "data-colour-mode='light'" "${PUBLIC_CSS}"; then
  echo "FAIL: public.css missing light mode block"
  FAILED=1
else
  echo "PASS: [data-colour-mode='light'] block found in public.css"
fi

echo ""

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
if [ "${FAILED}" -eq 1 ]; then
  echo "FAIL: BUG-003 regression test FAILED — see errors above"
  exit 1
fi

echo "PASS: BUG-003 regression test passed"
exit 0
