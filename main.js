const API_KEY = "134870c7-2fa3-414f-b313-805fcae1a058";
const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_TOP250 = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=";
const API_URL_TOP_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=";

const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.1/films/";

const moviesEl = document.querySelector('.movies');

// блок для пагинации

const paginationButtons = document.querySelector('.pagination');
const buttonTop250 = document.querySelector('.header__links-top250');
const buttonPopular = document.querySelector('.header__links-popular');
const buttonTopAwait = document.querySelector('.header__links-top-await');

const buttonsHeader = document.querySelectorAll('.header__link');

let curentApiUrl = API_URL_POPULAR;

buttonPopular.classList.add('header__link-active');

const formEl = document.querySelector('.header__search-form');
const inputEl = document.querySelector('.header__search');

numberForPagination();
getMoviesSomeTimes(1, curentApiUrl);
curentAPI_URL();
let countPage = 20;
renderPagination(countPage);

function numberForPagination() {
    paginationButtons.addEventListener('click', (e) => {
        // console.log(curentApiUrl);
        if (e.target.classList.contains('pagination__el')) {
            getMoviesSomeTimes(e.target.dataset.pagination, curentApiUrl);
        }

    })
}

function renderPagination(countPage) {
    paginationButtons.innerHTML = ``;
    for (let i = 1; i < countPage + 1; i++) {
        console.log(i);
        console.log(countPage);
        paginationButtons.innerHTML += `
        <a href="#top" class="pagination__el pagination__el-${i}" data-pagination="${i}">${i}</a>
        `;
    }
}

function curentAPI_URL() {
    buttonTop250
        .addEventListener('click', () => {
            curentApiUrl = API_URL_TOP250;
            // console.log(curentApiUrl);
            getMoviesSomeTimes(count = 1, curentApiUrl);

            buttonsHeader
                .forEach(el => el.classList.remove('header__link-active'));
            buttonTop250.classList.add('header__link-active');

            countPage = 13;
            renderPagination(countPage);
        });
    buttonPopular
        .addEventListener('click', () => {
            curentApiUrl = API_URL_POPULAR;
            // console.log(curentApiUrl);
            getMoviesSomeTimes(count = 1, curentApiUrl);

            buttonsHeader
                .forEach(el => el.classList.remove('header__link-active'));
            buttonPopular.classList.add('header__link-active');

            countPage = 20;
            renderPagination(countPage);
        });
    buttonTopAwait
        .addEventListener('click', () => {
            curentApiUrl = API_URL_TOP_AWAIT;
            // console.log(curentApiUrl);
            getMoviesSomeTimes(count = 1, curentApiUrl);

            buttonsHeader
                .forEach(el => el.classList.remove('header__link-active'));
            buttonTopAwait.classList.add('header__link-active');

            countPage = 1;
            renderPagination(countPage);
        });
    formEl
        .addEventListener('submit', () => {
            // curentApiUrl = API_URL_SEARCH;
            // // console.log(curentApiUrl);
            // getMoviesSomeTimes(count = 1, curentApiUrl);

            // let countPage = 5;
            // renderPagination(countPage);

            paginationButtons.innerHTML = ``;
        });
}

function getMoviesSomeTimes(count, curentApiUrl) {
    getMovies(curentApiUrl, count);
}

// getMovies(API_URL_TOP250);

// функция для связи с БД
async function getMovies(url, urlId) {
    console.log(url);
    console.log(urlId);
    const resp = await fetch(url + urlId, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });
    const respData = await resp.json(); // БД в формате json
    console.log(respData);
    showMovies(respData);
}

async function getMoviesSearch(url) {
    console.log(url);
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });
    const respData = await resp.json(); // БД в формате json
    console.log(respData);
    showMovies(respData);
}

function showMoviesRating(rating) {
    if (+rating) {
        if (rating >= 9) {
            return "movie-block__text-rating_color-top";
        } else if (rating >= 8 && rating < 9) {
            return "movie-block__text-rating_color-green";
        } else if (rating < 8 && rating > 5.5) {
            return "movie-block__text-rating_color-yellow";
        } else {
            return "movie-block__text-rating_color-red";
        }
    }
}

