import Pagina from "../Templates/Pagina";
import { useState, useEffect, useContext } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from "react-toastify";
import TabelaDespesa from "../Tabelas/TabelaDeDespesa";
import FormCadDespesas from "../Formularios/FormCadDespesas";

export default function TelaCadastroDeDespesa(props) {

    const localRecursos = 'http://localhost:3000/despesas';
    const { token } = useContext(AuthContext)

    function buscarDespesas() {
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
            setListaDespesas(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function prepararDespesaParaEdicao(despesa, edicao) {
        setAtualizando(edicao);
        setDespesaEmEdicao(despesa);
        setExibirTabela(false);
    }

    function excluirDespesa(despesa) {
        fetch(localRecursos, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(despesa)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            buscarDespesas();
            toast.success(dados.mensagem)
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }
    
    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaDespesas, setListaDespesas] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [despesaEmEdicao, setDespesaEmEdicao] = useState({
            id: 0,
            descricao: "",
            valor: "",
            vencimento: "",
            pago: 0,
            valor_pago: "",
            descontos: "",
            multa_juros: "",
            pagamento: "",
            categoria_id: "",
            categorias_despesas_despesas: {}
    });

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarDespesas();
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
                    <TabelaDespesa 
                        dados={listaDespesas} 
                        onTabela={setExibirTabela} 
                        editarDespesa={prepararDespesaParaEdicao} 
                        excluirDespesa={excluirDespesa}
                        despesa={despesaEmEdicao}
                    />
                    <ToastContainer />
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
    else {
        return (
            <Pagina>
                <FormCadDespesas 
                    onTabela={setExibirTabela} 
                    modoEdicao={atualizando} 
                    despesa={despesaEmEdicao} 
                    setDespesa={setDespesaEmEdicao} 
                    editarDespesa={prepararDespesaParaEdicao} 
                    buscarDados={buscarDespesas} 
                />
                <ToastContainer />
            </Pagina>
        );
    }
}