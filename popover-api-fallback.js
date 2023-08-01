const supported = HTMLElement.prototype.hasOwnProperty("popover");
if (!supported) {
  const toggleButtons = document
    .querySelectorAll("button[popovertargetaction='toggle']")
    .concat(
      document.querySelectorAll(
        'button[popovertarget]:not([popovertargetaction="toggle"]):not([popovertargetaction="hide"])',
      ),
    );

  toggleButtons.forEach((toggleButton) =>
    toggleButton.addEventListener("click", () => {
      const id = toggleButton.getAttribute("popovertarget");
      if (id) {
        const element = document.getElementById(id);
        if (element?.getAttribute("open") === "") {
          element.removeAttribute("open");
        } else {
          element?.setAttribute("open", "");
        }
      }
    }),
  );

  const hideButtons = document.querySelectorAll(
    "button[popovertargetaction='hide']",
  );
  hideButtons.forEach((hideButton) =>
    hideButton.addEventListener("click", () => {
      const id = hideButton.getAttribute("popovertarget");
      if (id) {
        const element = document.getElementById(id);
        element?.removeAttribute("open");
      }
    }),
  );
}
