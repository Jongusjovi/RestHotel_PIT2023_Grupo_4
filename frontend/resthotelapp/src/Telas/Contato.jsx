import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Pagina from "../Templates/Pagina";

export default function Contato() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Pagina>
            <div class="col-md-4 col-lg-3 col-xl-2 mx-auto mb-md-0 mb-4 mt-5 font-mts">
                <h6 class="text-uppercase fw-bold mb-4">Contato</h6>
                <i class="fas fa-home me-3 text-secondary"></i>
                <p>
                    Rod. Raposo Tavares, km 572 - Limoneiro <br />
                    Presidente Prudente, SP 19067-175<br />
                </p>
                <p><i class="fas fa-envelope me-3 text-secondary"></i>unoeste@unoeste.br</p>
                <p><i class="fas fa-phone me-3 text-secondary"></i> (18) 3229-2000</p>

                <Button variant="primary" onClick={handleShow}>Entre em contato com o suporte!</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Portal de Ajuda</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Usuário</Form.Label>
                                <Form.Control
                                    type="usuario"
                                    placeholder="usuario@123"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descreva a ocorrência</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Descreva um breve resumo para auxiliar no seu atendimento..." />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Voltar</Button>
                        <Button variant="primary" onClick={handleClose}>Abrir chamado</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Pagina>
    )
}