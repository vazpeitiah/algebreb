import {Route, Redirect} from 'react-router-dom'
import authService from '../services/auth.service'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = authService.getCurrentUser();
    return <Route {...rest} render={(props) => (
        user !== null
            ? <Component {...props} user={user}/>
            : <Redirect to='/signin' />
        )} 
    />
}

export default PrivateRoute