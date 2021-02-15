//variables

//const carrito=document.querySelector('#carrito')

//const > no se reasigna
const carrito=document.getElementById("carrito");

const listaCursos=document.getElementById("lista-cursos");

const contenedorCarrito=document.querySelector("#lista-carrito tbody")

const vaciarCarritoBtn=document.getElementById("vaciar-carrito")

let articulosCarrito=[];

//listener: vamos a definir todos los escuchadores en la función 

cargarEventListeners();

function cargarEventListeners(){
    //Cuando agregas un curso presionand "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminamos elemento del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Como es función corta , utilizamos función anónima
    vaciarCarritoBtn.addEventListener('click', ()=>{
        
        articulosCarrito=[]; //reseteamos el arreglo
        limpiarHTML();
        
    });
}


//Funciones

function eliminarCurso(e){

   if(e.target.classList.contains('borrar-curso')){
       
       const cursoId=e.target.getAttribute('data-id')
       console.log("curso a quitar "+cursoId)

       //Quitamos del array ese elemento con filter
       articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId)
       carritoHTML();

   }
}



function agregarCurso(e){
    //e evento
    //e.target representa el objeto en el que se produce el evento
    // console.log("Presionando en cursos...")
    // console.log(e.target.classList)

    //prevenimos el evento por defecto, en este caso de la etiqueta a
    //que intenta ir al href, pero al tener # busca el primer id de la página (arriba)
    e.preventDefault();

    //e.target.classList nos da el listado de clases q tiene
    //event bubbling: preventDefault, return false or stopPropagation

    if(e.target.classList.contains("agregar-carrito")){
        //para poder sacar la info del curso y la imagen tenemos que subir en el dom dos veces
        
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leeContenidoCurso(cursoSeleccionado)

    }


}

function leeContenidoCurso(curso){

    //ocomprobamos si ya existe y actualizamos la cantidad
 
    //Creo un objeto con el curso del video actual
    const infoCurso={
        imagen:curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio:curso.querySelector("span").textContent,
        id:curso.querySelector("a").getAttribute("data-id"),
        cantidad:1

    }
    //some iteramos en array y comprobamos si un elemento existe en él
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id)
    if(existe){
        //Actualizamos la cantidad
        //map nos crea unn nuevo array
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso; //devolvemos obj actualizado
            }
            else{
                return curso; //devolvemos obj sin duplicar
            }
        })
        articulosCarrito=[...cursos]
        
    }
    else{
        //agregamos al carrito

            //Agregamos elementos al array del carrito
    //Push o hacemos una copia del elemento con el spread operator / rest operator ...  y agregamos
    articulosCarrito=[... articulosCarrito, infoCurso]
    }

    carritoHTML();
    

}

//Generamos el html con el carrito con arrow functio
function carritoHTML(){
    //tenemos que borrar el html inicial 
    limpiarHTML();

    articulosCarrito.forEach(curso=>{

        //destructuring
        const {imagen, titulo, precio, cantidad, id}=curso
        //Por cada elemento creamos una tr
        const row=document.createElement("tr")
        //Vamos a construir un template string o template literal
        row.innerHTML=`
        <td>
            <img src='${imagen}' width="100"/>
        </td>
        <td>
            ${titulo}
            </td>
        <td>
            ${precio}
        </td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X </a>
        </td>
        `;
        
        //añadimos al tbody
        contenedorCarrito.appendChild(row);
        //console.log(contenedorCarrito)

    })

}

function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML=""

    //Más eficiente
    //si existe un hijo 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}