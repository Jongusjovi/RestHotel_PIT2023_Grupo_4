import { Container, Table, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PageTitle from "../Componentes/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { ConvertDataBr, ConvertDataOnly, ConvertMoney } from "../utilitarios/funcoes";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function RelatorioDespesas(props) {
    const { token } = useContext(AuthContext)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [emAberto, setEmAberto] = useState(false)
    const [pago, setPago] = useState(false)

    const [itensFiltrados, setItensFiltrados] = useState(props.dados)
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [valorTotalPago, setValorTotalPago] = useState(0.00)
    const [valorTotalAPagar, setValorTotalAPagar] = useState(0.00)

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const handleEmAbertoChange = (e) => {
        setEmAberto(e.target.checked)
        setPago(!e.target.checked)
    }

    const handlePagoChange = (e) => {
        setPago(e.target.checked)
        setEmAberto(!e.target.checked)
    }

    function atualizarTotais(dados) {
        setTotalRegistros(dados.length)
        setValorTotalPago(dados.filter(x => x.pago === 1).reduce((total, item) => total + ((parseFloat(item.valor_pago) + parseFloat(item.multa_juros === null ? 0.00 : item.multa_juros)) - parseFloat(item.descontos === null ? 0.00 : item.descontos)), 0))
        setValorTotalAPagar(dados.filter(x => x.pago === 0).reduce((total, item) => total + parseFloat(item.valor), 0))
    }

    function aplicarFiltro(filtro) {
        fetch('http://localhost:3000/despesas/relatorio', {
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
        setEmAberto(false)
        setPago(false)

        const filtro = {
            "emAberto": '',
            "periodo": {
                "dataInicio": '',
                "dataFim": ''
            }
        }

        aplicarFiltro(filtro)
    }

    function handleSubmit(e) {
        const filtro = {
            "emAberto": !emAberto && !pago ? '' : emAberto,
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
            <PageTitle texto={'Relatório de Contas a Pagar'} />
            <Row>
                <Col md={12}>
                    <nav className="navbar bg-body-tertiary row rounded">
                        <div className="container-fluid" style={{ justifyContent: "center" }}>
                            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                                <Col md={4}>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} style={{ marginTop: 6 }}>
                                            <Form.Check
                                                inline
                                                label="Em Aberto"
                                                name="group1"
                                                type={type}
                                                checked={emAberto}
                                                id={`inline-${type}-1`}
                                                onChange={handleEmAbertoChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Pago"
                                                name="group1"
                                                type={type}
                                                checked={pago}
                                                id={`inline-${type}-2`}
                                                onChange={handlePagoChange}
                                            />
                                        </div>
                                    ))}
                                </Col>
                                <Col md={2} style={{ marginTop: 6, marginRight: -10 }}>Vencimento de:</Col>
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
                                <Col md={3} style={{ marginRight: 15 }}>
                                    <input
                                        className="form-control me-2"
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                    ></input>
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
                            <th>Despesa</th>
                            <th>Vencimento</th>
                            <th>Valor</th>
                            <th>Pagamento</th>
                            <th>Vlr. Pagto.</th>
                            <th>Descontos</th>
                            <th>Multa/Juros</th>
                            <th>Total Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((despesa) => {
                                const valorTotal = (parseFloat(despesa.valor_pago) + parseFloat(despesa.multa_juros === null ? 0.00 : despesa.multa_juros)) - parseFloat(despesa.descontos === null ? 0.00 : despesa.descontos)

                                return <tr key={despesa.id}>
                                    <td hidden>{despesa.id}</td>
                                    <td>{despesa.descricao}</td>
                                    <td>{ConvertDataOnly(despesa.vencimento)}</td>
                                    <td>{ConvertMoney(despesa.valor)}</td>
                                    <td>{ConvertDataOnly(despesa.pagamento)}</td>
                                    <td>{ConvertMoney(despesa.valor_pago)}</td>
                                    <td>{ConvertMoney(despesa.descontos)}</td>
                                    <td>{ConvertMoney(despesa.multa_juros)}</td>
                                    <td>{ConvertMoney(valorTotal)}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Relatório para checagem das despesas em aberto e pago, além de ser possível filtrar por período início e fim." />
                    </div>

                </Table>
            </Row>
            <Row className="mt-2 p-2 border rounded">
                <Col md={6}><strong>Totais:</strong></Col>
                <Col md={1}><strong>Pago</strong> </Col>
                <Col md={2} style={{ textAlign: "right" }}>{ConvertMoney(valorTotalPago)}</Col>
                <Col md={1}><strong>A Pagar</strong> </Col>
                <Col md={2} style={{ textAlign: "right" }}>{ConvertMoney(valorTotalAPagar)}</Col>
            </Row>
        </Container>
    );
}