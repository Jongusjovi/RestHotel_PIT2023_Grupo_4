import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';

export default function TelaErro(props) {
    return (
        <Container>
            <div className="text-center mt-3">
                <Alert variant={"danger"}>
                    {props.mensagem}
                </Alert>
            </div>
        </Container>
    );
}