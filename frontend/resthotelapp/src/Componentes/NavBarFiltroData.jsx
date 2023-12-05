import { Col } from "react-bootstrap";
import React from "react";

export function NavBarFiltroData({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleSubmit,
  limparFiltro
}) {
  return (
    <nav className="navbar bg-body-tertiary row rounded">
      <div className="container-fluid" style={{ justifyContent: "right" }}>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <Col md={2} style={{ marginTop: 6 }}>Periodo de:</Col>
          <Col md={3}>
            <input
              className="form-control me-2"
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            ></input>
          </Col>
          <Col md={1} style={{ textAlign: "center", marginTop: 6 }}>a</Col>
          <Col md={3} style={{ marginRight: 5 }}>
            <input
              className="form-control me-2"
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            ></input>
          </Col>
          <button
            className="btn btn-outline-primary"
            style={{ marginRight: "5px" }}
            type="submit"
          >
            Filtrar
          </button>
          <button
            className="btn btn-outline-warning"
            type="button"
            onClick={limparFiltro}
          >
            Limpar
          </button>
        </form>
      </div>
    </nav>
  );
}
