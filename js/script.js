// Форма за закупуване
const purchaseForm = document.getElementById('purchase-form');

if (purchaseForm) {
    purchaseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const name = nameInput.value;

        alert(name + ', благодарим за поръчката!');
    });
}

// Вземане на ключ за localStorage според страницата
function getPageKey() {
    var page = window.location.pathname.split('/').pop();
    return 'reviews-' + page;
}

// Зареждане на ревюта от localStorage
function loadReviews() {
    var reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;

    var key = getPageKey();
    var savedReviews = localStorage.getItem(key);

    if (savedReviews) {
        var reviews = JSON.parse(savedReviews);
        for (var i = 0; i < reviews.length; i++) {
            var review = reviews[i];
            var newReview = document.createElement('div');
            newReview.className = 'review';
            newReview.innerHTML = '<p class="review-text">"' + review.text + '"</p>' +
                                 '<p class="review-author">- ' + review.name + '</p>';
            reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
        }
    }
}

// Запазване на ревю в localStorage
function saveReview(name, text) {
    var key = getPageKey();
    var savedReviews = localStorage.getItem(key);
    var reviews = [];

    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }

    reviews.push({ name: name, text: text });
    localStorage.setItem(key, JSON.stringify(reviews));
}

// Зареждане на ревютата при отваряне на страницата
loadReviews();

// Форма за ревю
var reviewForm = document.getElementById('review-form');

if (reviewForm) {
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var reviewNameInput = document.getElementById('review-name');
        var commentInput = document.getElementById('comment');
        var reviewName = reviewNameInput.value;
        var commentText = commentInput.value;

        // Създаване на ново ревю
        var newReview = document.createElement('div');
        newReview.className = 'review';
        newReview.innerHTML = '<p class="review-text">"' + commentText + '"</p>' +
                             '<p class="review-author">- ' + reviewName + '</p>';

        // Добавяне на ревюто най-отгоре
        var reviewsContainer = document.getElementById('reviews-container');
        reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);

        // Запазване в localStorage
        saveReview(reviewName, commentText);

        // Нулиране на формата
        reviewForm.reset();
    });
}
