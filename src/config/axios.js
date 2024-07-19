// import axios from "axios";
// const baseUrl = "https://localhost:7067";
// const config = {
//   baseUrl,
//   timeout: 3000000,
// };
// const api = axios.create(config);
// api.defaults.baseURL = baseUrl;
// const handleBefore = (config) => {
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// };
// const handleError = (error) => {
//   console.log(error);
//   return;
// };
// api.interceptors.request.use(handleBefore, handleError);

// export default api;
 // const data = await api.get(`/api/Project/GetAllProjects`);

//===========================

import axios from "axios";
//const baseURL = "http://localhost:5275";
const baseURL = "http://14.225.220.108:32795";

 const api = axios.create();

api.interceptors.request.use((config) => {
  config = {
    ...config,
    baseURL,
  };
  return config;
});

export default api;
