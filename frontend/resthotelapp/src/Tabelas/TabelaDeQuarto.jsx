import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { IconeEditar, IconeExcluir } from "../Icones/Icones";
import PageTitle from "../Componentes/PageTitle";
import { useEffect, useRef, useState } from "react";
import PaginacaoTabela from "../Componentes/PaginacaoTabela";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaDeQuarto(props) {
    const nome = useRef("")
    const [filtro, setFiltro] = useState('')
    const itensFiltrados = props.dados.filter((item) => item.quarto_tipoquarto.nome.toLowerCase().includes(filtro.toLowerCase()))

    const [itens, setItens] = useState(props.dados)
    const [itensPerPage, setItensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)

    const pages = Math.ceil(itens.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = itens.slice(startIndex, endIndex)

    function handleSubmit(e) {
        setItens(itens.filter((item) => item.descricao.toLowerCase().includes(nome.current.value.toLowerCase())))

        e.preventDefault()
        e.stopPropagation()
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])

    return (
        <Container className="font-mts" style={{ width: "40%" }}>
            <PageTitle texto={'Cadastro de Quartos'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarQuarto({}, 'POST');
                        props.onTabela(false);
                    }}>Novo Quarto</Button>
                </Col>
                <Col>
                    <nav className="navbar bg-body-tertiary row rounded">
                        <div className="container-fluid" style={{ justifyContent: "right" }}>
                            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Pesquisar por nome..."
                                    aria-label="Search"
                                    ref={nome}
                                    onChange={(e) => {
                                        if (e.target.value === '')
                                            handleSubmit(e)
                                    }}>

                                </input>
                                <button className="btn btn-outline-success" type="submit">Filtrar</button>
                            </form>
                        </div>
                    </nav>
                </Col>
            </Row>
            <Row className='mt-3 p-0'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Numero</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th style={{ textAlign: "center", width: "15%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItens.map((quarto) => {
                                return <tr key={quarto.id}>
                                    <td hidden>{quarto.id}</td>
                                    <td>{quarto.numero}</td>
                                    <td>{quarto.descricao}</td>
                                    <td>{quarto.quarto_tipoquarto.nome}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: 2 }} onClick={() => { props.editarQuarto(quarto, 'PUT') }}>
                                            <IconeEditar />
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => { props.excluirQuarto(quarto) }}>
                                            <IconeExcluir />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Esta tela mostram os quartos cadastrados, podendo alterar, consultar, deletar e criar novos quartos conforme a necessidade." />
                    </div>
                </Table>
            </Row>
            <PaginacaoTabela pages={pages} setCurrentPage={setCurrentPage} />
        </Container>
    )
}