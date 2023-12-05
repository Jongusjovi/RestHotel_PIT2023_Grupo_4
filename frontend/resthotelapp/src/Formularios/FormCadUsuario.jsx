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


export default function FormCadUsuario(props) {
    
    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/usuarios';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [usuario, setUsuario] = useState(props.usuario);
    const [nivelSelecionado, setNivelSelecionado]  = useState('');
    const [listaNiveis, setListaNiveis] = useState([]);

    function buscarNiveis() {
        fetch('http://localhost:3000/niveis', {
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
        }).catch((erro) => {
            alert("Não foi possível recuperar os níveis de usuário do backend.");
        });
    }

    function cadastrarUsuario(usuario) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(usuario)
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
                body: JSON.stringify(usuario)
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

    function manipularMudanca(e) {
        const alvo = e.target.name;

        setUsuario({ ...usuario, [alvo]: e.target.value })
    }

    function validarDados() {
        if (usuario.nome.length > 0 && usuario.senha.length > 0 && usuario.email.length > 0 &&
            usuario.nivel_id.length > 0) {
            return {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "senha": usuario.senha,
                "nivel_id": usuario.nivel_id
            };
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const objUsuario = validarDados();
            if (objUsuario) {
                setStatus(STATUS.ocioso);
                cadastrarUsuario(objUsuario);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        buscarNiveis();
    }, []);

    if (status == STATUS.sucesso) {
        return (
            <Container style={{ width: "30%"}}>
                <PageTitle texto={'Cadastro de Usuários'} />
                <Row className='mt-3 p-2 border rounded bg-light font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="id"
                                    name="id"
                                    hidden
                                    type="text"
                                    value={usuario.id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nome"
                                    id="nome"
                                    name="nome"
                                    value={usuario.nome}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o nome do usuário!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="ex: meunome@exemplo.com.br"
                                    value={usuario.email}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o e-mail do usuário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="********"
                                    id="senha"
                                    name="senha"
                                    value={usuario.senha}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a senha do usuário!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Nível:</Form.Label>
                                <Form.Select aria-label="Default select example" 
                                             id="nivel_id"
                                             name="nivel_id"
                                             onChange={manipularMudanca}
                                             value={props.modoEdicao ? usuario.nivel_id : null}>
                                    <option value='0'>Selecione um nível</option>
                                    {
                                        listaNiveis.map(opcao => {
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
    else if (status == STATUS.ocioso) {
        return (
            <TelaCarregamento />
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível gravar o usuário.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}