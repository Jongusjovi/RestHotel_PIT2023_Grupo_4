import React from 'react';
import Pagina from '../Templates/Pagina';

export default function Ofertas(props) {
    return (
        <Pagina>
            <div className="container text-center mt-5">
                <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-tags me-3 text-secondary"></i>Ofertas do Hotel
                </h6>
                <p>Descubra nossas ofertas especiais que tornarão sua estadia ainda mais memorável.</p>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/premium-psd/hotel-instagram-post-social-media-template_660886-1122.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Oferta 1" />
                            <div className="card-body">
                                <h5 className="card-title">Pacote Luxo</h5>
                                <p className="card-text">Experimente o conforto e luxo supremos com nosso pacote especial.</p>
                                <a href="/cadastroReservaHospedagens" className="btn btn-primary">Reservar Agora</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/premium-psd/hotel-instagram-post-social-media-template_660886-1127.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Oferta 2" />
                            <div className="card-body">
                                <h5 className="card-title">Fim de Semana Relaxante</h5>
                                <p className="card-text">Desfrute de um fim de semana relaxante com tarifas exclusivas.</p>
                                <a href="/cadastroReservaHospedagens" className="btn btn-primary">Reservar Agora</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <img src="https://img.freepik.com/premium-psd/elegant-hotel-instagram-post-social-media-template_660886-887.jpg?size=626&ext=jpg&ga=GA1.1.1769861069.1699578595&semt=ais" className="card-img-top" alt="Oferta 3" />
                            <div className="card-body">
                                <h5 className="card-title">Pacote Lua de Mel</h5>
                                <p className="card-text">Celebre o amor com nosso pacote de lua de mel especial.</p>
                                <a href="/cadastroReservaHospedagens" className="btn btn-primary">Reservar Agora</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagina>
    );
}
