import React, { useState } from 'react';
import Pagina from '../Templates/Pagina';

export default function Sobre(props) {
    return(
        <Pagina>
            <div class="container text-center mt-5">
                <h6 class="text-uppercase fw-bold mb-4">
                    <i class="fas fa-gem me-3 text-secondary"></i>Dynamus Softwares
                </h6>
                <p>Gustavo de Lima Oliveira - RA10482120751</p>
                <p>Alexandre Fernandez - RA10482120706</p>
            </div>
        </Pagina>
    )
}