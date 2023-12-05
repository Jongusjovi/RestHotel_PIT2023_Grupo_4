import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import RelatorioHospedagens from "../Relatorios/RelatorioDeHospedagens";

export default function TelaRelatorioDeHospedagens(props) {

    const localRecursos = 'http://localhost:3000/hospedagens/relatorio';
    const { token } = useContext(AuthContext)

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaHospedagens, setListaHospedagens] = useState([]);
    const objHospedagem = {
        "dataInicio" : "",
        "dataFim" : ""
    }

    function buscarDadosHospedagens() {
        fetch(localRecursos, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(objHospedagem)
        })
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaHospedagens(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarDadosHospedagens();
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
                    <RelatorioHospedagens
                        dados={listaHospedagens} 
                        onTabela={setExibirTabela}
                    />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados das hospedagens.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
}