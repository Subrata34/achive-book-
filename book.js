// from html files variables 

const bookContainer = document.getElementById("book-div");

const pin = document.getElementById("pin");
pin.style.display = 'none';
const bookNumber = document.getElementById("books");
const error = document.getElementById("error");

// search button 
document.getElementById("search-button").addEventListener('click', () => {
    const inputField = document.getElementById("input");
    const inputFieldText = inputField.value;

    // clearing  existing results 
    bookNumber.textContent = '';
    bookContainer.textContent = '';

    // clearing the input text
    inputField.value = '';

    //  search input is empty
    if (inputFieldText === '') {
        error.innerText = 'Search can not  empty files';
        return;
    }
    else {
        error.textContent = '';
    }

    // spinner on
    pin.style.display = 'block';

    //  url link
    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;

    // fetching our part 
    fetch(url)
        .then(res => res.json())
        .then(data => showBookDetails(data.docs.slice(0, 30), data.numFound));
})

const showBookDetails = (books, numberOfBooks) => {
    // error handling 
    if (numberOfBooks === 0) {
        error.innerText = 'No Result Found';
        pin.style.display = 'none';
        return;
    }
    else {
        error.textContent = '';
    }

    // spinner off 
    pin.style.display = 'none';

    //   after searching
    bookNumber.innerHTML = `<h1 class="fw-light">Total Books Found: ${numberOfBooks}</h1>`;

    // display  Results 
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div style="bg-dark" class="card h-100 shadow">

            <img style="height:300px;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">

            <div class="card-body">
                <h3> ${book.title}</h3>
                <p class="fw-bold">By  ${book.author_name ? book.author_name.slice(0, 1) : 'Opps!!! Not Found'}</p>
                <p>First published in ${book.first_publish_year ? book.first_publish_year : 'Opps!!! Year Not Found'}</p>
                <p>Publisher: ${book.publisher ? book.publisher.slice(0, 1) : 'Opps!!! Publisher Not Found'}</p>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
    })
}