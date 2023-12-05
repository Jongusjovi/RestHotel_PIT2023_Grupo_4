import '../styles/Style.css'

import { AuthContext } from '../contexts/authContext'
import { useContext, useState } from 'react'
import STATUS from '../utilitarios/util'

const TelaLogin = () => {
    const { authenticated, login, status } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        login(email, senha)
        setEmail('')
        setSenha('')
    }

    return (
        <div className='login tamplate d-flex justify-content-center align-items-center vh-100'>
            <div className='form_container p-5 bg-light rounded '>
                <form className='form' onSubmit={handleSubmit}>
                    <h3 className='text-center'>RestHotel</h3>
                    <div className='mb-2'>
                        <label htmlFor='email'>E-mail</label>
                        <input 
                            type='email' 
                            placeholder='exemplo@hotmail.com' 
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='senha'>Senha</label>
                        <input 
                            type='password' 
                            placeholder='********' 
                            className='form-control'
                            id='password'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className='d-grid'>
                        {status == STATUS.erro && <p style={{ color: 'red', textAlign: 'center', marginTop: '5px' }}>E-mail ou senha inválidos!</p>}
                        <button type='submit' className='btn btn-primary'>Log in</button>
                    </div>
                    <p className='text-end mt-2'>
                        Esqueceu a <a href=''>Senha?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default TelaLogin