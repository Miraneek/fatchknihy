async function getBooks() {
    const response = await fetch("https://wjs-api.vercel.app/api/books");
    return await response.json();
}

async function renderBooks() {
    const books = await getBooks();
    const bookList = document.getElementById('book-list');
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Clear any existing content in the book list
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }

    books.forEach(book => {
        // Check if the book title or author matches the search input
        const titleMatch = book.title.toLowerCase().includes(searchInput);
        const authorMatch = book.authors.some(author => author.toLowerCase().includes(searchInput));

        // If no input or book matches the search, render the book
        if (!searchInput || titleMatch || authorMatch) {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.authors.join(', ');
            row.appendChild(authorCell);

            const yearCell = document.createElement('td');
            yearCell.textContent = (new Date(book.publishedDate.$date)).getFullYear();
            row.appendChild(yearCell);

            const genreCell = document.createElement('td');
            genreCell.textContent = book.categories.join(', ');
            row.appendChild(genreCell);

            row.addEventListener("click", () => {
                window.location.href = `detail.html?id=${book._id}`
            })

            bookList.appendChild(row);
        }
    });
}


// Call renderBooks() when the page loads
window.addEventListener('load', renderBooks);


document.querySelector("#search-form").addEventListener("input", handleSubmit);

async function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call renderBooks to fetch and render the books
    await renderBooks();
}