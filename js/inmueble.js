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

let solicitarMisInmuebles = () => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "./php/inmueble.php?action=readMyProperties");
    xhr.addEventListener("load", () => {
        procesarMisInmuebles(JSON.parse(xhr.responseText));
    });
    xhr.send();
}

let procesarMisInmuebles = (inmuebles) => {
    for (let i = 0; i < inmuebles.length; i++) {
        desplegarMiInmueble(
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

let desplegarMiInmueble = (id, propietario, numHabitaciones, numBaños, mascotasPermitidas, capacidadMaxima, costo, calle, numeroExterior, colonia, estado, imagen) => {
    mascotasPermitidas = (mascotasPermitidas) ? "Si" : "No";
    let catalogo = document.getElementById('misInmuebles');

    let img = (imagen == "") ? "default.jpg" : imagen;

    let htmlCode = `
    <div class="col-md-4 col-sm-6 mx-auto" id="i${id}">
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="img/inmuebles/${img}" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Inmueble #${id}</h5>
              <p class="card-text">Costo: $${costo}</p>
              <p class="card-text"><small class="text-muted">No rentada</small></p>
              <a class="btn btn-warning" href="views/inmueblesFormModificar.phtml?id=${id}" onClick="">Modificar</a>
              <a class="btn btn-danger" onClick="eliminarInmueble(${id})">Eliminar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    catalogo.innerHTML += htmlCode;
}

let eliminarInmueble = (idInmueble) => {
    if (confirm("Desea eliminar el inmueble con ID: " + idInmueble + "?")) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", "./php/inmueble.php?action=delete&id=" + idInmueble);
        xhr.addEventListener("load", () => {
            let eliminado = xhr.responseText;

            if (eliminado) {
                alert("El inmueble se ha eliminado.");
                eliminarInmuebleVista(idInmueble);
            } else {
                alert("El inmueble no ha podido ser eliminado :(");
            }
        });
        xhr.send();
    }
}

let eliminarInmuebleVista = (idInmueble) => {
    let catalogo = document.getElementById("misInmuebles");

    catalogo.removeChild(document.getElementById('i' + idInmueble));
}


let cargarInmuebleAFormulario = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let idInmueble = urlParams.get("id")

  let xhr = new XMLHttpRequest();

  xhr.open("GET","../php/inmueble.php?action=get&id=" + idInmueble);
  xhr.addEventListener("load",() => {
    console.log(xhr.responseText);
    rellenarFormularioModificacion(JSON.parse(xhr.responseText));
  });
  xhr.send();
}

let rellenarFormularioModificacion = (inmuebleJSON) => {
  let inputId = document.getElementById("id");
  let inputNumRooms = document.getElementById("numRooms");
  let inputNumBathrooms = document.getElementById("numBathrooms");
  let inputMaxCapacity = document.getElementById("maxCapacity");
  let inputCost = document.getElementById("cost");
  let inputStreet = document.getElementById("street");
  let inputExtNumber = document.getElementById("extNumber");
  let inputNeighborhood = document.getElementById("neighborhood");
  let inputCity = document.getElementById("city");

  inputId.value = inmuebleJSON[0].idInmueble;
  inputNumRooms.value = inmuebleJSON[0].NumHabitaciones;
  inputNumBathrooms.value = inmuebleJSON[0].NumBa\u00f1os;
  if(inmuebleJSON[0].MascotasPermitidas == 1)
    mascotasSi.checked = true;
  else
    mascotasNo.checked = true;
  inputMaxCapacity.value = inmuebleJSON[0].CapacidadMaxima;
  inputCost.value = inmuebleJSON[0].CostoPorMes;
  inputStreet.value = inmuebleJSON[0].Calle;
  inputExtNumber.value = inmuebleJSON[0].NumeroExterior;
  inputNeighborhood.value = inmuebleJSON[0].Colonia;
  inputCity.value = inmuebleJSON[0].Estado;
}
