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

function getNextColor(int) {
	const CYCLE = 12; // Number of colors before the cycle repeats
	const SATURATION = [64, 64, 64]; // Hue; 0 = greyscale, 127 = high saturation
	const BRIGHTNESS = [191, 191, 191]; // Brightness; 0 = dark, 255 = bright

	const r = Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int) * SATURATION[0]) + BRIGHTNESS[0];
	const g = Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int + (Math.PI * 2) / 3) * SATURATION[1]) + BRIGHTNESS[1];
	const b = Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int + (Math.PI * 4) / 3) * SATURATION[2]) + BRIGHTNESS[2];
	return r * 65536 + g * 256 + b;

}module.exports = {
	generateShitPost:generateShitPost,
	getNextColor:getNextColor
}