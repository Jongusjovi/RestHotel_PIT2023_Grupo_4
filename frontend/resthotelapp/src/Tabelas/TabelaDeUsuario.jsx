import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import NavbarPesquisa from "../Componentes/NavbarPesquisa";
import { useState } from "react";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaUsuario(props) {
    const [filtro, setFiltro] = useState('')
    const itensFiltrados = props.dados.filter((item) => item.nome.toLowerCase().includes(filtro.toLocaleLowerCase()))

    return (
        <Container className="font-mts" style={{ width: "40%" }}>
            <PageTitle texto={'Cadastro de Usuários'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarUsuario({}, false);
                        props.onTabela(false);
                    }}>Novo Usuário</Button>
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
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Nível</th>
                            <th style={{ textAlign: "center", width: "15%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((usuario) => {
                                return <tr key={usuario.id}>
                                    <td hidden>{usuario.id}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.usuario_nivel.nome}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarUsuario(usuario, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirUsuario(usuario) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para cadastrar os usuários e o nível pertinente a cada função." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}