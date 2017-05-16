<!DOCTYPE html>
<?php
function wannacry_total() {
  $wallet_list = array('115p7UMMngoj1pMvkpHijcRdfJNXj6LrLn', '13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94', '12t9YDPgwueZ9NyMgw519p7AA8isjr6SMw');
  $wal_url = 'https://blockchain.info/multiaddr?cors=true&active=';
  $btc_conv_rate = 100000000;
  $total = 0;

  foreach ($wallet_list as $wallet) {
    $json_obj = json_decode(file_get_contents($wal_url.$wallet), true);
    $total += $json_obj['wallet']['final_balance'];
  }

  $json_obj = json_decode(file_get_contents('https://blockchain.info/ticker'), true);
  $btc_to_usd = $json_obj['THB']['buy'];

  return $btc_to_usd * ($total / $btc_conv_rate);
}
?>
<html>
<body>
<h3>WannaCry?</h3>
<p>Wannacry collected <?php printf("%01.2f", wannacry_total());  ?> USD so far.</p>
</body>
</html>