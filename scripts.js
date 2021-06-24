const bookContainer = document.querySelector('#book-container');
const inputOverlay = document.querySelector('#overlay');
const submitBookButton = document.querySelector('#submit-btn');
const addBookButton = document.querySelector('#add-book-btn');
const inputForm = document.querySelector('.book-input-container');
const inputFormCancelButton = document.querySelector('#input-cross-btn');

let myLibrary = [];

/* EVENT LISTENERS */

// Show input form upon clicking 'Add Book'
addBookButton.addEventListener('click', showInput);

// Hide input form and delete current input upon clicking 'Cancel Input Cross btn'
inputFormCancelButton.addEventListener('click', () => {
	resetFormInput();
	hideInput();
});

//Create new book object and display it upon clicking submit
submitBookButton.addEventListener('click', () => {
	let bookTitle = document.querySelector('#btitle').value;
	let bookAuthor = document.querySelector('#bauthor').value;
	let bookPages = document.querySelector('#bpages').value;
	let bookProgress = document.querySelector('#bprogress').value;
	let ID = createID();

	const isEmpty = (str) => !str.trim().length;
	if (isEmpty(bookTitle) || isEmpty(bookAuthor) || isEmpty(bookPages)) {
		inputForm.classList.add('invalid-input');
		setTimeout(function () {
			inputForm.classList.remove('invalid-input');
		}, 1000);
		return;
	}

	let currentBook = new Book(
		bookTitle,
		bookAuthor,
		bookPages,
		bookProgress,
		ID
	);
	addBookToLibrary(currentBook);
	clearBooks();
	createBook();
	resetFormInput();
	hideInput();
});

/* FUNCTIONS */

function createID() {
	let ID;
	if (myLibrary.length == 0) {
		ID = 1;
	} else {
		ID = myLibrary[myLibrary.length - 1].id + 1;
	}
	return ID;
}

function resetFormInput() {
	document.querySelector('#btitle').value = '';
	document.querySelector('#bauthor').value = '';
	document.querySelector('#bpages').value = '';
	document.querySelector('#bprogress').value = 'notread';
}

function showInput() {
	inputOverlay.style.display = 'block';
}

function hideInput() {
	inputOverlay.style.display = 'none';
}

function Book(title, author, pages, read, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
}

function clearBooks() {
	const bookContainer = document.querySelector('#book-container');
	while (bookContainer.firstChild.id !== 'add-book-btn') {
		bookContainer.removeChild(bookContainer.firstChild);
	}
}

function addBookToLibrary(book) {
	myLibrary.push(book);
	setData;
}

function deleteCurrentBook(currentBook) {
	var currentBookID = currentBook.target.parentNode.parentNode.id;
	if (currentBookID == 'edit-book-btn') {
		currentBookID = currentBook.target.parentNode.parentNode.parentNode.id;
	}
	myLibrary.forEach((book) => {
		if (book.id == currentBookID) {
			myLibrary.splice(myLibrary.indexOf(book), 1);
		}
		clearBooks();
		createBook();
		setData();
	});
}

