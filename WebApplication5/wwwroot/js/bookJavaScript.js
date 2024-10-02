function showTab(tabId) {

    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    document.getElementById(tabId).style.display = 'block';


    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    event.target.classList.add('active');
}

document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var author = document.getElementById('reviewAuthor').value;
    var content = document.getElementById('reviewContent').value;
    var date = new Date().toLocaleString();

    var reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
    <p class="review-author">${author}</p>
    <p class="review-date">${date}</p>
    <p>${content}</p>
    `;

    document.getElementById('reviewList').prepend(reviewItem);


    document.getElementById('reviewAuthor').value = '';
    document.getElementById('reviewContent').value = '';
});

fetch('https://localhost:7282/')
    .then(response => response.json())
    .then(data => {
        document.getElementById('bookTitle').textContent = data.title;
        document.getElementById('bookAuthor').textContent = '作者: ' + data.author;
        document.getElementById('bookPublisher').textContent = '出版社: ' + data.publisher;
        document.getElementById('bookPublishDate').textContent = '出版日期: ' + data.publishDate;
        document.getElementById('bookISBN').textContent = 'ISBN: ' + data.isbn;
        document.getElementById('bookPrice').textContent = 'NT$ ' + data.price;
        document.getElementById('bookIntro').textContent = data.introduction;
        document.getElementById('authorIntro').textContent = data.authorIntroduction;
    })
    .catch(error => console.error('Error:', error));

