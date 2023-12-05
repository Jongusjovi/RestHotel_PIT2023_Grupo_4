import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaNivel(props) {
    return (
        <Container className="font-mts" style={{ width: "45%" }}>
            <PageTitle texto={'Cadastro de Níveis'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarNivel({}, false);
                        props.onTabela(false);
                    }}>Novo Nível</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th style={{ textAlign: "center", width: "15%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((nivel) => {
                                return <tr key={nivel.id}>
                                    <td hidden>{nivel.id}</td>
                                    <td>{nivel.nome}</td>
                                    <td>{nivel.descricao}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarNivel(nivel, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirNivel(nivel) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar nível de acesso." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}