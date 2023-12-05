import { Container } from "react-bootstrap";
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import { AuthContext } from '../contexts/authContext'
import PageTitle from "../Componentes/PageTitle";
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';

export default function FormCadFornecedor(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/fornecedores';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [fornecedor, setFornecedor] = useState(props.fornecedor);
    const [exibirModal, setExibirModal] = useState(false)
    const [mensagem, setMensagem] = useState(null)

    const handleClose = () => {
        setExibirModal(false)
    }

    function cadastrarFornecedor(fornecedor) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(fornecedor)
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
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(fornecedor)
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
        setFornecedor({ ...fornecedor, [alvo]: e.target.value })
    }

    function validarDados() {
        if (fornecedor.cnpj.length > 0 && fornecedor.razaosocial.length > 0 && fornecedor.nomefantasia.length > 0 &&
            fornecedor.endereco.length > 0 && fornecedor.bairro.length > 0 && fornecedor.cidade.length > 0 &&
            fornecedor.uf.length > 0 && fornecedor.cep.length > 0 && fornecedor.telefone.length > 0 &&
            fornecedor.segmento.length > 0 && fornecedor.email.length > 0) {
            return {
                "id": fornecedor.id,
                "cnpj": fornecedor.cnpj,
                "razaosocial": fornecedor.razaosocial,
                "nomefantasia": fornecedor.nomefantasia,
                "endereco": fornecedor.endereco,
                "bairro": fornecedor.bairro,
                "cidade": fornecedor.cidade,
                "uf": fornecedor.uf,
                "cep": fornecedor.cep,
                "telefone": fornecedor.telefone,
                "segmento": fornecedor.segmento,
                "email": fornecedor.email
            };
        }
        else {
            return undefined;
        }
    }

    // Função para validar CNPJ
    function validarCNPJ(cnpj) {
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/\D/g, '');

        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }

        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        let peso = 5;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj.charAt(i)) * peso--;
            if (peso < 2) {
                peso = 9;
            }
        }
        let digitoVerificador1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        // Verifica se o primeiro dígito verificador é igual ao fornecido no CNPJ
        if (digitoVerificador1 !== parseInt(cnpj.charAt(12))) {
            return false;
        }

        // Calcula o segundo dígito verificador
        soma = 0;
        peso = 6;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj.charAt(i)) * peso--;
            if (peso < 2) {
                peso = 9;
            }
        }
        let digitoVerificador2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        // Verifica se o segundo dígito verificador é igual ao fornecido no CNPJ
        return digitoVerificador2 === parseInt(cnpj.charAt(13));
    }

    // Função para validar CEP
    function validarCEP(cep) {
        const cepRegex = /^\d{5}-\d{3}$/;
        return cepRegex.test(cep);
    }

    // Função para validar e-mail
    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para validar telefone
    function validarTelefone(telefone) {
        const regexTelefone = /^\d{10,}$/;
        return regexTelefone.test(telefone);
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        const mensagensErro = [];
        if (formulario.checkValidity()) {
            const objFornecedor = validarDados();
            if (objFornecedor) {
                const cnpjValido = validarCNPJ(objFornecedor.cnpj);
                const emailValido = validarEmail(objFornecedor.email);
                const cepValido = validarCEP(objFornecedor.cep);
                const telefoneValido = validarTelefone(objFornecedor.telefone);
                if (!cnpjValido) {
                    mensagensErro.push(<p style={{margin: 0}}>CNPJ inválido.</p>);
                }
                if (!emailValido) {
                    mensagensErro.push(<p style={{margin: 0}}>E-mail inválido.</p>);
                }
                if (!cepValido) {
                    mensagensErro.push(<p style={{margin: 0}}>CEP inválido.</p>);
                }

                if (!telefoneValido) {
                    mensagensErro.push(<p style={{margin: 0}}>Telefone inválido.</p>);
                }
            }
        }        
                
        if (formulario.checkValidity()) {
            const objFornecedor = validarDados();
            if (objFornecedor) {

                const cnpjValido = validarCNPJ(objFornecedor.cnpj);
                const cepValido = validarCEP(objFornecedor.cep);
                const telefoneValido = validarTelefone(objFornecedor.telefone);
                const emailValido = validarEmail(objFornecedor.email);
                if (cnpjValido && emailValido && cepValido && telefoneValido) {
                    setStatus(STATUS.ocioso);
                    cadastrarFornecedor(objFornecedor);
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

    if (status == STATUS.sucesso) {
        return (
            <Container>
                <PageTitle texto={'Cadastro de Fornecedores'} />
                <Row className='mt-3 p-2 border rounded bg-light font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="id"
                                    name="id"
                                    hidden
                                    type="text"
                                    value={fornecedor.id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Label>CNPJ:</Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask="99.999.999/9999-99"
                                    placeholder="00.000.000/0000-00"
                                    maskChar=""
                                    id="cnpj"
                                    name="cnpj"
                                    required
                                    type="text"
                                    value={fornecedor.cnpj}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o CNPJ do fornecedor!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>Razão Social:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Razão Social"
                                    id="razaosocial"
                                    name="razaosocial"
                                    value={fornecedor.razaosocial}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a Razão Social do fornecedor!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>Nome Fantasia:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nome Fantasia"
                                    id="nomefantasia"
                                    name="nomefantasia"
                                    value={fornecedor.nomefantasia}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o Nome Fantasia do fornecedor!
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
                                    value={fornecedor.endereco}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o endereço do cliente!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>Bairro:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Bairro"
                                    id="bairro"
                                    name="bairro"
                                    value={fornecedor.bairro}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o bairro do cliente!
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
                                    value={fornecedor.cidade}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a cidade do cliente!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>UF:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="UF"
                                    id="uf"
                                    name="uf"
                                    value={fornecedor.uf}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a UF do cliente!
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
                                    value={fornecedor.cep}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o CEP do cliente!
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
                                    value={fornecedor.telefone}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o telefone do cliente!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5">
                                <Form.Label>E-Mail:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="modelo@teste.com"
                                    id="email"
                                    name="email"
                                    value={fornecedor.email}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o e-mail do cliente!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Segmento</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Alimentos, Bebidas, Gás (...)"
                                    required
                                    id="segmento"
                                    name="segmento"
                                    value={fornecedor.segmento}
                                    onChange={manipularMudanca} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o Segmento do fornecedor!
                                </Form.Control.Feedback>
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
            <TelaErro mensagem="Não foi possível gravar o fornecedor.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}