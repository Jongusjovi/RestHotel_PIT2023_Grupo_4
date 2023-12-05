import Pagina from "../Templates/Pagina";
import FormCadTipoQuarto from "../Formularios/FormCadTipoQuarto";
import TabelaTiposDeQuarto from "../Tabelas/TabelaTiposDeQuarto";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeTipoQuarto(props) {

    const localRecursos = 'http://localhost:3000/tiposquartos';
    const { token } = useContext(AuthContext)

    function buscarTiposDeQuarto() {
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
            setListaTiposDeQuarto(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararTipoDeQuartoParaEdicao(tipoquarto, edicao) {
        setAtualizando(edicao);
        setTipoQuartoEmEdicao(tipoquarto);
        setExibirTabela(false);
    }

    function excluirTipoQuarto(tipoquarto) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(tipoquarto)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarTiposDeQuarto();
            toast.success(dados.mensagem);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaTiposDeQuarto, setListaTiposDeQuarto] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [tipoquartoEmEdicao, setTipoQuartoEmEdicao] = useState({
            id: 0,
            nome: "",
            descricao: "",
            valor_diaria: ""
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarTiposDeQuarto();
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
                    <TabelaTiposDeQuarto 
                        dados={listaTiposDeQuarto} 
                        onTabela={setExibirTabela} 
                        editarTipoQuarto={prepararTipoDeQuartoParaEdicao} 
                        excluirTipoQuarto={excluirTipoQuarto} 
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos tipos de quartos.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadTipoQuarto 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    tipoquarto={tipoquartoEmEdicao} 
                    editarTipoQuarto={prepararTipoDeQuartoParaEdicao} 
                    buscarDados={buscarTiposDeQuarto} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}