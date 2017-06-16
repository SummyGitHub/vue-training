import Login from '../components/Login'
import Article from '../components/article/Article'
import ArticleT from '../components/article/Article_template'
import Article_detail from '../components/article/Article_detail'
import Home from '../components/Home'
import UploadArticle from '../components/article/UploadArticle'
import Topic from '../components/topic/Topic'
import Topic_detail from '../components/topic/Topic_detail'
import Ask from '../components/topic/Ask'
import SearchR from '../components/topic/searchResult'
import About from '../components/about/About'
import AboutIndex from '../components/about/About_index'
import AboutList from '../components/about/About_list'
import UpdateInfo from '../components/about/UpdateInfo'
import App from '../App'
import Console from '../components/management/Console'
import SourcesM from '../components/management/SourcesManage'
import SourcesA from '../components/management/SourcesAnalysic'
import StudentM from '../components/management/StudentManage'
import StudentE from '../components/management/StudentEdit'
import TopicsM from '../components/management/TopicsManage'
import TopicsA from '../components/management/TopicsAnalysic'
import CoursesM from '../components/management/CoursesManage'
import CourseE from '../components/management/CourseEdit'
import TeacherM from '../components/management/TeachersManage'
import TeacherE from '../components/management/TeacherEdit'

const routes =[
								{path: '/login',name: 'login',component: Login},
								{path: '/home',name: 'home',component: Home },
								{path: '/article',component: Article,
								 children: [
								 		{path: '',component: ArticleT},
								 		{path: ':type',component: ArticleT}
								 ]
								},
								{path: '/Adetail',name:'article_detail',component: Article_detail},
								{path: '/topic',name: 'topic',component: Topic},
								{path: '/Tdetail',name: 'topic_detail',component: Topic_detail},
								{path: '/ask',name: 'ask',component: Ask},
								{path: '/upload',name: 'upload',component: UploadArticle},
								{path: '/searchResult',name: 'searchResult',component: SearchR},
								{path: '/about',component: About,
								 children: [
								 		{path: '',redirect: {name: 'aboutIndex'}},
								 		{path: 'aboutIndex',name: 'aboutIndex',component: AboutIndex},
								 		// {path: 'question',name: 'question',commponent: AboutList},
								 		// {path: 'answer',name: 'answer',commponent: AboutList},
								 		// {path: 'uploadList',name:'uploadList',component: AboutList},
								 		{path: ':id',name: 'aboutList',component: AboutList}
								 ]
								},
								{path: '/updateInfo',name:'updateInfo',component: UpdateInfo},
								{path: '/',component: Home},
								{path: '/console',component: Console,
								 children: [
								 	{path: '',redirect: {name: 'studentManage'}},
									{path: 'studentManage',name: 'studentManage',component: StudentM},
									{path: 'studentEdit',name: 'studentEdit',component: StudentE},
									{path: 'teacherManage',name: 'teacherManage',component: TeacherM},
									{path: 'teacherEdit',name: 'teacherEdit',component: TeacherE},
									{path: 'coursesManage',name: 'coursesManage',component: CoursesM},
									{path: 'courseEdit',name: 'courseEdit',component: CourseE},
									{path: 'sourcesManage',name: 'sourcesManage',component: SourcesM},
									{path: 'sourcesAnalysic',name: 'sourcesAnalysic',component: SourcesA},
									{path: 'topicsManage',name: 'topicsManage',component: TopicsM},
									{path: 'topicsAnalysic',name: 'topicsAnalysic',component: TopicsA}
								 ]
							  }
							]
export default routes