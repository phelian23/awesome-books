class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
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

  static removeBook(author) {
    const books = Book.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button type="submit" class="remove">Remove</button>
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

