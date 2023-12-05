import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import RelatorioProdutos from "../Relatorios/RelatorioDeProdutos";

export default function TelaRelatorioDeProdutos(props) {

    const localRecursos = 'http://localhost:3000/produtos/relatorio';
    const { token } = useContext(AuthContext)

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaProdutos, setListaProdutos] = useState([]);
    const filtro = {
        "produto" : "",
        "emFalta" : false,
        "emEstoque" : false
    }

    function buscarDadosProdutos() {
        fetch(localRecursos, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(filtro)
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

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarDadosProdutos();
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
                    <RelatorioProdutos
                        dados={listaProdutos} 
                        onTabela={setExibirTabela}
                    />
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
}