import axios from "axios";

export const axiosTMDB = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_KEY}`
  }
});

export const axiosConsumet = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONSUMET_URL
});