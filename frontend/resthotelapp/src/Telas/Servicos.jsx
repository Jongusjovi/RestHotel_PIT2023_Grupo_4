import React from 'react';
import Pagina from '../Templates/Pagina';

export default function Servicos(props) {
    return (
        <Pagina>
            <div className="container text-center mt-5">
                <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-concierge-bell me-3 text-secondary"></i>Serviços do Hotel
                </h6>
                <p>Bem-vindo à nossa seção de Serviços. Aqui, você encontrará uma lista abrangente dos serviços que oferecemos para tornar sua estadia conosco ainda mais agradável.</p>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/free-photo/receptionists-elegant-suits-during-work-hours_23-2149714443.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=sph" className="card-img-top" alt="Serviço de Concierge" />
                            <div className="card-body">
                                <h5 className="card-title">Serviço de Concierge</h5>
                                <p className="card-text">Nosso serviço de concierge está disponível 24 horas por dia para ajudar com reservas, informações turísticas e outras necessidades.</p>
                                <a href="#" className="btn btn-primary">Saiba mais</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Restaurante Exclusivo" />
                            <div className="card-body">
                                <h5 className="card-title">Restaurante Exclusivo</h5>
                                <p className="card-text">Desfrute de refeições excepcionais em nosso restaurante exclusivo, com uma variedade de pratos preparados pelos melhores chefs.</p>
                                <a href="#" className="btn btn-primary">Saiba mais</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/free-photo/massage-therapist-spa_53876-41075.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Serviço de Spa" />
                            <div className="card-body">
                                <h5 className="card-title">Serviço de Spa</h5>
                                <p className="card-text">Relaxe e rejuvenesça com nossos tratamentos de spa de classe mundial, incluindo massagens, tratamentos faciais e muito mais.</p>
                                <a href="#" className="btn btn-primary">Saiba mais</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagina>
    );
}