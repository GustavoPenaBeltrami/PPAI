//Declaracion de clases
const getFechaHoraActual = () => {
    const fecha = new Date(); // Aquí se asume que ya tienes un objeto Date

    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtener día con dos dígitos
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtener mes con dos dígitos (se suma 1 ya que los meses se cuentan desde 0)
    const año = fecha.getFullYear().toString(); // Obtener año

    const hora = fecha.getHours().toString().padStart(2, '0'); // Obtener hora con dos dígitos
    const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Obtener minutos con dos dígitos
    const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Obtener segundos con dos dígitos

    const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

    return fechaFormateada;
}


class OpcionValidacion {
    constructor(nombre, esCorrecta) {
        this._nombre = nombre;
        this._esCorrecta = esCorrecta;
    }
    get nombre() {
        return this._nombre;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    esMiOpcion(respuesta) {
        if (this._nombre === respuesta) {
            return this
        } else {
            return null
        }
    }
    esOpcionCorrecta() {
        if (this._esCorrecta) {
            return this
        } else {
            return null
        }
    }
}
class Validacion {
    constructor(nombre, opcionValidacion, opcionCorrecta) {
        this._nombre = nombre;
        this._opcionValidacion = opcionValidacion;
    }
    get nombre() {
        return this._nombre;
    }
    get opcionValidacion() {
        return this._opcionValidacion;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    set opcionValidacion(nuevaOpcionValidacion) {
        this._opcionValidacion = nuevaOpcionValidacion;
    }
    esMiOpcion(respuesta) {
        for (const opcion of this._opcionValidacion) {
            if (opcion.esMiOpcion(respuesta)) {
                return opcion
            }
        }
        return null
    }
    esOpcionCorrecta() {
        for (const opcion of this._opcionValidacion) {
            if (opcion.esOpcionCorrecta()) {
                return opcion
            }
        }
        return null
    }
    esIgualRespuesta(correcta, respuesta) {
        if (correcta === respuesta) {
            return true
        } else {
            return false
        }
    }
}
class SubOpcionLlamada {
    constructor(nombre, validacion) {
        this._nombre = nombre;
        this._validacion = validacion;

    }
    get nombre() {
        return this._nombre;
    }
    get validacion() {
        return this._validacion;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    set validacion(nuevaValidacion) {
        this._validacion = nuevaValidacion;
    }
    obtenerValidacion() {
        return this._validacion
    }
}
class CategoriaLlamada {
    constructor(nombre, opcionLlamada) {
        this._nombre = nombre;
        this._opcionesLlamada = opcionLlamada;
    }

    get nombre() {
        return this._nombre;
    }

    get opcionesLlamada() {
        return this._opcionesLlamada;
    }

    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    set opcionesLlamada(nuevaOpcionLlamada) {
        this._opcionesLlamada.push(nuevaOpcionLlamada);
    }

    agregarOpcionLlamada(opcionLlamada) {
        this._opcionLlamada.push(opcionLlamada);
    }

