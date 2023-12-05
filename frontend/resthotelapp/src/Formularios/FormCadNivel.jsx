import { Container } from "react-bootstrap";
import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import { AuthContext } from '../contexts/authContext';
import { toast } from 'react-toastify';
import PageTitle from "../Componentes/PageTitle";


export default function FormCadNivel(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/niveis';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);

    const id = useRef("");
    const nome = useRef("");
    const descricao = useRef("");


    function cadastrarNivel(nivel) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(nivel)
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
                body: JSON.stringify(nivel)
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

    function prepararTela(nivel) {
        if (props.modoEdicao) {
            id.current.value = nivel.id;
            nome.current.value = nivel.nome;
            descricao.current.value = nivel.descricao;
        }
    }

    function validarDados() {
        const nivel = {
            id: id.current.value,
            nome: nome.current.value,
            descricao: descricao.current.value
        }

        if (nivel.nome && nivel.descricao) {
            return nivel;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const nivel = validarDados();
            if (nivel) {
                setStatus(STATUS.ocioso);
                cadastrarNivel(nivel);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        prepararTela(props.nivel);
    }, []);

    if (status === STATUS.sucesso) {
        return (
            <Container style={{width: "45%"}}>
                <PageTitle texto={'Cadastro de Níveis de Usuários'} />
                <Row className='mt-3 p-2 border rounded bg-light'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="idnivel"
                                    name="idnivel"
                                    hidden
                                    type="text"
                                    ref={id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
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
                                    Por favor, informe o nome da função!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Descrição"
                                    id="descricao"
                                    name="descricao"
                                    ref={descricao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a descrição do nível de usuário!
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
            <TelaErro mensagem="Não foi possível gravar o nível de usuário.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}