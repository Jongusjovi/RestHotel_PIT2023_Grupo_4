import { Container, Table, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import PageTitle from "../Componentes/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { ConvertMoney } from "../utilitarios/funcoes";
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function RelatorioProdutos(props) {
    const { token } = useContext(AuthContext)

    const [emFalta, setEmFalta] = useState(false)
    const [emEstoque, setEmEstoque] = useState(false)
    const [produto, setProduto] = useState('')

    const [itensFiltrados, setItensFiltrados] = useState(props.dados)
    const [valorTotalProdutos, setValorTotalProdutos] = useState(0.00)

    const handleEmFaltaChange = (e) => {
        setEmFalta(e.target.checked)
        setEmEstoque(!e.target.checked)
    }

    const handleEmEstoqueChange = (e) => {
        setEmEstoque(e.target.checked)
        setEmFalta(!e.target.checked)
    }

    const handleProdutoChange = (e) => {
        setProduto(e.target.value)
    }

    function atualizarTotais(dados) {
        setValorTotalProdutos(dados.reduce((total, item) => total + (parseInt(item.quantidade) * parseFloat(item.preco)), 0))
    }

    function aplicarFiltro(filtro) {
        fetch('http://localhost:3000/produtos/relatorio', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(filtro)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setItensFiltrados(dados)
            atualizarTotais(dados)
        }).catch((erro) => {
            console.log(erro.message)
        });
    }

    function limparFiltro() {
        setEmFalta(false)
        setEmEstoque(false)
        setProduto('')

        const filtro = {
            "produto": '',
            "emFalta": false,
            "emEstoque": false
        }

        aplicarFiltro(filtro)
    }

    function handleSubmit(e) {
        const filtro = {
            "produto": produto,
            "emFalta": emFalta,
            "emEstoque": emEstoque
        }

        aplicarFiltro(filtro)

        e.preventDefault()
        e.stopPropagation()
    }

    useEffect(() => {
        atualizarTotais(itensFiltrados);
    }, []);

    return (
        <Container className="font-mts">
            <PageTitle texto={'Relatório de Produtos'} />
            <Row>
                <Col md={12}>
                    <nav className="navbar bg-body-tertiary row rounded">
                        <div className="container-fluid" style={{ justifyContent: "right" }}>
                            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                                <Col md={5}>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} style={{ marginTop: 6 }}>
                                            <Form.Check
                                                inline
                                                label="Em Estoque"
                                                name="group1"
                                                type={type}
                                                checked={emEstoque}
                                                id={`inline-${type}-1`}
                                                onChange={handleEmEstoqueChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Em Falta"
                                                name="group1"
                                                type={type}
                                                checked={emFalta}
                                                id={`inline-${type}-2`}
                                                onChange={handleEmFaltaChange}
                                            />
                                        </div>
                                    ))}
                                </Col>
                                <Col md={4} style={{ marginRight: 8, marginLeft: 10 }}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Pesquisar por produto..."
                                        aria-label="Search"
                                        value={produto}
                                        onChange={handleProdutoChange}>

                                    </input>
                                </Col>
                                <button
                                    className="btn btn-outline-primary"
                                    style={{ marginRight: "5px" }}
                                    type="submit"
                                >
                                    Filtrar
                                </button>
                                <button
                                    className="btn btn-outline-warning"
                                    type="button"
                                    onClick={limparFiltro}
                                >
                                    Limpar
                                </button>
                            </form>
                        </div>
                    </nav>
                </Col>
            </Row>
            <Row className='mt-2 p-2 border rounded'>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th hidden>id</th>
                            <th>Produto</th>
                            <th>Qtde.</th>
                            <th>Preço</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itensFiltrados.map((produto) => {
                                const valorTotal = parseInt(produto.quantidade) * parseFloat(produto.preco)

                                return <tr key={produto.id}>
                                    <td hidden>{produto.id}</td>
                                    <td style={{ width: '70%' }}>{produto.nome}</td>
                                    <td style={{ width: '10%' }}>{produto.quantidade}</td>
                                    <td style={{ width: '13%' }}>{ConvertMoney(produto.preco)}</td>
                                    <td style={{ width: '7%' }}>{ConvertMoney(valorTotal)}</td>
                                </tr>
                            })
                        }
                    </tbody>
                    <div>
                        <AjudaF2 ajudaTexto="Relatório para checagem da quantidade do produto em estoque ou em falta e pesquisa em campo de pesquisa por produto." />
                    </div>

                </Table>
            </Row>
            <Row className="mt-2 p-2 border rounded">
                <Col md={9}><strong>Totais:</strong></Col>
                <Col md={1}><strong>Estoque</strong> </Col>
                <Col md={2} style={{ textAlign: "right" }}>{ConvertMoney(valorTotalProdutos)}</Col>
            </Row>
        </Container>
    );
}