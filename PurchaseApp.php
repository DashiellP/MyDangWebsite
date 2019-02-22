<? php

$input = file_get_contents("php://input");
$event = json_decode($input);
echo "ding";