import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import RelatorioReservas from "../Relatorios/RelatorioDeReservas";

export default function TelaRelatorioDeReservas(props) {

    const localRecursos = 'http://localhost:3000/reservas/relatorio';
    const { token } = useContext(AuthContext)

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaReservas, setListaReservas] = useState([]);
    const objFiltro = {
        "dataInicio" : "",
        "dataFim" : ""
    }

    function buscarDadosReservas() {
        fetch(localRecursos, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(objFiltro)
        })
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaReservas(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarDadosReservas();
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
                    <RelatorioReservas
                        dados={listaReservas} 
                        onTabela={setExibirTabela}
                    />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados das reservas.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
}