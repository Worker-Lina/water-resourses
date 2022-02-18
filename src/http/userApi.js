import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import i18n from 'i18next'
import axios from "axios";

export const createUser = async (name, email) => {
    const article = { name: name, email: email };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/users/store', article, {headers})
    return data
}

export const login = async (email, password) => {
    const article = { email: email, password: password };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await axios.post('https://dev14.panama.kz/api/auth/login', article, { headers })
    localStorage.setItem('token', data.content.token)
    return data
}

export const deleteUser = async (id) => {
    const headers = { 
        'language': i18n.language
    }
    const data = await $authHost.delete('/api/admin/users/'+id, { headers })
    return data
}

export const check = async () => {
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.get('/api/admin/profile', { headers })
    return data
}

export const updateProfile = async (name, email) => {
    const article = { name: name, email: email };
    const headers = { 
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/profile/update', article, {headers})
    return data
}

export const updatePassword = async (password, password_confirmation) => {
    const article = { password: password, password_confirmation: password_confirmation };
    const headers = { 
        'language': i18n.language
    }
    const data = await $authHost.post('/api/admin/profile/updatePassword', article, {headers})
    return data
}

export const resetPassword = async (id) => {
    const article = { };
    const headers = { 
        Authorization: 'Bearer 99|SOTsyGw4aD8v12x0JtgkCJ5WppNF0OrDpBcmccVg',
        'language': i18n.language
    }
    const {data} = await $authHost.post('/api/admin/users/'+id+'/resetPassword', article, {headers})
    return data
}

