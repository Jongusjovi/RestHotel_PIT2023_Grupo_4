import { Container, Table, Row, Col } from "react-bootstrap";
import PageTitle from "../Componentes/PageTitle";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { ConvertMoney } from "../utilitarios/funcoes";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function RelatorioConsumos(props) {
    const { token } = useContext(AuthContext)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [produto, setProduto] = useState('')

    const [itensFiltrados, setItensFiltrados] = useState(props.dados)
    const [valorTotalConsumos, setValorTotalConsumos] = useState(0.00)

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const handleProdutoChange = (e) => {
        setProduto(e.target.value)
    }

    function atualizarTotais(dados) {
        setValorTotalConsumos(dados.reduce((total, item) => total + (parseInt(item.quantidade) * parseFloat(item.consumo_proser.preco)), 0))
    }

    function aplicarFiltro(filtro) {
        fetch('http://localhost:3000/consumos/relatorio', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(filtro)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setItensFiltrados(dados)
            atualizarTotais(dados)
        }).catch((erro) => {
            console.log(erro.message)
        });
    }

    function limparFiltro() {
        setStartDate('')
        setEndDate('')
        setProduto('')

        const filtro = {
            "produto": '',
            "periodo": {
                "dataInicio": '',
                "dataFim": ''
            }
        }

        aplicarFiltro(filtro)
    }

    function handleSubmit(e) {
        const filtro = {
            "produto": produto,
            "periodo": {
                "dataInicio": startDate,
                "dataFim": endDate
            }
        }

        aplicarFiltro(filtro)

        e.preventDefault()
        e.stopPropagation()
    }

    useEffect(() => {
        atualizarTotais(itensFiltrados);
    }, []);

    return (
        <Container className="font-mts">
            <PageTitle texto={'Relatório de Reservas'} />
            <Row>
                <Col md={12}>
                    <nav className="navbar bg-body-tertiary row rounded">
                        <div className="container-fluid" style={{ justifyContent: "center" }}>
                            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                                <Col md={2} style={{ marginTop: 6, marginRight: -15 }}>Periodo de:</Col>
                                <Col md={3}>
                                    <input
                                        className="form-control me-2"
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                    ></input>
                                </Col>
                                <Col md={1} style={{ textAlign: "center", marginTop: 6, marginRight: -10, marginLeft: -10 }}>a</Col>
                                <Col md={3} style={{ marginRight: 5 }}>
                                    <input
                                        className="form-control me-2"
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                    ></input>
                                </Col>
                                <Col md={4} style={{ marginRight: 8, marginLeft: 10 }}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Pesquisar por produto..."
                                        aria-label="Search"
                                        value={produto}
                                        onChange={handleProdutoChange}>

                                    </input>
                                </Col>
                                <button
                                    className="btn btn-outline-primary"
                                    style={{ marginRight: "5px" }}
                                    type="submit"
                                >
                                    Filtrar
                                </button>
                                <button
                                    className="btn btn-outline-warning"
                                    type="button"
                                    onClick={limparFiltro}
                                >
                                    Limpar
                                </button>
                            </form>
                        </div>
                    </nav>
                </Col>
            </Row>
            <Row className='mt-2 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Produto</th>
                            <th>Qtde.</th>
                            <th>Preço</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((produto) => {
                                const valorTotal = parseInt(produto.quantidade) * parseFloat(produto.consumo_proser.preco)

                                return <tr key={produto.consumo_proser.id}>
                                    <td hidden>{produto.consumo_proser.id}</td>
                                    <td style={{ width: '70%' }}>{produto.consumo_proser.nome}</td>
                                    <td style={{ width: '10%' }}>{produto.quantidade}</td>
                                    <td style={{ width: '13%' }}>{ConvertMoney(produto.consumo_proser.preco)}</td>
                                    <td style={{ width: '7%' }}>{ConvertMoney(valorTotal)}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Relatório para checagem das reservas, número de hóspedes, quarto e categoria." />
                    </div>
                </Table>
            </Row>
            <Row className="mt-2 p-2 border rounded">
                <Col md={9}><strong>Totais:</strong></Col>
                <Col md={1}><strong>Consumos</strong> </Col>
                <Col md={2} style={{ textAlign: "right" }}>{ConvertMoney(valorTotalConsumos)}</Col>
            </Row>
        </Container>
    );
}