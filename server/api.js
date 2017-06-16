const express = require('express')
const router = express.Router()
const db = require('./setup')
const fs = require('fs')
const path = require('path')
const dateFormat = require('./utils').DateFormat
const formParse = require('./utils').formParse
const readExcel = require('./utils').readExcel

router.post('/api/saveFile', (req,res) => {
	formParse(req,{file: {path: '../static/files/',isRename: true}})
	.then(obj => {
		res.send({code: 100,data: obj.files.file,msg: '存储成功！'});
	})
});

router.post('/api/savePic', (req,res) => {
	formParse(req,{pic: {path:'../static/images/',isRename: true}})
	.then(obj => {
		res.send({code: 100,data: obj.files.pic,msg: '存储成功！'});
	})
});


router.get('/api/getAllLinks', (req, res) => {
	db.getConnection (function (err,connection) {
		if (err) {
			return;
		}
		var sqlStr = 'select * from source,profession,college,courses,users where source.author=users.sid and source.courseId = courses.courseId group by source.sourceId order by source.createDate desc limit '+((req.query.curr-1) * req.query.size)+',' + req.query.size;
		connection.query({sql:sqlStr},function (err,results,field) {
			if (err) {
				throw err;
			}
			connection.query({sql: 'select count(*) as size from source'},function (err,size) {
				connection.release();
				if (err) {
					throw err
				}
				if (results) {
					var data = [];
					for (var i = 0; i < results.length; i++) {
							data.push({ 
								sourceId: results[i].sourceId,
								sid: results[i].sid,
								filename: results[i].filename,
								link: results[i].link,
								createDate: dateFormat(results[i].createDate),
								// updateDate: dateFormat(results[i].updateDate),
								downloadTimes: results[i].downloadTimes,
								filetype: results[i].filetype,
								type: results[i].type,
								username: results[i].username,
								summary: results[i].summary,
								qq: results[i].qq,
								img: results[i].img,
								email: results[i].email,
								grade: results[i].grade,
								collegeId: results[i].collegeId,
								college: results[i].collegeName,
								majorId: results[i].majorId,
								majorName: results[i].majorName,
								courseId: results[i].majorId,
								course: results[i].courseName,
								sex: results[i].sex,
								isTeacher: results[i].isTeacher
							})
						}
					res.send({code: 100,data: data,total: size[0].size,msg: "请求成功！"})
				}else {
					res.send({code: 101,data: [],msg:"请求失败！"})
				}
			})
			
		});
	});
});

router.get('/api/getLinksByFilter', (req, res) => {
	var str = '',str1 = '',str2 = '',str3 = '',str4 = '',str5 = '';
	var courseId = req.query.courseId,
			filetype = req.query.filetype,
			type = req.query.type,
			searchQ = req.query.searchQ
	if (!req.body) {
			res.send({code: 102,data: [],msg: '参数值为空！'})
	}else {
		db.getConnection (function (err,connection) {
				str = 'select * from source left join courses on source.courseId=courses.courseId left join users on source.author=users.sid where ';
				if (courseId) {
					if (filetype || type || searchQ) {
						str1 = 'source.courseId = ' + courseId + ' and ';
					} else {
						str1 = 'source.courseId = ' + courseId;
					}
				}
				if (filetype) {
					if (type || searchQ) {
						str2 = 'source.filetype = "' + filetype + '" and ';
					}else {
						str2 = 'source.filetype = "' + filetype + '"';
					}
				}
				if (type) {
					if (searchQ) {
						str3 = 'source.type = "' + type + '" and ';
					}else {
						str3 = 'source.type = "' + type + '"';
					}
				}
				if (searchQ) {
					str4 = 'source.filename like "%' + searchQ + '"'
				}
			var filterStr = (str1 ? str1 : '') + (str2 ? str2 : '') + (str3 ? str3 : '') + (str4 ? str4 : '');
			var sqlStr = str + filterStr + ' group by source.sourceId limit '+((req.query.curr-1) * req.query.size)+',' + req.query.size;
			connection.query({sql:sqlStr},function (err,result,field) {
				if (err) {
					throw err
				}
				var sqlStr2 = 'select count(*) as size from (select source.sourceId from source left join users on source.author=users.sid where ' 
				            + filterStr + ' group by source.sourceId)s';
				connection.query({sql:sqlStr2},(err,size) => {
					connection.release();
					if (err) {
						throw err
					}
					if (result) {
						var data = [];
						for (var i = 0; i < result.length; i++) {
							data.push({ 
								sourceId: result[i].sourceId,
									sid: result[i].sid,
									filename: result[i].filename,
									link: result[i].link,
									createDate: dateFormat(result[i].createDate),
									// updateDate: dateFormat(result[i].updateDate),
									downloadTimes: result[i].downloadTimes,
									filetype: result[i].filetype,
									type: result[i].type,
									username: result[i].username,
									summary: result[i].summary,
									qq: result[i].qq,
									img: result[i].img,
									email: result[i].email,
									grade: result[i].grade,
									collegeId: result[i].collegeId,
									college: result[i].collegeName,
									majorId: result[i].majorId,
									majorName: result[i].majorName,
									corseId: result[i].courseId,
									course: result[i].courseName,
									sex: result[i].sex,
							});
						}
						res.send({code: 100,data: data,total: size[0].size,msg: '请求成功！'})
					}else {
						res.send({code: 101,data: [],msg: '请求成功！'})
					}
				})
				
			})
		})
	}
	
});

