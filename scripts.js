// Importing some data (like the number of books per page, a list of authors, genres, and the books themselves)
// from another JavaScript file named 'data.js'.
import { BOOKS_PER_PAGE, authors as authorsData, genres as genresData, books } from "./data.js"

// SETTING INITIAL VALUES

let matches = books
let page = 1

// Checking if the books exist and if they're in an array format. If not, it's going to yell at you (throw an error).
if (!books || !Array.isArray(books)) throw new Error('Source required')



// Defining two color themes for the website: 'day' and 'night'.
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}


//UTILITY FUNCTIONS AND LOOPS

const css = { day, night }  // Grouping both themes in one object.

const actions = {
    list: {
        // This function updates the text on a button to show how many more books can be displayed.
        updateRemaining: function() {
            const remaining = matches.length - page * BOOKS_PER_PAGE
            const button = document.querySelector("data-list-button")
            button.innerText = `Show more (${remaining > 0 ? remaining : 0})`
        }
    },
    settings: {
        // This function will be used later to apply some settings, but right now it just logs a message to the console.
        submit: function() {
            console.log("Submitting settings...")
        }
    }
}
// Creating an empty space to store website elements (like buttons or images) before adding them to the page.
let fragment = document.createDocumentFragment()

// Grabbing the first 36 books from the books list.
const extracted = books.slice(0, 36)

function createPreview({ author, id, image, title }) {
    const element = document.createElement('button')
    element.classList.add('preview')
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authorsData[author]}</div>
        </div>
    `

    return element
}
// Making buttons for the first 36 books and storing them in the fragment.
for (let i = 0; i < extracted.length; i++) {
    const { author, image, title, id } = extracted[i] 
    const preview = createPreview({ author, id, image, title })
    fragment.appendChild(preview)
}

// Adding all the book buttons to the webpage.
const dataListItems = document.querySelector('[data-list-items]')
dataListItems.appendChild(fragment)


// Creating dropdown lists for genres and authors.
const genresFragment = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Genres'
genresFragment.appendChild(element)

for (let [id, name] of Object.entries(genresData)) {
    element = document.createElement('option')
    element.value = id
    element.innerText = name
    genresFragment.appendChild(element)
}

const dataSearchGenres = document.querySelector('[data-search-genres]')
dataSearchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authorsFragment.appendChild(element)

for (let [id, name] of Object.entries(authorsData)) {
    element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsFragment.appendChild(element)
}

const dataSearchAuthors = document.querySelector('[data-search-authors]')
dataSearchAuthors.appendChild(authorsFragment)

// Checking if the user prefers a dark theme on their device and setting the website's theme accordingly.
const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
document.documentElement.style.setProperty('--color-dark', css[currentTheme].dark)
document.documentElement.style.setProperty('--color-light', css[currentTheme].light)

// Setting the text of the "Show more" button based on the number of books left to display.
const listButton = document.querySelector('[data-list-button]')
listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`

listButton.disabled = !(matches.length - (page * BOOKS_PER_PAGE) > 0)

// This function adds more books to the page when the "Show more" button is clicked.
function createPreviewsFragment(bookList, start, end) {
    const fragment = document.createDocumentFragment()
    const slicedBooks = bookList.slice(start, end)

    for (const book of slicedBooks) {
        const preview = createPreview(book)
        fragment.appendChild(preview)
    }

    return fragment
}

//EVENT HANDLERS

// When the "Show more" button is clicked, show more books.
listButton.addEventListener('click', () => {
    const start = page * BOOKS_PER_PAGE
    const end = (page + 1) * BOOKS_PER_PAGE
    const fragment = createPreviewsFragment(matches, start, end)
    dataListItems.appendChild(fragment)
    actions.list.updateRemaining()
    page += 1
})

// Setting up the search functionality: when the search button is clicked, a search overlay appears.
const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataSearchTitle = document.querySelector('[data-search-title]')

/* When the search button (dataHeaderSearch) is clicked, a search overlay (dataSearchOverlay) is displayed (open = true). 
Then, the focus is set on the search input (dataSearchTitle.focus()), so the user can immediately start typing. */
dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.open = true
    dataSearchTitle.focus()
})

const dataSearchForm = document.querySelector('[data-search-form]')
dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
//Normally, submitting a form reloads the page. This prevents that, so our custom logic can run instead.
    
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

//This loop goes through all the books and checks if they match the search criteria. If they do, they're added to the result array.
    for (let book of books) {
        const titleMatch = filters.title.trim() === '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
        const authorMatch = filters.author === 'any' || book.author === filters.author
        let genreMatch = filters.genre === 'any'

        if (!genreMatch) {
            for (let genre of book.genres) {
                if (genre === filters.genre) {
                    genreMatch = true
                    break
                }
            }
        }

        if (titleMatch && authorMatch && genreMatch) result.push(book)
    }
    const dataListMessage = document.querySelector('[data-list-message]') 
    if (result.length < 1) {
        dataListMessage.classList.add('list__message_show')
    } else {
        dataListMessage.classList.remove('list__message_show')
    }
/* We clear out any old search results, and then display the new ones, 
but only a certain number at a time (as many as BOOKS_PER_PAGE says). */
    const listItems = document.querySelector('[data-list-items]')
    listItems.innerHTML = ''
    const range = [0, BOOKS_PER_PAGE] 

    for (let { author, image, title, id } of result.slice(range[0], range[1])) {
        const element = document.createElement('button')
        element.classList.add('preview')
        element.setAttribute('data-preview', id)

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authorsData[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    listItems.appendChild(fragment)
//This determines how many books are left to be shown and updates the "Show more" button accordingly.
    const remaining = matches.length - (page * BOOKS_PER_PAGE)
    listButton.disabled = !(remaining > 0)
    listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' })
    const dataSearchOverlay = document.querySelector('[data-search-overlay]')
    dataSearchOverlay.open = false
})
//When the settings form is submitted, this updates the theme colors based on the user's selection and then closes the settings overlay.
    const dataSettingsForm = document.querySelector('[data-settings-form]')
    const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
dataSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const settings = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[settings].theme.dark)
    document.documentElement.style.setProperty('--color-light', css[settings].theme.light)
    dataSettingsOverlay.open = false
})


// Displaying detailed info when a book is clicked.
dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active

    for (let node of pathArray) {
        const previewId = node?.dataset?.preview
        if (previewId) {
            active = books.find(book => book.id === previewId)
            if (active) break
        }
    }

    if (!active) return

    const dataListActive = document.querySelector('[data-list-active]')
    dataListActive.open = true
    const dataListBlur = document.querySelector('[data-list-blur]')
    dataListBlur.src = active.image
    const dataListImage = document.querySelector('[data-list-image]')
    dataListImage.src = active.image
    const dataListTitle = document.querySelector('[data-list-title]')
    dataListTitle.innerText = active.title
    const dataListSubtitle = document.querySelector('[data-list-subtitle]')
    dataListSubtitle.innerText = `${authorsData[active.author]} (${new Date(active.published).getFullYear()})`
    const dataListDescription = document.querySelector('[data-list-description]')
    dataListDescription.innerText = active.description
})
