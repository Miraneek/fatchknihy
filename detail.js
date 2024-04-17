async function getBookDetails(bookId) {
    const response = await fetch(`https://wjs-api.vercel.app/api/books/${bookId}`);
    if (response.ok) {
        const bookData = await response.json();
        return bookData;
    } else {
        throw new Error('Book not found');
    }
}

async function renderBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    try {
        const bookDetails = await getBookDetails(bookId);
        const bookDetailsContainer = document.getElementById('book-details');

        const title = document.createElement('h2');
        title.textContent = bookDetails.title;
        bookDetailsContainer.appendChild(title);

        const authors = document.createElement('p');
        authors.textContent = `Author(s): ${bookDetails.authors.join(', ')}`;
        bookDetailsContainer.appendChild(authors);

        const publishedYear = document.createElement('p');
        publishedYear.textContent = `Published Year: ${new Date(bookDetails.publishedDate.$date).getFullYear()}`;
        bookDetailsContainer.appendChild(publishedYear);

        const categories = document.createElement('p');
        categories.textContent = `Categories: ${bookDetails.categories.join(', ')}`;
        bookDetailsContainer.appendChild(categories);

        const thumbnail = document.createElement('img');
        thumbnail.src = bookDetails.thumbnailUrl;
        thumbnail.alt = bookDetails.title;
        bookDetailsContainer.appendChild(thumbnail);

        const pageCount = document.createElement('p');
        pageCount.textContent = `Page Count: ${bookDetails.pageCount}`;
        bookDetailsContainer.appendChild(pageCount);

        if (bookDetails.shortDescription) {
            const shortDescription = document.createElement('p');
            shortDescription.textContent = `Short Description: ${bookDetails.shortDescription}`;
            bookDetailsContainer.appendChild(shortDescription);
        }

        const longDescription = document.createElement('p');
        longDescription.textContent = `Long Description: ${bookDetails.longDescription}`;
        bookDetailsContainer.appendChild(longDescription);
    } catch (error) {
        const bookDetailsContainer = document.getElementById('book-details');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = error.message;
        bookDetailsContainer.appendChild(errorMessage);
    }
}

// Call renderBookDetails() when the page loads
window.addEventListener('load', renderBookDetails);
