import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";
import FormCadReservaHospedagem from "../Formularios/FormCadReservaHospedagem";
import TabelaReserva from "../Tabelas/TabelaDeReserva";


export default function TelaCadastroDeReservaDeHospedagem(props) {

    const localRecursos = 'http://localhost:3000/reservas';
    const { token } = useContext(AuthContext);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaReservas, setListaReservas] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [reservaEmEdicao, setReservaEmEdicao] = useState({
            id: 0,
            datachegada: "",
            datasaida: "",
            quantidade_hospedes: "",
            cliente_id: "",
            quarto_id: ""
    });

    function buscarReservas() {
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
            setListaReservas(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararReservaParaEdicao(reserva, edicao) {
        setAtualizando(edicao);
        setReservaEmEdicao(reserva);
        setExibirTabela(false);
    }

    function excluirReserva(reserva) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(reserva)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarReservas();
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarReservas();
    }, []);


    if (exibirTabela) {
        if (status === STATUS.ocioso) {
            return (
                <TelaCarregamento/>
            );
        }
        else if (status == STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaReserva 
                        dados={listaReservas} 
                        onTabela={setExibirTabela} 
                        editarReserva={prepararReservaParaEdicao}
                        excluirReserva={excluirReserva}
                    />
                    <ToastContainer />
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
    else {
        return (
            <Pagina>
                <FormCadReservaHospedagem 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    reserva={reservaEmEdicao} 
                    setReserva={setReservaEmEdicao} 
                    editarReserva={prepararReservaParaEdicao} 
                    buscarDados={buscarReservas} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}