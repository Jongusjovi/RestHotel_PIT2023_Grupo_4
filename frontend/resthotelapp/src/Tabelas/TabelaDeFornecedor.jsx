import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaFornecedor(props) {
    return (
        <Container className="font-mts">
            <PageTitle texto={'Cadastro de Fornecedores'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarFornecedor({}, false);
                        props.onTabela(false);
                    }}>Novo Fornecedor</Button>
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>CNPJ</th>
                            <th>Razão Social</th>
                            <th>Nome Fantasia</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th style={{ textAlign: "center", width: "9%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dados.map((fornecedor) => {
                                return <tr key={fornecedor.id}>
                                    <td hidden>{fornecedor.id}</td>
                                    <td>{fornecedor.cnpj}</td>
                                    <td>{fornecedor.razaosocial}</td>
                                    <td>{fornecedor.nomefantasia}</td>
                                    <td>{fornecedor.telefone}</td>
                                    <td>{fornecedor.email}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarFornecedor(fornecedor, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirFornecedor(fornecedor) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar os fornecedores. Insira um novo nome de fornecedor caso não exista nos dados apresentados abaixo." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}