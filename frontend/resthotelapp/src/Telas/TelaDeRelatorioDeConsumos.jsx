import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import RelatorioConsumos from "../Relatorios/RelatorioDeConsumos";

export default function TelaRelatorioDeConsumos(props) {

    const localRecursos = 'http://localhost:3000/consumos/relatorio';
    const { token } = useContext(AuthContext)

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaConsumos, setListaConsumos] = useState([]);
    const filtro = {
        "produto" : "",
        "periodo" : {
            "dataInicio" : "",
            "dataFim" : ""
        }
    }

    function buscarDadosConsumos() {
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
            setListaConsumos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarDadosConsumos();
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
                    <RelatorioConsumos
                        dados={listaConsumos} 
                        onTabela={setExibirTabela}
                    />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos consumos.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
}