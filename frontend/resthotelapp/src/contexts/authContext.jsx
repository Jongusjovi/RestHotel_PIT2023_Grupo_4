import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import STATUS from '../utilitarios/util'
import Cookies from 'universal-cookie'
import { api, createSession, getListaMenus, getListaSubMenus } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [token, setToken] = useState(null)
    const [nivelId, setNivelId] = useState(null)
    const [status, setStatus] = useState(STATUS.loading)

    useEffect(() => {
        const recoveredToken = cookies.get('jwt_authorization')
        const recoveredLevel = cookies.get('userLevel')

        if (recoveredToken) {
            setToken(recoveredToken)
            setNivelId(recoveredLevel)
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setStatus(STATUS.ocioso)
    }, [])

    const login = async (email, senha) => {
        const response = await createSession(email, senha)

        if (!response) {
            setStatus(STATUS.erro)
            navigate('/login')
        }
        else {
            const token = response.data.accessToken
            const nivelId = response.data.nivelUsuario

            cookies.set('jwt_authorization', token, { maxAge: 1800 })
            cookies.set('userLevel', nivelId, { maxAge: 1800 })
            
            const responseListMenus = await getListaMenus(nivelId, token)
            const responseListSubMenus = await getListaSubMenus(nivelId, token)
        
            localStorage.setItem("listaMenus", JSON.stringify(responseListMenus.data))
            localStorage.setItem("listaSubMenus", JSON.stringify(responseListSubMenus.data))

            setStatus(STATUS.sucesso)
            setToken(token)
            setNivelId(nivelId)

            navigate('/')
        }
    }
    
    const logout = () => {
        cookies.remove('jwt_authorization')
        cookies.remove('userLevel')
        localStorage.clear()
        api.defaults.headers.Authorization = null
        setToken(null)
        setNivelId(null)
        navigate('/login')
    }

    return <AuthContext.Provider value={{ authenticated: !!token, token, nivelId, status, login, logout }}>
        {children}
    </AuthContext.Provider>
}