function showMoviesRatingModal(rating) {
    if (+rating) {
        if (rating >= 9) {
            return "modal-block__text-rating_color-top";
        } else if (rating >= 8 && rating < 9) {
            return "modal-block__text-rating_color-green";
        } else if (rating < 8 && rating > 5.5) {
            return "modal-block__text-rating_color-yellow";
        } else {
            return "modal-block__text-rating_color-red";
        }
    }
}

function showMovies(data) {


    // Очищаем блок контента от предыдущего контента
    moviesEl.innerHTML = ``;

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-block');
        movieEl.innerHTML = `
            <div class="movie-block__img">
                <img class="movie-block__img-el" src="${movie.posterUrl}" alt="">
                <div class="movie-block__img--darkened">
                </div>
            </div>
            <div class="movie-block__text">
                ${movie.nameRu ? `<div class="movie-block__text-title">
                    ${movie.nameRu}
                </div>` : `<div class="movie-block__text-title">
                ${movie.nameEn}
            </div>`}
                ${movie.year ? `<div class="movie-block__text-year">
                ${movie.year}
                </div>` : ``}

                ${movie.rating ? `<div class="movie-block__text-rating 
                    ${movie.rating && (movie.rating !== 'null') && `${showMoviesRating(movie.rating)}`
                }">
                    ${movie.rating}
                </div>` : ``}
            </div>
        `

        // console.log(movie);
        movieEl.addEventListener('click', () => showModal(movie));
        moviesEl.appendChild(movieEl);


    })
}

// const formEl = document.querySelector('.header__search-form');
// const inputEl = document.querySelector('.header__search');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${inputEl.value}`;

    console.log(apiSearchUrl);

    if (inputEl.value) {
        moviesEl.innerHTML = ``;
        getMoviesSearch(apiSearchUrl);
    }

    // Очищаем инпут
    // inputEl.value = '';
})



const modalEl = document.querySelector('.modal-block');

async function showModal(movie) {
    const resp = await fetch(API_URL_MOVIE_DETAILS + movie.filmId, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });
    const respData = await resp.json();
    // console.log(respData.data.posterUrl);

    modalEl.classList.add('modal-block--show');
    document.body.classList.add('stop-scrollong');

    // ${movie.data.rating}
    modalEl.innerHTML = `
    <div class="movie-modal">
        <div class="movie-modal__img">
            <img class="movie-modal__img-el" src="${respData.data.posterUrl}" alt="">
        </div>
        <div class="movie-modal__text">
            <div class="movie-modal__text-top">
                ${respData.data.nameRu ? `<div class="movie-modal__text-title">
                ${respData.data.nameRu}
                </div>` : ``}

                ${respData.data.year ? `<div class="movie-modal__text-year">
                ${respData.data.year}
                </div>` : ``}

                ${movie.rating ? `<div class="movie-modal__text-rating ${(movie.rating !== 'null') && `${showMoviesRatingModal(movie.rating)}`
            }">
                ${movie.rating}
                </div>` : ``}

                ${respData.data.ratingAgeLimits ? `<div class="movie-modal__text-age-limit ${(respData.data.ratingAgeLimits !== null)}">
                ${respData.data.ratingAgeLimits}+
                </div>` : ``}

                

            </div>
            <div class="movie-modal__text-middle">
                ${respData.data.countries ? `<div class="movie-modal__text-country">
                ${respData.data.countries.map((el) => ` <span>${el.country}</span>`)}
                </div>` : ``}

                ${respData.data.genres ? `<div class="movie-modal__text-genre">
                    Жанры: ${respData.data.genres.map((el) => ` <span>${el.genre}</span>`)}
                </div>` : ``}

                ${respData.data.description ? `<div class="movie-modal__text-description">
                ${respData.data.description}
                </div>` : ``}

            </div>
            <div class="bottom-block">
                <button class="bottom-block__close">Закрыть</button>
                <button class="bottom-block__trailer">Трейлер</button>
            </div>
        </div>
    </div>`;

    // console.log(respData.data.ratingAgeLimits !== null);
    // console.log(movie.rating !== null);
    console.log(respData.data);
    // console.log(movie.rating);

    const bottomClose = document.querySelector('.bottom-block__close');
    bottomClose.addEventListener('click', () => closeModal());
}

function closeModal() {
    modalEl.classList.remove('modal-block--show');
    document.body.classList.remove('stop-scrollong');
}

window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
        closeModal();
    }
})

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
})