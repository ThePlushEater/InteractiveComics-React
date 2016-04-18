<?php
  header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");

  require('database.php');

  switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
      //create();
      break;
    case 'GET':
      read();
      break;
    case 'PUT':
      update();
      break;
    case 'DELETE':
      //delete();
      break;
  }

  function read() {
    $data = json_decode(file_get_contents('php://input'));
    $params = null;
    if ($data != null) {
      $params = array(
        "id" => $data->{'id'},
      );
    } else {
      $params = array(
        "id" => $_GET['id'],
      );
    }
    $sql = "SELECT * FROM `choice` WHERE (`id` = :id)";
    try {
      $pdo = getConnection();
      $stmt = $pdo->prepare($sql);
      $stmt->execute($params);
      $result = $stmt->fetchAll(PDO::FETCH_OBJ);
      $pdo = null;
      echo json_encode($result);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  }

  function update() {
    $data = json_decode(file_get_contents('php://input'));
    $params = null;
    if ($data != null) {
      $params = array(
        "id" => $data->{'id'},
        "choice1_total" => $data->{'choice1_total'},
        "choice2_total" => $data->{'choice2_total'}
      );
    }
    $sql = "UPDATE `choice` SET `choice1_total` = :choice1_total, `choice2_total` = :choice2_total WHERE (`id` = :id)";

    try {
        $pdo = getConnection();
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $sql = "SELECT * FROM `choice` WHERE (`id` = :id)";
        $params = array(
            "id" => $data->{'id'},
        );

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetch();
            $pdo = null;
            echo json_encode($result);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
  }
?>