router.get('/api/getHotLinks',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {throw err}
		var sqlStr = 'select * from source left join courses on source.courseId = courses.courseId left join users on source.author=users.sid group by source.sourceId order by downloadTimes desc limit '+ (req.query.curr-1) * req.query.size + ','+req.query.size;
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) {throw err}
			if (results) {
					var data = [];
					for (var i = 0; i < results.length; i++) {
							data.push({ 
								sourceId: results[i].sourceId,
								sid: results[i].sid,
								filename: results[i].filename,
								link: results[i].link,
								createDate: dateFormat(results[i].createDate),
								// updateDate: dateFormat(results[i].updateDate),
								downloadTimes: results[i].downloadTimes,
								filetype: results[i].filetype,
								type: results[i].type,
								username: results[i].username,
								summary: results[i].summary,
								qq: results[i].qq,
								img: results[i].img,
								email: results[i].email,
								grade: results[i].grade,
								collegeId: results[i].collegeId,
								college: results[i].collegeName,
								majorId: results[i].majorId,
								majorName: results[i].majorName,
								courseId: results[i].majorId,
								course: results[i].courseName,
								sex: results[i].sex,
								isTeacher: results[i].isTeacher
							})
						}
					res.send({code: 100,data: data,msg: "请求成功！"})
				}else {
					res.send({code: 101,data: [],msg:"请求失败！"})
				}
		});
	})
});

router.get('/api/getLinkByType', (req, res) => {
	if (!req.body) {
			res.send({code: 102,data: [],msg: '参数值为空！'})
	}else {
		db.getConnection (function (err,connection) {
			var sqlStr = 'select * from source left join courses on source.courseId = courses.courseId left join users on source.author=users.sid where courses.type="' +req.query.type + '" limit ' + (req.query.pageSettings.curr-1) * req.query.pageSettings.size + ','+req.query.pageSettings.size;
			connection.query({sql:sqlStr},function (err,result,field) {		
				if (err) {
					connection.release();
					throw err
				}
				connection.query({sql:'select count(*)  as size from source where type="' + req.query.type + '"' },function (err,size) {
					connection.release();
					if (err) {
						throw err
					}
					if (result) {
						var data = [];
						for (var i = 0; i < result.length; i++) {
							data.push({ 
								sourceId: result[i].sourceId,
								filename: result[i].filename,
								link: result[i].link,
								createDate: dateFormat(result[i].createDate),
								// updateDate: dateFormat(result[i].updateDate),
								downloadTimes: result[i].downloadTimes,
								filetype: result[i].filetype,
								username: result[i].username,
								summary: result[i].summary,
								type: result[i].type,
								qq: result[i].qq,
								img: result[i].img,
								email: result[i].email,
								grade: result[i].grade,
								collegeId: result[i].collegeId,
								college: result[i].collegeName,
								major: result[i].majorName,
								majorId: result[i].majorId,
								corseId: result[i].courseId,
								course: result[i].courseName,
								sex: result[i].sex
							});
						}
						res.send({code: 100,data: data,total:size[0].size,msg: '请求成功！'})
					}else {
						res.send({code: 101,data: [],msg: '请求成功！'})
					}
				})
				
			})
		})
	}
});

router.post('/api/deleteArticleById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'delete from source where sourceId = ' + req.body.id;
		connection.query({sql:sqlStr},(err,result) => {
			if (err) { throw err}
			if (result.affectedRows > 0) {
				res.send({code: 100,msg: '删除成功！'});
			} else {
				res.send({code: 102,msg: '删除失败！'});
			}
		});
	});
});

router.post('/api/saveArticle', (req, res) => {
	db.getConnection ((err,connection) => {
		if (err) {
			throw err
		}
		formParse(req,{pic: {path:'../static/images/',isRename: true},file:{path: '../static/files/',isRename: true}})
		.then((obj) => {
			var field = obj.field;
			var files = obj.files;
			var data = {
				'title': field.title,
				'filetype': field.filetype,
				'courseId': field.courseId,
				'summary': field.summary,
				'author': field.author,
				'type': field.type,
				'createDate': field.createDate,
				// 'updateDate': field.updateDate,
				'file': field.fileUrl
			}
			var sqlStr = 'insert into source (filename,filetype,courseId,createDate,downloadTimes,link,author,summary) '
			           + 'values("'+data.title+'","'+data.filetype+'",'+data.courseId+',"'+dateFormat(data.createDate)+'",0,"'+data.file+'","'+data.author+'","'+(data.summary ? data.summary: null)+'")';
			connection.query({sql:sqlStr},function (err,result) {
				connection.release();
				if (err) {
					throw err
				}
				if (result.affectedRows > 0) {
					res.send({code: 100,data: [],msg: '添加成功！'});
				}else {
					res.send({code: 102,data: [],msg: '无添加项！'});
				}
			});
		});
	});
});

