import React from "react";

export default function PaginacaoTabela(props) {
    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                {Array.from(Array(props.pages), (item, index) => {
                    return <li className="page-item"><button className="page-link" value={index} onClick={(e) => props.setCurrentPage(Number(e.target.value))}>{index + 1}</button></li>
                })}
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    )
}