
import axios from "axios";
import { apiKey } from "../constants";

// endpoints
const baseUrl = `https://api.themoviedb.org/3`
const treandingMovies = `${baseUrl}/trending/movie/day`
const upcomingMovies = `${baseUrl}/movie/upcoming`
const topRatedMovies = `${baseUrl}/movie/top_rated`

// Dynamic endpoints
const movieDetails = id => `${baseUrl}/movie/${id}`
const movieCredits = id => `${baseUrl}/movie/${id}/credits`
const movieSimilar = id => `${baseUrl}/movie/${id}/similar`

// Person endpoints
const personDetails = id => `${baseUrl}/person/${id}`
const personMovie = id => `${baseUrl}/person/${id}/movie_credits`

// Search endpoints
const searchMovie = `${baseUrl}/search/movie`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null


const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {},
        headers: {
            accept: 'application/json',
            Authorization: `${apiKey}`
        }

    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(treandingMovies)
}
export const fetchUpcoingMovies = () => {
    return apiCall(upcomingMovies)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMovies)
}

// Dynamic endpoints data
export const fetchDetailsMovies = id => {
    return apiCall(movieDetails(id))
}
export const fetchCreditsMovies = id => {
    return apiCall(movieCredits(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(movieSimilar(id))
}

// Person Details
export const fetchPersonDetails = id => {
    return apiCall(personDetails(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMovie(id))
}

// search movies
export const fetchSearchMovies = (params) => {
    return apiCall(searchMovie, params)
}