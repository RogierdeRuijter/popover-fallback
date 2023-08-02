const { JSDOM } = require("jsdom");
const { expect } = require("chai");

// Load the HTML file containing the JavaScript code
const { window } = new JSDOM(
  `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <button popovertarget="popover1" popovertargetaction="toggle">Toggle Button 1</button>
      <button popovertarget="popover2" popovertargetaction="toggle">Toggle Button 2</button>
      <button popovertarget="popover3" popovertargetaction="hide">Hide Button 1</button>

      <div id="popover1">Popover 1</div>
      <div id="popover2">Popover 2</div>
      <div id="popover3" open>Popover 3</div>
    </body>
  </html>
`,
  { runScripts: "dangerously", resources: "usable" },
);

const { document } = window;

describe("Popover functionality", function () {
  before(function () {
    // Execute the script in the JSDOM environment
    const script = document.createElement("script");
    script.src = "./popover-api-fallback.js";
    document.head.appendChild(script);
  });

  it("should toggle the 'open' attribute on click", function () {
    const toggleButton1 = document.querySelector(
      "button[popovertarget='popover1']",
    );
    toggleButton1.click();
    const popover1 = document.getElementById("popover1");

    console.log(document.documentElement.innerHTML);
    expect(popover1.getAttribute("open")).to.equal("");
  });

  it("should hide the popover on click", function () {
    const hideButton1 = document.querySelector(
      "button[popovertarget='popover3']",
    );
    const popover3 = document.getElementById("popover3");

    // Initial state: popover3 is open
    expect(popover3.getAttribute("open")).to.equal("");

    // Click the hide button and check the 'open' attribute
    hideButton1.click();

    // After the click, popover3 should be closed
    expect(popover3.getAttribute("open")).to.equal(null);
  });
});
