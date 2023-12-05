import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeExcluir, IconeEye } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import { ConvertDataBr } from "../utilitarios/funcoes";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaReserva(props) {
    return (
        <Container className="font-mts">
            <PageTitle texto={'Reservas de Hospedagem'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarReserva({}, false);
                        props.onTabela(false);
                    }}>Nova reserva</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>CPF</th>
                            <th>Nome Completo</th>
                            <th>Telefone</th>
                            <th>Chegada</th>
                            <th>Saída</th>
                            <th>Hóspedes</th>
                            <th>Quarto</th>
                            <th style={{ textAlign: "center", width: "9%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((reserva) => {
                                return <tr key={reserva.id}>
                                    <td hidden>{reserva.id}</td>
                                    <td>{reserva.reservas_clientes.cpf}</td>
                                    <td>{reserva.reservas_clientes.nome}</td>
                                    <td>{reserva.reservas_clientes.telefone}</td>
                                    <td>{ConvertDataBr(reserva.datachegada)}</td>
                                    <td>{ConvertDataBr(reserva.datasaida)}</td>
                                    <td>{reserva.quantidade_hospedes}</td>
                                    <td>{reserva.reservas_quartos.numero}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarReserva(reserva, true) }}>
                                            <IconeEye />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirReserva(reserva) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela mostra as reservas das hospedagens, onde é possível consultar ou deletar as reservas. Insira uma nova reserva preechendo corretamente as informações." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}