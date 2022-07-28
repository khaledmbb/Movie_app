let input = document.getElementById("input");
let search = document.getElementById("search");

let error = document.querySelector(".error p");

let mainTm = document.querySelector(".movie_title");
let cont = document.querySelector(".container_movie");

if (window.sessionStorage.getItem("movie_name")) {
  input.value = window.sessionStorage.getItem("movie_name");
}
search.addEventListener("click", () => {
  if (input.value === "" || input.value === null) {
    error.innerHTML = "Please Enter A Valid Movie Name!!";
  } else {
    error.innerHTML = "";
    window.sessionStorage.setItem("movie_name", input.value);
    let inputV = input.value.trim();
    let iv = inputV.match(/\w+/gi).join("");
    startFetching(iv);
  }
});

function startFetching(iv) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0700552251msh32471b92598b462p157a80jsn46ce5725a5f1",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };
  fetch(
    `https://online-movie-database.p.rapidapi.com/auto-complete?q=${iv}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      error.innerHTML = "404 Movie Not Found";
    });
}

function setData(data) {
  mainTm.innerHTML = "";
  cont.innerHTML = "";

  let arrData = data.d;

  let movieTitle = document.createElement("h3");
  movieTitle.innerHTML = data.q;

  let movies = document.createElement("div");
  movies.className = "movies row p2 text-start mt-4";

  for (let i = 0; i < arrData.length; i++) {
    let actor = arrData[i].s.split(",");

    let col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";

    let movie = document.createElement("div");
    movie.className = "movie";

    let imgDiv = document.createElement("div");
    imgDiv.className = "img";

    let img = document.createElement("img");
    img.className = "img-fluid";
    img.alt = "Movie Image!!";
    img.src = arrData[i].i.imageUrl;

    let ul = document.createElement("ul");
    ul.className = "list-unstyled";

    ul.innerHTML = `
    <li><span>title: </span> ${arrData[i].l}</li>
    <li><span>rank: </span> ${
      arrData[i].rank === undefined ? "Unkown Rank" : arrData[i].rank
    }</li>
    <li><span>relase date: </span> ${
      arrData[i].y === undefined ? "Unkown Date" : arrData[i].y
    }</li>
    <li><span>M Actor: </span> ${actor[0]}</li>
    <li><span>S Actor: </span> ${actor[1]}</li>
    `;

    imgDiv.appendChild(img);
    movie.appendChild(imgDiv);
    movie.appendChild(ul);
    col.appendChild(movie);
    movies.appendChild(col);
  }

  cont.appendChild(movies);
  mainTm.appendChild(movieTitle);
}

// /*
// <div class="container">
//   <div class="movies row p2 text-start mt-4">

//     <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
//       <div class="movie">
//         <div class="img">
//           <img
//             src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg"
//             alt="" class="img-fluid">
//         </div>
//         <ul class="list-unstyled">
//           <li><span>title: </span>batman begins</li>
//           <li><span>rank: </span>89%</li>
//           <li><span>Year: </span>2022</li>
//           <li><span>Main Actor: </span>John Deep</li>
//           <li><span>s Actor: </span>michel rose</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </div>

// </div> */
