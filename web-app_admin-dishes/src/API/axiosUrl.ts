import axios from "axios";

const axiosUrl = axios.create({
  baseURL:
    "https://restaurant-menu-attractor-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosUrl;
