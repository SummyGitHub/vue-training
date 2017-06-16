var formidable = require('formidable')
var xlsx = require('node-xlsx')
var fs = require ('fs')
var path = require('path')

const DateFormat = function (date) {
	var date = new Date(date);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate()
	return year + '-' + month + '-' + day;
}

var savePic = function (file,dir) {
	if (/^image\/(jpg|jpeg|png|gif)$/.test(file.type)) {
		fs.renameSync(file.path,path.join(__dirname,dir+file.name));
		return '../'+dir+file.name;
	}else {
		return ''
	}
}

var saveFile = function (file,dir) {
	fs.renameSync(file.path,path.join(__dirname,dir+file.name));
	return '../'+dir+file.name;
}

const formParse = function (req,saveDir) {
	var promise = new Promise(function (resolve,reject) {
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8'; //设置编码
		form.keepExtensions = true;  //保留后缀
		form.maxFieldsSize = 2 * 1024 * 1024;  //文件大小
		form.type = true;
		form.uploadDir = path.join(__dirname,'../static/temp');
		form.parse(req, function (err, field, files) {
			if (err) {
				reject(err)
				throw err
			}
			var fileObj = {}
			for (key in files) {
				if (files[key].size == 0) {
					continue;
				} else {
					switch (key) {
						case 'pic':
							if (saveDir.pic.isRename) {
								fileObj.pic = savePic(files[key],saveDir.pic.path);
							}else {
								fileObj.pic = files[key].path;	
							}
							break;
						default:
							if (saveDir.file.isRename) {
								fileObj.file = saveFile(files[key],saveDir.file.path);
							}else {
								fileObj.file = files[key].path;
							}
							break;
					}
				}
			}
			resolve({field: field,files: fileObj});
		})
	})
	return promise;
}

const readExcel = function (path) {
	"use strict";
	let arr = [];
	const obj = xlsx.parse(fs.readFileSync(path));
	const excelObj = obj[0].data;
	for (let i in excelObj) {
		arr.push(excelObj[i]);
	}
	return arr;
}

module.exports = {
	savePic,
	saveFile,
	DateFormat,
	formParse,
	readExcel
}