<?php

if(isset($_POST['token'])) {
    $token = $_POST['token'];
}
if(isset($_POST['transaction_amount'])) {
    $transaction_amount = $_POST['transaction_amount'];
}
if(isset($_POST['installments'])) {
    $installments = $_POST['installments'];
}
if(isset($_POST['payment_method_id'])) {
    $payment_method_id = $_POST['payment_method_id'];
}
if(isset($_POST['email'])) {
    $email = $_POST['email'];
}

$accessToken = "TEST-3921891253635793-072103-59ad71bf891e0ceb0acd185714c2b5ac-592561525";
//API URL
//$url = 'https://api.mercadopago.com/v1/payments?access_token='.$accessToken;
//$url = 'https://api.mercadopago.com/v1/payments';

    require_once 'vendor/autoload.php';

    MercadoPago\SDK::setAccessToken($accessToken);

    $payment = new MercadoPago\Payment();
    $payment->transaction_amount = 102;
    $payment->token = "ff8080814c11e237014c1ff593b57b4d";
    $payment->description = "Aerodynamic Marble Coat";
    $payment->installments = 1;
    $payment->payment_method_id = "visa";
    $payment->payer = array(
    "email" => "archibald_wintheiser@yahoo.com"
    );

    $payment->save();


    echo $payment->status;

?>