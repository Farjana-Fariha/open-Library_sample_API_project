//load data
const searchBook = () => {
    const ipnutField = document.getElementById('search-field');
    const searchText = ipnutField.value;
    ipnutField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}` ;
    fetch(url)
    .then(response => response.json())
    .then(data => displayBooks(data, data.docs));
}
//display data
const displayBooks = (data, books) => {
    const displayResult = document.getElementById('display-result');
    // clear result after new search
    displayResult.textContent = '';
    // result quantity 
    const resultQuantity = document.getElementById('result-quantity');
    resultQuantity.textContent = '';
    // show error massage for no result 
    const errorMassage = document.getElementById('error-massage');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-div');
    errorDiv.innerText = `No result found!!`;
    // clear error massage after new search 
    errorMassage.textContent = '';
    //check searching is valid or not
    if(books.length === 0){
        errorMassage.appendChild(errorDiv);
    }else{
        // show result Quantity
        resultQuantity.innerHTML = `
            <h2>There is ${data.numFound} Books</h2>
        `;
        //show 20 books
        books.slice(0, 20).forEach(book => {
            //create div and append info
            const div = document.createElement('div');
            const cover_i = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` ;
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                <img src="${cover_i}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Writer Name : ${book.author_name ? book.author_name[0] : ''}</p>
                <p class="card-text"> Published by : ${book.publisher ? book.publisher[0] : ''}</p>
                <p class="card-text"> Publishing Year : ${book.first_published_year ? book.first_published_year[0]: ''}</p>
                </div>
            </div>
            `;
            displayResult.appendChild(div)
          })
    }
}