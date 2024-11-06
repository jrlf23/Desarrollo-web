const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const verificarTipoElemento = function() {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const validarIdUnico = function(id) {
    return !document.getElementById(id);
};

const newSelect = function() {
    let idElemento = `id${nombreElemento.value}`;
    if (!validarIdUnico(idElemento)) {
        alert("El ID ya existe. Por favor elige un nombre único.");
        return;
    }

    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", idElemento);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idElemento);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function(newElemento) {
    let idElemento = `id${nombreElemento.value}`;
    if (!validarIdUnico(idElemento)) {
        alert("El ID ya existe. Por favor elige un nombre único.");
        return;
    }

    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", idElemento);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", idElemento);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) 
{
    let addElemento = 
        newElemento === "textarea" 
        ? document.createElement("textarea") 
        : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-control");
    
    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento);
        addElemento.setAttribute("placeholder", tituloElemento.value);
    }
    
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value !== "" && tituloElemento.value !== "") {
        let elemento = cmbElemento.value;

        if (elemento === "select") {
            newSelect();
        } else if (elemento === "radio" || elemento === "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});

const buttonValidar = document.getElementById("idBtnValidar");

const validarFormulario = function() {
    const elementos = newForm.elements;
    let formValido = true;
    let mensaje = "Validación completa. Todos los campos están llenos y válidos.";

    for (let elemento of elementos) {
        if (elemento.tagName === "INPUT") {
            if (elemento.type === "text" || elemento.type === "number" || elemento.type === "date" || elemento.type === "password") {
                if (elemento.value.trim() === "") {
                    formValido = false;
                    mensaje = `El campo con ID "${elemento.id}" está vacío.`;
                    break;
                }
            } else if (elemento.type === "radio" || elemento.type === "checkbox") {
                let opciones = document.querySelectorAll(`input[name="${elemento.name}"]`);
                let algunaSeleccionada = Array.from(opciones).some(opcion => opcion.checked);
                if (!algunaSeleccionada) {
                    formValido = false;
                    mensaje = `Debe seleccionar al menos una opción en el grupo "${elemento.name}".`;
                    break;
                }
            }
        } else if (elemento.tagName === "SELECT") {
            if (elemento.selectedIndex === 0) { 
                formValido = false;
                mensaje = `Debe seleccionar una opción en el campo con ID "${elemento.id}".`;
                break;
            }
        } else if (elemento.tagName === "TEXTAREA") {
            if (elemento.value.trim() === "") {
                formValido = false;
                mensaje = `El campo de texto con ID "${elemento.id}" está vacío.`;
                break;
            }
        }
    }

    alert("Se validaron los campos");
};

buttonValidar.onclick = validarFormulario;