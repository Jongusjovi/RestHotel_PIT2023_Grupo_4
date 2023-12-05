import { Container, Table } from "react-bootstrap";
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import { AuthContext } from '../contexts/authContext'
import { IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import { toast } from "react-toastify";

export default function FormCadConsumoFuncionario(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/funcionarios';
    const localRecursosConsumos = 'http://localhost:3000/consumosfuncionarios';
    const [status, setStatus] = useState(STATUS.sucesso);
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [listaConsumos, setListaConsumos] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [qtdeItem, setQtdeItem] = useState(1);
    const [subTotal, setSubTotal] = useState(0.00);
    const [visivel, setVisivel] = useState('d-none');

    function buscarConsumos() {
        fetch(localRecursosConsumos + '/funcionario/' + props.funcionario.id, { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaConsumos(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os consumos do funcionário do backend.");
            });
    }

    function buscarProdutos() {
        fetch('http://localhost:3000/produtos', { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaProdutos(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os produtos do backend.");
            });
    }

    function incluirConsumo(consumo) {
        fetch(localRecursosConsumos, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(consumo)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            toast.success(dados.mensagem);
            buscarConsumos();
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function excluirConsumo(consumo) {
        fetch(localRecursosConsumos + '/' + consumo.id, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(consumo)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            toast.success(dados.mensagem);
            buscarConsumos();
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    useEffect(() => {
        buscarConsumos();
        buscarProdutos();
    }, []);

    const selectProduto = (evento) => {
        const itemSelecionado = evento.currentTarget.value;
        const item = listaProdutos.find(d => d.id == itemSelecionado)
        setProdutoSelecionado(item);
        setSubTotal(parseFloat(qtdeItem * parseFloat(item.preco)));
    }

    if (status === STATUS.sucesso) {
        return (
            <Container>
                <PageTitle texto={props.funcionario.nome} />
                <Row className='mt-3 p-2 border rounded font-mts'>
                    <Row className="mt-5 d-flex text-left">
                        <Col>
                            <h2>Consumos</h2>
                        </Col>
                        <Col md="auto">
                            <Button onClick={() => {
                                setVisivel('');
                            }}>Novo Consumo
                            </Button>
                        </Col>
                    </Row>
                    <Row className={visivel}>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Selecione um produto:</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={selectProduto}>  
                                    <option>Selecione...</option>
                                    {listaProdutos.map((produto) => {
                                        return <option key={produto.id} value={produto.id}>{produto.nome}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Form.Group>
                                <Form.Label>Preço R$:</Form.Label>
                                <Form.Control type="text" value={produtoSelecionado?.preco} disabled />
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Form.Group>
                                <Form.Label>Qtde</Form.Label>
                                <Form.Control type="number"
                                    min={1}
                                    value={qtdeItem}
                                    onChange={(e) => {
                                        const qtde = parseInt(e.currentTarget.value);
                                        if (qtde > 0) {
                                            setQtdeItem(qtde);
                                            setSubTotal(qtde * parseFloat(produtoSelecionado.preco).toFixed(2));
                                        }
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Form.Group>
                                <Form.Label>SubTotal</Form.Label>
                                <Form.Control type="text" value={subTotal} disabled />
                            </Form.Group>
                        </Col>
                        <Col md={1} style={{ marginTop: "0.5%"}}>
                            <Form.Group>
                                <Form.Label> </Form.Label>
                                <Button variant="outline-success" onClick={() => {
                                    let data = new Date();
                                    let consumo = {
                                        id: null,
                                        quantidade: qtdeItem,
                                        datahora: (data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes()),
                                        funcionario_id: props.funcionario.id,
                                        proser_id: produtoSelecionado.id
                                    };
                                    incluirConsumo(consumo);
                                    setVisivel('d-none');
                                }}>Adicionar
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th hidden>id</th>
                                    <th>Produto</th>
                                    <th>Qtde.</th>
                                    <th style={{ textAlign: "right" }}>Valor</th>
                                    <th style={{ textAlign: "center", width: "9%" }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaConsumos.map((consumo) => {
                                        return <tr key={consumo.id}>
                                            <td hidden>{consumo.id}</td>
                                            <td>{consumo.consumo_proser.nome}</td>
                                            <td>{consumo.quantidade}</td>
                                            <td style={{ textAlign: "right" }}>R$ {parseFloat(consumo.quantidade * consumo.consumo_proser.preco).toFixed(2)}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <Button variant="outline-danger" onClick={() => { excluirConsumo(consumo) }}>
                                                    <IconeExcluir />
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>
                    <Button
                        as={Col}
                        md="1"
                        variant="primary" 
                        className="mb-2" 
                        type="button" 
                        onClick={() => {
                            props.onTabela(true);
                        }}>Voltar
                    </Button>
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
            <TelaErro mensagem="Não foi possível gravar o consumo do funcionário.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}