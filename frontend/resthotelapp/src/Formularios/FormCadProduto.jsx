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


export default function FormCadProduto(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/produtos';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const id = useRef("");
    const nome = useRef("");
    const quantidade = useRef("");
    const preco = useRef("");


    function cadastrarProduto(produto) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(produto)
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
                body: JSON.stringify(produto)
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

    function prepararTela(produto) {
        if (props.modoEdicao) {
            id.current.value = produto.id;
            nome.current.value = produto.nome;
            quantidade.current.value = produto.descricao;
            preco.current.value = produto.preco;
        }
    }

    function validarDados() {
        const produto = {
            id: id.current.value,
            nome: nome.current.value,
            quantidade: quantidade.current.value,
            preco: preco.current.value,
            tipo: 'P'
        }

        if (produto.nome && produto.quantidade && produto.preco) {
            return produto;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const produto = validarDados();
            if (produto) {
                setStatus(STATUS.ocioso);
                cadastrarProduto(produto);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        prepararTela(props.produto);
    }, []);

    return (
        <Container style={{ width: "40%"}}>
            <PageTitle texto={'Cadastro de Produtos'} />
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
                                Por favor, informe o nome do produto!
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
                                Por favor, informe o preço do produto!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col} md="3">
                            <Form.Label>Quantidade:</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                id="quantidade"
                                name="quantidade"
                                ref={quantidade}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a quantidade do produto!
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