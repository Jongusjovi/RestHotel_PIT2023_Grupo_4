import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaTiposDeQuarto(props) {
    return (
        <Container className="font-mts" style={{ width: "50%" }}>
            <PageTitle texto={'Cadastro de Tipos de Quarto'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarTipoQuarto({}, false);
                        props.onTabela(false);
                    }}>Novo Tipo de Quarto</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th style={{ width: "15%", textAlign: "right" }}>Vlr. Diária</th>
                            <th style={{ textAlign: "center", width: "15%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((tipoquarto) => {
                                return <tr key={tipoquarto.idtipoquarto}>
                                    <td hidden>{tipoquarto.idtipoquarto}</td>
                                    <td>{tipoquarto.nome}</td>
                                    <td>{tipoquarto.descricao}</td>
                                    <td style={{ textAlign: "right" }}>{tipoquarto.valor_diaria}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarTipoQuarto(tipoquarto, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirTipoQuarto(tipoquarto) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar as categorias que serão utilizadas no lançamento das despesas. Insira um novo nome de categoria caso não exista nos dados apresentados abaixo." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}