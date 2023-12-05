import Pagina from "../Templates/Pagina";
import FormCadHospedagem from "../Formularios/FormCadHospedagem";
import TabelaDeHospedagem from "../Tabelas/TabelaDeHospedagem";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer } from "react-toastify";

export default function TelaCadastroDeHospedagem(props) {

    const localRecursos = 'http://localhost:3000/hospedagens';
    const { token } = useContext(AuthContext);

    function buscarHospedagem() {
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
            setListaHospedagens(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararHospedagemParaEdicao(hospedagem, edicao) {
        setAtualizando(edicao);
        setHospedagemEmEdicao(hospedagem);
        setExibirTabela(false);
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaHospedagens, setListaHospedagens] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [hospedagemEmEdicao, setHospedagemEmEdicao] = useState({
            idhospedagem: 0,
            checkin: "",
            checkout: "",
            total_consumo: "",
            quarto: "",
            cliente: ""
    });

    useEffect(() => {
        setStatus(STATUS.sucesso);
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
                    <TabelaDeHospedagem 
                        token={token} 
                        dados={listaHospedagens} 
                        onStatus={setStatus} 
                        onTabela={setExibirTabela} 
                        editarHospedagem={prepararHospedagemParaEdicao} 
                    />
                    <ToastContainer />
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
    else {
        return (
            <Pagina>
                <FormCadHospedagem 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    hospedagem={hospedagemEmEdicao} 
                    setHospedagem={setHospedagemEmEdicao} 
                    editarHospedagem={prepararHospedagemParaEdicao} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}