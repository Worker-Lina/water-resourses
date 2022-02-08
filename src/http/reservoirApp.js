import axios from "axios";
import i18n from "../i18n";

//запрос на вытягивание всех водохранилищ
export const fetchReservoirs = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/reservoirs', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех каналов
export const fetchChannels = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/channels', {
        headers: {
          'language':i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех городских систем
export const fetchCitySystems = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/city-systems', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех природоохраняемых объектов
export const fetchEnvironmentals = async () => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/menu/environmentals', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех объектов
export const fetchObjects = async (id) => {
  const {data} = await axios.get('https://turkestan.panama.kz/api/general/objects', {
      headers: {
        'language': i18n.language
      }
  })
  return data
}
//запрос на вытягивание одного объекта по индексу
export const fetchOneObject = async (id) => {
    const {data} = await axios.get('https://turkestan.panama.kz/api/general/objects/'+id, {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание отчета по всем объектам
export const fetchReport = async () => {
  const {data} = await axios.get('https://turkestan.panama.kz/api/general/objects/reports', {
      headers: {
        'language': i18n.language
      }
  })
  return data
}