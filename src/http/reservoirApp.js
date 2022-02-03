import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import axios from "axios";
import i18n from "../i18n";



export const fetchReservoirs = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/reservoirs', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}

export const fetchChannels = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/channels', {
        headers: {
          'language':i18n.language
        }
    })
    return data
}

export const fetchCitySystems = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/city-systems', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}

export const fetchEnvironmentals = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/environmentals', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}

export const fetchOneObject = async (id) => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/objects/'+id, {
        headers: {
          'language': i18n.language
        }
    })
    return data
}


export const fetchReport = async () => {
  const {data} = await axios.get('https://turkestan.panama.kz/api/general/objects/reports', {
      headers: {
        'language': i18n.language
      }
  })
  return data
}