function createBook() {
	myLibrary.forEach((book) => {
		const newBook = document.createElement('div');
		newBook.classList = 'book_showcase--book';
		newBook.setAttribute('id', `${book.id}`);
		bookContainer.prepend(newBook);

		const editBtn = document.createElement('span');
		editBtn.setAttribute('id', 'edit-book-btn');
		editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9.036 7.976a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path></svg>`;
		newBook.appendChild(editBtn);
		editBtn.addEventListener('click', deleteCurrentBook);

		const bookTitle = document.createElement('h3');
		bookTitle.classList = 'book-title';
		newBook.appendChild(bookTitle);
		bookTitle.textContent = book.title;

		const bookAuthor = document.createElement('h4');
		bookAuthor.classList = 'book-author';
		newBook.appendChild(bookAuthor);
		bookAuthor.textContent = book.author;

		const bookIcon = document.createElement('span');
		bookIcon.setAttribute('id', 'book-icon');
		newBook.appendChild(bookIcon);
		bookIcon.addEventListener('click', deleteCurrentBook);

		const bookPages = document.createElement('h5');
		bookPages.classList = 'book-pages';
		newBook.appendChild(bookPages);
		bookPages.textContent = `${book.pages} pages`;

		const isRead = document.createElement('div');
		isRead.classList = 'book-read';
		newBook.appendChild(isRead);
		if (book.read == 'finished') {
			isRead.textContent = 'Finished';
			bookIcon.innerHTML = finishedBook;
		} else if (book.read == 'reading') {
			isRead.textContent = 'Reading';
			bookIcon.innerHTML = openBook;
		} else if (book.read == 'notread') {
			isRead.textContent = 'Not Read';
			bookIcon.innerHTML = closedBook;
		}
	});
}

const openBook = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 412.72 412.72" style="enable-background:new 0 0 412.72 412.72;" xml:space="preserve">
<g>
    <g>
        <path d="M404.72,82.944c-0.027,0-0.054,0-0.08,0h0h-27.12v-9.28c0.146-3.673-2.23-6.974-5.76-8    c-18.828-4.934-38.216-7.408-57.68-7.36c-32,0-75.6,7.2-107.84,40c-32-33.12-75.92-40-107.84-40    c-19.464-0.048-38.852,2.426-57.68,7.36c-3.53,1.026-5.906,4.327-5.76,8v9.2H8c-4.418,0-8,3.582-8,8v255.52c0,4.418,3.582,8,8,8    c1.374-0.004,2.724-0.362,3.92-1.04c0.8-0.4,80.8-44.16,192.48-16h1.2h0.72c0.638,0.077,1.282,0.077,1.92,0    c112-28.4,192,15.28,192.48,16c2.475,1.429,5.525,1.429,8,0c2.46-1.42,3.983-4.039,4-6.88V90.944    C412.72,86.526,409.139,82.944,404.72,82.944z M16,333.664V98.944h19.12v200.64c-0.05,4.418,3.491,8.04,7.909,8.09    c0.432,0.005,0.864-0.025,1.291-0.09c16.55-2.527,33.259-3.864,50-4c23.19-0.402,46.283,3.086,68.32,10.32    C112.875,307.886,62.397,314.688,16,333.664z M94.32,287.664c-14.551,0.033-29.085,0.968-43.52,2.8V79.984    c15.576-3.47,31.482-5.241,47.44-5.28c29.92,0,71.2,6.88,99.84,39.2l0.24,199.28C181.68,302.304,149.2,287.664,94.32,287.664z     M214.32,113.904c28.64-32,69.92-39.2,99.84-39.2c15.957,0.047,31.863,1.817,47.44,5.28v210.48    c-14.354-1.849-28.808-2.811-43.28-2.88c-54.56,0-87.12,14.64-104,25.52V113.904z M396.64,333.664    c-46.496-19.028-97.09-25.831-146.96-19.76c22.141-7.26,45.344-10.749,68.64-10.32c16.846,0.094,33.663,1.404,50.32,3.92    c4.368,0.663,8.447-2.341,9.11-6.709c0.065-0.427,0.095-0.859,0.09-1.291V98.944h19.12L396.64,333.664z"/>
    </g>
</g>
</svg>`;

const closedBook = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 459.319 459.319" style="enable-background:new 0 0 459.319 459.319;" xml:space="preserve">
<g>
	<path d="M94.924,366.674h312.874c0.958,0,1.886-0.136,2.778-0.349c0.071,0,0.13,0.012,0.201,0.012   c6.679,0,12.105-5.42,12.105-12.104V12.105C422.883,5.423,417.456,0,410.777,0h-2.955H114.284H94.941   c-32.22,0-58.428,26.214-58.428,58.425c0,0.432,0.085,0.842,0.127,1.259c-0.042,29.755-0.411,303.166-0.042,339.109   c-0.023,0.703-0.109,1.389-0.109,2.099c0,30.973,24.252,56.329,54.757,58.245c0.612,0.094,1.212,0.183,1.847,0.183h317.683   c6.679,0,12.105-5.42,12.105-12.105v-45.565c0-6.68-5.427-12.105-12.105-12.105s-12.105,5.426-12.105,12.105v33.461H94.924   c-18.395,0-33.411-14.605-34.149-32.817c0.018-0.325,0.077-0.632,0.071-0.963c-0.012-0.532-0.03-1.359-0.042-2.459   C61.862,380.948,76.739,366.674,94.924,366.674z M103.178,58.425c0-6.682,5.423-12.105,12.105-12.105s12.105,5.423,12.105,12.105   V304.31c0,6.679-5.423,12.105-12.105,12.105s-12.105-5.427-12.105-12.105V58.425z"/>
</g>
</svg>`;

const finishedBook = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 408.576 408.576" style="enable-background:new 0 0 408.576 408.576;" xml:space="preserve">
<g>
	<g>
		<path d="M204.288,0C91.648,0,0,91.648,0,204.288s91.648,204.288,204.288,204.288s204.288-91.648,204.288-204.288    S316.928,0,204.288,0z M318.464,150.528l-130.56,129.536c-7.68,7.68-19.968,8.192-28.16,0.512L90.624,217.6    c-8.192-7.68-8.704-20.48-1.536-28.672c7.68-8.192,20.48-8.704,28.672-1.024l54.784,50.176L289.28,121.344    c8.192-8.192,20.992-8.192,29.184,0C326.656,129.536,326.656,142.336,318.464,150.528z"/>
	</g>
</g>

</svg>`;

// setting Library to be stored in local storage
function setData() {
	localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
	if (!localStorage.myLibrary) {
		createBook();
	} else {
		let objects = localStorage.getItem('myLibrary'); // gets information from local storage to use in below loop to create DOM/display
		objects = JSON.parse(objects);
		myLibrary = objects;
		createBook();
	}
}

restore();
