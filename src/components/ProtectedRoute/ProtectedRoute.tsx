import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from 'services/types/hooks';

interface IProtectedRoute {
  children: any,
  path: string,
  redirectPath: string
}

function ProtectedRoute({ children, redirectPath }: IProtectedRoute) {

  const { isAuth } = useAppSelector(state => state.authUserReducer);

  return (
    <Route
      render={({location}) => (
        isAuth ? (children) : (<Redirect to={{pathname: redirectPath, state: { from: location }}} />)
      )
      }
    />
  );
}

export default ProtectedRoute;
