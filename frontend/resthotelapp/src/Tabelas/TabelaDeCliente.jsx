import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import NavbarPesquisa from "../Componentes/NavbarPesquisa";
import { useState } from "react";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaCliente(props) {
    const [filtro, setFiltro] = useState('')
    const itensFiltrados = props.dados.filter((item) => item.nome.toLowerCase().includes(filtro.toLocaleLowerCase()))

    return (
        <Container className="font-mts">
            <PageTitle texto={'Cadastro de Clientes'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarCliente({}, false);
                        props.onTabela(false);
                    }}>Novo Cliente</Button>
                </Col>
                <Col>
                    <NavbarPesquisa onFiltro={setFiltro} />
                </Col>
            </Row>
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th style={{ textAlign: "center", width: "9%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((cliente) => {
                                return <tr key={cliente.idcliente}>
                                    <td hidden>{cliente.idcliente}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarCliente(cliente, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirCliente(cliente) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar novos hóspedes, podendo consultar os cadastros existentes, atualizar as informações ou mesmo deletar um cadastro." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}