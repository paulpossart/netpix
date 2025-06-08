/*
TMDB error response object: 
{
"status_code":7,
"status_message":"Invalid API key: You must be granted a valid key.",
"success":false
}
*/

const bearerToken = process.env.BEARER_TOKEN;

const fetchPopular = async (req, res, next) => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${bearerToken}`
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.status_message);
        res.status(200).json(data.results)

    } catch (err) {
        next(err)
    }
};

export {fetchPopular}

/*
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${bearerToken}`
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
  */