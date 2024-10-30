const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRMasculino = document.getElementById("idRMasculino");
const inputRFemenino = document.getElementById("idRFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];
let editIndex = -1;

const limpiarForm = () => 
{
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRMasculino.checked = false;
    inputRFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
    editIndex = -1;
};

const addPaciente = function () 
{
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRMasculino.checked ? "Hombre" : inputRFemenino.checked ? "Mujer" : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (nombre && apellido && fechaNacimiento && sexo && pais && direccion) {
        const pacienteData = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];

        if (editIndex === -1) {
            arrayPaciente.push(pacienteData);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            arrayPaciente[editIndex] = pacienteData;
            mensaje.innerHTML = "Datos del paciente actualizados";
            editIndex = -1;
        }

        toast.show();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

function imprimirFilas() {
    let $fila = "";
    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${index + 1}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                    <td>
                        <button onclick="editarPaciente(${index})" type="button" class="btn btn-primary" alt="Editar">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button onclick="borrarPaciente(${index})" type="button" class="btn btn-danger" alt="Eliminar">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>`;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:15%">Fecha Nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

const editarPaciente = (index) => 
{
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] === "Hombre") inputRMasculino.checked = true;
    else inputRFemenino.checked = true;
    cmbPais.value = [...cmbPais.options].find((option) => option.text === paciente[4]).value;
    inputDireccion.value = paciente[5];
    
    editIndex = index;
    mensaje.innerHTML = "Modo edición activado para el paciente seleccionado";
    toast.show();
};

const borrarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();
    imprimirPacientes();
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;
    if (paisNew) {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;
        
        cmbPais.appendChild(option);
        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

buttonLimpiarPaciente.onclick = () => limpiarForm();
buttonAgregarPaciente.onclick = () => addPaciente();
buttonMostrarPaciente.onclick = () => imprimirPacientes();
buttonAgregarPais.onclick = () => addPais();

idModal.addEventListener("shown.bs.modal", () => 
{
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();