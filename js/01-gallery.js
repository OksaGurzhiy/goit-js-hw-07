import { galleryItems } from "./gallery-items.js";

// Change code below this line

const listElement = document.querySelector(".gallery");

const imagesMarkup = galleryItems
  .map(
    ({ preview, original }) =>
      `<li class="gallery__item"><a class="gallery__link" href="${original}"><img  class="gallery__image" src="${preview}" data-source="${original}" alt="Image description"/></a></li>`
  )
  .join("");

listElement.insertAdjacentHTML("afterbegin", imagesMarkup);

listElement.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src=${e.target.dataset.source} width="800" height="600">
`,
    {
      onClose: () => {
        document.removeEventListener("keydown", closeByEsc);
      },
    }
  );

  instance.show();

  document.addEventListener("keydown", closeByEsc);

  function closeByEsc(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
});
