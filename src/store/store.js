import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

const state = {
	isLoading: false,
	isAdmin: false,
	user: {name: '',pwd: '',portrait:''},
	items: [],
	colleges: [],
	majors: [],
	courses: [],
	currentTab: 'View_01',
	rankLists: [],
	topicLists: [],
	searchResult: [],
	questionItem: {},
	answers: [],
	current: 0,
	size: 0,
	info: {},
	manageList: [],
	updateInfo: {},
	answerCount:0,
	topicCount:0,
	sourceCount:0,
	labels: [],
	datasets: [],
	coursesTeach: []
}

const mutations = {
	SET_CURR: (state,current) => {
		state.current = current
	},
	SET_SIZE: (state,size) => {
		state.size = size
	},
	SET_USER: (state,user) => {
		state.user = user
	},
	SET_ITEMS: (state,items) => {
		state.items = items
	},
	SET_ISLOADING: (state,boolean) => {
		state.isLoading = boolean
	},
	SET_ISADMIN: (state,boolean) => {
		state.isAdmin = boolean
	},
	SET_COLLENG: (state,colleges) => {
		state.colleges = colleges
	},
	SET_MAJOR: (state,majors) => {
		state.majors = majors
	},
	SET_COURSES: (state,courses) => {
		state.courses = courses
	},
	SET_CURRENTTAB: (state,currentTab) => {
		state.currentTab = currentTab
	},
	SET_RANKLISTS: (state,rankLists) => {
		state.rankLists = rankLists
	},
	SET_TOPICLISTS: (state,topicLists) => {
		state.topicLists = topicLists
	},
	SET_QUESTIONITEM: (state,questionItem) => {
		state.questionItem = questionItem
	},
	SET_LISTBYSEARCH: (state,searchResult) => {
		state.searchResult = searchResult
	},
	SET_ANSWERLISTS: (state,answers) => {
		state.answers = answers
	},
	SET_INFO: (state,info) => {
		state.info = info
	},
	SET_MANAGELIST: (state,manageList) => {
		state.manageList = manageList
	},
	SET_UPDATEINFO: (state,updateInfo) => {
		state.updateInfo = updateInfo;
	},
	SET_ANSWERCOUNT: (state,answerCount) => {
		state.answerCount = answerCount;
	},
	SET_SOURCECOUNT: (state,sourceCount) => {
		state.sourceCount = sourceCount;
	},
	SET_TOPICCOUNT: (state,topicCount) => {
		state.topicCount = topicCount;
	},
	SET_DATAOBJ: (state,dataObj) => {
		state.labels = dataObj.labels;
		state.datasets = dataObj.datasets;
	},
	SET_COURSESTEACH: (state,coursesTeach) => {
		state.coursesTeach = coursesTeach
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})