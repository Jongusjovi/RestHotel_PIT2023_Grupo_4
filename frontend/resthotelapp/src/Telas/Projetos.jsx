import React from 'react';
import Pagina from '../Templates/Pagina';

export default function Projetos(props) {
    return (
        <Pagina>
            <div className="container text-center mt-5">
                <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-hotel me-3 text-secondary"></i>Projetos do Hotel
                </h6>
                <p>Bem-vindo à seção de Projetos do nosso hotel. Aqui estão algumas das nossas iniciativas para aprimorar sua experiência.</p>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/premium-photo/comparison-apartment-before-after-renovation-small-details-contemporary-interior-design_10069-8283.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Projeto 1" />
                            <div className="card-body">
                                <h5 className="card-title">Renovação dos Quartos</h5>
                                <p className="card-text">Atualização e modernização dos quartos para proporcionar mais conforto e estilo aos nossos hóspedes.</p>
                                <a href="#" className="btn btn-primary">Saiba mais</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/premium-photo/spanish-real-estate-mediterranean-seashore_182029-406.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Projeto 2" />
                            <div className="card-body">
                                <h5 className="card-title">Área de Piscina Renovada</h5>
                                <p className="card-text">Melhoria na área da piscina com novas instalações, áreas de descanso e serviços exclusivos para os hóspedes.</p>
                                <a href="#" className="btn btn-primary">Saiba mais</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/premium-photo/closeup-group-architects-developing-new-environmental-project-with-windmills-table_236854-42784.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Projeto 3" />
                            <div className="card-body">
                                <h5 className="card-title">Sustentabilidade Ambiental</h5>
                                <p className="card-text">Compromisso com a sustentabilidade através da implementação de práticas ecológicas e iniciativas de conservação.</p>
                                <a href="#" className="btn btn-primary">Saiba mais</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagina>
    );
}