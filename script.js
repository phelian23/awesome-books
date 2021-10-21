class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    } return books;
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <div class="book">
        <div class="list-txt">
        <p>"${book.title}"</p>
        <p>by</p>
        <p>${book.author}</p>
        </div>
        <button id=${book.id} type="submit" class="remove">Remove</button>
        </div>
        `;

    list.appendChild(listItem);
  }

  static displayBooks() {
    const books = Book.getBooks();

    books.forEach((book) => Book.addBookToList(book));
  }

  static deleteBook(targetel) {
    if (targetel.classList.contains('remove')) {
      targetel.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks);

const form = document.querySelector('#form');

form.addEventListener('submit', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  const book = new Book(title, author, id);

  Book.addBookToList(book);

  Book.addBook(book);
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  Book.deleteBook(e.target);

  Book.removeBook(e.target.id);
});

const addNewList = document.getElementById('add-new-book');
const openForm = document.getElementById('open-form');
const openContact = document.getElementById('open-contact');
const addNew = document.getElementById('form-sec');
const bookList = document.getElementById('add-book');
const contact = document.getElementById('contact');

function showForm() {
  addNew.classList.remove('none');
  bookList.classList.add('none');
  contact.classList.add('none');
}

function showBook() {
  bookList.classList.remove('none');
  addNew.classList.add('none');
  contact.classList.add('none');
}

function showContact() {
  contact.classList.remove('none');
  bookList.classList.add('none');
  addNew.classList.add('none');
}

openForm.addEventListener('click', showForm);

addNewList.addEventListener('click', showBook);

openContact.addEventListener('click', showContact);

