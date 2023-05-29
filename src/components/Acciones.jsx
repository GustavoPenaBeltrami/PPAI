import React, { useEffect, useState } from 'react'
import { gestorLlamada, acciones as arrayObj } from '../data/classes';

export const Acciones = ({acciones}) => {

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const tomarSeleccionAccion = (accionSeleccionada) =>{
        gestorLlamada.tomarSeleccionAccion(accionSeleccionada, arrayObj);
      }

      useEffect(() => {
        if (selectedOption){
            tomarSeleccionAccion(selectedOption)
        } else{
            tomarSeleccionAccion("")
        }
      }, [selectedOption]);

    return (
        <div>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Seleccione</option>
            {acciones.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
  }