router.post('/api/downloadFile',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'update source set downloadTimes = downloadTimes + 1 where sourceId = ' + req.body.sourceId;
		connection.query({sql:sqlStr},(err,result)=> {
			if (err) {
				throw err
			}
			if (result.affectedRows > 0) {
				res.send({code: 100,msg: '下载成功！'});
			}else {
				res.send({code: 102,msg: '下载失败！'});
			}
		})
	})
});

router.get('/api/getColleges', (req, res) => {
	db.getConnection (function (err,connection) {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from college';
		connection.query({sql:sqlStr},function (err,result,field) {
			connection.release();
			if (err) {
				throw err
			}
			if (result) {
				res.send({code: 100,data: result,msg: "请求成功！"})
			}else {
				res.send({code: 101,data: [],msg:"请求失败！"})
			}
		});
	});
});

router.get('/api/getMajors', (req, res) => {
	db.getConnection (function (err,connection) {
		var sqlStr = 'select * from profession';
		connection.query({sql:sqlStr},function (err,result,field) {
			connection.release();
			if (err) {
				throw err
			}
			if (result) {
				res.send({code: 100,data: result,msg: "请求成功！"})
			}else {
				res.send({code: 101,data: [],msg:"请求失败！"})
			}
		});
	});
});

router.get('/api/getMajorByColege', (req, res) => {
	if (!req.query) {
			res.send({code: 102,msg: '参数值为空！'})
	}else {
		db.getConnection (function (err,connection) {
			var sqlStr = 'select * from profession where collegeId ="'+req.query.collegeId + '"';
			connection.query({sql:sqlStr},function (err,result) {
				connection.release();
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,data: result,msg: '请求成功！'})
				}else {
					res.send({code: 101,data: [],msg: '请求失败！'})
				}
			});
		});
	}
	
});

router.get('/api/getCourses', (req, res) => {
	db.getConnection (function (err,connection) {
		var sqlStr = 'select * from courses';
		connection.query({sql:sqlStr},function (err,result,field) {
			connection.release();
			if (err) {
				throw err
			}
			if (result) {
				res.send({code: 100,data: result,msg: "请求成功！"})
			}else {
				res.send({code: 101,data: [],msg:"请求失败！"})
			}
		});
	});
});

router.get('/api/getMajorByColege', (req, res) => {
	if (!req.query) {
			res.send({code: 102,msg: '参数值为空！'})
	}else {
		db.getConnection (function (err,connection) {
			var sqlStr = 'select * from profession where collegeId ="'+req.query.collegeId + '"';
			connection.query({sql:sqlStr},function (err,result) {
				connection.release();
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,data: result,msg: '请求成功！'})
				}else {
					res.send({code: 101,data: [],msg: '请求失败！'})
				}
			});
		});
	}
	
});

router.get('/api/getCourseByMajor', (req, res) => {
	if (!req.query) {
			res.send({code: 102,msg: '参数值为空！'})
	}else {
		db.getConnection (function (err,connection) {
			var sqlStr = 'select * from courses where majorId ="'+req.query.majorId + '"';
			connection.query({sql:sqlStr},function (err,result) {
				connection.release();
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,data: result,msg: '请求成功！'})
				}else {
					res.send({code: 101,data: [],msg: '请求失败！'})
				}
			});
		});
	}
	
});

router.get('/api/getRankLists',(req, res) => {
	db.getConnection(function (err,connection) {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from (select *,count(answerId) as times from answers left join users on users.sid = answers.observerId group by observerId)list ORDER BY list.times desc limit 0,8'
		connection.query({sql:sqlStr},function (err,result) {
			connection.release();
			if (err) {
				throw err
			}
			if (result) {
				result.forEach( function(element) {
					element.createDate = dateFormat(element.createDate);
				});
				res.send({code:100,data:result,msg:"查询成功！"});
			}else {
				res.send({code:102,msg:"未知错误！"});
			}
		});
	});
});

router.get('/api/getLastedTopicLists',(req,res) => {
	db.getConnection( (err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from (select questions.questionId,questions.question,questionInfo,questions.createDate,questions.questioner,count(answers.answerId)as answerCount from questions left join answers on questions.questionId = answers.questionId GROUP BY questions.questionId)s left join users on s.questioner = users.sid ORDER BY s.createDate desc limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr},(err,result) => {
			connection.release();
			if (err) {
				throw err
			}
			if (result) {
				result.forEach((element) => {
					element.createDate = dateFormat(element.createDate);
				});
				res.send({code:100,data:result,msg:'查询成功！'});
			}else {
				res.send({code:102,msg:'未知错误！'});
			}
		});
	});
});

