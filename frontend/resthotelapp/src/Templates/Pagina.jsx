import Cabecalho from "./Cabecalho"
import Menu from "./Menu"

export default function Pagina(props) {
    return (
        <div>
            <Cabecalho />
            <div>
                <Menu />
                {props.children}
            </div>
        </div>
    )
}