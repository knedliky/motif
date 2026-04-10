// Storybook preview configuration for the Motif design library.
// Applies global decorators and parameters that affect every story.

// Apply a global decorator to every story.
// Sets data-colour-mode="dark" on the root HTML element so that Motif's
// CSS custom properties resolve to their dark-mode values by default.
export const decorators = [
  (story) => {
    document.documentElement.setAttribute('data-colour-mode', 'dark');
    return story();
  },
];

export const parameters = {
  // Centre each story in the canvas so components render with equal
  // whitespace on all sides regardless of their natural width
  layout: 'centered',

  // Disable the built-in backgrounds panel — Motif manages its own
  // background colours through the data-colour-mode attribute above
  backgrounds: { disable: true },
};
