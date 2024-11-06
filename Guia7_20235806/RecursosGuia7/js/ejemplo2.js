const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

const recorrerFormulario = function () {
    let valid = true;
    let mensajeError = "";

    bodyModal.textContent = "";

    for (let elemento of formulario.elements) {
        const tipoElemento = elemento.type;

        if (elemento.value.trim() === "" && tipoElemento !== "checkbox" && tipoElemento !== "radio") {
            valid = false;
            mensajeError += `El campo ${elemento.previousElementSibling?.innerText || elemento.name} está vacío.<br>`;
            elemento.classList.add("is-invalid");
        } else {
            elemento.classList.remove("is-invalid");
        }

        if (tipoElemento === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(elemento.value)) {
                valid = false;
                mensajeError += `El correo electrónico es inválido.<br>`;
                elemento.classList.add("is-invalid");
            } else {
                elemento.classList.remove("is-invalid");
            }
        }

        if (tipoElemento === "date") {
            const fechaNacimiento = new Date(elemento.value);
            if (fechaNacimiento > new Date()) {
                valid = false;
                mensajeError += `La fecha de nacimiento no puede ser futura.<br>`;
                elemento.classList.add("is-invalid");
            } else {
                elemento.classList.remove("is-invalid");
            }
        }
    }

    const password = formulario["idPassword"].value;
    const passwordRepetir = formulario["idPasswordRepetir"].value;
    if (password !== passwordRepetir) {
        valid = false;
        mensajeError += `Las contraseñas no coinciden.<br>`;
    }

    const checkboxes = ["idCkProgramacion", "idCkBD", "idCkRedes", "idCkSeguridad"];
    const algunInteresSeleccionado = checkboxes.some(id => formulario[id].checked);
    if (!algunInteresSeleccionado) {
        valid = false;
        mensajeError += `Debe seleccionar al menos un interés.<br>`;
    }

    const carreras = ["idRdIng", "idRdLic", "idRdTec", "idRdOtro"];
    const carreraSeleccionada = carreras.some(id => formulario[id].checked);
    if (!carreraSeleccionada) {
        valid = false;
        mensajeError += `Debe seleccionar una carrera.<br>`;
    }

    const paisSeleccionado = formulario["idCmPais"].value !== "Seleccione una opcion";
    if (!paisSeleccionado) {
        valid = false;
        mensajeError += `Debe seleccionar un país de origen.<br>`;
    }

    if (valid) {
        const table = document.createElement("table");
        table.classList.add("table", "table-bordered");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["Campo", "Valor"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        const addRow = (campo, valor) => {
            const row = document.createElement("tr");

            const cellCampo = document.createElement("td");
            cellCampo.textContent = campo;
            row.appendChild(cellCampo);

            const cellValor = document.createElement("td");
            cellValor.textContent = valor;
            row.appendChild(cellValor);

            tbody.appendChild(row);
        };

        addRow("Nombres", formulario["idNombre"].value);
        addRow("Apellidos", formulario["idApellidos"].value);
        addRow("Fecha de nacimiento", formulario["idFechaNac"].value);
        addRow("Correo electrónico", formulario["idCorreo"].value);
        addRow("País de origen", formulario["idCmPais"].options[formulario["idCmPais"].selectedIndex].text);

        const interesesSeleccionados = checkboxes
            .filter(id => formulario[id].checked)
            .map(id => formulario[id].nextElementSibling.innerText)
            .join(", ");
        addRow("Intereses", interesesSeleccionados);

        const carreraSeleccionadaText = carreras.find(id => formulario[id].checked);
        addRow("Carrera", formulario[carreraSeleccionadaText].nextElementSibling.innerText);

        table.appendChild(tbody);
        bodyModal.appendChild(table);

        modal.show();
    } else {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("text-danger");
        errorDiv.innerHTML = mensajeError;
        bodyModal.appendChild(errorDiv);
        modal.show();
    }
}

button.onclick = () => 
{
    recorrerFormulario();
};
