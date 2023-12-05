import { Container } from "react-bootstrap";
import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import { AuthContext } from '../contexts/authContext'
import { toast } from "react-toastify";
import PageTitle from "../Componentes/PageTitle";

export default function FormCadCategoriaDespesa(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/categorias_despesas';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);

    const id = useRef("");
    const nome = useRef("");

    function cadastrarCategoria(categoria) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(categoria)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem)
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
                body: JSON.stringify(categoria)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem)
                props.buscarDados();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function prepararTela(categoria) {
        if (props.modoEdicao) {
            id.current.value = categoria.id;
            nome.current.value = categoria.nome;
        }
    }

    function validarDados() {
        const categoria = {
            id: id.current.value,
            nome: nome.current.value
        }

        if (categoria.nome) {
            return categoria;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const categoria = validarDados();
            if (categoria) {
                setStatus(STATUS.ocioso);
                cadastrarCategoria(categoria);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        prepararTela(props.categoria);
    }, []);

    if (status === STATUS.sucesso) {
        return (
            <Container style={{width: "45%"}}>
                <PageTitle texto={'Cadastro de Categorias de Despesas'} />
                <Row className='mt-3 p-2 border rounded bg-light'>
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
                            <Form.Group as={Col} md="12">
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
                                    Por favor, informe o nome da categoria!
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
            <TelaErro mensagem="Não foi possível gravar a categoria de despesa.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}