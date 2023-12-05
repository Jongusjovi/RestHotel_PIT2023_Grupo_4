import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function AjudaF2({ ajudaTexto }) {
    const [showModal, setShowModal] = useState(false);

    const handleF2KeyPress = (event) => {
        if (event.key === "F2") {
            setShowModal(true);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleF2KeyPress);
        return () => {
            window.removeEventListener("keydown", handleF2KeyPress);
        };
    }, []);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title> Precisando de ajuda ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ajudaTexto}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}