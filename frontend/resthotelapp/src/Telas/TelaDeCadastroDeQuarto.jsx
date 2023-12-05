import Pagina from "../Templates/Pagina";
import FormCadQuarto from "../Formularios/FormCadQuarto";
import TabelaDeQuarto from "../Tabelas/TabelaDeQuarto";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function TelaCadastroQuarto(props) {

    const localRecursos = 'http://localhost:3000/quartos';
    const { token } = useContext(AuthContext)

    function buscarQuartos() {
        fetch(localRecursos, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaDeQuartos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararQuartoParaEdicao(quarto, edicao) {
        setMetodo(edicao);
        setQuartoEmEdicao(quarto);
        setExibirTabela(false);
    }

    function excluirQuarto(quarto) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(quarto)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarQuartos();
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaDeQuartos, setListaDeQuartos] = useState([]);
    const [metodo, setMetodo] = useState('POST');
    const [quartoEmEdicao, setQuartoEmEdicao] = useState({
            id: 0,
            descricao: "",
            numero: "",
            estado: 0,
            quarto_tipoquarto: {}
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarQuartos();
    }, []);


    if (exibirTabela) {
        if (status === STATUS.ocioso) {
            return (
                <TelaCarregamento/>
            );
        }
        else if (status === STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaDeQuarto dados={listaDeQuartos} onTabela={setExibirTabela} editarQuarto={prepararQuartoParaEdicao} excluirQuarto={excluirQuarto} />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos quartos.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadQuarto onTabela={setExibirTabela} modoEdicao={metodo} quarto={quartoEmEdicao} editarQuarto={prepararQuartoParaEdicao} buscarDados={buscarQuartos} />
                <ToastContainer />
            </Pagina>
        );
    }
}