function generateShitPost(text) {
	var result = '';
	for (var j = 1; j < text.length; j++) {
		for (var i = 0; i < text[j].length; i++) {
			result += ':regional_indicator_' + text[j].charAt(i) + ': ';
		}
		result += '\r\n';
	}

	return result;
}


module.exports = {
	generateShitPost:generateShitPost,
}