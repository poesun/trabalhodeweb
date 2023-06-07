<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents(__DIR__."/logins.json"); //espera um post

    // Decode the JSON file
    $json_data = json_decode($json,true);
    // array
    $form_data = Array (
        "name" => $_POST["nome"],
        "email" => $_POST["email"],
        "senha" => $_POST["senha"]
    );

    //modificação daora
    array_push($json_data,$form_data);
    // encode array to json
    $json = json_encode($json_data);
    //write json to file
    if (file_put_contents(__DIR__."/logins.json", $json))
    {
        echo "JSON file created successfully...";
        //header('location: http://localhost:8000/Login/index.html');
        header('location: /index.html');
        //header('location: file://///Login/index.html');
    }
    else 
    {
        echo "Oops! Error creating json file...";
    }
}