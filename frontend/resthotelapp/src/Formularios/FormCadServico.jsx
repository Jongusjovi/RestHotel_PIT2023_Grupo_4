import { Container } from "react-bootstrap";
import React, { useState, useRef, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AuthContext } from '../contexts/authContext'
import STATUS from "../utilitarios/util";
import { toast } from "react-toastify";
import PageTitle from "../Componentes/PageTitle";
import TelaErro from "../Telas/TelaErro";
import TelaCarregamento from "../Telas/TelaCarregamento";


export default function FormCadServico(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/servicos';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const id = useRef("");
    const nome = useRef("");
    const preco = useRef("");


    function cadastrarServico(servico) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(servico)
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
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(servico)
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
    }

    function prepararTela(servico) {
        if (props.modoEdicao) {
            id.current.value = servico.id;
            nome.current.value = servico.nome;
            preco.current.value = servico.preco;
        }
    }

    function validarDados() {
        const servico = {
            id: id.current.value,
            nome: nome.current.value,
            preco: preco.current.value,
            tipo: 'S'
        }

        if (servico.nome && servico.preco) {
            return servico;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const servico = validarDados();
            if (servico) {
                setStatus(STATUS.ocioso);
                cadastrarServico(servico);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        prepararTela(props.servico);
    }, []);

    if (status === STATUS.sucesso) {
        return (
            <Container style={{ width: "40%"}}>
                <PageTitle texto={'Cadastro de Serviços'} />
                <Row className='mt-3 p-2 border rounded bg-light font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                    <Form.Control
                                        id="id"
                                        name="id"
                                        hidden
                                        type="text"
                                        ref={id}
                                    />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="9">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control
                                    id="nome"
                                    name="nome"
                                    required
                                    type="text"
                                    placeholder="Nome"
                                    ref={nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o nome do serviço!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Preço:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="0,00"
                                    id="preco"
                                    name="preco"
                                    ref={preco}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço do serviço!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit" className="mb-2">Salvar</Button> { }
                        <Button variant="secondary" className="mb-2" type="button" onClick={() => { props.onTabela(true) }}>Voltar</Button>
                    </Form>
                </Row>
            </Container>
        );
    }
    else if (status === STATUS.ocioso) {
        return (
            <TelaCarregamento />
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível gravar o serviço.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}