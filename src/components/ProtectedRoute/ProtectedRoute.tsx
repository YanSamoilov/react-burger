import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from 'services/types/hooks';

type TProtectedRoute = {
  redirectPath: string,
} & RouteProps

function ProtectedRoute({ children, redirectPath, exact }: TProtectedRoute) {

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
