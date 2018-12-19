const BASE_URI = "https://simple-articles.now.sh/api/articles";

const mountForm = function mountForm({ _id, title, image, author, content }) {
  return function mountFormWithContext(event) {
    /**
     * Open the form modal
     */
    const edit = document.querySelector(".edit");
    edit.classList.add("edit--open");

    /**
     * Get the elements
     */
    const titleEl = document.querySelector('input[name="title"]');
    const authorEl = document.querySelector('input[name="author"]');
    const imageEl = document.querySelector('input[name="image"]');
    const contentEl = document.querySelector('textarea[name="content"]');

    /**
     * Set the initial values
     */
    titleEl.value = title;
    authorEl.value = author;
    imageEl.value = image;
    contentEl.value = content;

    /**
     * Attach the proper save listener to the save button
     */
    document
      .querySelector("button.form__button--save")
      .addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        fetch(`${BASE_URI}/update`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: _id,
            title: titleEl.value,
            image: imageEl.value,
            author: authorEl.value,
            content: contentEl.value
          })
        }).then(res => {
          if (res.status === 200) {
            edit.classList.remove("edit--open");
            location.reload();
          }
        });
      });
  };
};

const createArticleElement = function createArticleElement({
  _id,
  title,
  image,
  author,
  content
}) {
  const article = document.createElement("article");
  const edit = document.createElement("button");
  const header = document.createElement("header");
  const titleElement = document.createElement("h2");
  const meta = document.createElement("div");
  const authorElement = document.createElement("p");
  const imageElement = document.createElement("div");
  const contentElement = document.createElement("p");

  const self = "article";

  // <article class="article">
  article.classList.add(self);

  // <button class="button article__edit">
  edit.classList.add("button");
  edit.classList.add(`${self}__edit`);
  edit.addEventListener(
    "click",
    mountForm({ _id, title, image, author, content })
  );
  edit.appendChild(document.createTextNode("Edit"));

  // <div class="article__header">
  header.classList.add(`${self}__header`);

  // <h2 class="article__title">{title}</h2>
  titleElement.classList.add(`${self}__title`);
  titleElement.appendChild(document.createTextNode(title));

  // <span class="article__meta">
  meta.classList.add(`${self}__meta`);

  // <p class="article__author">{author}</p>
  authorElement.classList.add(`${self}__author`);
  authorElement.appendChild(document.createTextNode(author));

  // <div class="article__image">
  imageElement.classList.add(`${self}__image`);
  const img = document.createElement("img");
  img.src = image;
  imageElement.appendChild(img);

  // <p class="article__content">
  contentElement.classList.add(`${self}__content`);
  contentElement.appendChild(document.createTextNode(content));

  meta.appendChild(authorElement);
  header.appendChild(titleElement);
  header.appendChild(meta);
  header.appendChild(edit);
  article.appendChild(header);
  article.appendChild(imageElement);
  article.appendChild(contentElement);

  const item = document.createElement("li");
  item.appendChild(article);

  document.querySelector(".articles").appendChild(item);
};

const fetchArticles = function fetchArticles() {
  fetch(`${BASE_URI}/get`)
    .then(res => res.json())
    .then(({ articles }) => {
      if (articles && articles.length > 0) {
        document
          .querySelector(".content__title--no-articles")
          .classList.add("content--hidden");

        articles.forEach(createArticleElement);
      }
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchArticles();

  document
    .querySelector(".form__button--cancel")
    .addEventListener("click", function(event) {
      const edit = document.querySelector(".edit");
      console.log(edit);

      if (edit.classList.contains("edit--open"))
        edit.classList.remove("edit--open");
    });
});
