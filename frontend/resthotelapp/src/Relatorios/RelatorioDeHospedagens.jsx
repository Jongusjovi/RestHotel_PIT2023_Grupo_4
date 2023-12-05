import { Container, Table, Row, Col } from "react-bootstrap";
import PageTitle from "../Componentes/PageTitle";
import { useContext, useEffect, useState } from "react";
import { ConvertDataBr, ConvertMoney } from "../utilitarios/funcoes";
import { AuthContext } from "../contexts/authContext";
import { NavBarFiltroData } from "../Componentes/NavBarFiltroData";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function RelatorioHospedagens(props) {
    const { token } = useContext(AuthContext)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [itensFiltrados, setItensFiltrados] = useState(props.dados)
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [totalHospedagens, setTotalHospedagens] = useState(0.00)
    const [totalConsumos, setTotalConsumos] = useState(0.00)

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    function atualizarTotais(dados) {
        setTotalRegistros(dados.length)
        setTotalHospedagens(dados.reduce((total, item) => total + (item.valor_total === null ? 0.00 : parseFloat(item.valor_total)), 0))
        setTotalConsumos(dados.reduce((total, item) => total + (item.total_consumo === null ? 0.00 : parseFloat(item.total_consumo)), 0))
    }

    function aplicarFiltro(filtro) {
        fetch('http://localhost:3000/hospedagens/relatorio', {
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
            setTotalRegistros(dados.length)

        }).catch((erro) => {
            console.log(erro.message)
        });
    }

    function limparFiltro() {
        setStartDate('')
        setEndDate('')

        const filtro = {
            "dataInicio": '',
            "dataFim": ''
        }

        aplicarFiltro(filtro)
    }

    function handleSubmit(e) {
        const filtro = {
            "dataInicio": startDate,
            "dataFim": endDate
        }

        if (startDate != '' && endDate != '') {
            aplicarFiltro(filtro)
        }

        e.preventDefault()
        e.stopPropagation()
    }

    useEffect(() => {
        atualizarTotais(itensFiltrados);
    }, []);

    return (
        <Container className="font-mts">
            <PageTitle texto={'Relatório de Hospedagens'} />
            <Row>
                <Col md={12}>
                    <NavBarFiltroData
                        startDate={startDate}
                        endDate={endDate}
                        handleStartDateChange={handleStartDateChange}
                        handleEndDateChange={handleEndDateChange}
                        handleSubmit={handleSubmit}
                        limparFiltro={limparFiltro}
                    />
                </Col>
            </Row>
            <Row className='mt-2 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Cliente</th>
                            <th>CPF</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th style={{ textAlign: "center" }}>Total Consumo</th>
                            <th style={{ textAlign: "center" }}>Total Hospedagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((hospedagem) => {
                                return <tr key={hospedagem.id}>
                                    <td hidden>{hospedagem.id}</td>
                                    <td>{hospedagem.hospedagem_cliente.nome}</td>
                                    <td>{hospedagem.hospedagem_cliente.cpf}</td>
                                    <td>{ConvertDataBr(hospedagem.checkin)}</td>
                                    <td>{ConvertDataBr(hospedagem.checkout)}</td>
                                    <td style={{ textAlign: "right" }}>{ConvertMoney(hospedagem.total_consumo === null ? 0.00 : hospedagem.total_consumo)}</td>
                                    <td style={{ textAlign: "right" }}>{ConvertMoney(hospedagem.valor_total === null ? 0.00 : hospedagem.valor_total)}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Relatório para checagem das reservas, sendo possível filtrar por período início e fim." />
                    </div>

                </Table>
            </Row>
            <Row className="mt-2 p-2 border rounded">
                <Col md={4}><strong>Totais:</strong></Col>
                <Col md={1}><strong>Registros</strong> </Col>
                <Col md={1} style={{ textAlign: "right" }}>{totalRegistros}</Col>
                <Col md={1}><strong>Consumos</strong> </Col>
                <Col md={2} style={{ textAlign: "right" }}>{ConvertMoney(totalConsumos)}</Col>
                <Col md={1}><strong>Hospedagens</strong></Col>
                <Col md={2} style={{ textAlign: "right" }}>{ConvertMoney(totalHospedagens)}</Col>
            </Row>
        </Container>
    );
}