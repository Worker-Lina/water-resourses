import axios from "axios";

const $host = axios.create({
    baseURL: "https://dev14.panama.kz"
})

const $authHost = axios.create({
    baseURL: "https://dev14.panama.kz"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    //config.headers.authorization = `Bearer 99|SOTsyGw4aD8v12x0JtgkCJ5WppNF0OrDpBcmccVg`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}