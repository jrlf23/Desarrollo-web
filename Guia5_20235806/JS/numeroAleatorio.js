const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

const numeroIntentos = 3;

let intentos = 1;

function generarNumeroAleatorio() 
{
    
    let mensaje;
    
    const parrafo = document.querySelector("#idParrafo");

    
    if (intentos <= numeroIntentos)
    {
        let numero = prompt("¿Que número se ha generado (Intento " + intentos + ")?");
        numero=parseInt(numero)

        if (numero == numeroAleatorio) 
        {
            mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}).
                Refresque la página para volver a jugar.`;
        } 
        else if (intentos == numeroIntentos) 
        {
            mensaje = `Su numero de intentos ha terminado.
                El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        }
        else 
        {
            if(numero<numeroAleatorio)
            {
                mensaje=`El numero oculto es mayor que ${numero}. Te quedan ${numeroIntentos-intentos} intentos.`
            }
            else
            {
                 mensaje=`El numero oculto es menor que ${numero}. Te quedan ${numeroIntentos-intentos} intentos.`
            }
        }
        intentos++;
    }
    else 
    {
        mensaje = `Su numero de intentos ha terminado.
            El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }
        
    parrafo.innerHTML = mensaje;
}        