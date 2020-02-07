'use strict'

// Botones
var btnAdd = document.getElementById('btnAdd');
var btnRemove = document.getElementsByClassName('delete-item'); // arreglo

// Contenedor de las lineas
var list = document.getElementById('list');

// Obtener los valores de los inputs
var productName = document.getElementById('productName');
var productCode = document.getElementById('productCode');
var productIn = document.getElementById('productIn');
var productOut = document.getElementById('productOut');

// Mensaje de error y warning
var errorMessage = document.getElementById('errorMessage');
var warningMessage = document.getElementById('warningMessage');

// Funciones a utilizar
var addLine = function(e){
    e.preventDefault();

    // Validar que todos los campos esten llenos
    if(!validateForm()){
        errorMessage.classList.replace("error-message-disappear", "error-message-appear");
        return false;
    }

    // Quitar el mensaje de error si es que contiene la clase
    if(errorMessage.classList.contains("error-message-appear"))  errorMessage.classList.replace("error-message-appear", "error-message-disappear");
   
    // Los div's generales
    var itemList = document.createElement("div");
    var row = document.createElement('div');
    
    // Asignar las clases correspondientes a los div's generales
    itemList.className = "col-12 item-list";
    row.className = "row";
    
    // Incrustar el contenido en los div's generales
    createColumn1(row);
    createColumn2(row);
    createColumn3(row);
    createColumn4(row);
    createColumn5(row);
   
    // Incrustar el contenido final
    itemList.appendChild(row);
    list.appendChild(itemList);

    // Quitar el mensaje si no hay elementos en la lista
    emptyList();

    // Resetear el formulario
    productName.value = "";
    productCode.value = "";
    productIn.value = "";
    productOut.value = "";

    // Ejecutar el ciclo para eliminar elementos
    if(list.children.length != 0){
        for(var i = 0; i < list.children.length; i++){
            btnRemove[i].addEventListener('click', removeLine);
        }
    } else {
        warningMessage.classList.replace('warning-message-disappear', 'warning-message-appear');
    }
}

var validateForm = function(){
    var valid = true;
  if(productName.value === '' || productCode.value === '' || productIn.value === '' || productOut.value === '') valid = false;
    return valid;
}

var removeLine = function(){
    let containerList = this.parentNode.parentNode.parentNode.parentNode;
    let row = this.parentNode.parentNode.parentNode;
    containerList.removeChild(row);
     // Comprobar si no hay elementos
     emptyList();
}

var emptyList = function(){
    if(list.children.length == 0){
        warningMessage.classList.replace('warning-message-disappear', 'warning-message-appear');
    } else {
        warningMessage.classList.replace('warning-message-appear', 'warning-message-disappear');
    }
}

// Eventos 
btnAdd.addEventListener('click', addLine);
for(var i = 0; i < list.children.length; i++){
    btnRemove[i].addEventListener('click', removeLine);
}


// Funcionalidades extras
function createColumn1(row){
    var column1 = document.createElement('div'); // Codigo del producto
    column1.className ="col-3 d-flex justify-content-center"
    var textProductCode = document.createTextNode("#" + productCode.value);
    column1.appendChild(textProductCode);
    row.appendChild(column1);
}

function createColumn2(row){
    var column2 = document.createElement('div'); // Nombre del producto
    column2.className ="col-3 d-flex justify-content-center";
    var textProductName = document.createTextNode(productName.value);
    column2.appendChild(textProductName);
    row.appendChild(column2);
}

function createColumn3(row){
    var column3 = document.createElement('div'); // Entradas
    column3.className ="col-3 d-flex justify-content-center";
    var textProductIn = document.createTextNode(productIn.value);
    column3.appendChild(textProductIn);
    row.appendChild(column3);
}

function createColumn4(row){
    var column4 = document.createElement('div'); // Salidas
    column4.className ="col-2 d-flex justify-content-center";
    var textProductOut = document.createTextNode(productOut.value);
    column4.appendChild(textProductOut);
    row.appendChild(column4);
}

function createColumn5(row){
    var column5 = document.createElement('div'); // El boton eliminar
    column5.className ="col-1 d-flex justify-content-center";
    column5.innerHTML = "<button class='btn btn-danger btn-sm delete-item' id='btnRemove'> <i class='fas fa-trash'></i> </button>";
    row.appendChild(column5);
}



// Envocar funciones
 /* Si no hay elementos en la lista al cargar el documento, aparecer el mensaje */
 emptyList();
 