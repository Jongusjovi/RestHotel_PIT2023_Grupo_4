import Pagina from "../Templates/Pagina";
import FormCadServico from "../Formularios/FormCadServico";
import TabelaServico from "../Tabelas/tabelaServico";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeServico(props) {

    const localRecursos = 'http://localhost:3000/servicos';
    const { token } = useContext(AuthContext)

    function buscarServicos() {
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
            setListaServicos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararServicoParaEdicao(servico, edicao) {
        setAtualizando(edicao);
        setServicoEmEdicao(servico);
        setExibirTabela(false);
    }

    function excluirServico(servico) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(servico)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarServicos();
            toast.success(dados.mensagem);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaServicos, setListaServicos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [servicoEmEdicao, setServicoEmEdicao] = useState({
            id: 0,
            nome: "",
            preco: "",
            tipo: ""
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarServicos();
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
                    <TabelaServico 
                        dados={listaServicos} 
                        onTabela={setExibirTabela} 
                        editarServico={prepararServicoParaEdicao} 
                        excluirServico={excluirServico}
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos serviços.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadServico 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    servico={servicoEmEdicao} 
                    setServico={setServicoEmEdicao} 
                    editarServico={prepararServicoParaEdicao} 
                    buscarDados={buscarServicos} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}