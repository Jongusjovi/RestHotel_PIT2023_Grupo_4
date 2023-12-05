import React from 'react';
import Pagina from '../Templates/Pagina';
import '../styles/styleHome.css';
import Button from 'react-bootstrap/Button';

const imagemRecepcao = 'https://img.freepik.com/free-photo/abstract-blur-defocused-hotel-lobby_74190-6374.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais';

export default function TelaMenu(props) {
    return (
        <Pagina>
            <div className="estilo-fundo text-center" style={{ backgroundImage: `url(${imagemRecepcao})` }}>
                <h1>Bem-vindo ao Nosso Hotel</h1>
                <p>Explore nossas instalações e descubra uma experiência</p>
                <p> única e inesquecível de hospitalidade!</p>
                <div>
                    <Button href="/ofertas" className="mb-2" variant="primary" size="lg">Ver Ofertas </Button>
                    <a> </a>
                    <Button href="/servicos" className="mb-2" variant="primary" size="lg">Serviços </Button>
                    <a> </a>
                    <Button href="/projetos" className="mb-2" variant="primary" size="lg">Projetos </Button>
                </div>
            </div>
        </Pagina>
    );
}