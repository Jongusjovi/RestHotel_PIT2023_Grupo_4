import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import STATUS from "../utilitarios/util";
import { ConvertDataBr } from "../utilitarios/funcoes";
import PageTitle from "../Componentes/PageTitle";
import Modal from 'react-bootstrap/Modal'
import { toast } from "react-toastify";
import { AuthContext } from '../contexts/authContext'
import AjudaF2 from "../Componentes/ModalHelpF2";

export default function TabelaDeHospedagem(props) {
    const { token } = useContext(AuthContext)
    const localRecursos = 'http://localhost:3000/hospedagens';
    const [listaHospedagens, setListaHospedagens] = useState([]);
    const [objHospedagem, setObjHospedagem] = useState({})
    const [exibirModal, setExibirModal] = useState(false)
    const [msgModal, setMsgModal] = useState('')

    const handleClose = () => {
        setExibirModal(false)
    }

    function liberarLimpeza(obj) {
        fetch('http://localhost:3000/hospedagens/removerlimpeza', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            toast.success(dados.mensagem);
            buscarHospedagem();
            props.onTabela(true);
        }).catch((erro) => {
            props.setStatus(STATUS.erro);
        });
    }

    function buscarHospedagem() {
        fetch(localRecursos, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.token}`
            }
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaHospedagens(dados);
                props.onStatus(STATUS.sucesso);
            }).catch((erro) => {
                props.onStatus(STATUS.erro);
            });
    }

    function gerarCards() {
        const listaItens = []

        for (const hospedagem of listaHospedagens) {
            if (hospedagem.hospedagem_quarto.estado === 1 && hospedagem.ativo === 1) {
                listaItens.push(
                    <Col key={hospedagem.id}>
                        <Card border="danger" style={{ width: '18rem', height: "100%" }} onClick={() => { props.editarHospedagem(hospedagem, true) }}>
                            <Card.Header style={{ height: "65px", backgroundColor: "#FF4500", color: "white" }}>Apto. {hospedagem.hospedagem_quarto.numero} - {hospedagem.hospedagem_quarto.quarto_tipoquarto.nome}</Card.Header>
                            <Card.Body>
                                <Card.Title>{hospedagem.hospedagem_cliente.nome}</Card.Title>
                                <Card.Text>
                                    Check-In: {ConvertDataBr(hospedagem.checkin)} <br />
                                    Total Consumo: R$ {hospedagem.total_consumo > 0 ? hospedagem.total_consumo : '0,00'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }
            else if (hospedagem.hospedagem_quarto.estado === 2 && hospedagem.limpeza === 1) {
                listaItens.push(
                    <Col key={hospedagem.id}>
                        <Card border="warning" style={{ width: '18rem', height: "100%" }}>
                            <Card.Header style={{ height: "65px", backgroundColor: "#FFFF00" }}>Apto. {hospedagem.hospedagem_quarto.numero} - {hospedagem.hospedagem_quarto.quarto_tipoquarto.nome}</Card.Header>
                            <Card.Body>
                                <Card.Title>Em limpeza</Card.Title>
                                <Card.Text>
                                    Check-Out: {ConvertDataBr(hospedagem.checkout)}
                                </Card.Text>
                                <Button variant='primary' onClick={() => {
                                    setMsgModal(hospedagem.hospedagem_quarto.numero);
                                    setObjHospedagem({
                                        "hospedagem_id": hospedagem.id,
                                        "quarto_id": hospedagem.hospedagem_quarto.id,
                                        "estado": 0
                                    });
                                    setExibirModal(true);
                                }}>Liberar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }
        }

        return listaItens
    }

    useEffect(() => {
        buscarHospedagem();
    }, []);

    return (
        <Container className="font-mts">
            <PageTitle texto={'Hospedagens'} />
            <Row>
                <Col>
                    <Button onClick={() => {
                        props.editarHospedagem({}, false);
                        props.onTabela(false);
                    }}>Nova Hospedagem</Button>
                </Col>
            </Row>
            <br />
            <Row xs={1} md={4} className="g-4">
                {listaHospedagens !== null && gerarCards()}
            </Row>
            <Modal className="font-mts" show={exibirModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Liberar apartamento da limpeza!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirma liberar o apartamento {msgModal} da limpeza?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Não</Button>
                    <Button variant='primary' onClick={() => {
                        liberarLimpeza(objHospedagem);
                        handleClose();
                    }}>Sim</Button>
                </Modal.Footer>
                <div>
                    <AjudaF2 ajudaTexto="Esta tela da hospedagem serve para consultar as hospedagens ativas, inserir os consumos em cada hospedagem, fazer checkout do hóspede e liberar o quarto da limpeza para ser novamente ocupado. Insira uma nova hospedagem caso não tenha realizado exista nos dados apresentados abaixo." />
                </div>
            </Modal>
        </Container>
    );
}