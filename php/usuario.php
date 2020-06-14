<?php
require_once('db.php');

//TERMINAR CON LA APLICACION SI NO SE PUEDE CONECTAR CON LA BD
if($db->connect_errno){
  die("No se pudo establecer conexión con la base de datos. Error U#001");
}

//OBTENER LA ACCION DESEADA PARA LA TABLA usuario
$request = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'nothing';

switch($request){
  //AUTORIZAR LA ENTRADA AL SISTEMA Y REDIRIGIR A UN INDEX DIFERENTE PARA CADA USUARIO
  case 'authorize':{
    $stmt = $db->prepare("SELECT idUsuario FROM usuario WHERE usuario=? AND contrasegna=?");
    $stmt->bind_param('ss',$_POST['username'],$_POST['password']);
    $stmt->execute();
    $result = $stmt->get_result();
    $authorized = ($result->num_rows > 0);

    //Si los datos no son correctos, desplegar un mensaje
    if(!$authorized){
      $_SESSION['unauthorized'] = true;

      $stmt->close();
      $db->close();
      header("Location: ../index.php?page=logIn");
      break;
    }

    //Se encontró al usuario y los datos son correctos
    $row = $result->fetch_assoc();
    $_SESSION['userId'] = $row['idUsuario'];
    $_SESSION['username'] = $_POST['username'];

    $stmt->close();
    $db->close();

    header("Location: ../indexUser.php?page=home");
    break;
  }

  //REGRESAR LA SESSION ABIERTA
  case 'session':{
    $session;

    if(!isset($_SESSION['userId'])){
      $session = 0;
    }
    else{
      $session = array('userId' => $_SESSION['userId'], 'userType' => $_SESSION['userType'], 'username' => $_SESSION['username']);
      $session = json_encode($session);
    }

    echo $session;
    break;
  }

  //AGREGAR UN USUARIO A LA BD
  case 'add':{
    $stmt = $db->prepare('INSERT INTO persona(Nombre,Paterno,Materno,Estado,Pais,Email) VALUES(?,?,?,?,?,?)');
    $stmt->bind_param('ssssss',$_POST['name'],$_POST['lastname1'],$_POST['lastname2'],$_POST['city'],$_POST['country'],$_POST['email']);
    $stmt->execute();
    $id = $stmt->insert_id;

    $stmt = $db->prepare("INSERT INTO usuario(idPersona,Usuario,Contrasegna) VALUES(?,?,?)");
    $stmt->bind_param('iss',$id,$_POST['username'],$_POST['password']);
    $success = $stmt->execute();

    if(!$success){
      $_SESSION['message'] = "No se ha podido registrar al usuario.";
      $_SESSION['message_type'] = 'danger';
    }else{
      $_SESSION['message'] = "El usuario ha sido registrado.";
      $_SESSION['message_type'] = 'success';
    }

    $stmt->close();
    $db->close();

    header("Location: ../index.php?page=signUp");
    break;
  }

}