    soyDeTuCategoria(opcion) {
        for (const opcionLlamada of this._opcionesLlamada) {
            if (opcionLlamada.nombre === opcion.nombre) {
                return this;
            }
        }
    }
}
class OpcionLlamada {
    constructor(nombre, subOpcionLlamada = null, validacion = null) {
        this._nombre = nombre;
        this._subOpcionLlamada = subOpcionLlamada;
        this._validacion = validacion;
    }
    get nombre() {
        return this._nombre;
    }
    get subOpcionLlamada() {
        return this._subOpcionLlamada;
    }
    get validacion() {
        return this._validacion;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    set validacion(nuevaValidacion) {
        this._validacion = nuevaValidacion;
    }
    set subOpcionLlamada(nuevaSubOpcionLlamada) {
        this._subOpcionLlamada = nuevaSubOpcionLlamada;
    }

    obtenerCategoria(categorias) {
        for (const categoria of categorias) {
            const categoriaPertenece = categoria.soyDeTuCategoria(this);
            if (categoriaPertenece) {
                return {
                    categoriaIdentificada: categoriaPertenece,
                    opcionIdentificada: this
                };
            }
        }

        return null; // No se encontró una categoría para la opción
    }
}
class Cliente {
    constructor(nombre, fechaNacimiento, hijos, codigoPostal) {
        this._nombre = nombre;
        this._fechaNacimiento = fechaNacimiento;
        this._hijos = hijos;
        this._codigoPostal = codigoPostal;
    }
    get nombre() {
        return this._nombre;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
}
class Estado {
    constructor(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
    esEnCurso() {
        return this._nombre === 'EnCurso';
    }
    esFinalizado() {
        return this._nombre === 'Finalizado';
    }
    esColgada() {
        return this._nombre === 'Colgada';
    }
}
class Accion {
    constructor(descripcion) {
        this._descripcion = descripcion;
    }
    get descripcion() {
        return this._descripcion;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set descripcion(nuevaDescripcion) {
        this._descripcion = nuevaDescripcion;
    }
}
class CambioEstado {
    constructor(estado, fechaHoraInicio) {
        this._estado = estado;
        this._fechaHoraInicio = fechaHoraInicio
        this._fechaHoraFin = null
    }
    get estado() {
        return this._estado;
    }
    get fechaHoraInicio() {
        return this._fechaHoraInicio;
    }
    get fechaHoraFin() {
        return this._fechaHoraFin;
    }
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    set estado(nuevoEstado) {
        this._estado = nuevoEstado;
    }
    set fechaHoraInicio(nuevaFechaHoraInicio) {
        this._fechaHoraInicio = nuevaFechaHoraInicio;
    }
    set fechaHoraFin(nuevaFechaHoraFin) {
        this._fechaHoraFin = nuevaFechaHoraFin;
    }
    esCambioDeEstadoActual() {
        return this._fechaHoraFin === null;
    }
}
class Llamada {
    constructor(cliente, cambioEstado, opcionLlamada = null, subOpcionLlamada = null, fechaHoraInicio = null, accion = null) {
        this._cliente = cliente;
        this._cambioEstado = cambioEstado;
        this._opcionLlamada = opcionLlamada;
        this._subOpcionLlamada = subOpcionLlamada;
        this._fechaHoraInicio = fechaHoraInicio;
        this._accion = accion;
        this._duracion = null
        this._descripcionOperador = null
        this._fechaHoraFin = null;
    }
    get subOpcionLlamada() {
        return this._subOpcionLlamada
    }
    get descripcionOperador() {
        return this._descripcionOperador
    }
    get duracion() {
        return this._duracion
    }
    get opcionLlamada() {
        return this._opcionLlamada
    }
    get fechaHoraFin() {
        return this._fechaHoraFin
    }
    set subOpcionLlamada(nuevaSubOpcionLlamada) {
        this._subOpcionLlamada = nuevaSubOpcionLlamada;
    }
    set descripcionOperador(nuevaDescripcionOperador) {
        this._descripcionOperador = nuevaDescripcionOperador;
    }
    set fechaHoraFin(arg) {
        this._fechaHoraFin = arg
    }
    set opcionLlamada(nuevaOopcionLlamada) {
        this._opcionLlamada = nuevaOopcionLlamada
    }


    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    }
    calcularDuracion() {
        var fechaI = this._fechaHoraInicio;
        var fechaIformateada = fechaI.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1T$4:$5:$6");
        var fechaIdate = new Date(fechaIformateada);

        var fechaF = getFechaHoraActual()
        this._fechaHoraFin = fechaF
        var fechaFformateada = fechaF.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1T$4:$5:$6");
        var fechaFdate = new Date(fechaFformateada);


        let diferencia = fechaFdate.getTime() - fechaIdate.getTime();
        let segundos = Math.floor(diferencia / 1000) % 60;
        let minutos = Math.floor(diferencia / 1000 / 60) % 60;
        let horas = Math.floor(diferencia / 1000 / 60 / 60);
        this._duracion = horas + ":" + minutos + ":" + segundos;
        return this._duracion;
    }
    crearCambioEstado(estado, fecha) {
        //con la fecha que obtuvo el gestor, le pido mi cabioEstadoActual que cambie su hora fin

        for (const cambioActual of this._cambioEstado) {

            cambioActual.esCambioDeEstadoActual();

            if (cambioActual.esCambioDeEstadoActual()) {
                cambioActual._fechaHoraFin = fecha
            }
        }
        //Creo el objeto cambioEstado con el estado "enCurso"
        this._cambioEstado.push(new CambioEstado(estado, fecha));
        // console.log(this._cambioEstado)

    }
    obtenerNombreClienteDeLlamada() {
        return this._cliente.nombre
    }
    obtenerSubOpcionSeleccionada() {
        const subopcionIdentificada = this._subOpcionLlamada;
        const validacionIdentificada = this._subOpcionLlamada.obtenerValidacion()
        return {
            subopcionIdentificada,
            validacionIdentificada
        }

    }
    obtenerOpcionYCategorias(categorias) {
        const { opcionIdentificada, categoriaIdentificada } = this._opcionLlamada.obtenerCategoria(categorias)
        return {
            opcionIdentificada,
            categoriaIdentificada
        }
    }
}
class GestorLlamada {
    constructor() {
        this._acciones = [];
        this._accionSeleccionada = null;
        this._categoriaLlamada = null;
        this._descripcionOperador = "";
        this._estadoEnCurso = null;
        this._estadoFinalizado = null;
        this._estadoColgada = null
        this._fechaHoraActual = null;
        this._llamada = null;
        this._nombreCliente = null;
        this._respuestaCliente = [];
        this._opcionLlamada = null;
        this._subOpcionLlamada = null;
        this._confirmacion = null;
        this._validaciones = null;
        this._validacionesCorrectas = []
    }

