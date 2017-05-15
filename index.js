var wallet_api_url = 'https://blockchain.info/ru/q/addressbalance/';
var ticker_api_url = 'https://blockchain.info/ru/ticker?cors=true';
var wallets = [
    '115p7UMMngoj1pMvkpHijcRdfJNXj6LrLn',
    '13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94',
    '12t9YDPgwueZ9NyMgw519p7AA8isjr6SMw',
    '1QAc9S5EmycqjzzWDc1yiWzr9jJLC8sLiY',
    '15zGqZCTcys6eCjDkE3DypCjXi6QWRV6V1',
];
var promises = [];
var btc = 0;
var usd = 0;
var wallets_interval = 10000; // 10 seconds
var ticker_interval = 300000; // 5 minutes

function updateAll() {
    btc = 0;

    updateWallets();
    updateTicker();

    Promise.all(promises).then(function(values) {
        wallets.forEach(function(item, i, arr) {
            var amount = values[i] / 100000000;
            btc += amount;
            $('.wallets > div .wallet').eq(i).html(amount);
        });

        var currency = values[5]['USD'];
        usd = btc * currency.buy;
        usd = currency.symbol + Math.round(usd).toLocaleString();
        $('#usd-total').html('(~' + usd + ')');

        btc = Math.round(btc * 100) / 100;
        $('#btc-total').html(btc);
    });
}

function updateWallets() {
    wallets.forEach(function(wallet, i, arr) {
        updateWallet(wallet);
    });
}

function updateWallet(wallet) {
    var url = wallet_api_url + wallet;
    promises.push($.get(url));
}

function updateTicker() {
    promises.push($.get(ticker_api_url));
}

$(document).ready(function() {
    // Init wallets
    updateAll();

    // Run wallets auto-update
    setInterval(updateWallets, wallets_interval);

    // Run ticker auto-update
    setInterval(updateTicker, ticker_interval);

    // Toggle Infection map
    $('[data-action="map"]').on('click', function() {
        var $map = $('#map');
        var $wrapper = $('#map .wrapper');
        var $iframe = $('<iframe src="https://intel.malwaretech.com/WannaCrypt.html"></iframe>');
        var visible = $map.hasClass('visible');

        if (visible) {
            $wrapper.empty();
            $('#map').removeClass('visible');
        } else {
            $wrapper.html($iframe);
            $('iframe', $wrapper).on('load', function() {
                $('#map').addClass('visible');
            });
        }
    });
});

