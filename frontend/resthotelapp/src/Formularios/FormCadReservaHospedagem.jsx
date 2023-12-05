import { Container, Table } from "react-bootstrap";
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import BarraBusca from "../Componentes/BarraBusca";
import { AuthContext } from '../contexts/authContext'
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import { toast } from "react-toastify";
import { ConvertData, ConvertDataBr } from "../utilitarios/funcoes";

export default function FormCadReservaHospedagem(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/reservas';
    const [formValidado, setFormValidado] = useState(false);
    const [formPeriodoValidado, setFormPeriodoValidado] = useState(false)
    const [status, setStatus] = useState(STATUS.sucesso);
    const [reserva, setReserva] = useState(props.reserva);
    const [dataChegada, setDataChegada] = useState('')
    const [dataSaida, setDataSaida] = useState('')
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [quartoSelecionado, setQuartoSelecionado] = useState({});
    const [listaClientes, setListaClientes] = useState([]);
    const [listaQuartos, setListaQuartos] = useState([]);
    const [visivel, setVisivel] = useState('d-none');

    function buscarClientes() {
        fetch('http://localhost:3000/clientes', { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaClientes(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os clientes do backend.");
            });
    }

    function buscarQuartos() {
        fetch('http://localhost:3000/quartos' + (!props.modoEdicao ? 'livres' : ''), { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaQuartos(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os quartos do backend.");
            });
    }

    function filtrarReservas(reserva) {
        fetch(localRecursos + '/filtrarperiodo', {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(reserva)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaQuartos(dados)
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function cadastrarReserva(reserva) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(reserva)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem);
                props.buscarDados();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch(localRecursos, {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(reserva)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem);
                props.buscarDados()
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function manipularMudanca(e) {
        const alvo = e.target.name;
        setReserva({ ...reserva, [alvo]: e.target.value })
    }

    function validarDadosPeriodo() {
        if (reserva.datachegada.length > 0 && reserva.datasaida.length > 0) {
            let novaData = new Date(Date.now()).toLocaleTimeString()
            return {
                "datachegada": reserva.datachegada + ' ' + novaData,
                "datasaida": reserva.datasaida + ' ' + novaData
            };
        }
        else {
            return undefined;
        }
    }

    function validarDados() {
        if (reserva.datachegada.length > 0 && reserva.datasaida.length > 0 
            && reserva.quantidade_hospedes.length > 0 && clienteSelecionado.id != '') {
            let novaData = new Date(Date.now()).toLocaleTimeString()
            return {
                "id": reserva.id,
                "datachegada": reserva.datachegada + ' ' + novaData,
                "datasaida": reserva.datasaida + ' ' + novaData,
                "quantidade_hospedes": reserva.quantidade_hospedes,
                "cliente_id": clienteSelecionado.id,
                "quarto_id": quartoSelecionado.id
            };
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissaoPeriodo(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const objPeriodo = validarDadosPeriodo();
            if (objPeriodo) {
                setStatus(STATUS.ocioso);
                filtrarReservas(objPeriodo);
                setVisivel(true)
                setStatus(STATUS.sucesso);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormPeriodoValidado(true);
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const objReserva = validarDados();
            if (objReserva) {
                setStatus(STATUS.ocioso);
                cadastrarReserva(objReserva);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        buscarQuartos();
        buscarClientes();
        setVisivel(props.modoEdicao ? true : false)
    }, []);


    if (status === STATUS.sucesso) {
        return (
            <Container style={{width: "45%"}}>
                <PageTitle texto={'Reservas de Hospedagens'} />
                <Row className='mt-3 p-2 border bg-light rounded font-mts'>
                    <Form noValidate validated={formPeriodoValidado} onSubmit={manipularSubmissaoPeriodo}>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Previsão Check-in</Form.Label>
                                <Form.Control
                                    disabled={props.modoEdicao ? true : false}
                                    type="date"
                                    required
                                    name="datachegada"
                                    value={props.modoEdicao ? ConvertData(reserva.datachegada) : null}
                                    onChange={manipularMudanca} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a data prevista de check-in!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Previsão Check-out</Form.Label>
                                <Form.Control
                                    disabled={props.modoEdicao ? true : false}
                                    type="date"
                                    required
                                    name="datasaida"
                                    value={props.modoEdicao ? ConvertData(reserva.datasaida) : null}
                                    onChange={manipularMudanca} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a data prevista de check-out!
                                </Form.Control.Feedback>
                            </Form.Group>
                            {props.modoEdicao ? null : (<Button type="submit"  md="4" style={{ marginTop: "4%", width: "31%", marginLeft: "10px" }}>Filtrar</Button>)}
                        </Row>
                        {visivel ? null : <Button variant="secondary" className="mb-2" type="button" onClick={() => { props.onTabela(true) }}>Voltar</Button>}
                    </Form>
                    {!visivel ? null : (
                        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="2">
                                    <Form.Control
                                        id="id"
                                        name="id"
                                        hidden
                                        type="text"
                                        value={reserva.id}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8">
                                    <Form.Label>Cliente:</Form.Label>
                                    <BarraBusca
                                        desabilitado={props.modoEdicao ? true : false}
                                        placeHolder={'Informe o cliente...'}
                                        dados={listaClientes}
                                        campoChave={"cpf"}
                                        campoBusca={"nome"}
                                        funcaoSelecao={setClienteSelecionado}
                                        valor={props.modoEdicao ? reserva?.reservas_clientes?.nome : ""} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="5">
                                    <Form.Label>Selecione um quarto:</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        disabled={props.modoEdicao ? true : false}
                                        value={props.modoEdicao ? reserva.reservas_quartos.id : null}
                                        onChange={(evento) => {
                                            const itemSelecionado = evento.currentTarget.value;
                                            const pos = listaQuartos.map((item) => item["id"].toString()).indexOf(itemSelecionado);
                                            setQuartoSelecionado(listaQuartos[pos]);

                                        }}>
                                        <option>Selecione...</option>
                                        {listaQuartos.map((quarto) => {
                                            return <option key={quarto.id} value={quarto.id}>{quarto.numero} - {quarto.quarto_tipoquarto.nome}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Qtde. Hóspedes:</Form.Label>
                                    <Form.Control
                                        disabled={props.modoEdicao ? true : false}
                                        id="quantidade_hospedes"
                                        name="quantidade_hospedes"
                                        required
                                        type="number"
                                        value={reserva.quantidade_hospedes}
                                        onChange={manipularMudanca}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, informe a quantidade de hóspedes!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {props.modoEdicao ? null : (<Button type="submit" className="mb-2" style={{ marginRight: '5px'}}>Salvar</Button>)}
                            <Button variant="secondary" className="mb-2" type="button" onClick={() => { props.onTabela(true) }}>Voltar</Button>
                        </Form>

                    )}
                </Row>
            </Container>
        )
    }
    else if (status == STATUS.ocioso) {
        return (
            <TelaCarregamento />
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível gravar a reserva. 
                                Entre em contato com o administrador do sistema."/>
        );
    }
}