router.get('/api/getHotTopicLists',(req,res) => {
	db.getConnection((err,connection) =>{
		if (err) {
			throw err
		}
		var sqlStr = 'select * from (select questions.questionId,questions.question,questions.createDate,questions.questioner,answers.praise,count(answers.answerId)as answerCount from questions left join answers on questions.questionId = answers.questionId GROUP BY questions.questionId)s left join users on s.questioner = users.sid ORDER BY s.answerCount + s.praise desc limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr}, function (err,results) {
			connection.release();
			if (err) {
				throw err
			}
			if (results) {
				results.forEach( function(element) {
					element.createDate = dateFormat(element.createDate);
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg:'未知错误！'});
			}
		});
	});
});

router.get('/api/getUnanswerTopicLists',(req,res) => {
	db.getConnection(function (err,connection) {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from (select questions.questionId,questions.question,questions.createDate,questions.questioner,count(answers.answerId)as answerCount from questions left join answers on questions.questionId = answers.questionId GROUP BY questions.questionId)s left join users on s.questioner = users.sid where s.answerCount = 0 limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr}, function (err,results) {
			connection.release();
			if (err) {
				throw err
			}
			if (results) {
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg:'未知错误！'});
			}
		});
	});
});

router.get('/api/getTopicById',(req,res) => {
	db.getConnection(function (err,connection) {
		if (err) {
			throw err
		}
		var sqlStr = 'select questionId,createDate,question,questionInfo,courseName,questioner,username from questions,courses,users where questions.type = courses.courseId and questions.questioner = users.sid and questions.questionId=' + req.query.questionId + ' group by questions.questionId';
		connection.query({sql:sqlStr}, function (err,result) {
			if (err) {
				throw err
			}else {
				connection.query({sql:'select * from answers,users where users.sid=answers.observerId and answers.questionId='+req.query.questionId + ' group by answerId'},function (err, results) {
					connection.release();
					if (err) {
						throw err
					}
					if (result) {
						result.forEach( function(element) {
							element.createDate = dateFormat(element.createDate);
						});
						results.forEach( function(element) {
							element.answerDate = dateFormat(element.answerDate);
						});
						res.send({code:100,data:result,answers:results,msg:'查询成功！'});
					}else {
						res.send({code:102,msg:'未知错误！'});
					}
				})
			}
		});
	});
});

router.post('/api/saveQuestion', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		formParse(req)
		.then(obj => {
			var data = obj.field;
			var sqlStr = "insert into questions (questioner,createDate,type,question,questionInfo) values("
								 +data.userId+",'"+dateFormat(data.createDate)+"',"+data.type+",'"+data.question+"','"+data.questionInfo+"')";
			connection.query({sql:sqlStr},(err,result) => {
				if (err) {
					throw err
				}
				if (result.affectedRows > 0) {
					res.send({code: 100, msg: '添加成功！'});
				}else {
					res.send({code: 102, msg: '添加失败！'});
				}
			});
		});	
	});
});

router.get('/api/getBySearch', (req,res) => {
	db.getConnection(function (err,connection) {
		if (err) {
			throw err
		}
		if (!req.query) {
			res.send({code:101,msg:'参数值为空！'});
		}else {
			var sqlStr = 'select * from questions where question like "%'+req.query.str+'%"';
			connection.query({sql:sqlStr},function (err,results) {
				connection.release();
				if (err) {
					throw err
				}
				if (results) {
					results.forEach( (result) => {
						result.createDate = dateFormat(result.createDate);
					});
					res.send({code:100,data:results,msg:'查询成功！'});
				}else {
					res.send({code:102,msg:'未知错误！'});
				}
			});
		}		
	});
});

router.get('/api/getInfoById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from users,college,profession where sid = '+ req.query.userId + ' group by sid';
		connection.query({sql:sqlStr},(err,result,field) => {
			connection.release();
			if (err) {
				throw err
			}
			if (result) {
				res.send({code: 100,data:result[0],msg: "查询成功！"});													
			}
		});
	});
});

router.get('/api/getAnswerListById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from answers,questions where answers.observerId = '+ req.query.userId + ' GROUP BY answers.answerId order by praise limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr},(err,result,field) => {
			if (err) {
				throw err
			}
			connection.query({sql:'select count(*) as size from answers where answers.observerId = '+ req.query.userId},(err,size) => {
				connection.release();
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,data:result,total:size[0].size,msg: "登陆成功！"});													
				}
			});
		});
	});
});

router.get('/api/getSourceListById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from source,users where source.author = '+ req.query.userId + ' GROUP BY sourceId limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr},(err,result,field) => {
			if (err) {
				throw err
			}
			connection.query({sql:'select count(*) as size from source where source.author = ' + req.query.userId },(err,size) => {
				connection.release();
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,data:result,total:size[0].size,msg: "登陆成功！"});													
				}
			})
			
		});
	});
});

router.get('/api/getQuestionListById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from questions where questioner = '+ req.query.userId + ' limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr},(err,result,field) => {
			if (err) {
				throw err
			}
			connection.query({sql:'select count(*) as size from questions where  questioner = '+ req.query.userId},(err,size) => {
				connection.release();
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,data:result,total:size[0].size,msg: "登陆成功！"});													
				}
			});
		});
	});
});

