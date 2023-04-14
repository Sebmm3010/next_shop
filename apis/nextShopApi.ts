import axios from "axios";

const nextShopApi = axios.create({
  baseURL: "/api",
});

export default nextShopApi;
