import Pagina from "../Templates/Pagina";
import FormCadProduto from "../Formularios/FormCadProduto";
import TabelaProduto from "../Tabelas/tabelaProduto";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeProduto(props) {

    const localRecursos = 'http://localhost:3000/produtos';
    const { token } = useContext(AuthContext)

    function buscarProdutos() {
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
            setListaProdutos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararProdutoParaEdicao(produto, edicao) {
        setAtualizando(edicao);
        setProdutoEmEdicao(produto);
        setExibirTabela(false);
    }

    function excluirProduto(produto) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(produto)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarProdutos();
            toast.success(dados.mensagem);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [produtoEmEdicao, setProdutoEmEdicao] = useState({
            id: 0,
            nome: "",
            quantidade: "",
            preco: "",
            tipo: ""
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarProdutos();
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
                    <TabelaProduto 
                        dados={listaProdutos} 
                        onTabela={setExibirTabela} 
                        editarProduto={prepararProdutoParaEdicao} 
                        excluirProduto={excluirProduto}
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos produtos.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadProduto 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    produto={produtoEmEdicao} 
                    setProduto={setProdutoEmEdicao} 
                    editarProduto={prepararProdutoParaEdicao} 
                    buscarDados={buscarProdutos} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}