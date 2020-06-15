let solicitarCatalogoInmuebles = () => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "./php/inmueble.php?action=read");
    xhr.addEventListener("load", () => {
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
            inmuebles[i]["CostoPorMes"],
            inmuebles[i]["Calle"],
            inmuebles[i]["NumeroExterior"],
            inmuebles[i]["Colonia"],
            inmuebles[i]["Estado"],
            inmuebles[i]["Imagen"],
        );
    }
}

let desplegarInmueble = (id, propietario, numHabitaciones, numBaños, mascotasPermitidas, capacidadMaxima, costo, calle, numeroExterior, colonia, estado, imagen) => {
    mascotasPermitidas = (mascotasPermitidas) ? "Si" : "No";
    let catalogo = document.getElementById('catalogoInmuebles');

    let img = (imagen == "") ? "default.jpg" : imagen;

    let htmlCode = `
    <div class="col-md-3 col-sm-4">
    <div class="card h-100" id="i${id}">
      <img src="img/inmuebles/${img}" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">Hermosa casa!</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Habitaciones: ${numHabitaciones}  Baños: ${numBaños}</li>
        <li class="list-group-item">Mascotas permitidas: ${mascotasPermitidas}</li>
        <li class="list-group-item">Ubicacion: ${calle} ${numeroExterior} ${colonia}, ${estado}</li>
        <li class="list-group-item">Costo por mes: $${costo}</li>
      </ul>
      <div class="card-body">
        <input type="button" class="btn btn-primary" onClick="" name="rentar" value="Rentar">
      </div>
    </div>
    </div>
  `;

    catalogo.innerHTML += htmlCode;
}
