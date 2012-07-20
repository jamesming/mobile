<?php
$m3u=$_REQUEST['asin'];
//Byte receiver 
$output="http://www.amazon.com/gp/dmusic/media/sample.m3u/ref=dm_sp_smpl?ie=UTF8&catalogItemType=track&ASIN=" . $m3u;
echo file_get_contents($output);
?>