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
import { ConvertData, ConvertDataOnlyBr } from "../utilitarios/funcoes";

export default function FormCadDespesas(props) {
    
    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/despesas';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [despesa, setDespesa] = useState(props.despesa);
    const [categoriaSelecionada, setCategoriaSelecionada]  = useState('');
    const [listaCategorias, setListaCategorias] = useState([]);

    function buscarCategorias() {
        fetch('http://localhost:3000/categorias_despesas', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaCategorias(dados);
        }).catch((erro) => {
            alert("Não foi possível recuperar as categorias de despesas do backend.");
        });
    }

    function cadastrarDespesa(despesa) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(despesa)
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
                body: JSON.stringify(despesa)
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

        if (alvo === "pago") {
            if (e.target.checked) {
                setDespesa({ ...despesa, [alvo]: 1 })
            }
            else {
                setDespesa({ ...despesa, [alvo]: 0 })
            }
        }
        else {
            setDespesa({ ...despesa, [alvo]: e.target.value })
        }
    }

    function validarDados() {
        if (despesa.descricao.length > 0 && despesa.valor.length > 0 && despesa.vencimento.length > 0 &&
            despesa.categoria_id.length > 0) {

            let novaData = new Date(Date.now()).toLocaleTimeString()

            return {
                "id": despesa.id,
                "descricao": despesa.descricao,
                "valor": despesa.valor.replace(",", "."),
                "vencimento": despesa.vencimento,
                "pago": despesa.pago,
                "valor_pago": despesa.valor_pago,
                "descontos": despesa.descontos,
                "multa_juros": despesa.multa_juros,
                "pagamento": despesa.pagamento,
                "categoria_id": despesa.categoria_id
            };
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const objDespesa = validarDados();
            if (objDespesa) {
                setStatus(STATUS.ocioso);
                cadastrarDespesa(objDespesa);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    useEffect(() => {
        buscarCategorias();
    }, []);

    if (status == STATUS.sucesso) {
        return (
            <Container>
                <PageTitle texto={'Cadastro de Despesas'} />
                <Row className='mt-3 p-2 border rounded bg-light font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="id"
                                    name="id"
                                    hidden
                                    type="text"
                                    value={despesa.id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="9">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control
                                    id="descricao"
                                    name="descricao"
                                    required
                                    type="text"
                                    placeholder="Descrição"
                                    value={despesa.descricao}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a descrição da despesa!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Categoria de Despesa:</Form.Label>
                                <Form.Select aria-label="Default select example" 
                                             id="categoria_id"
                                             name="categoria_id"
                                             onChange={manipularMudanca}
                                             value={props.modoEdicao ? despesa.categoria_id : null}>
                                    <option value='0'>Selecione uma categoria</option>
                                    {
                                        listaCategorias.map(opcao => {
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
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Data de Vencimento</Form.Label>
                                <Form.Control
                                    id="vencimento"
                                    type="date"
                                    required
                                    name="vencimento"
                                    value={props.modoEdicao ? ConvertDataOnlyBr(despesa.vencimento) : null}
                                    onChange={manipularMudanca} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a data de vencimento!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Valor:</Form.Label>
                                <Form.Control
                                    id="valor"
                                    required
                                    type="text"
                                    placeholder="0,00"
                                    name="valor"
                                    value={parseFloat(despesa.valor) > 0 ? despesa.valor : null}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o valor da despesa!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2" style={{ border: "1px groove" }}>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Pago?</Form.Label>
                                <Form.Check 
                                type="checkbox"
                                id="pago"
                                name="pago"
                                label="Pago"
                                checked={despesa.pago === 1}
                                onChange={manipularMudanca}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Valor pago:</Form.Label>
                                <Form.Control
                                    id="valor_pago"
                                    type="text"
                                    placeholder="0,00"
                                    name="valor_pago"
                                    value={parseFloat(despesa.valor_pago) > 0 ? despesa.valor_pago : null}
                                    required={props.modoEdicao ? despesa.pago === 1 : despesa.pago === 1}
                                    disabled={props.modoEdicao ? despesa.pago === 0 : despesa.pago === 0}
                                    onChange={manipularMudanca}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o valor pago da despesa!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Descontos:</Form.Label>
                                <Form.Control
                                    id="descontos"
                                    type="text"
                                    placeholder="0,00"
                                    name="descontos"
                                    value={parseFloat(despesa.descontos) > 0 ? despesa.descontos : null}
                                    disabled={props.modoEdicao ? despesa.pago === 0 : despesa.pago === 0}
                                    onChange={manipularMudanca}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Multas/Juros:</Form.Label>
                                <Form.Control
                                    id="multa_juros"
                                    type="text"
                                    placeholder="0,00"
                                    name="multa_juros"
                                    value={parseFloat(despesa.multa_juros) > 0 ? despesa.multa_juros : null}
                                    disabled={props.modoEdicao ? despesa.pago === 0 : despesa.pago === 0}
                                    onChange={manipularMudanca}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Data de pagamento:</Form.Label>
                                <Form.Control
                                    id="pagamento"
                                    type="date"
                                    name="pagamento"
                                    required={props.modoEdicao ? despesa.pago === 1 : despesa.pago === 1}
                                    disabled={props.modoEdicao ? despesa.pago === 0 : despesa.pago === 0}
                                    value={props.modoEdicao ? despesa.pagamento ? ConvertDataOnlyBr(despesa.pagamento) : null : null}
                                    onChange={manipularMudanca} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a data de pagamento da despesa!
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
    else if (status == STATUS.ocioso) {
        return (
            <TelaCarregamento />
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível gravar a despesa.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}