router.get('/api/getCoursesTeach',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select *,count(*) as total from relation LEFT JOIN courses on relation.courseId = courses.courseId and teacherId = ' + req.query.userId;
		connection.query({sql:sqlStr},(err,result) => {
			connection.release();
			if (err) { throw err}
			if (result) {
				res.send({code:100,data: result,total: result.length, msg:'查询成功！'});
			}
		});
	});
});

router.get('/api/getUsersByFilter',(req,res) => {
	var sqlStr1 = '',sqlStr2 = '' 
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		if (req.query.isTeacher == 0) {
			sqlStr1 = 'select * from users,college,profession where users.collegeId = college.collegeId and users.majorId = profession.majorId and isTeacher=0' + ' limit ' + ((req.query.curr-1) * req.query.size)+ ',' + req.query.size;
			sqlStr2 = 'select count(*) as size from users where isTeacher=0';
		}else {
			sqlStr1 = 'select * from users left join college on users.collegeId = college.collegeId where isTeacher=1' + ' limit ' + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
			sqlStr2 = 'select count(*) as size from users where isTeacher=1';
		}	
		connection.query({sql:sqlStr1},(err,results,field) => {
			if (err) {
				throw err;
			}
			connection.query({sql: sqlStr2},(err,size) => {
				if (err) {
					throw err
				}
				if (results && size) { 
					res.send({code: 100,data:results,page:size[0].size,msg:'查询失败！'});								
				}
			});
		});
	});
});

router.get('/api/getUserById',(req,res) => {	
	var sqlStr = '';
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		if (req.query.isTeacher == 0) {
			sqlStr = 'select * from users,college,profession where users.collegeId = college.collegeId and users.majorId = profession.majorId and id=' + req.query.id;			
		}else if (req.query.isTeacher == 1) {
			sqlStr = 'select * from users,college,profession where users.collegeId = college.collegeId and id=' + req.query.id;
		}	
		connection.query({sql:sqlStr},(err,result,field) => {
			connection.release();
			if (err) {
				throw err
			}	
			if (result) { 
				res.send({code: 100,data:result[0],msg: "查询成功！"});													
			}			
		});
	});
});

router.post('/api/saveUsersByGroup',(req,res) => {
	"use strict";
	var str1 = '';
	formParse(req,{file: {isRename: false}})
	.then((obj)=> {
		if (obj.field.isTeacher == 0) {
			str1 =  'INSERT INTO users (commentCount,questionCount,isTeacher,sid,username,password,sex,collegeId,majorId,grade,class,portrait,qq,email,tel) VALUES (0,0,0,';
		} else if (obj.field.isTeacher == 1) {
			str1 = 'INSERT INTO users (commentCount,questionCount,isTeacher,sid,username,password,sex,collegeId,rank,portrait,qq,email,tel) VALUES (0,0,1,';
		}
		
		var str = '';
		var file = obj.files.file;
		var arr = readExcel(file);
		var sqlArr = [];
		db.getConnection(function (err,connection) {
			if (err) {
				throw err
			}
			for (let i=1;i<arr.length;i++) {				
				for (let j in arr[i]) {
					if (j != arr[i].length - 1) {
						str += arr[i][j] ? ('"' + arr[i][j] +'",') : null;
					} else {
						str += '"'+(arr[i][j] ? arr[i][j] : null) +'")';
					}	
				}
				var sqlStr = str1 + str;
				str = '';	
				sqlArr.push(sqlStr);
			}
			sqlArr.forEach((sql) => {
				connection.query({sql: sql},(err,result) => {
					if (err) {
						throw err
					}
					if (result.affectedRows == 0) {
					}
				});	
			})	
			connection.release();
			res.send({code: 100,msg: '批量添加成功！'});
		});
	})
});

router.post('/api/saveUser',(req,res) => {
	formParse(req,{pic: {path: '../static/images/',isRename: true}})
	.then((obj) => {
		var sqlStr = '';
		var field = obj.field;
		var data = {
			'sid': field.sid,
			'username': field.username,
			'password': field.password,
			'sex': field.sex,
			'collegeId': field.collegeId,
			'majorId': field.majorId,
			'rank': field.rank,
			'grade': field.grade,
			'class': field.Class,
			'portrait': files.pic ? files.pic : field.portrait,
			'qq': field.qq,
			'email': field.email,
			'tel': field.tel
		};
		db.getConnection((err,connection) => {
			if (err) {
				throw err
			}
			if (field.isTeacher == 0) {
				sqlStr = 'INSERT INTO users (commentCount,questionCount,isTeacher,sid,username,password,sex,collegeId,majorId,grade,class,portrait,qq,email,tel) VALUES (0,0,0,"'
			       +data.sid+'","'+data.username+'","'+data.password+'","'+data.sex+'",'+data.collegeId+','+data.majorId+','+data.grade+','+data.class
			       +',"'+data.portrait+'","'+data.qq+'","'+data.email+'",'+data.tel + ')';
			}else if (field.isTeacher == 1) {
				sqlStr = 'INSERT INTO users (commentCount,questionCount,isTeacher,sid,username,password,sex,collegeId,rank,portrait,qq,email,tel) VALUES (0,0,1,"'
			       +data.sid+'","'+data.username+'","'+data.password+'","'+data.sex+'",'+data.collegeId+',"'+data.rank+'","'+data.portrait+'","'+data.qq+'","'+data.email+'",'+data.tel + ')';
			}
			connection.query({sql:sqlStr},(err,result) => {
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,msg: '添加成功！'});
				}else {
					res.send({code: 102,msg: '添加失败！'});
				}
			});
		});
	});
});

