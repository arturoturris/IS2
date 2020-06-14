<?php
include("php/db.php");
include("includes/header.phtml");

$paginaSolicitada = isset($_REQUEST['page']) ? $_REQUEST['page'] : 'home';

//Carga para paginas solicitadas
switch($paginaSolicitada){
  case 'inmuebles':{
    include("views/inmuebles.phtml");
    break;
  }
  case 'logIn':{
    include("views/logInForm.phtml");
    break;
  }
  case 'signUp':{
    include("views/signUpForm.phtml");
    break;
  }
  default:{
    include("views/logInForm.phtml");
    break;
  }
}

include("includes/footer.phtml");
