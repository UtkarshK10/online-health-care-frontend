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
import Payment from './Payment/Payment';
import Profile from './components/Profile';
import { TempParticle } from './components/TempParticle';
import DoctorRegistration from './components/Doctor/DoctorRegistration';
import DoctorLogin from './components/Doctor/DoctorLogin';

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const userData = loadLocalStorage();
    setAuth(userData);
  }, [setAuth]);

  const { pathname } = useLocation();

  return (
    <div className='App'>
      {!pathname.includes('login') && !pathname.includes('signup') && <Navbar />}
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames='fade'
              timeout={{
                enter: 100,
                exit: 500,
              }}
            >
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
                      <Oxymeter title="Please drop your 20 secs video to monitor oxygen amount" />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/appointment/oxymeter'
                  render={(props) => (
                    <div className='page'>
                      <Oxymeter title="First check your oxygen amount" appointment {...props} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/user/:userId'
                  render={() => (
                    <div className='page'>
                      <Profile />
                    </div>
                  )}
                />{' '}
                <Route
                  exact
                  path={`/reset/:token`}
                  component={TempParticle}
                // <div className='page'>
                // <Particle />

                // </div>
                />
                <Route
                  exact
                  path='/payment'
                  render={() => (
                    <div className='page'>
                      <Payment />
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
                <Route
                  exact
                  path='/doctors/signup'
                  render={() => (
                    <div className='page'>
                      <Particle />
                      <DoctorRegistration />

                    </div>
                  )}
                />
                <Route
                  exact
                  path='/doctors/login'
                  render={() => (
                    <div className='page'>
                      <Particle />
                      <DoctorLogin />

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
