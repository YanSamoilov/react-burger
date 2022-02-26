import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from 'services/types/hooks';

interface IProtectedRoute {
  children: any,
  path: string,
  redirectPath: string,
  exact: boolean
}

function ProtectedRoute({ children, redirectPath, exact }: IProtectedRoute) {

  const { isAuth } = useAppSelector(state => state.authUserReducer);

  return (
    <Route
      exact={exact}
      render={({ location }) => (
        isAuth ? (children) : (<Redirect to={{ pathname: redirectPath, state: { from: location } }} />)
      )
      }
    />
  );
}

export default ProtectedRoute;
