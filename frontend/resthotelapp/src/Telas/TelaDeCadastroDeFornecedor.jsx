import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import TabelaFornecedor from "../Tabelas/TabelaDeFornecedor";
import FormCadFornecedor from "../Formularios/FormCadFornecedores";
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeFornecedor(props) {

    const localRecursos = 'http://localhost:3000/fornecedores';
    const { token } = useContext(AuthContext)

    function buscarFornecedor() {
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
            setListaFornecedores(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararFornecedorParaEdicao(cliente, edicao) {
        setAtualizando(edicao);
        setFornecedorEmEdicao(cliente);
        setExibirTabela(false);
    }

    function excluirFornecedor(cliente) {
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
            buscarFornecedor();
            toast.success(dados.mensagem);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [fornecedorEmEdicao, setFornecedorEmEdicao] = useState({
            id: 0,
            cnpj: "",
            razaosocial: "",
            nomefantasia: "",
            endereco: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            telefone: "",
            segmento: "",
            email: ""
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarFornecedor();
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
                    <TabelaFornecedor 
                        dados={listaFornecedores} 
                        onTabela={setExibirTabela} 
                        editarFornecedor={prepararFornecedorParaEdicao} 
                        excluirFornecedor={excluirFornecedor}/>
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos fornecedores.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadFornecedor 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    fornecedor={fornecedorEmEdicao} 
                    setFornecedor={setFornecedorEmEdicao} 
                    editarFornecedor={prepararFornecedorParaEdicao} 
                    buscarDados={buscarFornecedor} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}