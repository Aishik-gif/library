const dialog = document.querySelector('dialog');
const newButton = document.querySelector('.new-btn');
const closeDialog = document.querySelector('.close-popUp');
const form = document.querySelector('form');
const shelf = document.querySelector('.shelf')

let myLibrary = [];

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if (read === true)
            return title + " by " + author + ", " + pages + " pages" + ", " + "read.";
        else 
            return title + " by " + author + ", " + pages + " pages" + ", " + "not read yet.";
    }
}

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

function loopAllBooks(){
    myLibrary.forEach(book => {
        console.log(book.info());
    });
}

newButton.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let bookRead = document.getElementById('read');

    if(bookTitle === '' || bookAuthor === '' || bookPages === '')
        alert("Empty field");
    else{
        let ifRead;
        if(bookRead.checked) ifRead = true;
        else ifRead = false;
        let newBook = new Book(bookTitle, bookAuthor, bookPages, ifRead);
        addBookToLibrary(newBook);
        dialog.close();
        render();
        form.reset();
    }
});

function createBook(newBook){
    let findBook = (e) => e === newBook;
    let foundIndex = myLibrary.indexOf(newBook);
    const book = document.createElement('div');
    book.classList.toggle('book');
    book.setAttribute('id', foundIndex);
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookPages = document.createElement('div');
    const bookRead = document.createElement('div');
    const bookDel = document.createElement('div');
    bookTitle.classList.toggle('book-title');
    bookAuthor.classList.toggle('book-author');
    bookPages.classList.toggle('book-pages');
    bookRead.classList.toggle('book-read');
    bookDel.classList.toggle('book-del');
    bookTitle.textContent = newBook.title;
    bookAuthor.textContent = newBook.author;
    bookPages.textContent = newBook.pages;
    const readbtn = document.createElement('button');
    const delbtn = document.createElement('button');
    if(newBook.read === true)
    {
        readbtn.classList.toggle('read');
        readbtn.textContent = 'Read';
    }
    else
    {
        readbtn.classList.toggle('not-read');
        readbtn.textContent = 'Not Read';
    }
    delbtn.innerHTML = '<i class="material-icons">delete</i>';
    delbtn.classList.toggle('del');
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    bookRead.appendChild(readbtn);
    book.appendChild(bookRead);
    book.appendChild(bookDel);
    bookDel.appendChild(delbtn);
    shelf.appendChild(book);

    let found = myLibrary.find(findBook);
    readbtn.addEventListener('click', ()=> {   
        if(found.read === true) found.read = false;
        else found.read = true;
        render();
    });

    delbtn.addEventListener('click', () => {
        myLibrary.splice(foundIndex, 1);
        render();
    });
}

function render(){
    while(shelf.firstChild){
        shelf.removeChild(shelf.firstChild);
    }
    myLibrary.forEach(book => {
        createBook(book);
    });
}

render();