import {$authHost, $host} from "./index";
import i18n from 'i18next'
import axios from "axios";

// создание пользователя
export const createUser = async (name, email) => {
    const article = { name: name, email: email };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/users/store', article, {headers})
    return data
}
//обновление пользователя
export const updateUser = async (id, name, email) => {
    const article = { name: name, email: email };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/users/'+id, article, {headers})
    return data
}
// авторизация пользователя
export const login = async (email, password) => {
    const article = { email: email, password: password };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await axios.post('https://dev14.panama.kz/api/auth/login', article, { headers })
    if(data.statusCode === 200){
        localStorage.setItem('token', data.content.token)
    }
    return data
}
//удаление пользователя
export const deleteUser = async (id) => {
    const headers = { 
        'language': i18n.language
    }
    const data = await $authHost.delete('/api/admin/users/'+id, { headers })
    return data
}
//получение данных авторизованного пользователя
export const check = async () => {
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.get('/api/admin/profile', { headers })
    return data
}
//обновление данных авторизованного пользователя
export const updateProfile = async (name, email) => {
    const article = { name: name, email: email };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/profile/update', article, {headers})
    return data
}
// обновление пароля
export const updatePassword = async (password, password_confirmation) => {
    const article = { password: password, password_confirmation: password_confirmation };
    const headers = { 
        'language': i18n.language
    }
    const data = await $authHost.post('/api/admin/profile/updatePassword', article, {headers})
    return data
}
//сброс пароля
export const resetPassword = async (id) => {
    const article = { };
    const headers = { 
        Authorization: 'Bearer 99|SOTsyGw4aD8v12x0JtgkCJ5WppNF0OrDpBcmccVg',
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/users/'+id+'/resetPassword', article, {headers})
    return data
}
//запрос на вытягивание одного пользователя
export const fecthOneUser = async (id) => {
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.get('/api/admin/users/'+id, { headers })
    return data
}