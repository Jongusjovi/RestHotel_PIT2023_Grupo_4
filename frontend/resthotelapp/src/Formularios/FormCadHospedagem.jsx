import { Container, Table } from "react-bootstrap";
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from "../utilitarios/util";
import { ConvertDataBr, ConvertData, ConvertMoney } from "../utilitarios/funcoes";
import TelaCarregamento from "../Telas/TelaCarregamento";
import TelaErro from "../Telas/TelaErro";
import BarraBusca from "../Componentes/BarraBusca";
import { AuthContext } from '../contexts/authContext'
import { IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal'

export default function FormCadHospedagem(props) {

    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/hospedagens';
    const localRecursosConsumos = 'http://localhost:3000/consumos';
    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [hospedagem, setHospedagem] = useState(props.hospedagem);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState({})
    const [quartoSelecionado, setQuartoSelecionado] = useState({});
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [listaClientes, setListaClientes] = useState([]);
    const [listaFuncionarios, setListaFuncionarios] = useState([])
    const [listaQuartos, setListaQuartos] = useState([]);
    const [listaConsumos, setListaConsumos] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [qtdeItem, setQtdeItem] = useState(1);
    const [subTotal, setSubTotal] = useState(0.00);
    const [visivel, setVisivel] = useState('d-none');
    const [showModal, setShowModal] = useState(false)
    const [msgVisivel, setMsgVisivel] = useState(false)
    const [dataCheckout, setDataCheckout] = useState(new Date())
    const [totalDiarias, setTotalDiarias] = useState(0)
    const [totalConsumos, setTotalConsumos] = useState(0.00)
    const [valorTotalDiarias, setValorTotalDiarias] = useState(0.00)
    const [totalHospedagem, setTotalHospedagem] = useState(0.00)

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    function buscarClientes() {
        fetch('http://localhost:3000/clientes', { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaClientes(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os clientes do backend.");
            });
    }
    
    function buscarFuncionarios() {
        fetch('http://localhost:3000/funcionarios', { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaFuncionarios(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os funcionários do backend.");
            });
    }

    function buscarQuartos() {
        fetch('http://localhost:3000/quartos' + (!props.modoEdicao ? 'livres' : ''), { 
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaQuartos(dados);
            }).catch((erro) => {
                toast.error("Não foi possível recuperar os quartos do backend.");
            });
    }

    function buscarConsumos() {
        fetch(localRecursosConsumos + '/hospedagem/' + hospedagem.id, { 
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
                toast.error("Não foi possível recuperar os consumos do cliente do backend.");
            });
    }

    function buscarProdutosServicos() {
        fetch('http://localhost:3000/produtosservicos', { 
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
                toast.error("Não foi possível recuperar os produtos/serviços do backend.");
            });
    }

    function incluirConsumo(consumo) {
        const valorConsumo = (parseInt(consumo.quantidade) * parseFloat(produtoSelecionado.preco)) + parseFloat(totalConsumos)

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
            setTotalConsumos(valorConsumo)
            buscarConsumos();
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function atualizarTotalConsumos(hospedagem) {
        fetch(localRecursos + '/subtotal', {
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(hospedagem)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setTotalConsumos(!dados.total_consumo ? 0 : dados.total_consumo)
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function excluirConsumo(consumo) {
        const valorConsumo = parseFloat(totalConsumos) - (parseInt(consumo.quantidade) * parseFloat(produtoSelecionado.preco))

        fetch(localRecursosConsumos, {
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
            setTotalConsumos(valorConsumo)
            buscarConsumos();
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function realizarCheckout(checkout) {
        fetch(localRecursos + "/checkout", {
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(checkout)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            toast.success(dados.mensagem);
            props.onTabela(true);
        }).catch((erro) => {
            setStatus(STATUS.erro);
        });
    }

    function cadastrarHospedagem(hospedagem) {
        if (!props.modoEdicao) {
            fetch(localRecursos, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(hospedagem)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem);
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch(localRecursos, {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(hospedagem)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                toast.success(dados.mensagem);
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
    }

    function diffInDays(data1, data2) {
        const dataInicial = new Date(data1)
        const dataFinal = new Date(data2)

        const diff = Math.abs(dataInicial.getTime() - dataFinal.getTime())
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

        return days
    }

    function atualizarTotais() {
        const totalDias = diffInDays(ConvertData(hospedagem.checkin), ConvertData(dataCheckout)) === 0 ? 1 : diffInDays(ConvertData(hospedagem.checkin), ConvertData(dataCheckout))
        const totalHosp = totalDias * parseFloat(hospedagem.hospedagem_quarto.quarto_tipoquarto.valor_diaria)

        setTotalDiarias(totalDias)
        setValorTotalDiarias(totalHosp)

        const valorTotal = parseFloat(totalHosp) + parseFloat(totalConsumos)

        setTotalHospedagem(valorTotal)
    }

    function manipularMudanca(e) {
        const alvo = e.target.name;

        setHospedagem({ ...hospedagem, [alvo]: e.target.value })
    }

    function validarDados() {
        if (hospedagem.checkin.length > 0 && quartoSelecionado.numero > 0 &&
            clienteSelecionado.id !== '') {
            
            let novaData = new Date(Date.now()).toLocaleTimeString()
            return {
                "id": hospedagem.id,
                "checkin": hospedagem.checkin + ' ' + novaData,
                "checkout": hospedagem.checkout,
                "total_consumo": hospedagem.total_consumo,
                "quarto_id": quartoSelecionado.id,
                "cliente_id": clienteSelecionado.id
            };
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const objHospedagem = validarDados();
            if (objHospedagem) {
                setStatus(STATUS.ocioso);
                cadastrarHospedagem(objHospedagem);
                setStatus(STATUS.sucesso);
            }
        }

        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    }

    function manipularCheckout() {
        const objCheckout = {
            "id": hospedagem.id,
            "checkout": dataCheckout,
            "total_consumo": parseFloat(totalConsumos),
            "valor_total": parseFloat(totalHospedagem),
            "quarto_id": hospedagem.quarto_id,
            "funcionario_id": funcionarioSelecionado.id
        }

        setStatus(STATUS.ocioso)
        realizarCheckout(objCheckout)
        setStatus(STATUS.sucesso)
    }

    useEffect(() => {
        buscarConsumos();
        buscarProdutosServicos();
        buscarQuartos();
        buscarClientes();
        atualizarTotalConsumos(hospedagem);

        if (props.modoEdicao) {
            buscarFuncionarios();
        }

    }, []);

    const selectProduto = (evento) => {
        const itemSelecionado = evento.currentTarget.value;
        const item = listaProdutos.find(d => d.id === itemSelecionado)
        setProdutoSelecionado(item);
        setSubTotal(parseFloat(qtdeItem * parseFloat(item.preco)));
    }

    if (status === STATUS.sucesso) {
        return (
            <Container>
                <PageTitle texto={'Hospedagens'} />
                <Row className='mt-3 p-2 border rounded font-mts'>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Control
                                    id="id"
                                    name="id"
                                    hidden
                                    type="text"
                                    value={hospedagem.id}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Data de Check-In</Form.Label>
                                <Form.Control
                                    disabled={props.modoEdicao ? true : false}
                                    type="date"
                                    required
                                    name="checkin"
                                    value={props.modoEdicao ? ConvertData(hospedagem.checkin) : null}
                                    onChange={manipularMudanca} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a data de check-in!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Cliente:</Form.Label>
                                <BarraBusca
                                    desabilitado={props.modoEdicao ? true : false}
                                    placeHolder={'Informe o cliente...'}
                                    dados={listaClientes}
                                    campoChave={"cpf"}
                                    campoBusca={"nome"}
                                    funcaoSelecao={setClienteSelecionado}
                                    valor={props.modoEdicao ? hospedagem?.hospedagem_cliente?.nome : ""} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Selecione um quarto:</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    disabled={props.modoEdicao ? true : false}
                                    value={props.modoEdicao ? hospedagem.hospedagem_quarto.id : null}
                                    onChange={(evento) => {
                                        const itemSelecionado = evento.currentTarget.value;
                                        const pos = listaQuartos.map((item) => item["id"].toString()).indexOf(itemSelecionado);
                                        setQuartoSelecionado(listaQuartos[pos]);

                                    }}>
                                    <option>Selecione...</option>
                                    {listaQuartos.map((quarto) => {
                                        return <option key={quarto.id} value={quarto.id}>{quarto.numero} - {quarto.quarto_tipoquarto.nome}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        {props.modoEdicao ? (
                            <Row className="mt-5 d-flex text-left">
                                <Col>
                                    <h2>Consumos</h2>
                                </Col>
                                <Col md="auto">
                                    <Button onClick={() => {
                                        setVisivel('');
                                    }}>Novo Consumo</Button>
                                </Col>
                            </Row>) : null}
                        {props.modoEdicao ? (
                            <Row className={visivel}>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Selecione um produto/serviço:</Form.Label>
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
                                                hospedagem_id: hospedagem.id,
                                                proser_id: produtoSelecionado.id
                                            };
                                            incluirConsumo(consumo);
                                            setVisivel('d-none');
                                        }}>Adicionar
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        ) : null}
                        {props.modoEdicao ? (
                            <Row className='mt-3'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th hidden>id</th>
                                            <th style={{ width: "20%" }}>Data</th>
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
                                                    <td>{ConvertDataBr(consumo.datahora)}</td>
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
                            </Row>) : null}
                        {props.modoEdicao ? 
                            <Button 
                                type="button" 
                                className="mb-2" 
                                style={{marginRight: '5px'}}
                                onClick={() => {
                                    const checkoutDate = new Date();
                                    setDataCheckout(checkoutDate);
                                    atualizarTotais();
                                    handleShow();
                                }}>
                                    Check-Out
                            </Button> : 
                            <Button 
                                type="submit" 
                                className="mb-2" 
                                style={{marginRight: '5px'}}>
                                    Salvar
                            </Button>}
                        <Button 
                            variant="secondary" 
                            className="mb-2" 
                            type="button" 
                            onClick={() => {
                                atualizarTotalConsumos(props.hospedagem);
                                props.onTabela(true);
                            }}>Voltar
                        </Button>
                    </Form>
                </Row>

                <Modal className="font-mts" show={showModal} onHide={handleClose} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Check-Out
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row style={{ marginTop: "-0.5%"}}>
                                <Col xs={12} md={7}>
                                    <Row>
                                        <Col md={6}>
                                            <p>Cliente: {props.modoEdicao ? hospedagem?.hospedagem_cliente?.nome : ""}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p>CPF: {props.modoEdicao ? hospedagem?.hospedagem_cliente?.cpf : ""}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <p>E-mail: {props.modoEdicao ? hospedagem?.hospedagem_cliente?.email : ""}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p>Telefone: {props.modoEdicao ? hospedagem?.hospedagem_cliente?.telefone : ""}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <p>Período: {props.modoEdicao ? ConvertDataBr(hospedagem.checkin) : null} a {ConvertDataBr(dataCheckout)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Quem liberou:</Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={(evento) => {
                                                    const itemSelecionado = evento.currentTarget.value;
                                                    const pos = listaFuncionarios.map((item) => item["id"].toString()).indexOf(itemSelecionado);
                                                    setMsgVisivel(false);
                                                    setFuncionarioSelecionado(pos == -1 ? {} : listaFuncionarios[pos]);
                                                }}>
                                                <option>Selecione...</option>
                                                {listaFuncionarios.map((funcionario) => {
                                                    return <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        {msgVisivel ? <Form.Label style={{ color: 'red' }}>Selecione o funcionário que liberou o quarto.</Form.Label> : null}
                                    </Row>
                                </Col>
                                <Col
                                    className="rounded"
                                    style={{ backgroundColor: '#ddd' }}
                                    xs={6} 
                                    md={5}>
                                        <Row className="mt-1">
                                            <Row>
                                                <Col md={5} style={{ paddingRight: 0 }}>
                                                    <p>Tipo de Quarto:</p>
                                                </Col>
                                                <Col md={7} style={{ paddingLeft: 0 }}>
                                                    <p><strong>{props.modoEdicao ? hospedagem?.hospedagem_quarto?.quarto_tipoquarto?.nome : null}</strong></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5} style={{ paddingRight: 0 }}>
                                                    <p>Qtd. Diárias:</p>
                                                </Col>
                                                <Col md={7} style={{ paddingLeft: 0 }}>
                                                    <p><strong>{totalDiarias}</strong></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5} style={{ paddingRight: 0 }}>
                                                    <p>Vlr. Diárias:</p>
                                                </Col>
                                                <Col md={7} style={{ paddingLeft: 0 }}>
                                                    <p><strong>{ConvertMoney(valorTotalDiarias.toFixed(2))}</strong></p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5} style={{ paddingRight: 0 }}>
                                                    <p>Vlr. Cons./Serviços:</p>
                                                </Col>
                                                <Col md={7} style={{ paddingLeft: 0 }}>
                                                    <p><strong>{ConvertMoney(totalConsumos)}</strong></p>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col md={5} style={{ paddingRight: 0 }}>
                                                    <p>Total Hospedagem:</p>
                                                </Col>
                                                <Col md={7} style={{ paddingLeft: 0 }}>
                                                    <p><strong>{ConvertMoney(totalHospedagem)}</strong></p>
                                                </Col>
                                            </Row>
                                        </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant='secondary' 
                            onClick={() => {
                                setFuncionarioSelecionado({});
                                handleClose();
                            }}>
                                Fechar
                        </Button>
                        <Button
                            variant='primary' 
                            onClick={() => {
                                if (funcionarioSelecionado.id === undefined) {
                                    setMsgVisivel(true);
                                    return
                                }

                                manipularCheckout();
                            }}>
                                Confirmar Check-Out
                        </Button>
                    </Modal.Footer>
                </Modal>
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
            <TelaErro mensagem="Não foi possível gravar a hospedagem.
                                Entre em contato com o administrador do sistema."/>
        );
    }
}