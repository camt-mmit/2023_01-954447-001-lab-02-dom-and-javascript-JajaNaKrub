import { createComponent } from "./input-component.js";
export function createSection(sectionElement) {
  const secInput = sectionElement.querySelector("template.app-tmp-section");
  const secList = secInput.parentElement;

  const updateList = () => {
    const children = [...secList.children].filter((elem) => elem !== secInput);
    console.debug(children);
    children.forEach((element, i) => {
      [...element.querySelectorAll(".app-cmp-sec-no")].forEach(
        (elem) => (elem.textContent = `${i + 1}`)
      );
    });

    [...secList.querySelectorAll(".app-cmp-remove-sec")].forEach(
      (elem) => (elem.disabled = children.length === 1)
    );
  };

  const createElement = () => {
    const container = secInput.content.cloneNode(true).firstElementChild;

    container.addEventListener("click", (ev) => {
      if (ev.target.matches(".app-cmp-remove-sec")) {
        container.remove();

        updateList();
      }
    });

    secList.append(container);
    createComponent(container);
    updateList();
  };

  sectionElement.addEventListener("click", (ev) => {
    if (ev.target.matches(".app-cmp-add-sec")) {
      createElement();
    }
  });
  createElement();
}
