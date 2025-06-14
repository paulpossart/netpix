// TMDB error response object: ===================================== 
/*{
"status_code":7,
"status_message":"Invalid API key: You must be granted a valid key.",
"success":false
}*/
//================================================================== 


const bearerToken = process.env.BEARER_TOKEN;
const baseUrl = 'https://api.themoviedb.org/3/movie/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${bearerToken}`
  }
}

const fetchPopular = async (req, res, next) => {
  try {
    const response = await fetch(
      `${baseUrl}popular?language=en-US&page=1`,
      options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);
    res.status(200).json(data.results)

  } catch (err) {
    next(err)
  }
};

const fetchUpcoming = async (req, res, next) => {
  try {
    const response = await fetch(
      `${baseUrl}upcoming?language=en-US&page=1&region=GB`,
      options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);
    res.status(200).json(data.results)

  } catch (err) {
    next(err)
  }
};

const fetchNowPlaying = async (req, res, next) => {
  try {
    const response = await fetch(
      `${baseUrl}now_playing?language=en-US&page=1&region=GB`,
      options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);
    res.status(200).json(data.results)

  } catch (err) {
    next(err)
  }
};

const fetchVideosById = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const response = await fetch(
      `${baseUrl}${id}/videos?language=en-US`,
      options
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);
    res.status(200).json(data.results)
  } catch (err) {
    next(err)
  }
};

const fetchLogoById = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const response = await fetch(
      `${baseUrl}${id}/images`,
      options
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);
    res.status(200).json(data.logos)
  } catch (err) {
    next(err)
  }
};

const searchTmdb = async (req, res, next) => {
  const query = req.params.query
  const bannedWords = [
    'bdsm', 'bondage', 'breast', 'erotic', 'explicit', 'fetish',
    'hardcore', 'nudity', 'porn', 'porno', 'softcore', 'tits'
  ]

  const adultText = (text) => {
    if (!text) text = '';
    return bannedWords.some(word => text.toLowerCase().includes(word))
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
      options
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);

    const cleanData = data.results.filter(movie => (
      !adultText(movie.title || '') &&
      !adultText(movie.overview || '') &&
      (movie.title || '').trim() &&
      (movie.overview || '').trim()
    ))

    if (cleanData.length === 0) {
      return res.status(200).json({
        success: true,
        results: [],
        message: 'Please try using different search terms.'
      })
    }

    res.status(200).json({
      success: true,
      results: cleanData})
  } catch (err) {
    next(err)
  }
};

const fetchDetailsById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const response = await fetch(
      `${baseUrl}${id}?language=en-US`,
      options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message);
    res.status(200).json(data)

  } catch (err) {
    next(err);
  }
}

export {
  fetchPopular,
  fetchUpcoming,
  fetchNowPlaying,
  fetchVideosById,
  fetchLogoById,
  searchTmdb,
  fetchDetailsById
}
