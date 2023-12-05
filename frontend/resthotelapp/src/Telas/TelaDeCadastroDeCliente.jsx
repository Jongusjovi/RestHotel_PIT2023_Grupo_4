import Pagina from "../Templates/Pagina";
import FormCadCliente from "../Formularios/FormCadCliente";
import TabelaCliente from "../Tabelas/TabelaDeCliente";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeCliente(props) {

    const localRecursos = 'http://localhost:3000/clientes';
    const { token } = useContext(AuthContext)

    function buscarCliente() {
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
            setListaClientes(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararClienteParaEdicao(cliente, edicao) {
        setAtualizando(edicao);
        setClienteEmEdicao(cliente);
        setExibirTabela(false);
    }

    function excluirCliente(cliente) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(cliente)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarCliente();
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaClientes, setListaClientes] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [clienteEmEdicao, setClienteEmEdicao] = useState({
            id: 0,
            cpf: "",
            nome: "",
            endereco: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            telefone: "",
            email: "",
            datanasc: ""
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarCliente();
    }, []);


    if (exibirTabela) {
        if (status == STATUS.ocioso) {
            return (
                <TelaCarregamento/>
            );
        }
        else if (status == STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaCliente 
                        dados={listaClientes} 
                        onTabela={setExibirTabela} 
                        editarCliente={prepararClienteParaEdicao} 
                        excluirCliente={excluirCliente}
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos clientes.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadCliente 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    cliente={clienteEmEdicao} 
                    setCliente={setClienteEmEdicao} 
                    editarCliente={prepararClienteParaEdicao} 
                    buscarDados={buscarCliente} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}