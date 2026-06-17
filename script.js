document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const header = button.closest(".site-header");
    if (header) {
      header.classList.toggle("is-open");
    }
  });
});

document.querySelectorAll("[data-accordion]").forEach((item, index) => {
  const trigger = item.querySelector(".faq-trigger");
  if (!trigger) {
    return;
  }

  if (index === 0) {
    item.classList.add("is-open");
  }

  trigger.addEventListener("click", () => {
    item.classList.toggle("is-open");
  });
});

const stage = document.querySelector("[data-project-stage]");
if (stage) {
  const focusImage = stage.querySelector("[data-stage-image]");
  const caption = stage.querySelector("[data-stage-caption]");
  const thumbButtons = Array.from(stage.querySelectorAll("[data-stage-thumb]"));
  let activeIndex = thumbButtons.findIndex((button) => button.classList.contains("is-active"));

  const applySlide = (index) => {
    const next = thumbButtons[index];
    if (!next || !focusImage || !caption) {
      return;
    }

    focusImage.src = next.dataset.image || focusImage.src;
    focusImage.alt = next.dataset.alt || focusImage.alt;
    caption.textContent = next.dataset.caption || "";

    thumbButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });

    activeIndex = index;
  };

  thumbButtons.forEach((button, index) => {
    button.addEventListener("click", () => applySlide(index));
  });

  stage.querySelectorAll("[data-stage-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = button.dataset.stageDirection === "next" ? 1 : -1;
      const nextIndex = (activeIndex + delta + thumbButtons.length) % thumbButtons.length;
      applySlide(nextIndex);
    });
  });
}
