import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/authContext"
import STATUS from "../utilitarios/util"
import TabelaFuncao from "../Tabelas/TabelaDeFuncao"
import TelaCarregamento from "./TelaCarregamento"
import TelaErro from "./TelaErro";
import Pagina from "../Templates/Pagina"
import FormCadFuncao from "../Formularios/FormCadFuncao"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Funcoes(props) {
    const localRecursos = 'http://localhost:3000/funcoes'
    const { token } = useContext(AuthContext)
    const [exibirTabela, setExibirTabela] = useState(true)
    const [listaFuncoes, setListaFuncoes] = useState([])
    const [status, setStatus] = useState(STATUS.ocioso)
    const [atualizando, setAtualizando] = useState(false)
    const [funcao, setFuncao] = useState(
        {
            id: '',
            nome: '',
            descricao: ''
        }
    )

    function buscarFuncoes() {
        fetch(
            localRecursos,
            {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
        ).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            setListaFuncoes(dados)
            setStatus(STATUS.sucesso)
        }).catch((erro) => {
            setStatus(STATUS.erro)
        })
    }

    function excluirFuncao(funcao) {
        fetch(
            localRecursos,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(funcao)
            },
        ).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            buscarFuncoes()
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso)
        }).catch((erro) => {
            setStatus(STATUS.erro)
        })
    }

    function prepararFuncaoParaEdicao(funcao, edicao) {
        setAtualizando(edicao)
        setFuncao(funcao)
        setExibirTabela(false)
    }

    useEffect(() => {
        buscarFuncoes()
    }, [])

    if (exibirTabela) {
        if (status === STATUS.ocioso) {
            return (
                <TelaCarregamento />
            )
        }
        else if (status === STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaFuncao dados={listaFuncoes} onTabela={setExibirTabela} editarFuncao={prepararFuncaoParaEdicao} excluirFuncao={excluirFuncao} />
                    <ToastContainer />
                </Pagina>
            )
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem='Não foi possível recuperar os dados das funções.
                                        Entre em contato com o administrador do sistema.'/>
                </Pagina>
            )
        }
    }
    else {
        return (
            <Pagina>
                <FormCadFuncao 
                    onTabela={setExibirTabela}
                    funcao={funcao}
                    buscarDados={buscarFuncoes}
                    modoEdicao={atualizando}
                />
                <ToastContainer />
            </Pagina>
        )
    }
}