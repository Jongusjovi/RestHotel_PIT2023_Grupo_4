import Pagina from "../Templates/Pagina";
import FormCadUsuario from "../Formularios/FormCadUsuario";
import TabelaUsuario from "../Tabelas/TabelaDeUsuario";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";

export default function TelaCadastroDeUsuario(props) {

    const localRecursos = 'http://localhost:3000/usuarios';
    const { token } = useContext(AuthContext)

    function buscarUsuarios() {
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
            setListaUsuarios(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararUsuarioParaEdicao(usuario, edicao) {
        setAtualizando(edicao);
        setUsuarioEmEdicao(usuario);
        setExibirTabela(false);
    }

    function excluirUsuario(usuario) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(usuario)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarUsuarios();
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState({
            id: 0,
            nome: "",
            email: "",
            senha: "",
            nivel_id: "",
            usuario_nivel: {}
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarUsuarios();
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
                    <TabelaUsuario 
                        dados={listaUsuarios} 
                        onTabela={setExibirTabela} 
                        editarUsuario={prepararUsuarioParaEdicao} 
                        excluirUsuario={excluirUsuario}
                    />
                    <ToastContainer />
                </Pagina>
            );
        }
        else {
            return (
                <Pagina>
                    <TelaErro mensagem="Não foi possível recuperar os dados dos usuários.
                                        Entre em contato com o administrador do sistema."/>
                </Pagina>
            );
        }
    }
    else {
        return (
            <Pagina>
                <FormCadUsuario
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    usuario={usuarioEmEdicao} 
                    setUsuario={setUsuarioEmEdicao} 
                    editarUsuario={prepararUsuarioParaEdicao} 
                    buscarDados={buscarUsuarios} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}