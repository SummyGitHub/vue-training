var db = require('./setup')
export default {
	getUser: ({user},callback) => {
		console.log(user)
		db.getConnection(function (err,connection) {
			// var sqlStr = 'select * from student where sid = '+ user.username + ' and password=' + user.password;
			// connection.query({sql:sqlStr},function (err,result,field) {
			// 	if (err) {
			// 		console.log('query failed'); 
			// 	}
			// 	console.log('connect success');
			// 	console.log(result)
			// })
			console.log('connect success');
		})
	}
}