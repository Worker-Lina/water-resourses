import axios from "axios";
import i18n from 'i18next'
import {$authHost, $host} from "./index";

//запрос на вытягивание всех водохранилищ
export const fetchReservoirs = async () => {
    const {data} = await axios.get('https://dev14.panama.kz/api/general/menu/reservoirs', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех каналов
export const fetchChannels = async () => {
    const {data} = await axios.get('https://dev14.panama.kz/api/general/menu/channels', {
        headers: {
          'language':i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех городских систем
export const fetchCitySystems = async () => {
    const {data} = await axios.get('https://dev14.panama.kz/api/general/menu/city-systems', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех природоохраняемых объектов
export const fetchEnvironmentals = async () => {
    const {data} = await axios.get('https://dev14.panama.kz/api/general/menu/environmentals', {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание всех объектов
export const fetchObjects = async (id) => {
  const {data} = await axios.get('https://dev14.panama.kz/api/general/objects', {
      headers: {
        'language': i18n.language
      }
  })
  return data
}
//запрос на вытягивание одного объекта по индексу
export const fetchOneObject = async (id) => {
    const {data} = await axios.get('https://dev14.panama.kz/api/general/objects/'+id, {
        headers: {
          'language': i18n.language
        }
    })
    return data
}
//запрос на вытягивание отчета по всем объектам
export const fetchReport = async () => {
  const {data} = await axios.get('https://dev14.panama.kz/api/general/objects/reports', {
      headers: {
        'language': i18n.language
      }
  })
  return data
}
//запрос на вытягивание всех пользователей
export const fetchUsers = async (page) => {
  const {data} = await $authHost.get('/api/admin/users', 
  { params: {
      page: page
    },
    headers: {
      "language": i18n.language 
    } }
  )
  return data
}
//запрос на вытягивание всех объектов админом
export const fetchObjectsByAuth = async (page) => {
  const {data} = await $authHost.get('/api/admin/objects', 
  { params: {
      page: page
    },
    headers: {
      "language": i18n.language 
    } }
  )
  return data
}
//удаления объекта
export const deleteObject = async (id) => {
  const headers = { 
      'language': i18n.language
  }
  const data = await $authHost.delete('/api/admin/objects/'+id, { headers })
  return data
}
//загрузка изображений на сервер
export const uploadImage = async (formData) => {
  const headers = { 
    'language': i18n.language
  }
  const {data} = await $authHost.post('/api/admin/upload/image', formData, {headers})
  return data
}
//запрос на создание объекта
export const createObject = async (formData) => {
  const headers = { 
      'language': i18n.language
  }
  const {data} = await $authHost.post('/api/admin/objects/store', formData, {headers})
  return data
}
//запрос на вытягивание одного объекта админом
export const fetchOneObjectByAdmin = async (id) => {
  const headers = { 
      'language': i18n.language
  }
  const {data} = await $authHost.get('/api/admin/objects/'+id, {headers})
  return data
}
//запрос на вытягивание типов объекта
export const fetchObjectsTypes = async () => {
  const headers = { 
      'language': i18n.language
  }
  const {data} = await $authHost.get('/api/admin/dictionaries/objectTypes', {headers})
  return data
}
//запрос на вытягивание статусов объекта
export const fetchObjectsStatus = async () => {
  const headers = { 
      'language': i18n.language
  }
  const {data} = await $authHost.get('/api/admin/dictionaries/objectStatuses', {headers})
  return data
}
//запрос на обновления объекта
export const updateObject = async (id, formData) => {
  const headers = { 
      'language': i18n.language
  }
  const {data} = await $authHost.post('/api/admin/objects/'+id, formData, {headers})
  return data
}