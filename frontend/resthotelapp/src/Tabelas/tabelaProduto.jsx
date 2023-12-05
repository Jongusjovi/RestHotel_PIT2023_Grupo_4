import { Button, Container, Table, Row, Col } from "react-bootstrap";
import PageTitle from "../Componentes/PageTitle";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaProduto(props) {
    return (
        <Container className="font-mts" style={{ width: "40%" }}>
            <PageTitle texto={'Cadastro de Produtos'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarProduto({}, false);
                        props.onTabela(false);
                    }}>Novo Produto</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th style={{ width: "15%", textAlign: "right" }}>Preço</th>
                            <th style={{ width: "10%", textAlign: "right" }}>Qtde.</th>
                            <th style={{ textAlign: "center", width: "17%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((produto) => {
                                return <tr key={produto.id}>
                                    <td hidden>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td style={{ textAlign: "right" }}>{produto.preco}</td>
                                    <td style={{ textAlign: "right" }}>{produto.quantidade}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2, marginLeft: 10 }} onClick={() => { props.editarProduto(produto, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirProduto(produto) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar os produtos que serão utilizadas no consumo dos hóspedes. Insira um novo produto caso não exista nos dados apresentados abaixo." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}