import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/authContext"
import STATUS from "../utilitarios/util"
import TelaCarregamento from "./TelaCarregamento"
import TelaErro from "./TelaErro";
import Pagina from "../Templates/Pagina"
import FormCadCategoriaDespesa from "../Formularios/FormCadCategoriaDespesa"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import TabelaCategoriaDespesa from "../Tabelas/TabelaDeCategoriaDespesa"

export default function TelaCadastroDeCategoriaDespesa(props) {
    const localRecursos = 'http://localhost:3000/categorias_despesas'
    const { token } = useContext(AuthContext)
    const [exibirTabela, setExibirTabela] = useState(true)
    const [listaCategorias, setListaCategorias] = useState([])
    const [status, setStatus] = useState(STATUS.ocioso)
    const [atualizando, setAtualizando] = useState(false)
    const [categoria, setCategoria] = useState(
        {
            id: '',
            nome: ''
        }
    )

    function buscarCategoriasDespesas() {
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
            setListaCategorias(dados)
            setStatus(STATUS.sucesso)
        }).catch((erro) => {
            setStatus(STATUS.erro)
        })
    }

    function excluirCategoria(categoria) {
        fetch(
            localRecursos,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(categoria)
            },
        ).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            buscarCategoriasDespesas()
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso)
        }).catch((erro) => {
            setStatus(STATUS.erro)
        })
    }

    function prepararCategoriaParaEdicao(categoria, edicao) {
        setAtualizando(edicao)
        setCategoria(categoria)
        setExibirTabela(false)
    }

    useEffect(() => {
        buscarCategoriasDespesas()
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
                    <TabelaCategoriaDespesa dados={listaCategorias} onTabela={setExibirTabela} editarCategoria={prepararCategoriaParaEdicao} excluirCategoria={excluirCategoria} />
                    <ToastContainer />
                </Pagina>
            )
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem='Não foi possível recuperar os dados das categorias de depesas.
                                        Entre em contato com o administrador do sistema.'/>
                </Pagina>
            )
        }
    }
    else {
        return (
            <Pagina>
                <FormCadCategoriaDespesa 
                    onTabela={setExibirTabela}
                    categoria={categoria}
                    buscarDados={buscarCategoriasDespesas}
                    modoEdicao={atualizando}
                />
                <ToastContainer />
            </Pagina>
        )
    }
}