router.post('/api/updateUser',(req,res) => {
	formParse(req,{pic: {path: '../static/images/',isRename: true}})
	.then((obj) => {
		var field = obj.field;
		var files = obj.files;
		var sqlStr = '';
		var data = {
			'sid': field.sid,
			'username': field.username,
			'password': field.password,
			'sex': field.sex,
			'collegeId': field.collegeId,
			'majorId': field.majorId,
			'rank': field.rank,
			'grade': field.grade,
			'class': field.Class,
			'portrait':  files.pic ? files.pic : field.portrait,
			'qq': field.qq,
			'email': field.email,
			'tel': field.tel
		};
		db.getConnection((err,connection) => {
			if (err) {
				throw err
			}
			if (field.isTeacher == 0) {
				sqlStr = 'update users set username = "'+data.username+'",password = "'+data.password+'",sex = "'+data.sex+'",collegeId = "'+data.collegeId+'",'
			       + 'majorId = "'+data.majorId+'",grade = "'+data.grade+'",class = "'+data.class+'",portrait = "'+data.portrait+'",qq = "'+data.qq+'",'
			       + 'email = "'+data.email+'",tel = "'+data.tel+'" where sid = ' + data.sid;
			}else if (field.isTeacher == 1) {
				sqlStr = 'update users set username = "'+data.username+'",password = "'+data.password+'",sex = "'+data.sex+'",collegeId = "'+data.collegeId+'",'
			         + 'rank = "'+data.rank+'",portrait = "'+data.portrait+'",qq = "'+data.qq+'",'
			         + 'email = "'+data.email+'",tel = "'+data.tel+'" where sid = ' + data.sid;
			}
			connection.query({sql:sqlStr},(err,result) => {
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,msg: '修改成功！'});
				}else {
					res.send({code: 102,msg: '修改失败！'});
				}
			});
		});
	});
});

router.post('/api/deleteUserById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'delete from users where sid = ' + req.body.id;
		connection.query({sql:sqlStr},(err,result) => {
			if (err) {
				throw err
			}
			if (result.affectedRows > 0) {
				res.send({code:100,data:[],msg: '删除成功！'});
			} else {
				res.send({code: 102,data: [],msg: '删除失败！'});
			}
			
		})
	})
});

router.get('/api/getCoursesByFilter',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'select * from courses,profession,college where courses.majorId = profession.majorId and profession.collegeId = college.collegeId group by college.collegeId,profession.majorId,courses.courseId limit '
							 + ((req.query.curr-1) * req.query.size) + ',' + req.query.size;
		connection.query({sql:sqlStr},(err,result,field) => {
			if (err) {
				throw err
			}
			connection.query({sql:'select count(*) as size from courses'},(err,size) => {
				connection.release();
				if (err) {
					throw err
				}
				if (result && size) {
					res.send({code: 100,data:result,page:size[0].size,msg: "登陆成功！"});													
				}
			});	
		});
	});
});

router.get('/api/getCourseById',(req,res) => {	
	var sqlStr = '';
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		sqlStr = 'select * from courses,profession,college where courses.majorId = profession.majorId and profession.collegeId = college.collegeId and courseId=' + req.query.id;			
		connection.query({sql:sqlStr},(err,result,field) => {
			connection.release();
			if (err) {
				throw err
			}	
			if (result) { 
				res.send({code: 100,data:result[0],msg: "查询成功！"});													
			}			
		});
	});
});

router.post('/api/saveCoursesByGroup',(req,res) => {
	"use strict";
	var str1 = '';
	formParse(req,{file: {isRename: false}})
	.then((obj)=> {
		str1 =  'INSERT INTO courses (courseCode,courseName,majorId,info) VALUES (';
		var str = '';
		var file = obj.files.file;
		var arr = readExcel(file);
		var sqlArr = [];
		db.getConnection(function (err,connection) {
			if (err) {
				throw err
			}
			for (let i=1;i<arr.length;i++) {				
				for (let j in arr[i]) {
					if (j != arr[i].length - 1) {
						str += arr[i][j] ? ('"' + arr[i][j] +'",') : null;
					} else {
						str += '"'+(arr[i][j] ? arr[i][j] : null) +'")';
					}	
				}
				var sqlStr = str1 + str;
				str = '';	
				sqlArr.push(sqlStr);
			}
			sqlArr.forEach((sql) => {
				connection.query({sql: sql},(err,result) => {
					if (err) {
						throw err
					}
					if (result.affectedRows == 0) {
					}
				});	
			})	
			connection.release();
			res.send({code: 100,msg: '批量添加成功！'});
		});
	})
});

