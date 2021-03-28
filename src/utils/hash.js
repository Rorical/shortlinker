import CryptoJS from 'crypto-js'

function md5(str){
	return CryptoJS.MD5(str);
}

function sha256(str){
	return CryptoJS.SHA256(str);
}

function sha512(str){
	return CryptoJS.SHA512(str);
}

function base64(str){
	return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
}

export default {md5, sha256, sha512, base64}