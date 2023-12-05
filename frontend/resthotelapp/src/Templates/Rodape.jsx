import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Rodape(){
    return(
        <div className="container-fluid copyright py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="fw-medium text-light" href="#">Rest Hotel</a>, All Right Reserved.
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        {/* This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. */}
                        Designed By <a className="fw-medium text-light" href="https://htmlcodex.com">HTML Codex</a>
                        {" "}Distributed By <a className="fw-medium text-light" href="https://themewagon.com">ThemeWagon</a>
                    </div>
                </div>
            </div>
        </div>
    );
}