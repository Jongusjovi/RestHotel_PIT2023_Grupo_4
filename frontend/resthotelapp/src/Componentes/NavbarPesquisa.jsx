import { useRef } from "react"

export default function NavbarPesquisa(props) {
    const nome = useRef("")

    function handleSubmit(e) {
        props.onFiltro(nome.current.value)

        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <nav className="navbar bg-body-tertiary row rounded">
            <div className="container-fluid" style={{ justifyContent: "right"}}>
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Pesquisar por nome..." 
                        aria-label="Search" 
                        ref={nome}
                        onChange={(e) => {
                            if (e.target.value === '') 
                                handleSubmit(e)
                        }}>
                        
                    </input>
                    <button className="btn btn-outline-success" type="submit">Filtrar</button>
                </form>
            </div>
        </nav>
    )
}