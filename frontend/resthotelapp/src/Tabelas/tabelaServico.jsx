import { Button, Container, Table, Row, Col } from "react-bootstrap";
import PageTitle from "../Componentes/PageTitle";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaServico(props) {
    return (
        <Container className="font-mts" style={{ width: "40%" }}>
            <PageTitle texto={'Cadastro de Serviços'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarServico({}, false);
                        props.onTabela(false);
                    }}>Novo Serviço</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th style={{ width: "15%", textAlign: "right" }}>Preço</th>
                            <th style={{ textAlign: "center", width: "17%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((servico) => {
                                return <tr key={servico.id}>
                                    <td hidden>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td style={{ textAlign: "right" }}>{servico.preco}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2, marginLeft: 10 }} onClick={() => { props.editarServico(servico, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirServico(servico) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar os serviços prestados pelo hotel que serão consumidos pelos hóspedes." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}