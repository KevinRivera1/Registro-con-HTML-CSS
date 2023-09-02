// login.js

// Utiliza funciones de utilidad para obtener elementos y mostrar errores
function obtenerValorPorID(id) {
    return document.getElementById(id).value;
}

function mostrarError(campo, mensaje) {
    campo.classList.add("error");
    alert(mensaje);
}

// Función para validar un campo con expresiones regulares
function validarCampo(campo, regex, mensajeError) {
    const valor = obtenerValorPorID(campo.id);

    if (!valor || !valor.match(regex)) {
        mostrarError(campo, mensajeError);
        return false;
    }

    campo.classList.remove("error"); // Elimina la clase de error si la validación es exitosa
    return true;
}

// Función para validar contraseñas
function validarContrasenas() {
    const contrasena = obtenerValorPorID("contrasena");
    const confirmarContrasena = obtenerValorPorID("confirmar-contrasena");
    const contrasenaRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (contrasena !== confirmarContrasena) {
        mostrarError(document.getElementById("confirmar-contrasena"), "Las contraseñas no coinciden.");
        return false;
    }

    if (!contrasena.match(contrasenaRegex)) {
        mostrarError(document.getElementById("contrasena"), "La contraseña debe tener al menos 6 caracteres y contener al menos una letra, un número y un carácter especial (@$!%*?&).");
        return false;
    }

    return true;
}

// Función para validar el formulario completo
function validarFormulario() {
    const nombreCampo = document.getElementById("nombre");
    const correoCampo = document.getElementById("correo");

    // Expresiones regulares para validar nombre y correo electrónico
    const nombreRegex = /^[A-Za-z\s]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar campos individuales
    if (!validarCampo(nombreCampo, nombreRegex, "Por favor, completa el campo de nombre.")) {
        return false;
    }

    if (!validarCampo(correoCampo, correoRegex, "Por favor, completa el campo de correo o ingresa una dirección válida.")) {
        return false;
    }

    // Validar contraseñas
    if (!validarContrasenas()) {
        return false;
    }

    // Supongamos que aquí deberías enviar estos datos a un servidor para el registro real,
    // pero como estás usando datos quemados, puedes simplemente mostrar un mensaje de éxito.
    alert(`Usuario registrado con éxito:\nNombre: ${nombreCampo.value}\nCorreo: ${correoCampo.value}`);
    limpiarFormulario();
    return true;
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("contrasena").value = "";
    document.getElementById("confirmar-contrasena").value = "";
    document.querySelectorAll(".input").forEach(campo => campo.classList.remove("error"));
}

// Manejar el evento de envío del formulario
document.querySelector(".boton").addEventListener("click", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    validarFormulario(); // Llamar a la función para registrar al usuario
});