router.post('/api/saveCourse',(req,res) => {
	formParse(req,{pic: {path: '../static/images/',isRename: true}})
	.then((obj) => {
		var sqlStr = '';
		var field = obj.field;
		var files = obj.files;

		var data = {
			'courseCode': field.courseCode,
			'courseName': field.courseName,
			'info': field.info,
			'type': field.type,
			'img': field.img,
			'majorId': field.majorId
		};
		db.getConnection((err,connection) => {
			if (err) {
				throw err
			}		
			if (data.info) {
				sqlStr = 'INSERT INTO courses (courseCode,courseName,type,img,info) VALUES ("'
		         +data.courseCode+'","'+data.courseName+'","'+data.type+'","'+data.img+'","'+data.info+'")';
			}else {
				sqlStr = 'INSERT INTO courses (courseCode,courseName,majorId,type,img) VALUES ("'
		         +data.courseCode+'","'+data.courseName+'","'+data.type+'","'+data.img+'")';
			}
			connection.query({sql:sqlStr},(err,result) => {
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,msg: '添加成功！'});
				}else {
					res.send({code: 102,msg: '添加失败！'});
				}
			});
		});
	});
});

router.post('/api/updateCourse',(req,res) => {
	formParse(req,{pic: {path: '../static/images/',isRename: true}})
	.then((obj) => {
		var field = obj.field;
		var files = obj.files;
		var sqlStr = '';
		var data = {
			'courseCode': field.courseCode,
			'courseName': field.courseName,
			'info': field.info,
			'majorId': field.majorId,
			'courseId': field.courseId
		};
		db.getConnection((err,connection) => {
			if (err) {
				throw err
			}
			sqlStr = 'update course set courseCode = "'+data.courseCode+'",courseName = "'+data.courseName+'",info = "'+data.info+'",majorId = "'+data.majorId+'" where courseId='+data.courseId;
			connection.query({sql:sqlStr},(err,result) => {
				if (err) {
					throw err
				}
				if (result) {
					res.send({code: 100,msg: '修改成功！'});
				}else {
					res.send({code: 102,msg: '修改失败！'});
				}
			});
		});
	});
});

router.post('/api/deleteCourseById',(req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = 'delete from courses where courseId = ' + req.body.id;
		connection.query({sql:sqlStr},(err,result) => {
			if (err) {
				throw err
			}
			if (result.affectedRows > 0) {
				res.send({code:100,data:[],msg: '删除成功！'});
			} else {
				res.send({code: 102,data: [],msg: '删除失败！'});
			}
			
		})
	})
});

//登录验证
router.post('/api/login', (req, res) => {
	db.getConnection (function (err,connection) {
		var sqlStr = '';
		if (req.body.type == '普通用户') {
			if (req.body.name.length < 12) {
				sqlStr = 'select username,password,sid,sex,collegeName,qq,email,portrait,info,isTeacher from users,college,profession where users.collegeId=college.collegeId  and sid = ' + req.body.name;
			}else {
				sqlStr = 'select username,password,sid,sex,collegeName,majorName,grade,qq,email,portrait,info,isTeacher from users,college,profession where users.collegeId=college.collegeId and users.majorId=profession.majorId and sid = '+ req.body.name;
			}
		} else if (req.body.type == '管理员') {
			sqlStr = 'select tid,username,password from administator where tid = ' + req.body.name;
		}
		connection.query({sql:sqlStr},function (err,result,field) {
			connection.release();
			if (err) {
				throw err
			}
			if (result[0]) {
				const obj = result[0];
				if (req.body.pwd === obj.password) {
					delete(obj.password);
					res.send({code: 100,data:obj,msg: "登陆成功！"});
				}else if (req.body.pwd != obj.password) {
					res.send({code: 101,msg: "账号或者密码错误！"});
				}else {
					res.send({code: 102, msg: "未知错误！"})
				}	
			} else {
				res.send({code: 103,msg: "账号不存在！"})
			}
				
		});
		if(err) throw err
	});
});

//密码修改
router.post('/api/updateInfo', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'update users set password = '+ req.body.new + ' where sid = ' + req.body.name;
		connection.query({sql: 'select sid,password from users where sid =' +req.body.name},(err,result) => {
			if (err) { throw err}
			if(result[0]) {
				if (result[0].password == req.body.old) {
					connection.query({sql: sqlStr},(err,results)=> {
						connection.release();
						if (err) { throw err}
						if (results) {
							if (results.affectedRows > 0) {
								res.send({code: 100,msg:'修改成功！'});
							}else {
								res.send({code: 102,msg:'修改失败！'});
							}
						}
					});
				}else {
					res.send({code: 101,msg: '原密码错误，修改失败！'});
				}
			}
		});
	});
});

