import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";
import TabelaConsumoFuncionario from "../Tabelas/TabelaDeConsumoDeFuncionario";
import FormCadConsumoFuncionario from "../Formularios/FormCadConsumoFuncionario";

export default function TelaCadastroDeConsumoDeFuncionario(props) {
    const localRecursos = 'http://localhost:3000/funcionarios';
    const { token } = useContext(AuthContext)
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState({
        id: 0,
        nome: ""
    });

    function prepararFuncionarioParaEdicao(funcionario) {
        setFuncionarioEmEdicao(funcionario);
        setExibirTabela(false);
    }

    function buscarFuncionarios(pesquisa) {
        if (!pesquisa) {
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
                setListaFuncionarios(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }
    
    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarFuncionarios();
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
                    <TabelaConsumoFuncionario
                        dados={listaFuncionarios}
                        onTabela={setExibirTabela}
                        editarFuncionario={prepararFuncionarioParaEdicao}
                        onPesquisa={buscarFuncionarios}
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos consumos dos funcionários.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadConsumoFuncionario
                    onTabela={setExibirTabela}
                    funcionario={funcionarioEmEdicao}
                />
                <ToastContainer />
            </Pagina>
        );
    }
}