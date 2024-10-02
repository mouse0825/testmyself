const booksData = [
    { image: 'book1.jpg', title: '書名1', isbn: 'ISBN1234567', source: '來源1' },
    { image: 'book2.jpg', title: '書名2', isbn: 'ISBN2345678', source: '來源2' },

];

let currentPage = 1;
let itemsPerPage = 24;

function generateGridItems(books) {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = '';

    books.forEach(book => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
        <p><a href="https://localhost:7278/Home/Privacy" onclick="submitForm()"> <img src="${book.image}" alt="${book.title}"></a></p>
        <p>${book.title}</p>
        <p>${book.isbn}</p>
        <p>${book.source}</p>
      `;
        grid.appendChild(gridItem);
    });
}

function generatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';


    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<a href="#" data-page="prev">&laquo;</a>`;
    pagination.appendChild(prevLi);


    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;
        if (i === currentPage) {
            li.classList.add('active');
        }
        pagination.appendChild(li);
    }


    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<a href="#" data-page="next">&raquo;</a>`;
    pagination.appendChild(nextLi);


    pagination.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.dataset.page;

            if (page === 'prev') {
                currentPage = Math.max(1, currentPage - 1);
            } else if (page === 'next') {
                currentPage = Math.min(totalPages, currentPage + 1);
            } else {
                currentPage = parseInt(page);
            }

            updateDisplay();
        });
    });
}

function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToShow = booksData.slice(startIndex, endIndex);

    generateGridItems(booksToShow);
    generatePagination(booksData.length);
}

function changeItemsPerPage() {
    itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
    currentPage = 1;
    updateDisplay();
}

function changeView(element, viewType) {
    const viewToggle = document.querySelector('.view-toggle');
    const grid = document.querySelector('.grid');

    viewToggle.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');

    if (viewType === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});




