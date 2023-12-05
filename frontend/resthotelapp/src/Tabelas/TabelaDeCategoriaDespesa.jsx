import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import '../styles/Style.css'
import PageTitle from "../Componentes/PageTitle";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaCategoriaDespesa(props) {
    return (
        <Container className="font-mts" style={{ width: "45%" }}>
            <PageTitle texto={'Cadastro de Categorias de Despesas'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarCategoria({}, false);
                        props.onTabela(false);
                    }}>Nova Categoria</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Nome</th>
                            <th style={{ textAlign: "center", width: "15%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((categoria) => {
                                return <tr key={categoria.id}>
                                    <td hidden>{categoria.id}</td>
                                    <td>{categoria.nome}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarCategoria(categoria, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirCategoria(categoria) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar as categorias que serão utilizadas no lançamento das despesas. Insira um novo nome de categoria caso não exista nos dados apresentados abaixo" />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}