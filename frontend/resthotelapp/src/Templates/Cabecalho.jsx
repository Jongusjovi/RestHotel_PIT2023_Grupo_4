export default function Cabecalho() {
    return (
        <div className="container-fluid text-white d-none d-lg-flex" style={{fontFamily: 'Montserrat', backgroundColor: '#4761FF'}}>
            <div className="container py-3">
                <div className="d-flex align-items-center">
                    <a href="index.html">
                        <h2 className="text-white fw-bold m-0">Rest Hotel</h2>
                    </a>
                    <div className="ms-auto d-flex align-items-center">
                        <small className="ms-4"><i className="fa fa-map-marker-alt me-3"></i>Rod. Raposo Tavares km 572, Pres. Prudente, SP</small>
                        <small className="ms-4"><i className="fa fa-envelope me-3"></i>info@resthotel.com</small>
                        <small className="ms-4"><i className="fa fa-phone-alt me-3"></i> 18 3229-2000</small>
                        <div className="ms-3 d-flex">
                            <a className="btn btn-sm-square btn-light text-primary rounded-circle ms-2" href=""><i
                                    className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-sm-square btn-light text-primary rounded-circle ms-2" href=""><i
                                    className="fab fa-twitter"></i></a>
                            <a className="btn btn-sm-square btn-light text-primary rounded-circle ms-2" href=""><i
                                    className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}