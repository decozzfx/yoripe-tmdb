import axios from "axios";

import Constant from "../utils/constants";

axios.defaults.baseURL = Constant.api_base_url;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(
  res => res,
  err => Promise.reject(err),
);

// -- API SERVICES

export const getConfiguration = () => {
  return axios.get(`configuration?${Constant.api_key}`);
};

export const getMovieDetail = (id: number) => {
  return axios.get(`movie/${id}?${Constant.api_key}`);
};

export const getMoviesPopular = () => {
  return axios.get(`movie/popular?${Constant.api_key}`);
};

export const searchMovie = (searchQuery: string) => {
  const attributes = `&page=1&query=${encodeURIComponent(searchQuery)}`;
  return axios.get(`search/movie?${Constant.api_key}${attributes}`);
};
