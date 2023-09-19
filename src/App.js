import { Switch, Route , Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import Authcontext from './Store/Auth-Context';


function App() {
      
  const authcxt = useContext(Authcontext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          {!authcxt.IsLogged && <AuthPage />}
        </Route>
        <Route path='/profile'>
          { authcxt.IsLogged ? <UserProfile /> : <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
           <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
