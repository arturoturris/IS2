<?php
require_once('db.php');

//TERMINAR CON LA APLICACION SI NO SE PUEDE CONECTAR CON LA BD
if($db->connect_errno){
  die("No se pudo establecer conexión con la base de datos. Error U#001");
}

//OBTENER LA ACCION DESEADA PARA LA TABLA usuario
$request = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'nothing';

switch($request){
  //REGISTRAR(PUBLICAR) UN NUEVO INMUEBLE
  case 'add':{
    $stmt = $db->prepare("INSERT INTO inmueble(Propietario,NumHabitaciones,NumBaños,MascotasPermitidas,CapacidadMaxima,CostoPorMes,Calle,NumeroExterior,Colonia,Estado) VALUES(?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param('iiiiidsiss',
      $_SESSION['userId'],
      $_POST['numRooms'],
      $_POST['numBathrooms'],
      $_POST['pets'],
      $_POST['maxCapacity'],
      $_POST['cost'],
      $_POST['street'],
      $_POST['extNumber'],
      $_POST['neighborhood'],
      $_POST['city']
    );
    $success = $stmt->execute();

    if(!$success){
      echo "error";
      break;
    }

    //ID GENERATED
    $id = $stmt->insert_id;

    //SAVE IMGAGE
    if (!empty($_FILES)){
      $dirImg = '../img/inmuebles/';
      $temp = explode(".", $_FILES["image"]["name"]);
      $newfilename = $id . '.' . end($temp);
      $imgSuccess = move_uploaded_file($_FILES["image"]["tmp_name"], $dirImg . $newfilename);

      if(!$imgSuccess){
        //ERROR
      }
      else{
        $stmt = $db->prepare('UPDATE inmueble SET imagen=? WHERE idInmueble=?');
        $stmt->bind_param('si',$newfilename,$id);
        $stmt->execute();
      }
    }

    header("Location: ../indexUser.php?page=inmuebles");
    break;
  }

  //SOLICITAR UN INMUEBLE
  case 'get':{
    $stmt = $db->prepare('SELECT * FROM inmueble WHERE idInmueble=?');
    $stmt->bind_param('i',$_REQUEST['id']);
    $stmt->execute();
    $result = $stmt->get_result();

    $properties = array();

    while($row = $result->fetch_assoc()){
      $properties[] = $row;
    }

    $stmt->close();
    $db->close();

    echo json_encode($properties);
    break;
  }

  //SOLICITAR TODOS LOS INMUEBLES
  case 'read':{
    $stmt = $db->prepare('SELECT * FROM inmueble');
    $stmt->execute();
    $result = $stmt->get_result();

    $properties = array();

    while($row = $result->fetch_assoc()){
      $properties[] = $row;
    }

    $stmt->close();
    $db->close();

    echo json_encode($properties);
    break;
  }

  //SOLICITAR TODOS LOS INMUEBLES DEL USUARIO CON SESION ABIERTA
  case 'readMyProperties':{
    $stmt = $db->prepare('SELECT * FROM inmueble WHERE Propietario=?');
    $stmt->bind_param('i',$_SESSION['userId']);
    $stmt->execute();
    $result = $stmt->get_result();

    $properties = array();

    while($row = $result->fetch_assoc()){
      $properties[] = $row;
    }

    $stmt->close();
    $db->close();

    echo json_encode($properties);
    break;
  }

  //ACTUALIZAR UN INMUEBLE Y SI IMAGEN (SI ES PROPORCIONADA)
  case 'update':{
    //CONSULTAR LA IMAGEN ACTUAL PARA EL INMUEBLE
    $stmtImg = $db->prepare('SELECT imagen FROM inmueble WHERE idInmueble=?');
    $stmtImg->bind_param('i',$_POST['id']);
    $stmtImg->execute();
    $result = $stmtImg->get_result()->fetch_assoc();
    $actualImage = $result['imagen'];
    $newImage;

    //SI NO SE INGRESO NINGUNA IMAGEN, ENTONCES DEJAR LA PASADA
    if ($_FILES['image']['size'] == 0){
      $newImage = $actualImage;
    }else{
      //IMAGEN PARA ACTUALIZAR
      $dirImg = '../img/inmuebles/';
      $temp = explode(".", $_FILES['image']['name']);
      $newfilename = $_POST['id'] . '.' . end($temp);
      //ELIMINAR LA IMAGEN PASADA
      if(file_exists($dirImg . $actualImage)){
        unlink($dirImg . $actualImage);
      }
      $imgUploaded = move_uploaded_file($_FILES["image"]["tmp_name"], $dirImg . $newfilename);
      $newImage = $newfilename;
    }

    //ACTUALIZAR LA INFORMACION
    $stmt = $db->prepare('UPDATE inmueble SET NumHabitaciones=?,NumBaños=?,MascotasPermitidas=?,CapacidadMaxima=?,CostoPorMes=?,Calle=?,NumeroExterior=?,Colonia=?,Estado=?,Imagen=? WHERE idInmueble=?');
    $stmt->bind_param('iiiidsisssi',
      $_POST['numRooms'],
      $_POST['numBathrooms'],
      $_POST['pets'],
      $_POST['maxCapacity'],
      $_POST['cost'],
      $_POST['street'],
      $_POST['extNumber'],
      $_POST['neighborhood'],
      $_POST['city'],
      $newImage,
      $_POST['id']
    );
    $updated = $stmt->execute();

    if(!$updated){
      //Error
    }

    $stmt->close();
    $db->close();

    header("Location: ../indexUser.php?page=misPublicaciones");
    break;
  }

  //ELIMINAR UN INMUEBLE Y SU IMAGEN
  case 'delete':{
    //OBTENER LA IMAGEN DEL INMUEBLE PARA SER ELIMINADA
    $stmtImg = $db->prepare('SELECT imagen FROM inmueble WHERE idInmueble=?');
    $stmtImg->bind_param('i',$_REQUEST['id']);
    $stmtImg->execute();
    $result = $stmtImg->get_result();
    $imgName = $result->fetch_assoc()['imagen'];
    $imgPath = '../img/inmuebles/';

    //SOLICITAR A BD ELIMINAR EL INMUEBLE
    $stmt = $db->prepare('DELETE FROM inmueble WHERE idInmueble=?');
    $stmt->bind_param('i',$_REQUEST['id']);
    $deleted = $stmt->execute();

    //ELIMINAR IMAGEN EN CASO DE EXISTIR
    if(($deleted) && ($imgName != '')){
      if(file_exists($imgPath . $imgName)){
        unlink($imgPath . $imgName);
      }
    }

    $stmt->close();
    $db->close();

    echo $deleted;
    break;
  }
}
