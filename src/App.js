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
import DoctorHomePage from './components/Doctor/DoctorHomePage';
import DoctorNavbar from './components/Doctor/DoctorNavbar';
import DoctorSchedule from './components/Doctor/DoctorSchedule';
import DoctorMail from './components/Doctor/DoctorMail';
import ShoppingHome from './components/Shopping/ShoppingHome';
import Cart from './components/Shopping/Cart';
import Orders from './components/Shopping/Orders';
import OrderDetails from './components/Shopping/OrderDetails';
import ConfirmationPage from './components/Shopping/ConfirmationPage';

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const userData = loadLocalStorage();
    setAuth(userData);
  }, [setAuth]);

  const { pathname } = useLocation();

  return (
    <div className='App'>
      {!pathname.includes('login') &&
        !pathname.includes('signup') &&
        !pathname.includes('doctors') && <Navbar />}
      {!pathname.includes('login') &&
        !pathname.includes('signup') &&
        pathname.includes('doctors') && <DoctorNavbar />}
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
                      <Oxymeter title='Please drop your 20 secs video to monitor oxygen amount' />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/appointment/oxymeter'
                  render={(props) => (
                    <div className='page'>
                      <Oxymeter
                        title='First check your oxygen amount'
                        appointment
                        {...props}
                      />
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
                <Route
                  exact
                  path='/doctors'
                  render={(props) => (
                    <div className='page'>
                      <DoctorHomePage />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/doctors/schedules'
                  render={(props) => (
                    <div className='page'>
                      <DoctorSchedule />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/doctors/mail'
                  render={(props) => (
                    <div className='page'>
                      <DoctorMail {...props} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/shopping/home'
                  render={(props) => (
                    <div className='page'>
                      <ShoppingHome />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/shopping/cart'
                  render={(props) => (
                    <div className='page'>
                      <Cart />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/shopping/orders'
                  render={(props) => (
                    <div className='page'>
                      <Orders />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/shopping/orders/details'
                  render={(props) => (
                    <div className='page'>
                      <OrderDetails {...props} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path='/shopping/confirm'
                  render={(props) => (
                    <div className='page'>
                      <ConfirmationPage />
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
