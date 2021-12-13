import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Signin from '../components/login/Signin'
import Signup from '../components/login/Signup'
import HomePage from '../components/HomePage'
import Profile from '../components/profile/Profile'
import PrivateRoute from './PrivateRoute'
import Navigation from '../components/navbar/Navigation'
import SheetPage from '../components/sheets/SheetPage'
import SheetsPage from '../components/sheets/SheetsPage'
import Groups from '../components/groups/Groups'
import Group from '../components/groups/Group'
import GroupsStudent from '../components/groups_student/GroupsStudent'
import EvaluationsTeacher from '../components/evaluations/EvaluationsTeacher'
import EvaluationsStudent from '../components/evaluations/EvaluationsStudent'
import ApplyEvaluation from '../components/evaluations/ApplyEvaluation'
import ExamReview from '../components/evaluations/ExamReview'
import Evaluations from '../components/evaluations/Evaluations'
import Help from '../components/help/Help'

const AppRotuer = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/help" component={Help} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<PrivateRoute exact path="/sheets" component={SheetsPage} />
				<PrivateRoute exact path="/sheet/:sheetId" component={SheetPage} />
				<PrivateRoute exact path="/groups" component={Groups} />
				<PrivateRoute exact path="/group/:groupId" component={Group} />
				<PrivateRoute exact path="/student_groups" component={GroupsStudent} />
				<PrivateRoute exact path="/evaluations" component={EvaluationsTeacher} />
				<PrivateRoute exact path="/student_evaluations" component={EvaluationsStudent} />
				<PrivateRoute exact path="/exam/:examId" component={ApplyEvaluation} />
				<PrivateRoute exact path="/review/:examId" component={ExamReview} />
				<PrivateRoute exact path="/evaluations/admin/:examId" component={Evaluations} />
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default AppRotuer
