<?php
    $secretPass = "";
    $frontPass = json_decode(file_get_contents('php://input'), true)["password"];
    $validationOk = $frontPass == $secretPass && $secretPass != "";
?>