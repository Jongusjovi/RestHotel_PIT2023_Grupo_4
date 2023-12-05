import Pagina from "../Templates/Pagina";
import Spinner from 'react-bootstrap/Spinner';

export default function TelaCarregamento(props) {
    return (
        <Pagina>
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                {  } Em processamento...
            </div>
        </Pagina>
    );
}