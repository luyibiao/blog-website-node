
function isString(variable) {
  return Object.prototype.toString.call(variable).indexOf('String') != -1;
}

function isNumeric(variable) {
  return !isNaN(parseFloat(variable)) && isFinite(variable);
}

function stringEncode(string) {
  string = isString(string) || isNumeric(string) ? String(string) : '';

  var code,
    i = 0,
    code_string = '',
    len = string.length;

  while(i < string.length) {
    code = string.charCodeAt(i);
    code_string += '' + String(code).length + code;
    i++;
  }

  return code_string;
}

function stringDecode(code) {
  var i = 0,
    code_len,
    decode_string = '';
  code = String(code);
  while(i < code.length) {
    code_len = +code.charAt(i);
    i++;
    decode_string += String.fromCharCode(+code.substr(i, code_len));
    i += code_len;
  }
  return decode_string;
}

module.exports = {
  stringEncode,
  stringDecode
}