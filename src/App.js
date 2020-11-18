import { useEffect, useContext } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import UserRegistration from './components/UserRegistration';
import Particle from './Particles';
import { AuthContext } from './contexts/auth-context';
import HomePage from './components/HomePage';
import { loadLocalStorage } from './utils/helper';
import UserLogin from './components/UserLogin';
import Oxymeter from './components/Oxymeter';
import Navbar from './components/Navbar';
// import AddTechModal from './Modal/OTPModal';

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const userData = loadLocalStorage('userData');
    setAuth(userData);
  }, [setAuth]);

  const { pathname } = useLocation();

  return (
    <div className='App'>
      {pathname !== '/login' && pathname !== '/signup' && <Navbar />}
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='fade' timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path='/'
                  render={() => (
                    <div className='page'>
                      <HomePage />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/signup'
                  render={() => (
                    <div className='page'>
                      <Particle />
                      <UserRegistration />
                      {/* <AddTechModal /> */}
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/oxymeter'
                  render={() => (
                    <div className='page'>
                      <Oxymeter />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/login'
                  render={() => (
                    <div className='page'>
                      {' '}
                      <Particle />
                      <UserLogin />
                    </div>
                  )}
                />
                <Redirect exact to='/' />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
}

export default App;
