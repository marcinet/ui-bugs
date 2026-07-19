/**
 * bugs.js — THE DATA FILE
 *
 * Add new UI bugs here. Each entry is an object with the following fields:
 *
 *   id          {number}   Unique integer. Increment from the last existing entry.
 *   title       {string}   Short, descriptive title (shown as the card heading).
 *   description {string}   Full explanation of the bug, its cause and/or impact.
 *   image       {string}   Path to the screenshot/diagram, relative to index.html.
 *                          Put image files in the img/ directory.
 *   categories  {string[]} One or more category tags.  Use lowercase, hyphenated
 *                          strings (e.g. "z-index", "responsive", "overflow").
 *                          These become the filter buttons at the top of the page.
 *
 * HOW TO ADD A NEW BUG
 * --------------------
 * 1. Put your screenshot or SVG diagram in the img/ folder.
 * 2. Copy one of the existing entries below.
 * 3. Fill in id, title, description, image (img/your-file.ext), and categories.
 * 4. Separate entries with a comma.
 * 5. Reload index.html in your browser — no build step required.
 */

const BUGS = [
  {
    id: 1,
    title: "Submit button overlaps password field",
    description:
      "When the viewport width drops below ~420 px the submit button shifts " +
      "upward (due to a missing margin-top on the button and an incorrect " +
      "position:absolute rule) and partially covers the Password input. " +
      "The button's z-index is higher than the input, so clicks land on the " +
      "button even when the user intends to focus the field. " +
      "Fix: remove position:absolute from .btn-submit and use normal flow " +
      "layout with an explicit margin-top instead.",
    image: "img/button-overlap.svg",
    categories: ["layout", "z-index", "responsive", "forms"]
  },
  {
    id: 2,
    title: "Tooltip clipped at the right viewport edge",
    description:
      "The tooltip component always opens to the right of the trigger element " +
      "without checking whether the computed position would overflow the viewport. " +
      "For any element close to the right edge the tooltip is cut off and the " +
      "user cannot read its content. " +
      "Fix: after computing the tooltip's desired left offset, compare it with " +
      "window.innerWidth minus the tooltip width and flip the tooltip to the left " +
      "side when it would overflow.",
    image: "img/tooltip-cutoff.svg",
    categories: ["tooltip", "overflow", "positioning"]
  }
];
