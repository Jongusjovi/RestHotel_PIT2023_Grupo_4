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
import InputMask from 'react-input-mask';
import Modal from 'react-bootstrap/Modal';

export default function FormCadFuncionario(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/funcionarios';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [funcionario, setFuncionario] = useState(props.funcionario);
    const [funcaoSelecionada, setFuncaoSelecionada] = useState('');
    const [listaFuncoes, setListaFuncoes] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const handleClose = () => {
        setExibirModal(false)
    }

    function buscarFuncoes() {
        fetch('http://localhost:3000/funcoes', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaFuncoes(dados);
            }).catch((erro) => {
                alert("Não foi possível recuperar as funções do backend.");
            });
    }

    function cadastrarFuncionario(funcionario) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(funcionario)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                props.buscarDados();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch(localRecursos, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(funcionario)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                props.buscarDados();
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function manipularMudanca(e) {
        const alvo = e.target.name;
        setFuncionario({ ...funcionario, [alvo]: e.target.value })
    }

    function validarDados() {
        if (funcionario.cpf.length > 0 && funcionario.nome.length > 0 && funcionario.endereco.length > 0 &&
            funcionario.bairro.length > 0 && funcionario.cidade.length > 0 && funcionario.bairro.length > 0 &&
            funcionario.uf.length > 0 && funcionario.telefone.length > 0 && funcionario.email.length > 0 &&
            funcionario.funcao_id.length > 0) {
            return {
                "id": funcionario.id,
                "cpf": funcionario.cpf,
                "nome": funcionario.nome,
                "endereco": funcionario.endereco,
                "bairro": funcionario.bairro,
                "cidade": funcionario.cidade,
                "uf": funcionario.uf,
                "cep": funcionario.cep,
                "telefone": funcionario.telefone,
                "email": funcionario.email,
                "funcao_id": funcionario.funcao_id
            };
        }
        else {
            return undefined;
        }
    }

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    function validarCEP(cep) {
        const regexCEP = /^\d{5}-\d{3}$/;
        return regexCEP.test(cep);
    }

    function validarTelefone(telefone) {
        const regexTelefone = /^\d{10,}$/;
        return regexTelefone.test(telefone);
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
        return digitoVerificador2 === parseInt(cpf.charAt(10));
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        const mensagensErro = [];
        if (formulario.checkValidity()) {
            const objFuncionario = validarDados();
            if (objFuncionario) {
                const cpfValido = validarCPF(objFuncionario.cpf);
                const emailValido = validarEmail(objFuncionario.email);
                const cepValido = validarCEP(objFuncionario.cep);
                const telefoneValido = validarTelefone(objFuncionario.telefone);
                if (!cpfValido) {
                    mensagensErro.push(<p style={{ margin: 0 }}>CPF inválido.</p>) // += 'CPF inválido.\n';
                }
                if (!emailValido) {
                    mensagensErro.push(<p style={{ margin: 0 }}>E-mail inválido.</p>) //+= 'E-mail inválido.\n';
                }
                if (!cepValido) {
                    mensagensErro.push(<p style={{ margin: 0 }}>CEP inválido.</p>) //+= 'CEP inválido.\n';
                }
                if (!telefoneValido) {
                    mensagensErro.push(<p style={{ margin: 0 }}>Telefone inválido.</p>) //+= 'Telefone inválido.\n';
                }
                if (cpfValido && emailValido && cepValido && telefoneValido) {
                    setStatus(STATUS.ocioso);
                    cadastrarFuncionario(objFuncionario);
                    setStatus(STATUS.sucesso);
                } else {
                    setMensagem(mensagensErro)
                    setExibirModal(true)
                }
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        buscarFuncoes();
    }, []);

    if (status == STATUS.sucesso) {
        return (
            <Container>
                <PageTitle texto={'Cadastro de Funcionários'} />
                <Row className='mt-3 p-2 border rounded bg-light font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="id"
                                    name="id"
                                    hidden
                                    type="text"
                                    value={funcionario.id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>CPF:</Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask="999.999.999-99"
                                    placeholder="000.000.000-00"
                                    id="cpf"
                                    name="cpf"
                                    required
                                    type="text"
                                    value={funcionario.cpf}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o CPF do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nome completo"
                                    id="nome"
                                    name="nome"
                                    value={funcionario.nome}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o nome do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="7">
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control
                                    id="endereco"
                                    name="endereco"
                                    type="text"
                                    placeholder="Endereço completo e número"
                                    value={funcionario.endereco}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o endereço do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>Bairro:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Bairro"
                                    id="bairro"
                                    name="bairro"
                                    value={funcionario.bairro}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o bairro do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="7">
                                <Form.Label>Cidade:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cidade"
                                    id="cidade"
                                    name="cidade"
                                    value={funcionario.cidade}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a cidade do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>UF:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="UF"
                                    id="uf"
                                    name="uf"
                                    value={funcionario.uf}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a UF do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>CEP:</Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask="99999-999"
                                    maskChar=""
                                    id="cep"
                                    name="cep"
                                    type="text"
                                    placeholder="00000-000"
                                    value={funcionario.cep}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o CEP do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="DDD+Telefone (sem espaçamento)"
                                    id="telefone"
                                    name="telefone"
                                    value={funcionario.telefone}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o telefone do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>E-Mail:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="modelo@teste.com"
                                    id="email"
                                    name="email"
                                    value={funcionario.email}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o e-mail do funcionário!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Função:</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    id="funcao_id"
                                    name="funcao_id"
                                    onChange={manipularMudanca}
                                    value={props.modoEdicao ? funcionario.funcao_id : null}>
                                    <option value='0'>Selecione uma função</option>
                                    {
                                        listaFuncoes.map(opcao => {
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
                <Modal className="font-mts" show={exibirModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{mensagem}</Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={handleClose}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
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
            <TelaErro mensagem="Não foi possível gravar a função.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}