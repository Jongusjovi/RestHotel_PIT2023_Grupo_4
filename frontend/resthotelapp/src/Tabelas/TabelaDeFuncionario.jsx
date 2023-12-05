import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import NavbarPesquisa from "../Componentes/NavbarPesquisa";
import { useState } from "react";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaFuncionario(props) {
    const [filtro, setFiltro] = useState('')
    const itensFiltrados = props.dados.filter((item) => item.nome.toLowerCase().includes(filtro.toLocaleLowerCase()))

    return (
        <Container className="font-mts">
            <PageTitle texto={'Cadastro de Funcionários'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarFuncionario({}, false);
                        props.onTabela(false);
                    }}>Novo Funcionário</Button>
                </Col>
                <Col>
                    <NavbarPesquisa onFiltro={setFiltro} />
                </Col>
            </Row>
            <Row className='mt-2 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Função</th>
                            <th style={{ textAlign: "center", width: "9%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((funcionario) => {
                                return <tr key={funcionario.id}>
                                    <td hidden>{funcionario.id}</td>
                                    <td>{funcionario.cpf}</td>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.telefone}</td>
                                    <td>{funcionario.email}</td>
                                    <td>{funcionario.funcionario_funcao.nome}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarFuncionario(funcionario, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirFuncionario(funcionario) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar os funcionários com os devidos dados e atrelando à função exercida." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}