import axios from "axios";
import { BASEURL, REFRESH_TOKEN } from "./endpoints";

const authApi = axios.create()
authApi.defaults.baseURL         = BASEURL;
authApi.defaults.withCredentials = true
var isRetry = false
// authApi.interceptors.request.use(config => console.log(config), error=> {throw error})

authApi.interceptors.response.use(
    (response) => response,
    async(error) => {
        const { config, response } = error
        const originalRequest = config

        if (response && response.status === 401 && !isRetry) {
            isRetry = true;
            return new Promise((resolve, reject) => {
                authApi.get(REFRESH_TOKEN).then(r => {
                    isRetry = false;
                    resolve (authApi(originalRequest));
                }).catch(err => {
                    reject(err)
                })
            })
        }

        return Promise.reject(error)
    }
)

export default authApi