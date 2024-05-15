// ==========================variables==============
var totalname ="";
var moviename="";
var year="";

// ========================api fetch===================
const url = 'https://movies-tv-shows-database.p.rapidapi.com/?year=2023&page=1';
const options = {
	method: 'GET',
	headers: {
		Type: 'get-popular-movies',
		'X-RapidAPI-Key': '6469cec9famsh1b0019303e2573bp1d0ff0jsn6ea7da2067fe',
		'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
	}
};
async function fetchMovie(){
    try{
        const response = await fetch(url, options);
	    const result = await response.text();
        const data= await JSON.parse(result);
        totalname = data.movie_results;
        for (var i=0;i<totalname.length;i++)
        {
            moviename = data.movie_results[i].title;
            year = data.movie_results[i].year;
            var image= await getMovieInfoByTitle(data.movie_results[i].title);
            var image1=image.Poster;
            var defaultImage = "image/bg8.jpg";
            var imageUrl = image1 && image1 !== "N/A" ? image1 : defaultImage;
            var content2 =
            `<div class="card-orginal">
              <img class="img" src="${imageUrl}"/>
            <div class="textBox">
              <p class="text head">${moviename}</p>
              <p class="text head2">${image.Genre}</p>
              <span class="head1">${image.Released}</span>
              <span class="head1">${image.imdbRating}/10</span>
              <span class="head1 text-center lmn">${image.Plot}</span>
            </div>
        </div>`
            $(".card-orginal-container").append(content2);
        }
    }
    catch(error){
        console.log(error);
    }
}
// ===============================for background image===============================
const apiKey = '9aeb24c9';
const baseUrl = 'http://www.omdbapi.com/';

    async function getMovieInfoByTitle(moviename) {
    const url = `${baseUrl}?t=${encodeURIComponent(moviename)}&apikey=${apiKey}`;
    let data;
    try {
        const response = await fetch(url);
        const data1 = await response.json();
        return data1;
        
        } catch (error) {
                console.error('Request failed:', error);
            }
        }

fetchMovie();



