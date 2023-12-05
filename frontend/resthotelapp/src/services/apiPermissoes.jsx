import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const buscarNiveisComPermissoes = async () => {
  return api.get('/niveis/compermissoes')
            .catch((error) => {
              return false
            })
}

export const buscarNiveisSemPermissoes = async () => {
  return api.get('/niveis/sempermissoes')
            .catch((error) => {
              return false
            })
}

export const buscarMenus = async () => {
  return api.get('/menus')
            .catch((error) => {
              return false
            })
}

export const buscarSubMenus = async () => {
  return api.get('/itemmenu')
            .catch((error) => {
              return false
            })
}

export const buscarMenusPermitidos = async (nivelId) => {
  return api.get('/niveis/permissoesmenus/' + nivelId)
            .catch((error) => {
              return false
            })
}

export const buscarSubMenusPermitidos = async (nivelId) => {
  return api.get('/niveis/permissoessubmenus/' + nivelId)
            .catch((error) => {
              return false
            })
}