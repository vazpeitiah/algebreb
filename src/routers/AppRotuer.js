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

const AppRotuer = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/signup" component={Signup} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<PrivateRoute exact path="/sheets" component={SheetsPage} />
				<PrivateRoute exact path="/sheet/:sheetId" component={SheetPage} />
				<PrivateRoute exact path="/groups" component={Groups} />
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default AppRotuer
