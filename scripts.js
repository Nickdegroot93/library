const bookContainer = document.querySelector('#book-container');
const inputOverlay = document.querySelector('#overlay');
const submitBookButton = document.querySelector('#submit-btn');
const addBookButton = document.querySelector('#add-book-btn');
const inputForm = document.querySelector('.book-input-container');

let myLibrary = [];

/* EVENT LISTENERS */

addBookButton.addEventListener('click', showInput);

submitBookButton.addEventListener('click', () => {
	const bookName = document.querySelector('#btitle').value;
	const bookAuthor = document.querySelector('#bauthor').value;
	const bookPages = document.querySelector('#bpages').value;
	const bookProgress = document.querySelector('#bprogress').value;
	const isEmpty = (str) => !str.trim().length;
	if (isEmpty(bookName) || isEmpty(bookAuthor) || isEmpty(bookPages)) {
		inputForm.classList.add('invalid-input');
		setTimeout(function () {
			inputForm.classList.remove('invalid-input');
		}, 1000);
		return;
	}
	let currentBook = new Book(bookName, bookAuthor, bookPages, bookProgress);
	addBookToLibrary(currentBook);
	clearBooks();
	createBook();
	hideInput();
});

function resetInputForm() {
	bookName = '';
	bookAuthor = '';
	bookPages = '';
	bookProgress = '';
}

function showInput() {
	inputOverlay.style.display = 'block';
}

function hideInput() {
	inputOverlay.style.display = 'none';
}

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function clearBooks() {
	const bookContainer = document.querySelector('#book-container');
	while (bookContainer.firstChild.id !== 'add-book-btn') {
		bookContainer.removeChild(bookContainer.firstChild);
	}
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

function createBook() {
	myLibrary.forEach((book) => {
		const newBook = document.createElement('div');
		newBook.classList = 'book_showcase--book';
		bookContainer.prepend(newBook);

		const bookTitle = document.createElement('h3');
		bookTitle.classList = 'book-title';
		newBook.appendChild(bookTitle);
		bookTitle.textContent = book.title;

		const bookAuthor = document.createElement('h4');
		bookAuthor.classList = 'book-author';
		newBook.appendChild(bookAuthor);
		bookAuthor.textContent = book.author;

		const bookPages = document.createElement('h5');
		bookPages.classList = 'book-pages';
		newBook.appendChild(bookPages);
		bookPages.textContent = `${book.pages} pages`;

		const isRead = document.createElement('div');
		isRead.classList = 'book-read';
		newBook.appendChild(isRead);
		if (book.read) {
			isRead.textContent = 'Finished';
		} else {
			isRead.textContent = 'Not Read';
		}
	});
}
