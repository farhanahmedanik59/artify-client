import axios from "axios";
import React from "react";
const instance = axios.create({
  baseURL: "https://artify-server-three.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
