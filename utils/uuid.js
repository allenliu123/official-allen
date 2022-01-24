
const generateUUID = function() {
	var s = [];
  var hexDigits = "0123456789abcdef";
  s[0] = 't';
  s[1] = 'g';
	for (var i = 2; i < 16; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	var uuid = s.join("");
	return uuid;
}

module.exports = generateUUID