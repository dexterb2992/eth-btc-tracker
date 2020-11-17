function numberFormat(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

chrome.browserAction.onClicked.addListener(function(tab) {
	$.when(
		$.ajax({
			url: 'https://quote.coins.ph/v1/markets/BTC-PHP',
			type: 'get',
			dataType: 'json',
		}),

		$.ajax({
			url: 'https://quote.coins.ph/v1/markets/ETH-PHP',
			type: 'get',
			dataType: 'json',
		}),

		$.ajax({
			url: 'https://quote.coins.ph/v1/markets/XRP-PHP',
			type: 'get',
			dataType: 'json',
		}),

		$.ajax({
			url: 'https://quote.coins.ph/v1/markets/BCH-PHP',
			type: 'get',
			dataType: 'json',
		}),
	).promise().done(function (btc, eth, xrp, bch) {
		console.log(btc);
		alert("BUY PRICE:" + 
			"\n1 BTC = ₱" + numberFormat(btc[0].market.ask, 2) +
			"\n1 BHC = ₱" + numberFormat(bch[0].market.ask, 2) +
			"\n1 ETH = ₱" + numberFormat(eth[0].market.ask, 2) +
			"\n1 XRP = ₱" + numberFormat(xrp[0].market.ask, 2) +
			"\n\nSELL PRICE:" + 
			"\n1 BTC = ₱" + numberFormat(btc[0].market.bid, 2) +
			"\n1 BHC = ₱" + numberFormat(bch[0].market.bid, 2) +
			"\n1 ETH = ₱" + numberFormat(eth[0].market.bid, 2) +
			"\n1 XRP = ₱" + numberFormat(xrp[0].market.bid, 2)	
		);
		
	});
});