import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import RelatorioDespesas from "../Relatorios/RelatorioDeDespesas";

export default function TelaRelatorioDeDespesas(props) {

    const localRecursos = 'http://localhost:3000/despesas/relatorio';
    const { token } = useContext(AuthContext)

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaDespesas, setListaDespesas] = useState([]);
    const filtro = {
        "emAberto" : '',
        "periodo" : {
            "dataInicio": '',
            "dataFim": ''
        }
    }

    function buscarDadosDespesas() {
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
            setListaDespesas(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarDadosDespesas();
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
                    <RelatorioDespesas
                        dados={listaDespesas} 
                        onTabela={setExibirTabela}
                    />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados das despesas.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
}