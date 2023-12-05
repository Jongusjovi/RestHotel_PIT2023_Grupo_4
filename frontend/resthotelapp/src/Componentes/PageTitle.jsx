import Row from 'react-bootstrap/Row';

export default function PageTitle({texto}) {
    return (
        <Row className="mt-3 mb-3  d-flex text-center font-mts">
            <h2>{texto}</h2>
        </Row>
    )
}