import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'
import HomePage from '../components/HomePage'
import Profile from '../components/auth/Profile'
import PrivateRoute from './PrivateRoute'
import Navigation from '../components/Navigation'

const AppRotuer = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path="/"  component={HomePage} />
				<Route exact path="/signin"  component={Signin} />
				<Route exact path="/signup"  component={Signup} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default AppRotuer
