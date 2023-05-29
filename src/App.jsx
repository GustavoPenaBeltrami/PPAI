import React, { useEffect, useState } from "react";
import "./styles.css";
import Swal from "sweetalert2";

import {
  gestorLlamada,
  estados,
  llamadaIdentificada,
  categorias,
  acciones
} from "./data/classes";
import { Validacion } from "./components/Validacion";
import { Acciones } from "./components/Acciones";


export const App = () => {
  const [operador, isOperador] = useState(false);
  const [descOp, setDescOp] = useState("");
  const [accionesSeleccionable, setAccionesSeleccionables] = useState([]);
  const [ejecutado, isEjecutado] = useState(null);

  const handleDescOp = (event) => {
    const nuevoContenido = event.target.value;
    setDescOp(nuevoContenido);
  };
  //dispara tomarDescripcion cuando se deja de hacer foco al textarea
  const handleBlur = () => {
    gestorLlamada.tomarDescripcion(descOp);
    if (descOp.length > 0){
      gestorLlamada.obtenerAccionesARealizar(acciones)
      let array = [];
      for (const accion of acciones) {
        array.push(accion._descripcion)
      }
      setAccionesSeleccionables(array)
    }
  };

  const confirmarAccion = () => {
    gestorLlamada.tomarConfirmacion();
    isEjecutado(null)
    setTimeout(() => {
      if(gestorLlamada._accionSeleccionada){
        isEjecutado(true);
      }else{
        isEjecutado(false);
      }
    }, 200); // Esperar 200 milisegundos (0.2 segundos)
  }

  //obtiene las posibles respuestas del de las validaciones obtenidas desde la memoria interna del gestor
  const respuestas = [];
  if (gestorLlamada.validaciones) {
    gestorLlamada.validaciones.forEach((validacion) => {
      const respuestasValidacion = validacion.opcionValidacion.map(
        (opcion) => opcion.nombre
      );
      respuestas.push(respuestasValidacion);
    });
  }

  //Cancela la llamada
  const frontCancelarLlamada = (event) => {
    event.preventDefault();
    gestorLlamada.llamadaColgada();
    console.log(gestorLlamada.llamada)
    Swal.fire({
      icon: "error",
      title: "Llamada cancelada",
      text: "Dirigiendose al menu principal",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      isOperador(false);
    });
  };

  //Finaliza la llamada
  const frontFinalizarLlamada = (event) => {
    event.preventDefault();
    gestorLlamada.finalizarLlamada();
    setDescOp("");
    gestorLlamada.setearInfo();
    Swal.fire({
      icon: "success",
      title: "Llamada Finalizada",
      text: "Dirigiendose al menu principal",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      isOperador(false);
    });
  };

  //Busca la llamada simulando que proviene de otro caso de uso y establece los datos del gestor
  const frontComunicarseOperador = () => {
    gestorLlamada.llamada = llamadaIdentificada;
    gestorLlamada.llamarCURegistrarLlamada(estados);
    gestorLlamada.obtenerDatosDeLlamada(categorias);
    isOperador(true);
  };

  if (operador) {
    return (
      <>
        <h1>PPAI Primera entrega grupo 10</h1>
        <form
          onSubmit={() => {
            null;
          }}
        >
          <div className="datosLlamada">
            <h2>Datos de la llamada</h2>
            <div className="nombre_cliente">
              <label>Nombre del Cliente :</label>
              {gestorLlamada.cliente ? <p>{gestorLlamada.cliente}</p> : null}
            </div>
            <div className="categoria">
              <label>Categoria de la llamada :</label>
              {gestorLlamada.categoria ? (
                <p>{gestorLlamada.categoria.nombre}</p>
              ) : null}
            </div>
            <div className="opcion">
              <label>Opcion seleccionada :</label>
              {gestorLlamada.opcion ? (
                <p>{gestorLlamada.opcion.nombre}</p>
              ) : null}
            </div>
            <div className="subopcion">
              <label>Subopcion seleccionada :</label>
              {gestorLlamada.subopcion ? (
                <p>{gestorLlamada.subopcion.nombre}</p>
              ) : null}
            </div>
          </div>
          <div className="validaciones">
            <h3>Validaciones</h3>
            <div>
              {gestorLlamada.validaciones &&
                respuestas.length >= 0 &&
                gestorLlamada.validaciones.map((validacion, index) => (
                  <Validacion
                    key={index}
                    validacion={validacion}
                    index={index}
                    respuestas={respuestas}
                  />
                ))}
            </div>
          </div>

          <div className="descripcion">
            <h3>Descripcion</h3>
            <textarea
              rows={4}
              value={descOp}
              onChange={handleDescOp}
              onBlur={handleBlur}
            />
          </div>

          <div className="acciones">
            <h3>Acciones</h3>
            <div>
              <div>
                <label>Seleccione una accion :</label>
                {gestorLlamada.acciones ? (<Acciones acciones={accionesSeleccionable}/>) : null}
                {ejecutado === true ? (
                  <p className="validado">Accion ejecutada con exito!</p>
                ) : null}
                {ejecutado === false ? (
                  <p className="rechazado">No se pudo ejecutar la accion</p>
                ) : null}
              </div>
              <button type="button" className="enviarAccion"onClick={confirmarAccion}>Confirmar</button>
            </div>
            <br />
          </div>

          <div className="botones">
            <button className="cancelar" onClick={frontCancelarLlamada}>
              Cancelar
            </button>
            <button className="finalizar" onClick={frontFinalizarLlamada}>
              Finalizar
            </button>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <div className="main">
        <button onClick={frontComunicarseOperador}>
          Simular ejecucion metodo disparador opcionComunicarseOperador()
        </button>
      </div>
    );
  }
};
