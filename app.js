//INICIO DEL CODIGO 


document.addEventListener('DOMContentLoaded', () => {
    // Variables

    // const baseDeDatos = [{
    //         id: 1,
    //         nombre: 'Papa',
    //         precio: 15,
    //         imagen: './media/papa.png'
    //     },
    //     {
    //         id: 2,
    //         nombre: 'Cebolla',
    //         precio: 20,
    //         imagen: './media/cebolla.png'
    //     },
    //     {
    //         id: 3,
    //         nombre: 'Calabacin',
    //         precio: 25,
    //         imagen: './media/calabacin.png'
    //     },
    //     {
    //         id: 4,
    //         nombre: 'Fresas',
    //         precio: 80,
    //         imagen: './media/fresas.png'
    //     }

    // ];

    class Productos {
        constructor(id, nombre, precio, imagen) {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
            this.imagen = imagen;
    
        }
    }
    
    const prod1= new Productos (1, "Papa", 15, "./media/papa.png")
    const prod2= new Productos (2, "Cebolla", 20, "./media/cebolla.png")
    const prod3= new Productos (3, "Calabacin", 25, "./media/calabacin.png")
    const prod4= new Productos (4, "Fresas", 80, "./media/fresas.png")

    const baseDeDatos=[];

    baseDeDatos.push(prod1,prod2,prod3,prod4)

    console.log(baseDeDatos)

    //Array Carrito
    let carrito = [];

    //Constantes
    const divisa = '$';

    const DOMitems = document.querySelector('#items');
    console.log(DOMitems)
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    console.log(DOMtotal)
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    console.log(DOMbotonVaciar)

    let form = document.getElementById('form')
    let inputProd = document.getElementById('iprod')

    let mostrarProdSolos = document.getElementById('mostrarProdSolos')
    let mostrarTodosProd = document.getElementById('mostrarTodosProd')
    let btnMostrarProd = document.getElementById('btnMostrar')
    let bandera = false

    //capturo los hijos de form
    let iId = form.children[1].value
    let iprod = form.children[3].value;
    let iprecio = form.children[5].value;
    let iImagen = form.children[7].value;

    //funcion agregar prod al array
    function agregarProd(e) {
        //cancelamos el comportamiento del evento
        e.preventDefault()
        validarDatos();
        if (bandera == true) {
            let opcion = confirm("Esta seguro de agregar el producto")
            if (opcion == true) {
                //captura el dato del input en formato objeto del DOM
                let datos = e.target
                //enviamos los datos al array
                baseDeDatos.push(new Productos((Number(iId)), iprod, ((Number)(iprecio)), iImagen))
                datos.children[1].value = "";
                datos.children[3].value = "";
                datos.children[5].value = "";
                datos.children[7].value = "";
                //traer el innerHTML 
                mostrarProdSolos.innerHTML = ""
                //agregar la funcion que lo muestra en el dom 
                mostrarUnProd()
                inputProd.focus()
              
            } else {
                alert("No se agregara el producto")
            }
        } else {
            inputProd.focus

        }
        {
            
        }

    }

    //Aqui se muestran todos los productos a partir de la base de datos. NO es el carrito!!!!
    function crearProductos() {
        baseDeDatos.forEach((info) => {
            // Esta funcion genera la estructura
            const nodo = document.createElement('div');
            nodo.classList.add('card', 'col-sm-4');

            // Constante para crear el Body
            const nodoCardBody = document.createElement('div');
            nodoCardBody.classList.add('card-body');

            // constante para añadir el titulo
            const nodoTitulo = document.createElement('h5');
            nodoTitulo.classList.add('card-title');
            nodoTitulo.textContent = info.nombre;

            // Constante para la imagen
            const nodoImagen = document.createElement('img');
            nodoImagen.classList.add('img-fluid');
            nodoImagen.setAttribute('src', info.imagen);

            // Constante para agregar el Precio
            const nodoPrecio = document.createElement('p');
            nodoPrecio.classList.add('card-text');
            nodoPrecio.textContent = `${divisa}${info.precio}`;

            // Boton 
            const nodoBoton = document.createElement('button');
            nodoBoton.classList.add('btn', 'btn-primary');
            nodoBoton.textContent = '+';
            nodoBoton.setAttribute('marcador', info.id);
            nodoBoton.addEventListener('click', anyadirProductoAlCarrito);

            // Insertamos
            nodoCardBody.appendChild(nodoImagen);
            nodoCardBody.appendChild(nodoTitulo);
            nodoCardBody.appendChild(nodoPrecio);
            nodoCardBody.appendChild(nodoBoton);
            nodo.appendChild(nodoCardBody);
            DOMitems.appendChild(nodo);
        });
    }

    //Evento para añadir un producto al carrito de la compra
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        crearCarrito();

    }

    //Dibuja todos los productos guardados en el carrito
    function crearCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Se generan los nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {

            // jalamos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === Number(item);
            });

            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);

            // Se crea el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa} ${miItem[0].precio}`;

            // Boton de borrar
            const botonBorrar = document.createElement('button');
            botonBorrar.classList.add('btn', 'btn-danger', 'mx-2');
            botonBorrar.textContent = 'X';
            botonBorrar.style.marginLeft = '1rem';
            botonBorrar.dataset.item = item;
            botonBorrar.addEventListener('click', borrarItemCarrito);

            // Mezclamos nodos
            miNodo.appendChild(botonBorrar);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    //Evento para borrar un elemento del carrito
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        crearCarrito();
    }

    //Calcula el precio total teniendo en cuenta los productos repetidos
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === Number(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    //Varia el carrito y vuelve a dibujarlo
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        crearCarrito();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    crearProductos();
    crearCarrito();


    //Definir los eventos
    form.addEventListener('submit', agregarProd)
    btnMostrarProd.addEventListener('click', mostrarTodosLosProd)


    //pongo en focus el input
    inputProd.focus()

    //Funcion para validar datos
    function validarDatos() {
        iId = form.children[1].value
        iprod = form.children[3].value;
        iprecio = form.children[5].value;
        iImagen = form.children[7].value;
        console.log(iId)
        console.log(iprod)
        console.log(iprecio)
        console.log(iImagen)

        if (iId == '' || iprod == '' || iprecio == '' || iImagen == '') {
            alert("Error debe completar todos los campos para continuar")
            inputProd.focus()
            bandera = false;
        } else {
            bandera = true;
        }
    }
    

    //funcion para mostrar el DOM del ultimo producto ingresado
    const mostrarUnProd = () => {
        mostrarProdSolos.innerHTML = `
        <h3>Ultimo producto ingresado:</h3>
        <p><strong>Id: </strong>${iId}</p>
        <p><strong>Producto: </strong>${iprod}</p>
        <p><strong>Precio: </strong>${iprecio}</p>
        <p><strong>Imagen: </strong>${iImagen}</p>`
    }

    //funcion para mostrar todos los producto ingresados
    function mostrarTodosLosProd(e) {
        e.preventDefault();
        mostrarTodosProd.innerHTML = '<h3>Listado de todos los productos</h3>';
        for (const datos of baseDeDatos) {
            mostrarTodosProd.innerHTML += `
            <p><strong>Id: </strong>${datos.id}</p>
            <p><strong>Producto: </strong>${datos.nombre}</p>
            <p><strong>Precio: </strong>${datos.precio}</p>
            <p><strong>Imagen: </strong>${datos.imagen}</p>  `
        }
    }

});