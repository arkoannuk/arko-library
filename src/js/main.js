import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

let myLibrary = []

class Book {
    constructor(title, author, words, status) {
        this.title = title
        this.author = author
        this.words = words
        this.status = status
    }
    toggleStatus() {
        this.status = this.status === 'Read' ? 'Not Read' : 'Read'
    }
}


// Example data creation
myLibrary.push(new Book('The Hobbit', 'J.R.R Tolkien', 96504, 'Not Read'))
myLibrary.push(new Book('To Kill a Mockingbird', 'Harper Lee', 12690, 'Read'))
myLibrary.push(new Book('Pride and Prejudice', 'Jane Austen', 23432, 'Not Read'))
myLibrary.forEach((book, index) => createBookCard(book.title, book.author, book.words, book.status, index));


function createBookCard(title, author, words, status, index) {
    const bookCardTemplate = document.getElementById('bookCardTemplate').content.cloneNode(true)
    const bookCard = bookCardTemplate.querySelector('.bookCard')
    bookCard.dataset.index = index

    const bookTitle = bookCard.querySelector('.bookTitle')
    const bookAuthor = bookCard.querySelector('.bookAuthor')
    const bookWords = bookCard.querySelector('.bookWords')
    const bookStatus = bookCard.querySelector('.bookStatus')
    const deleteButton = bookCard.querySelector('.bookDelete')

    bookTitle.textContent = title
    bookAuthor.textContent = author
    bookWords.textContent = `${words} words`
    bookStatus.textContent = status

    bookStatus.addEventListener('click', changeBookStatus)
    deleteButton.addEventListener('click', removeBookFromLibrary)

    bookWords.appendChild(bookStatus)
    document.getElementById('bookList').appendChild(bookCardTemplate)
}


function changeBookStatus(event) {
    const bookCard = event.target.closest('.bookCard')
    const dataIndex = bookCard.dataset.index
    myLibrary[dataIndex].toggleStatus()
    event.target.textContent = myLibrary[dataIndex].status
    console.log(myLibrary)
}


function removeBookFromLibrary(event) {
    const bookCard = event.target.closest('.bookCard')
    const dataIndex = bookCard.dataset.index
    myLibrary.splice(dataIndex, 1)
    bookCard.remove()

    const remainingBookCards = document.querySelectorAll('.bookCard')
    remainingBookCards.forEach((card, index) => card.dataset.index = index)
}


// Form submission logic
document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let title = document.getElementById('bookTitle').value
    let author = document.getElementById('bookAuthor').value
    let words = document.getElementById('bookWords').value

    const bookStatusCheckbox = document.querySelector('#bookStatus')
    let status = bookStatusCheckbox.checked ? 'Read' : 'Not Read'

    myLibrary.push(new Book(title, author, words, status))
    createBookCard(title, author, words, status, myLibrary.length - 1)

    const myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('bookFormModal'))
    myModal.hide()

    setTimeout(function () {
        document.getElementById('bookForm').reset()
    }, 100)
})
