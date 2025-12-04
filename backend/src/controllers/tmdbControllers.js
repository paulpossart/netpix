// TMDB error response object: ===================================== 
/*{
"status_code":7,
"status_message":"Invalid API key: You must be granted a valid key.",
"success":false
}*/
//================================================================== 

const bearerToken = process.env.BEARER_TOKEN;
const apiKey = process.env.API_KEY;
const baseUrl = 'https://api.themoviedb.org/3/movie/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    //Authorization: `Bearer ${bearerToken}`
  }
}

export const searchTmdb = async (req, res, next) => {
  const query = req.params.query;


  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&api_key=${apiKey}`,
      options
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);

    return res.status(200).json({
      data
    })


  } catch (err) {
    next(err);
  }
};

/*
export const fetchPopular = async (req, res, next) => {
  try {
    const response = await fetch(
      `${baseUrl}popular?language=en-US&page=1&api_key=${apiKey}`,
      options
    );
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    next(error);
  }
}
*/
