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
			url: 'https://coins.ph/api/v1/quote',
			type: 'get',
			dataType: 'json'
		}),
		$.ajax({
			url: 'https://cex.io/api/last_price/ETH/USD',
			type: 'get',
			dataType: 'json'
		})
	).promise().done(function (coinsPH, cexIO) {
		console.log(cexIO);
		alert("BUY PRICE: \n 1 BTC = ₱"+
			numberFormat(coinsPH[0].quote.ask, 2)+
			"\nSELL PRICE:\n 1 BTC = ₱"+numberFormat(coinsPH[0].quote.bid, 2)+
			"\nCEX.IO\n"+
			"1 ETH = $"+numberFormat(cexIO[0].lprice, 2)
		);
		
	});
});