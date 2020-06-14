<?php
include("php/db.php");
include("includes/headerUser.phtml");

$paginaSolicitada = isset($_REQUEST['page']) ? $_REQUEST['page'] : 'home';

//Carga para paginas solicitadas
switch($paginaSolicitada){
  case 'inmuebles':{
    include("views/inmuebles.phtml");
    break;
  }
  case 'nuevoInmueble':{
    include("views/inmueblesForm.phtml");
    break;
  }
  default:{
    include("views/home.phtml");
    break;
  }
}

include("includes/footer.phtml");
