const containerResultado=document.querySelector("#idContainerResultado");

const btnCalcular=document.querySelector("#idBtnCalcular");

btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    const inputTabla = document.querySelector("#inputTabla").value;

    let contador = 1;

    if (inputTabla > 0) {
        let tabla = `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;

        do {
            let resultado = contador * inputTabla;
            tabla += `<div class="row text-center">`;
            tabla += `<div class="col-md-1 column">${contador}</div>`;
            tabla += `<div class="col-md-1 column-green">x</div>`;
            tabla += `<div class="col-md-1 column-green">${inputTabla}</div>`;
            tabla += `<div class="col-md-1 column-green">=</div>`;
            tabla += `<div class="col-md-1 column">${resultado}</div>`;
            tabla += `</div>`;

            contador++;
        } while (contador <= 12);

        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = tabla;
    } else {
        alert("No se ha ingresado un número válido");
    }
}