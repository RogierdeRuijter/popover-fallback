const { JSDOM } = require("jsdom");

// Mock the DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
});

// Set the global object properties to emulate a browser environment
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;

const { setupPopover } = require("./popover-api-fallback.js"); // Update the path if necessary

describe("setupPopover function", () => {
  // Mock HTMLElement.prototype.hasOwnProperty to always return true during testing
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "popover", {
      value: true,
      writable: true,
    });
  });

  // Test toggle buttons
  test('toggle button click should toggle "open" attribute', () => {
    // Set up the initial DOM state
    document.body.innerHTML = `
      <button popovertargetaction="toggle" popovertarget="popover1"></button>
      <div id="popover1"></div>
    `;

    // Run the setupPopover function
    setupPopover();

    // Get the toggle button and trigger a click event
    const toggleButton = document.querySelector(
      '[popovertargetaction="toggle"]',
    );
    toggleButton.click();

    // Expect the "open" attribute to be set to an empty string
    const popover = document.getElementById("popover1");
    expect(popover.getAttribute("open")).toBe("");

    // Trigger another click event
    toggleButton.click();

    // Expect the "open" attribute to be removed
    expect(popover.getAttribute("open")).toBeNull();
  });

  // Test hide buttons
  test('hide button click should remove "open" attribute', () => {
    // Set up the initial DOM state
    document.body.innerHTML = `
      <button popovertargetaction="hide" popovertarget="popover2"></button>
      <div id="popover2" open></div>
    `;

    // Run the setupPopover function
    setupPopover();

    // Get the hide button and trigger a click event
    const hideButton = document.querySelector('[popovertargetaction="hide"]');
    hideButton.click();

    // Expect the "open" attribute to be removed
    const popover = document.getElementById("popover2");
    expect(popover.getAttribute("open")).toBeNull();
  });
});
