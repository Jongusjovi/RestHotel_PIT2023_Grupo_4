import Pagina from "../Templates/Pagina";
import FormCadFuncionario from "../Formularios/FormCadFuncionario";
import TabelaFuncionario from "../Tabelas/TabelaDeFuncionario";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeFuncionario(props) {

    const localRecursos = 'http://localhost:3000/funcionarios';
    const { token } = useContext(AuthContext)

    function buscarFuncionario() {
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

    function prepararFuncionarioParaEdicao(funcionario, edicao) {
        setAtualizando(edicao);
        setFuncionarioEmEdicao(funcionario);
        setExibirTabela(false);
    }

    function excluirFuncionario(funcionario) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(funcionario)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarFuncionario();
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState({
            id: 0,
            cpf: "",
            nome: "",
            endereco: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            telefone: "",
            email: "",
            funcao_id: "",
            funcionario_funcao: {}
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarFuncionario();
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
                    <TabelaFuncionario 
                        dados={listaFuncionarios} 
                        onTabela={setExibirTabela} 
                        editarFuncionario={prepararFuncionarioParaEdicao} 
                        excluirFuncionario={excluirFuncionario}
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos funcionários.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadFuncionario 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    funcionario={funcionarioEmEdicao} 
                    setFuncionario={setFuncionarioEmEdicao} 
                    editarFuncionario={prepararFuncionarioParaEdicao} 
                    buscarDados={buscarFuncionario} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}