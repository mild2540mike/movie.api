const API_KEY = 'f14edbabd0418b9b852cfad3bbae99aa';
const PAGE = '1';

const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${PAGE}`;
const IMAGEPATH = 'https://image.tmdb.org/t/p/w500/';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const nosrc = "https://via.placeholder.com/350/";

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');


function showMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            console.log(data);
            data.results.forEach(element => {
                const el = document.createElement('div');
                const image = document.createElement('img');
                const text = document.createElement('h2');
                const rate = document.createElement('p');


                text.innerHTML = `${element.title}`;
                rate.innerHTML = '♥' + ' ' + `${element.vote_average}`;
                if (element.poster_path == null) {
                    console.log("No.Image")
                    image.src = nosrc
                } else {
                    image.src = IMAGEPATH + element.poster_path;
                }

                el.appendChild(image);
                el.appendChild(text);
                el.appendChild(rate);
                main.appendChild(el);
            })
        });
}

showMovies(apiUrl);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchTerm = search.value;

    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm);
        search.value = '';

    }

    let navBar = document.querySelector('footer');
    let myTitle = document.querySelector('div div');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY >= 300) {
            navBar.classList.add('fixed-header');
            myTitle.classList.add('visible-title');
        } else {
            navBar.classList.remove('fixed-header');
            myTitle.classList.remove('visible-title');
        }
    });
    

})
