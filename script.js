class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  } return books;
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(author) {
  const books = getBooks();

  books.forEach((book, index) => {
    if (book.author === author) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}

function addBookToList(book) {
  const list = document.querySelector('#book-list');

  const listItem = document.createElement('li');

  listItem.innerHTML = `
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button type="submit" class="remove">Remove</button>
          `;

  list.appendChild(listItem);
}

function displayBooks() {
  const books = getBooks();

  books.forEach((book) => addBookToList(book));
}

function deleteBook(targetel) {
  if (targetel.classList.contains('remove')) {
    targetel.parentElement.remove();
  }
}

document.addEventListener('DOMContentLoaded', displayBooks());

const form = document.querySelector('#form');

form.addEventListener('submit', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);

  addBookToList(book);

  addBook(book);
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  deleteBook(e.target);

  removeBook(e.target.previousElementSibling.textContent);
});
