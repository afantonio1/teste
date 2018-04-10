<?php
  if(isset($_POST['message'])){
    // Unique identifier of the workspace.
    $workspace_id = 'Your workspace id.';
    // Release date of the API version in YYYY-MM-DD format.
    $release_date = 'Your service released date.';
    // Username of a user for the service credentials.
    $username = 'Your service credential username.';
    // Password of a user for the service credentials.
    $password = 'Your service credential password.';

    // Make a request message for Watson API in json.
    $data['input']['text'] = $_POST['message'];
    if(isset($_POST['context']) && $_POST['context']){
      $data['context'] = json_decode($_POST['context'], JSON_UNESCAPED_UNICODE);
    }
    $data['alternate_intents'] = false;
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);

    // Post the json to the Watson API via cURL.
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, 'https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/'.$workspace_id.'/message?version='.$release_date);
    curl_setopt($ch, CURLOPT_USERPWD, $username.":".$password);
    curl_setopt($ch, CURLOPT_POST, true );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    $result = trim( curl_exec( $ch ) );
    curl_close($ch);

    // Responce the result.
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
  }