    get llamada() {
        return this._llamada
    }
    get cliente() {
        return this._nombreCliente
    }
    get categoria() {
        return this._categoriaLlamada
    }
    get opcion() {
        return this._opcionLlamada
    }
    get subopcion() {
        return this._subOpcionLlamada
    }
    get validaciones() {
        return this._validaciones
    }
    get descripcionOperador() {
        return this._descripcionOperador
    }
    get acciones() {
        return this._acciones
    }

    set llamada(nuevaLlamada) {
        this._llamada = nuevaLlamada
    }

    //Metodos
    llamadaColgada(){
        for (const estado of estados) {
            if (estado.esColgada()) {
                this._estadoColgada = estado
            }
        }
        this._llamada.calcularDuracion()
        this.obtenerFechaYHoraActual()
        this._llamada.crearCambioEstado(this._estadoColgada, this._fechaHoraActual)
    }
    finalizarLlamada() {
        this._llamada.descripcionOperador = this._descripcionOperador;
        this._llamada.calcularDuracion();

        for (const estado of estados) {
            if (estado.esFinalizado()) {
                this._estadoFinalizado = estado
            }
        }

        this._llamada.opcionLlamada = this._opcionLlamada;
        this._llamada.subOpcionLlamada = this._subOpcionLlamada;
        this._llamada._accion = this._accionSeleccionada;
        this.obtenerFechaYHoraActual()
        this._llamada.crearCambioEstado(this._estadoFinalizado, this._fechaHoraActual)

    };
    llamarCURegistrarLlamada(estados) {

        //Hace un ciclo for por cada instancia de estado y le ejecuta el metodo .esEnCurso() de la clase Estado y obtiene el puntero de la clase Estado deseada
        for (const estado of estados) {
            if (estado.esEnCurso()) {
                this._estadoEnCurso = estado
            }
        }
        //Obtiene la fecha actual
        this.obtenerFechaYHoraActual()
        //Crea una instancia de la clase CambioEstado con el estadoEnCurso y la fechaHoraActual
        this._llamada.crearCambioEstado(this._estadoEnCurso, this._fechaHoraActual)
    };
    obtenerFechaYHoraActual() {
        this._fechaHoraActual = getFechaHoraActual();
    };
    obtenerDatosDeLlamada(categorias) {
        //le pido a la clase llamada que le pregunte a su cliente cual es su nombre y lo almaceno en mi atributo
        this._nombreCliente = this._llamada.obtenerNombreClienteDeLlamada();
        const { opcionIdentificada, categoriaIdentificada } = this._llamada.obtenerOpcionYCategorias(categorias)
        this._opcionLlamada = opcionIdentificada
        this._categoriaLlamada = categoriaIdentificada
        const { subopcionIdentificada, validacionIdentificada } = this._subOpcionLlamada = this._llamada.obtenerSubOpcionSeleccionada()
        this._subOpcionLlamada = subopcionIdentificada;
        this._validaciones = validacionIdentificada;

    };
    obtenerAccionesARealizar(acciones) {
        this._acciones = []
        for (const accion of acciones) {
            //Esto equivale a un *obtenerAcciones() ya que obtengo toda la accion de forma interna de las clases de javascript y se almacena en el iterador "accion"
            //y simplemente lo almaceno en mi atributo acciones del gestor
            this._acciones.push(accion)
        }
    };
    tomarConfirmacion() {
        this._confirmacion = true
    };
    tomarDescripcion(descripcion) {
        this._descripcionOperador = descripcion;
        return this._descripcionOperador
    };
    tomarRespuesta(respuesta, id) {
        this._respuestaCliente[id] = respuesta
        this.validarRespuesta(respuesta, id)
    };
    tomarSeleccionAccion(accionSeleccionada, acciones) {
        for (const accion of acciones) {
            if (accionSeleccionada == accion._descripcion) {
                this._accionSeleccionada = accion
            }
        }
    };
    validarRespuesta(respuesta, id) {
        const validacion = this._validaciones[id].esMiOpcion(respuesta)
        if (validacion) {
            this._respuestaCliente[id] = validacion;
        }

        const correcta = this._validaciones[id].esOpcionCorrecta()

        const esCorrecta = this._validaciones[id].esIgualRespuesta(correcta, validacion)

        this._validacionesCorrectas[id] = esCorrecta
    };
    getDatos() {
        return Object.keys(this).reduce((atributos, key) => {
            if (key !== 'getDatos') {
                atributos[key] = this[key];
            }
            return atributos;
        }, {});
    };
    setearInfo() {
        this._acciones = [];
        this._accionSeleccionada = null;
        this._categoriaLlamada = null;
        this._descripcionOperador = "";
        this._estadoEnCurso = null;
        this._estadoFinalizado = null;
        this._fechaHoraActual = null;
        this._llamada = null;
        this._nombreCliente = null;
        this._respuestaCliente = [];
        this._opcionLlamada = null;
        this._subOpcionLlamada = null;
        this._confirmacion = null;
        this._validaciones = null;
        this._validacionesCorrectas = []
    }
}


//Informacion

const cliente1 = new Cliente("Gustavo Peña Beltrami", "19/12/1999", "0", "12345");
const cliente2 = new Cliente("María López García", "05/07/1985", "2", "54321");
const cliente3 = new Cliente("Carlos Rodríguez Pérez", "10/02/1978", "3", "98765");
const cliente4 = new Cliente("Ana Martínez Sánchez", "23/09/1990", "1", "56789");
const cliente5 = new Cliente("Pedro Fernández Morales", "15/06/1982", "2", "23456");

const opcionValidacion1 = new OpcionValidacion("0", false);
const opcionValidacion2 = new OpcionValidacion("2", true);
const opcionValidacion3 = new OpcionValidacion("3", false);
const opcionValidacion4 = new OpcionValidacion("54321", true);
const opcionValidacion5 = new OpcionValidacion("98765", false);
const opcionValidacion6 = new OpcionValidacion("23456", false);
const opcionValidacion7 = new OpcionValidacion("22/04/1997", false);
const opcionValidacion8 = new OpcionValidacion("19/12/1999", false);
const opcionValidacion9 = new OpcionValidacion("05/07/1985", true);

const accion1 = new Accion("Anular ultimo pago");
const accion2 = new Accion("Anular Tarjeta");
const accion3 = new Accion("Desbloquear Tarjeta");
const accion4 = new Accion("Bloquear Tarjeta");
const accion5 = new Accion("Dar de baja servicio");
const accion6 = new Accion("Solicitar nueva tarjeta");

const estado1 = new Estado("Iniciada");
const estado2 = new Estado("EnCurso");
const estado3 = new Estado("Finalizado");
const estado4 = new Estado("Colgada");

const validacion4 = new Validacion("Fecha de Nacimiento", [opcionValidacion7, opcionValidacion8, opcionValidacion9]);
const validacion1 = new Validacion("Cantidad de hijos", [opcionValidacion1, opcionValidacion2, opcionValidacion3]);
const validacion2 = new Validacion("Codigo Postal", [opcionValidacion4, opcionValidacion5, opcionValidacion6]);
const validacion3 = new Validacion("Fecha Vencimiento de la tarjeta", [opcionValidacion7, opcionValidacion8, opcionValidacion9]);

const subOpcion1 = new SubOpcionLlamada("Tiene los datos de la tarjeta", [validacion4, validacion1, validacion3]);
const subOpcion2 = new SubOpcionLlamada("No tiene los datos de la tarjeta", [validacion4, validacion1, validacion2]);
const subOpcionFin = new SubOpcionLlamada("Finalizar llamada");
const subOpcionOperador = new SubOpcionLlamada("Comunicarse con un operador", [validacion1, validacion4]);

const opcion1 = new OpcionLlamada("solicitar tarjeta nueva");
const opcion2 = new OpcionLlamada("Anular tarjeta", [subOpcion1, subOpcion2, subOpcionFin, subOpcionOperador]);
const opcion3 = new OpcionLlamada("desbloquear tarjeta", [subOpcion1, subOpcion2, subOpcionFin, subOpcionOperador]);
const opcion4 = new OpcionLlamada("dar de bajo servicio", [subOpcion1, subOpcion2, subOpcionFin, subOpcionOperador]);
const opcionFin = new OpcionLlamada("finalizar llamada");

const categoria1 = new CategoriaLlamada("Informar un robo", [opcion1, opcion2, opcionFin]);
const categoria2 = new CategoriaLlamada("Tarjeta bloqueda", [opcion1, opcion2, opcion3, opcion4, opcionFin]);
const categoria3 = new CategoriaLlamada("Tarjeta extraviada", [opcion1, opcion2, opcion4, opcionFin]);
const categoria4 = new CategoriaLlamada("Tarjeta utilizada sin consentimiento", [opcion2, opcion4, opcionFin]);
const categoria5 = new CategoriaLlamada("Alta de tarjeta", [opcion1, opcionFin]);
const categoriaFin = new CategoriaLlamada("Finalizar llamada", [opcionFin]);

const cambioEstado1 = new CambioEstado(estado1, "28/05/2023 15:23", "28/05/2023 15:23");
const cambioEstado2 = new CambioEstado(estado2, "28/05/2023 15:23");
const cambioEstado3 = new CambioEstado(estado1, "28/05/2023 11:47", "28/05/2023 11:47");
const cambioEstado4 = new CambioEstado(estado2, "28/05/2023 11:47", "28/05/2023 11:53");
const cambioEstado5 = new CambioEstado(estado3, " 28/05/2023 11:53");
const cambioEstado6 = new CambioEstado(estado1, "28/05/2023 16:15:11");

const llamada1 = new Llamada(cliente1, [cambioEstado1, cambioEstado2, cambioEstado3], opcion2, subOpcion1, "28/05/2023 15:23", accion6);
const llamadaIdentificada = new Llamada(cliente2, [cambioEstado6], opcion2, subOpcionOperador, "28/05/2023 16:15:11");
const llamada3 = new Llamada(cliente2, [cambioEstado4, cambioEstado5, cambioEstado6], opcion4, subOpcionFin, "28/05/2023 11:53", accion3);

const estados = [estado1, estado2, estado3, estado4];
const categorias = [categoria1, categoria2, categoria3, categoria4, categoria5];
const acciones = [accion1, accion2, accion3, accion4, accion5, accion6]

const gestorLlamada = new GestorLlamada();

export {
    OpcionValidacion,
    Validacion,
    SubOpcionLlamada,
    CategoriaLlamada,
    OpcionLlamada,
    Cliente,
    Accion,
    Estado,
    CambioEstado,
    Llamada,
    GestorLlamada,

    estados,
    categorias,
    llamadaIdentificada,
    gestorLlamada,
    acciones
}