let solicitarCatalogoInmuebles = () => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "./php/inmueble.php?action=read");
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
        procesarInmuebles(JSON.parse(xhr.responseText));
    });
    xhr.send();
}

let procesarInmuebles = (inmuebles) => {
    for (let i = 0; i < inmuebles.length; i++) {
        desplegarInmueble(
            inmuebles[i]["idInmueble"],
            inmuebles[i]["Propietario"],
            inmuebles[i]["NumHabitaciones"],
            inmuebles[i]["NumBaños"],
            inmuebles[i]["MascotasPermitidas"],
            inmuebles[i]["CapacidadMaxima"],
            inmuebles[i]["Calle"],
            inmuebles[i]["NumeroExterior"],
            inmuebles[i]["Colonia"],
            inmuebles[i]["Estado"],
            inmuebles[i]["Imagen"],
        );
    }
}

let desplegarInmueble = (id, propietario, numHabitaciones, numBaños, mascotasPermitidas, capacidadMaxima, calle, numeroExterior, colonia, estado, imagen) => {
  console.log(id);
  console.log(propietario);
  console.log(numHabitaciones);
  console.log(numBaños);
  console.log(mascotasPermitidas);
  console.log(capacidadMaxima);
  console.log(calle);
  console.log(numeroExterior);
  console.log(colonia);
  console.log(estado);
  console.log(imagen);
  //   let catalogoStockm = document.getElementById('catalogo');
  //   //EN CASO DE SER UN PRODUCTO -> DESPLEGAR INVENTARIO
  //   let inventario = (tipo == 'Producto') ?
  //       `<div class="input-group">
  //                   <input class="form-control" name="inventory" type="number" min="0" max="1000" step="1" value="${cantInventario}" id="inv${id}" required>
  //                   <div class="input-group-append">
  //                       <input type="button" class="btn btn-info" onClick="actualizarInventario(${id})" name="actualizarInventario" value="+- inventario">
  //                   </div>
  //                 </div>` :
  //       '';
  //   img = (img == "") ? "default.jpg" : img;
  //
  //   let htmlCode = `
  //   <div class="col-sm-4 col-md-3 card bg-dark text-light" id="p${id}">
  //     <input type="hidden" name="id" value="${id}">
  //     <img src="img/productos/${img}" class="card-img-top" alt="">
  //     <div class="card-body">
  //       <h5 class="card-title">#${id}-${nombre}</h5>
  //       <p class="card-text">${descripcion}</p>
  //     </div
  //     <ul class="list-group list-group-flush">
  //       <li class="list-group-item bg-dark">Tipo: ${tipo}</li>
  //       <li class="list-group-item bg-dark">Costo: $${costo}</li>
  //       <li class="list-group-item bg-dark">${inventario}</li>
  //     </ul>
  //     <div class="card-body">
  //       <input type="button" class="btn btn-secondary" onClick="cargarContenidoAFormulario(${id})" name="modificar" value="Modificar">
  //       <input type="button" class="btn btn-danger" onClick="eliminarProducto(${id})" name="eliminar" value="Eliminar">
  //     </div>
  //   </div>
  // `;
  //
  //   catalogoStockm.innerHTML += htmlCode;
}
