import { Container } from "react-bootstrap";
import React, { useState, useEffect, useContext } from 'react';
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

export default function FormCadQuarto(props) {
    
    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/quartos';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [quarto, setQuarto] = useState(props.quarto);
    const [listaTiposQuarto, setListaTiposQuarto] = useState([]);

    function buscarTiposQuartos() {
        fetch('http://localhost:3000/tiposquartos', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaTiposQuarto(dados);
        }).catch((erro) => {
            alert("Não foi possível recuperar os tipos de quarto do backend.");
        });
    }

    function cadastrarQuarto(quarto, metodo) {
        fetch(localRecursos, {
            method:metodo,
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(quarto)
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

    function manipularMudanca(e) {
        const alvo = e.target.name;

        setQuarto({ ...quarto, [alvo]: e.target.value })
    }

    function validarDados() {
        if (quarto.numero > 0 && quarto.descricao.length > 0 && quarto.quartotipo_id.length > 0) {
            return {
                "id": quarto.id,
                "numero": quarto.numero,
                "descricao": quarto.descricao,
                "quartotipo_id": quarto.quartotipo_id
            };
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const objQuarto = validarDados();
            if (objQuarto) {
                setStatus(STATUS.ocioso);
                cadastrarQuarto(objQuarto, props.modoEdicao);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        buscarTiposQuartos();
    }, []);

    if (status === STATUS.sucesso) {
        return (
            <Container style={{width: "40%"}}>
                <PageTitle texto={'Cadastro de Quartos'} />
                <Row className='mt-3 p-2 border rounded bg-light font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="id"
                                    name="id"
                                    hidden
                                    type="text"
                                    value={quarto.id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Numero:</Form.Label>
                                <Form.Control
                                    id="numero"
                                    name="numero"
                                    required
                                    type="number"
                                    value={quarto.numero}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o número do quarto!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Descrição..."
                                    id="descricao"
                                    name="descricao"
                                    value={quarto.descricao}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe uma descrição para o quarto!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Tipo:</Form.Label>
                                <Form.Select aria-label="Selecione um tipo..." 
                                             id="quartotipo_id"
                                             name="quartotipo_id"
                                             onChange={manipularMudanca}
                                             value={props.modoEdicao === 'PUT' ? quarto?.quartotipo_id : null}>
                                    <option value=''>Selecione um tipo de quarto</option>
                                    {
                                        listaTiposQuarto.map(opcao => {
                                            return <option 
                                                        key={opcao.id} 
                                                        value={opcao.id}>
                                                        {opcao.nome}
                                                    </option>
                                        })
                                    }
                                </Form.Select>
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
            <TelaErro mensagem="Não foi possível gravar o quarto.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}