import { Container, Table, Row, Col } from "react-bootstrap";
import PageTitle from "../Componentes/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { NavBarFiltroData } from "../Componentes/NavBarFiltroData";
import { ConvertDataBr } from "../utilitarios/funcoes";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function RelatorioReservas(props) {
    const { token } = useContext(AuthContext)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [itensFiltrados, setItensFiltrados] = useState(props.dados)
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [totalHospedes, setTotalHospedes] = useState(0)

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    function atualizarTotais(dados) {
        setTotalRegistros(dados.length)
        setTotalHospedes(dados.reduce((total, item) => total + (item.quantidade_hospedes === null ? 0 : parseInt(item.quantidade_hospedes)), 0))
    }

    function aplicarFiltro(filtro) {
        fetch('http://localhost:3000/reservas/relatorio', {
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
                            <th>Telefone</th>
                            <th>Chegada</th>
                            <th>Saída</th>
                            <th>Hóspedes</th>
                            <th>Quarto</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((reserva) => {
                                return <tr key={reserva.id}>
                                    <td hidden>{reserva.id}</td>
                                    <td>{reserva.reservas_clientes.nome}</td>
                                    <td>{reserva.reservas_clientes.cpf}</td>
                                    <td>{reserva.reservas_clientes.telefone}</td>
                                    <td>{ConvertDataBr(reserva.datachegada)}</td>
                                    <td>{ConvertDataBr(reserva.datasaida)}</td>
                                    <td>{reserva.quantidade_hospedes}</td>
                                    <td>{reserva.reservas_quartos.numero}</td>
                                    <td>{reserva.reservas_quartos.quarto_tipoquarto.nome}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Relatório para checagem das reservas, sendo possível filtrar por período início e fim e campo de pesquisa por produto." />
                    </div>
                </Table>
            </Row>
            <Row className="mt-2 p-2 border rounded">
                <Col md={4}><strong>Totais:</strong></Col>
                <Col md={1}><strong>Registros</strong> </Col>
                <Col md={1} style={{ textAlign: "right" }}>{totalRegistros}</Col>
                <Col md={1}><strong>Hospedes</strong> </Col>
                <Col md={2} style={{ textAlign: "right" }}>{totalHospedes}</Col>
            </Row>
        </Container>
    );
}