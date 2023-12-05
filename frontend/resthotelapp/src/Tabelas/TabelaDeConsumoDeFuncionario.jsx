import { Button, Container, Table, Row } from "react-bootstrap";
import { IconeEditar } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import NavbarPesquisa from "../Componentes/NavbarPesquisa";
import { useState } from "react";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaConsumoFuncionario(props) {
    const [filtro, setFiltro] = useState('')
    const itensFiltrados = props.dados.filter((item) => item.nome.toLowerCase().includes(filtro.toLocaleLowerCase()))

    return (
        <Container className="font-mts" style={{ width: "40%" }}>
            <PageTitle texto={'Cadastro de Consumos de Funcionários'} />
            <NavbarPesquisa onFiltro={setFiltro} />
            <Row className='mt-3 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Nome</th>
                            <th>Função</th>
                            <th style={{ textAlign: "center", width: "7%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((funcionario) => {
                                return <tr key={funcionario.id}>
                                    <td hidden>{funcionario.id}</td>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.funcionario_funcao.nome}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-warning" style={{ marginRight: 2 }} onClick={() => { props.editarFuncionario(funcionario, true) }}>
                                            <IconeEditar />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para registrar os consumos dos funcionários." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}