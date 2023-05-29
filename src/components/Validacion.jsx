import React, { useState } from "react";
import OpcionesValidaciones from "./OpcionesValidacion";
import { gestorLlamada } from "../data/classes";

export const Validacion = ({ validacion, index, respuestas }) => {
  const [validado, isValidado] = useState(null);

  const tomarRespuesta = () => {
    isValidado(null);

    setTimeout(() => {
      if (gestorLlamada._validacionesCorrectas[index]) {
        isValidado(true);
      } else {
        isValidado(false);
      }
    }, 200); // Esperar 200 milisegundos (0.2 segundos)
  };

  return (
    <div key={index} className="validacion-item">
      <div>
        <label>Pregunta :</label>
        <p>{validacion.nombre}</p>
        <OpcionesValidaciones options={respuestas[index]} id={index} />
        {validado === true ? (
          <span className="validado">Cliente validado!</span>
        ) : null}
        {validado === false ? (
          <span className="rechazado">Cliente no validado</span>
        ) : null}
      </div>
      <button type="button" onClick={() => tomarRespuesta()}>
        Corroborar
      </button>
    </div>
  );
};
