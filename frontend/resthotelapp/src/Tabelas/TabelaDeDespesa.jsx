import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import NavbarPesquisa from "../Componentes/NavbarPesquisa";
import { useState } from "react";
import { ConvertData, ConvertDataBr, ConvertDataOnly } from "../utilitarios/funcoes";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaDespesa(props) {
    const [filtro, setFiltro] = useState('')
    const itensFiltrados = props.dados.filter((item) => item.descricao.toLowerCase().includes(filtro.toLocaleLowerCase()))
    const novaDespesa = {
        id: 0,
        descricao: "",
        valor: "",
        vencimento: "",
        pago: 0,
        valor_pago: "",
        descontos: "",
        multa_juros: "",
        pagamento: "",
        categoria_id: "",
        categorias_despesas_despesas: {}
    }


    return (
        <Container className="font-mts">
            <PageTitle texto={'Cadastro de Despesas'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarDespesa(novaDespesa, false);
                        props.onTabela(false);
                    }}>Nova Despesa</Button>
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
                            <th>Descrição</th>
                            <th>Vencimento</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Pago</th>
                            <th style={{ textAlign: "center", width: "9%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((despesa) => {
                                return <tr key={despesa.id}>
                                    <td hidden>{despesa.id}</td>
                                    <td>{despesa.descricao}</td>
                                    <td>{ConvertDataOnly(despesa.vencimento)}</td>
                                    <td>R$ {parseFloat(despesa.valor).toFixed(2)}</td>
                                    <td>{despesa.categorias_despesas_despesas.nome}</td>
                                    <td>{despesa.pago === 1 ? "Sim" : "Não"}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarDespesa(despesa, true) }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirDespesa(despesa) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela serve para visualizar e cadastrar as despesas, além de acompanhar se estão pagas ou não." />
                    </div>
                </Table>
            </Row>
        </Container>
    );
}