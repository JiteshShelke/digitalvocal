<?php
date_default_timezone_set('Asia/Kolkata'); // Adjust timezone

$page = isset($_GET['page']) ? basename($_GET['page']) : 'unknown';
$ip = $_SERVER['REMOTE_ADDR'];
$time = date("Y-m-d H:i:s");

$log = "$time | $ip | $page\n";
file_put_contents("visit_log.txt", $log, FILE_APPEND); // Saves in forms/visit_log.txt
?>
