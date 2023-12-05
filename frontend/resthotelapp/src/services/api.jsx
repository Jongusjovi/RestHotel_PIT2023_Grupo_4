import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const createSession = async (email, senha) => {
    return api.post('/auth/login', {email, senha})
              .catch((error) => {
                return false
              })
}

export const getListaMenus = async (nivelId, token) => {
  const config = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  }

  return api.get('/niveis/permissoesmenus/' + nivelId, config)
            .catch((error) => {
              return false
            })
}

export const getListaSubMenus = async (nivelId, token) => {
  const config = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  }

  return api.get('/niveis/permissoessubmenus/' + nivelId, config)
            .catch((error) => {
              return false
            })
}