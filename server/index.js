var users = require('./api/users')
var articles = require('./api/articles')
var index = function(app) {
	app.get('/users',function(){
		users(app);
	});
	app.get('/articles',articles)
}
module.exports = index;