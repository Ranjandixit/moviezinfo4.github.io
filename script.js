

const main = document.getElementById("main");
const button = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(searchTerm) {
  const url =`https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=b3c6988e`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.Response == "True") {
    showMovies(data.Search);
  }
}

async function getMovieDetails(movie) {
  const APIURL = `https://www.omdbapi.com/?t=${movie}&page=1&apikey=b3c6988e`;
  const res = await fetch(APIURL);
  const data = await res.json();
  //console.log(data);



  main.classList.add("bg-light");
  const movieDetail = document.createElement("div");
  movieDetail.classList.add("movie-detail");
  movieDetail.innerHTML = `    <div class = "movie-poster">
  <img src = "${
    data.Poster != "N/A" ? data.Poster : "image_not_found.png"
  }" alt = "movie poster">
</div>
<div class = "movie-info">
<h3 class = "movie-title">${data.Title}</h3>
<ul class = "movie-misc-info">
    <li class = "year">Year: ${data.Year}</li>
    <li class = "rated">Ratings: ${data.Rated}</li>
    <li class = "released">Released: ${data.Released}</li>
</ul>
<p class = "genre"><b>Genre:</b> ${data.Genre}</p>
<p class = "writer"><b>Writer:</b> ${data.Writer}</p>
<p class = "actors"><b>Actors: </b>${data.Actors}</p>
<p class = "plot"><b>Plot:</b> ${data.Plot}</p>
<p class = "language"><b>Language:</b> ${data.Language}</p>
<p class = "awards"><b><i class = "fas fa-award"></i></b> ${data.Awards}</p>
</div>`;
  main.appendChild(movieDetail);
}
//getMovieDetails("iron man")

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie");

    movieE1.innerHTML = ` <img src="${movie.Poster}" 
        alt="${movie.Title}">
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <span>fav</span>
        </div>`;
    main.appendChild(movieE1);

    movieE1.addEventListener("click", () => {
      main.innerHTML = "";
      //console.log("working");
      //console.log(movie.Title);
      getMovieDetails(movie.Title);
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getMovies(search.value);
});
