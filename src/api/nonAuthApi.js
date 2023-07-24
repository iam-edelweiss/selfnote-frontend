import axios from "axios";
import { BASEURL } from "./endpoints";

const nonAuthApi = axios.create()
nonAuthApi.defaults.baseURL= BASEURL;
nonAuthApi.defaults.withCredentials = true

export default nonAuthApi