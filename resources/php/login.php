<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents(__DIR__."/logins.json");

    // Decode the JSON file
    $json_data = json_decode($json,true);

    $exists = false;
    //busca por todos os cadastros
    foreach($json_data as $login)
    {
        //verifica se o email e senha é igual
        if($login['email']==$_POST["email"] and $login['senha']==$_POST["senha"])
        {
            $exists = true;
            //faz login
            header('location: /aaa.html');
            echo 'sucesso';
            break;
        }
    }

    if($exists==false)
    {
        //Email ou senha incorreto
        echo "<script>alert('Email ou senha incorreto!!!');
        window.location.href='../../index.html';</script>";
    }
}