import axios from "axios";
const instance = axios.create({
  baseURL: "https://burgerbuilder-12fea.firebaseio.com/"
});
export default instance;
