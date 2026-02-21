const jokeForm = document.getElementById('joke_form');

const form = document.getElementById('joke_form');
const input = document.querySelector('.joke_form__input');
const jokesContainer = document.getElementById('jokes_container');

let currentLength = 0;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => {
    const jokes = xhr.response;
    if(jokes.length) {
        jokesContainer.innerHTML = '';
        jokes.forEach(joke => {
            jokesContainer.innerHTML += getJokeHTML(joke);
        });
        currentLength = jokes.length;
    }
};

function getJokeHTML(joke) {
    return `
    <div class="joke" id="joke_${joke.id}">
        <div class="joke__content">
            ${joke.content}
        </div>
        <div class="joke__footer">
            <div class="joke__likes">
                <span>${joke.likes}</span>
                <button class="joke__btn" onclick="like(${joke.id})">
                    <span class="material-symbols-outlined">
                        thumb_up
                    </span>
                </button>
            </div>
            <div class="joke__likes">
                <span>${joke.dislikes}</span>
                <button class="joke__btn" onclick="dislike(${joke.id})">
                    <span class="material-symbols-outlined">
                        thumb_down
                    </span>
                </button>
            </div>
        </div>
    </div>
    `;
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    const jokeText = input.value.trim();

    // Якщо пусто або тільки пробіли — нічого не робимо
    if (jokeText === '') {
        return;
    }

    // Додаємо жарт тільки якщо текст є
    const jokeDiv = document.createElement('div');
    jokeDiv.classList.add('joke');
    jokeDiv.innerHTML = `
        <div class="joke__content">
            ${jokeText}
        </div>
    `;

    jokesContainer.appendChild(jokeDiv);

    // Очищаємо поле
    input.value = '';
});

function like(id) {
    const likeXhr = new XMLHttpRequest();
    likeXhr.open('GET', 'http://localhost:3000/like?id='+id);
    likeXhr.send();
    likeXhr.responseType = 'json';
    likeXhr.onload = () => {
        const joke = likeXhr.response;
        document.getElementById('joke_'+id).outerHTML = getJokeHTML(joke);
    };
}

function dislike(id) {
    const dislikeXhr = new XMLHttpRequest();
    dislikeXhr.open('GET', 'http://localhost:3000/dislike?id='+id);
    dislikeXhr.send();
    dislikeXhr.responseType = 'json';
    dislikeXhr.onload = () => {
        const joke = dislikeXhr.response;
        document.getElementById('joke_'+id).outerHTML = getJokeHTML(joke);
    };
}
