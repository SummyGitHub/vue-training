import Vue from 'vue'
// Vue.http.options.emulateJSON = true;

export default {
	//获取所有资源列表
	getAllLinks ({commit},settings) {
		return Vue.http.get('/api/getAllLinks',{params: settings})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_ITEMS',response.data.data);
				commit('SET_CURR',Number(settings.curr));
				commit('SET_SIZE',response.data.total);
				return response.data.msg
			}else {
				return response.data.msg
			}
		})
	},
	//根据条件查询资源列表
	getLinksByFilter ({commit},filter) {
		return Vue.http.get('/api/getLinksByFilter',{params: filter})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_ITEMS',response.data.data);
				commit('SET_CURR',Number(filter.curr));
				commit('SET_SIZE',response.data.total);
				return response.data
			}else {
				return response.data
			}
		})
	},
	getHotLinks ({commit},settings) {
		return Vue.http.get('/api/getHotLinks',{params: settings})
		.then(response => {
			if (response.data.code == 100) {
				commit('SET_ITEMS',response.data.data)
			}
			return response.data
		});
	},
	getLinkByType ({commit},type) {
		return Vue.http.get('/api/getLinkByType',{params: type})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_ITEMS',response.data.data)
				commit('SET_CURR',Number(type.pageSettings.curr));
				commit('SET_SIZE',response.data.total);
				return response.data
			}else {
				return response.data
			}
		})
	},
	getLinkById ({commit,state},article) {
		return state.items.filter(item => item.sourceId == article.sourceId);
	},
	deleteArticleById ({commit},article) {
		return Vue.http.post('/api/deleteArticleById',article)
		.then(response => {
			return response.data
		});
	},
	saveArticle ({commit},article) {
		return Vue.http.post('/api/saveArticle',article)
		.then(response => {
			return response.data
		})
	},
	downloadFile ({commit},obj) {
		return Vue.http.post('/api/downloadFile',obj)
		.then(response => {
			return response.data
		})
	},
	//查询学院列表
	getColleges ({commit}) {
		return Vue.http.get('/api/getColleges')
		.then(response => {
			if(response.data.code === 100) {
				commit('SET_COLLENG',response.data.data)
				return response.data
			} else {
				return response.data
			}
		})
	},
	//查询专业列表
	getMajors ({commit}) {
		return Vue.http.get('/api/getMajors')
		.then(response => {
			commit('SET_MAJOR',response.data.data)
			return response.data
		})
	},
	//根据学院查询专业列表
	getMajorByColege ({commit},college) {
		return Vue.http.get('/api/getMajorByColege',{params: college})
		.then(response => {
			if(response.data.code === 100) {
				commit('SET_MAJOR',response.data.data)
				return response.data.msg
			}else {
				return response.data.msg
			}
			
		});
	},
	getCourses ({commit}) {
		return Vue.http.get('/api/getCourses')
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_COURSES',response.data.data)
				return response.data.msg
			}else {
				return response.data.msg
			}			
		});
	},
	getCourseByMajor ({commit},major) {
		return Vue.http.get('/api/getCourseByMajor',{params: major})
		.then(response => {
			if(response.data.code === 100) {
				commit('SET_COURSES',response.data.data)
				return response.data.msg
			}else {
				return response.data.msg
			}
			
		});
	},
	getBySearch({commit},str){
		return Vue.http.get('/api/getBySearch',{params: str}) 
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_LISTBYSEARCH',response.data.data)
				return response.data.msg
			}else {
				return response.data.msg
			}
		})
	},

	setCurrentTab ({commit}, currentTab) {
		commit('SET_CURRENTTAB',currentTab)
	},

	//用户登录
	login ({commit}, user) {
		console.log(user);
		return Vue.http.post('/api/login', user)
			.then(response => {
				if (response.data.code === 100) {
					if (user.type == '管理员') {
						commit('SET_ISADMIN',true);
						window.sessionStorage.setItem('isAdmin', true);
					}
					commit('SET_USER',response.data.data)
					commit('SET_ISLOADING',true);
					window.sessionStorage.setItem('user', JSON.stringify(response.data.data));
					window.sessionStorage.setItem('isLoading', true);
					return response.data;
				} else {
					return response.data;
				}
			})
	},

	updateInfo ({commit},user) {
		return Vue.http.post('/api/updateInfo',user)
		.then(response => {
			return response.data
		})
	},

	signOut ({commit}) {
		commit('SET_USER','');
		commit('SET_ISLOADING',false);
		window.sessionStorage.removeItem('user');
		window.sessionStorage.removeItem('isAdmin');
		window.sessionStorage.removeItem('isLoading');
	},

	getRankLists ({commit}) {
		return Vue.http.get('/api/getRankLists')
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_RANKLISTS',response.data.data);
				return response.data
			}else {
				return response.data
			}
		});
	},

	getLastedTopicLists ({commit},pageSetting) {
		return Vue.http.get('/api/getLastedTopicLists',{params: pageSetting})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_TOPICLISTS',response.data.data);
				return response.data.msg
			}else {
				return response.data.msg
			}		
		});
	},

	getHotTopicLists ({commit},pageSetting) {
		return Vue.http.get('/api/getHotTopicLists',{params: pageSetting})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_TOPICLISTS',response.data.data);
				return response.data.msg
			}else {
				return response.data.msg
			}		
		});
	},

	getUnanswerTopicLists ({commit},pageSetting) {
		return Vue.http.get('/api/getUnanswerTopicLists',{params: pageSetting})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_TOPICLISTS',response.data.data);
				return response.data.msg
			}else {
				return response.data.msg
			}		
		});
	},

	getTopicById ({commit},question) {
		return Vue.http.get('/api/getTopicById',{params: question})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_QUESTIONITEM',response.data.data[0]);
				commit('SET_ANSWERLISTS',response.data.answers);
			}
			return response.data;
		})
	},

	saveQuestion ({commit},question) {
		return Vue.http.post('/api/saveQuestion',question)
		.then(response => {
			return response.data
		})
	},

	saveAnswer ({commit},answer) {
		return Vue.http.post('/api/saveAnswer',answer)
		.then(response => {
			return response.data;
		})
	},

	addPraise({commit},answer) {
		return Vue.http.post('/api/addPraise',answer)
		.then(response => {
			return response.data
		})
	},

	getUserInfoById({commit,state},info) {
		if (info.userId == state.user.sid) {
			commit('SET_INFO',state.user);
			return state.user;
		}
		return Vue.http.get('/api/getInfoById',{params: info})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_INFO',response.data.data);
			}
			return response.data;
		})
	},

	getAnswerListById({commit},user) {
		return Vue.http.get('/api/getAnswerListById',{params: user})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_ANSWERLISTS',response.data.data)
				commit('SET_ANSWERCOUNT',response.data.total)
			}
			return response.data
		});
	},

	getSourceListById({commit},user) {
		return Vue.http.get('/api/getSourceListById',{params: user})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_ITEMS',response.data.data)
				commit('SET_SOURCECOUNT',response.data.total)
			}
			return response.data;
		});
	},

	getQuestionListById({commit},user) {
		return Vue.http.get('/api/getQuestionListById',{params: user})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_TOPICLISTS',response.data.data)
				commit('SET_TOPICCOUNT',response.data.total)
			}
			return response.data
		});
	},

	getCoursesTeach ({commit},user) {
		return Vue.http.get('/api/getCoursesTeach',{params: user})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_COURSESTEACH',response.data.data);
			}
			return response.data
		})
	},

	getUsersByFilter({commit},filter) {
		return Vue.http.get('/api/getUsersByFilter',{params: filter})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_MANAGELIST',response.data.data);
				commit('SET_CURR',Number(filter.curr));
				commit('SET_SIZE',response.data.page);
			}
		});
	},

	getUserById({commit},obj){
		return Vue.http.get('/api/getUserById',{params: obj})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_UPDATEINFO',response.data.data);
			}
			return response.data;
		})
	},

	saveUsersByGroup ({commit},excel) {
		return Vue.http.post('/api/saveUsersByGroup',excel)
		.then(response => {
			return response.data
		})
	},

	saveUser ({commit},form) {
		return Vue.http.post('/api/saveUser',form)
		.then(response => {
			return response.data
		})
	},

	updateUser ({commit},form) {
		return Vue.http.post('/api/updateUser',form)
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_UPDATEINFO',{});
			}
			return response.data
		})
	},

	deleteUserById({commit},id) {
		return Vue.http.post('/api/deleteUserById',{id: id})
		.then(response => {
			return response.data
		})
	},

	getCoursesByFilter({commit},filter) {
		return Vue.http.get('/api/getCoursesByFilter',{params: filter})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_MANAGELIST',response.data.data);
				commit('SET_CURR',Number(filter.curr));
				commit('SET_SIZE',response.data.page);
			}
		});
	},

	getCourseById({commit},obj){
		return Vue.http.get('/api/getCourseById',{params: obj})
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_UPDATEINFO',response.data.data);
			}
			return response.data;
		})
	},

	saveCoursesByGroup ({commit},excel) {
		return Vue.http.post('/api/saveCoursesByGroup',excel)
		.then(response => {
			return response.data
		})
	},

	saveCourse ({commit},form) {
		return Vue.http.post('/api/saveCourse',form)
		.then(response => {
			return response.data
		})
	},

	updateCourse ({commit},form) {
		return Vue.http.post('/api/updateCourse',form)
		.then(response => {
			if (response.data.code === 100) {
				commit('SET_UPDATEINFO',{});
			}
			return response.data
		})
	},

	deleteCourseById({commit},id) {
		return Vue.http.post('/api/deleteCourseById',{id: id})
		.then(response => {
			return response.data
		})
	},

	getWeeklySourceResult({commit}) {
		return Vue.http.get('/api/getWeeklySourceResult')
		.then(response => {
			var dataObj = {};
			dataObj.labels = ['Monday','Tuesday','Wedesday','Thursday','Friday','Saturday','Sunday'];
			var datasets = dataObj.datasets = [0,0,0,0,0,0,0];
			response.data.data.forEach( data => {
				datasets[dataObj.labels.indexOf(data.createDate)] = data.uploadCount;
			});
			commit('SET_DATAOBJ',dataObj);
			return dataObj
		})
	},

	getMouthlySourceResult({commit}) {
		return Vue.http.get('/api/getMouthlySourceResult')
		.then(response => {
			var dataObj = {};
			dataObj.labels = [],dataObj.datasets = [];
			response.data.data.forEach( data => {
				dataObj.labels.push(data.createDate);
				dataObj.datasets.push(data.uploadCount);
			});
			commit('SET_DATAOBJ',dataObj);
			return response.data
		})
	},

	getYearlySourceResult({commit}) {
		return Vue.http.get('/api/getYearlySourceResult')
		.then(response => {
			var dataObj = {};
			dataObj.labels = [],dataObj.datasets = [];
			response.data.data.forEach( data => {
				dataObj.labels.push(data.createDate);
				dataObj.datasets.push(data.uploadCount);
			});
			commit('SET_DATAOBJ',dataObj);
			return response.data
		})
	},

	getWeeklyTopicResult({commit}) {
		return Vue.http.get('/api/getWeeklyTopicResult')
		.then(response => {
			var dataObj = {};
			dataObj.labels = ['Monday','Tuesday','Wedesday','Thursday','Friday','Saturday','Sunday'];
			var datasets = dataObj.datasets = [0,0,0,0,0,0,0];
			response.data.data.forEach( data => {
				datasets[dataObj.labels.indexOf(data.createDate)] = data.topicCount;
			});
			commit('SET_DATAOBJ',dataObj);
			return dataObj
		})
	},

	getMouthlyTopicResult({commit}) {
		return Vue.http.get('/api/getMouthlyTopicResult')
		.then(response => {
			var dataObj = {};
			dataObj.labels = [],dataObj.datasets = [];
			response.data.data.forEach( data => {
				dataObj.labels.push(data.createDate);
				dataObj.datasets.push(data.topicCount);
			});
			commit('SET_DATAOBJ',dataObj);
			return response.data
		})
	},

	getYearlyTopicResult({commit}) {
		return Vue.http.get('/api/getYearlyTopicResult')
		.then(response => {
			var dataObj = {};
			dataObj.labels = [],dataObj.datasets = [];
			response.data.data.forEach( data => {
				dataObj.labels.push(data.createDate);
				dataObj.datasets.push(data.topicCount);
			});
			commit('SET_DATAOBJ',dataObj);
			return response.data
		})
	},
}