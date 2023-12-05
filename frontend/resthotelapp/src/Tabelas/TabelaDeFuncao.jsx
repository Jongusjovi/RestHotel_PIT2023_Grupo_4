import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import '../styles/Style.css'
import PageTitle from "../Componentes/PageTitle";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaFuncao(props) {
    return (
        <Container className="font-mts" style={{ width: "45%" }}>
            <PageTitle texto={'Cadastro de Funções'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarFuncao({}, false);
                        props.onTabela(false);
                    }}>Nova Função</Button>
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
                            props.dados.map((funcao) => {
                                return <tr key={funcao.id}>
                                    <td hidden>{funcao.idfuncao}</td>
                                    <td>{funcao.nome}</td>
                                    <td>{funcao.descricao}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarFuncao(funcao, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirFuncao(funcao) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar as funções dos funcionários no sistema." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}