//点赞
router.post('/api/addPraise', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) {
			throw err
		}
		var sqlStr = "update answers set praise = praise + 1 where answerId = " + req.body.answerId;
		connection.query({sql:sqlStr}, (err, result) => {
			connection.release();
			if (err) {
				throw err
			}
			if (result.affectedRows > 0) {
				res.send({code: 100, msg: '点赞成功！'});
			}else {
				res.send({code: 102,msg: '点赞失败！'});
			}
		});
	});
});

//提交回答
router.post('/api/saveAnswer', (req, res) => {
	db.getConnection (function (err,connection) {
		if (err) {
			throw err
		}
		var sqlStr = "insert into answers (praise,observerId,questionId,answerDate,content) values (0,"+req.body.observerId+","+req.body.questionId+",'"+dateFormat(req.body.answerDate)+"','"+req.body.content+"')";
		connection.query({sql:sqlStr},function (err,result) {
			connection.release();
			if (err) {
				throw err
			}
			if (result.affectedRows > 0) {
				res.send({code:100,msg: '添加成功！'});
			}else {
				res.send({code:102,msg: '添加失败！'});
			}
		});
	});
});

//按周统计资源统计
router.get('/api/getWeeklySourceResult', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select count(*) as uploadCount,createDate from source WHERE YEARWEEK(date_format(createDate,"%Y-%m-%d")) = YEARWEEK(now()) GROUP BY createDate ORDER BY createDate';
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) { throw err}
			if (results) {
				var date = '';
				results.forEach((result) => {
					date = new Date(result.createDate).getDay() + 1;
					switch (date) {
						case 1:
							result.createDate = 'Monday';
							break;
						case 2:
							result.createDate = 'Tuesday';
							break;
						case 3:
							result.createDate = 'Wedesday';
							break;
						case 4:
							result.createDate = 'Thursday';
							break;
						case 5:
							result.createDate = 'Friday';
							break;
						case 6:
							result.createDate = 'Saturday';
							break;
						default:
							result.createDate = 'Saturday';
							break;
					}
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg: '查询失败！'});
			}
		});
	});
});

//按月份统计资源上传
router.get('/api/getMouthlySourceResult', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select count(*) as uploadCount,createDate from source WHERE date_format(createDate,"%Y-%m")=date_format(now(),"%Y-%m") GROUP BY createDate ORDER BY createDate';
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) { throw err}
			if (results) {
				results.forEach( (result) => {
					result.createDate = dateFormat(result.createDate);
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg: '查询失败！'});
			}
		});
	});
});

//按年统计资源上传
router.get('/api/getYearlySourceResult', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select count(*) as uploadCount,createDate from source WHERE YEAR(createDate)=YEAR(NOW()) GROUP BY createDate ORDER BY createDate';
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) { throw err}
			if (results) {
				results.forEach( (result) => {
					result.createDate = dateFormat(result.createDate);
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg: '查询失败！'});
			}
		});
	});
});

//按周统计话题
router.get('/api/getWeeklyTopicResult', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select count(*) as topicCount,createDate from questions WHERE YEARWEEK(date_format(createDate,"%Y-%m-%d")) = YEARWEEK(now()) GROUP BY createDate ORDER BY createDate';
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) { throw err}
			if (results) {
				var date = '';
				results.forEach((result) => {
					date = new Date(result.createDate).getDay() + 1;
					switch (date) {
						case 1:
							result.createDate = 'Monday';
							break;
						case 2:
							result.createDate = 'Tuesday';
							break;
						case 3:
							result.createDate = 'Wedesday';
							break;
						case 4:
							result.createDate = 'Thursday';
							break;
						case 5:
							result.createDate = 'Friday';
							break;
						case 6:
							result.createDate = 'Saturday';
							break;
						default:
							result.createDate = 'Saturday';
							break;
					}
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg: '查询失败！'});
			}
		});
	});
});

//按月份统计话题
router.get('/api/getMouthlyTopicResult', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select count(*) as topicCount,createDate from questions WHERE date_format(createDate,"%Y-%m")=date_format(now(),"%Y-%m") GROUP BY createDate ORDER BY createDate';
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) { throw err}
			if (results) {
				results.forEach( (result) => {
					result.createDate = dateFormat(result.createDate);
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg: '查询失败！'});
			}
		});
	});
});

//按年统计话题
router.get('/api/getYearlyTopicResult', (req,res) => {
	db.getConnection((err,connection) => {
		if (err) { throw err}
		var sqlStr = 'select count(*) as topicCount,createDate from questions WHERE YEAR(createDate)=YEAR(NOW()) GROUP BY createDate ORDER BY createDate';
		connection.query({sql:sqlStr},(err,results) => {
			connection.release();
			if (err) { throw err}
			if (results) {
				results.forEach( (result) => {
					result.createDate = dateFormat(result.createDate);
				});
				res.send({code:100,data:results,msg:'查询成功！'});
			}else {
				res.send({code:102,msg: '查询失败！'});
			}
		});
	});
});

module.exports = router;
