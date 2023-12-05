import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import TabelaNivel from "../Tabelas/TabelaDeNivel";
import FormCadNivel from "../Formularios/FormCadNivel";
import { ToastContainer, toast } from "react-toastify";
import TabelaPermissao from "../Tabelas/TabelaDePermissao";
import FormCadPermissao from "../Formularios/FormCadPermissao";

export default function TelaCadastroDePermissao(props) {

    const localRecursos = 'http://localhost:3000/niveis';
    const { token } = useContext(AuthContext)

    function buscarNiveis() {
        fetch(localRecursos + '/compermissoes', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaNiveis(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararPermissaoParaEdicao(permissao, edicao) {
        setAtualizando(edicao);
        setPermissaoEmEdicao(permissao);
        setExibirTabela(false);
    }

    function excluirPermissao(nivel) {
        fetch('http://localhost:3000/permissoes', {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(nivel)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarNiveis();
            toast.success(dados.mensagem);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaNiveis, setListaNiveis] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [permissaoEmEdicao, setPermissaoEmEdicao] = useState({
            id: 0,
            permissoes: [
                {
                    menu_id: 0,
                    itens_menus: []
                }
            ]
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarNiveis();
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
                    <TabelaPermissao 
                        dados={listaNiveis} 
                        onTabela={setExibirTabela} 
                        editarPermissao={prepararPermissaoParaEdicao} 
                        excluirPermissao={excluirPermissao} 
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos níveis de usuários.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadPermissao
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    nivel={permissaoEmEdicao}
                    buscarDados={buscarNiveis} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}