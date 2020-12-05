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
import Forget from './components/Forget';
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
import CaptchaPage from './components/Shopping/CaptchaPage';
import PrivateRoute from './routers/PrivateRoutes';
import Logout from './components/Logout';
import Invoice from './components/Shopping/Invoice';
import DoctorPrescription from './components/Shopping/DoctorPrescription';
import PatientPrescriptionDetails from './components/PatientPrescriptionDetails';
import PatientPrescription from './components/PatientPrescription';
import Transactions from './components/Transactions';
import NotFound from './components/404';
import style from 'styled-theming';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import useTheme from './components/useTheme';
import bmarble from './assets/bmarble.jpg';
import marble from './assets/marble.jpg';
import AboutUs from './components/AboutUs';
import AboutProject from './components/AboutProject';
import Helpdesk from './components/Helpdesk';

const getPrimary = style('mode', {
  light: '#f4511e',
  dark: '#000000',
});

const getSecondary = style('mode', {
  light: '#ff7043',
  dark: '#282828',
});
const getbgcolor = style('mode', {
  light: 'white',
  dark: '#404040',
});
const getTextPrimary = style('mode', {
  light: 'black',
  dark: 'white',
});
const getbgsecondary = style('mode', {
  light: 'white',
  dark: 'grey',
});
const getTextsecondary = style('mode', {
  light: '#303030',
  dark: '#E0E0E0',
});
const getMarble = style('mode', {
  light: `url(${marble})`,
  dark: `url(${bmarble})`,
});
const getHighlight = style('mode', {
  light: '#f4511e',
  dark: 'hotpink',
});
const getSearchP = style('mode', {
  light: 'white',
  dark: 'black',
});
const GlobalStyle = createGlobalStyle`
:root {
  --primary: ${getPrimary};
  --secondary: ${getSecondary};
  --bgcolor: ${getbgcolor};
  --text-primary: ${getTextPrimary};
  --bgsecondary: ${getbgsecondary};
  --text-secondary: ${getTextsecondary};
  --marble: ${getMarble};
  --highlight: ${getHighlight};
  --searchp : ${getSearchP};
}
`;
function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const userData = loadLocalStorage();
    setAuth(userData);
  }, [setAuth]);

  const { pathname } = useLocation();

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className='App'>
        {!pathname.includes('login') &&
          !pathname.includes('signup') &&
          !pathname.includes('doctor') &&
          !pathname.includes('notFound') && <Navbar />}
        {!pathname.includes('login') &&
          !pathname.includes('signup') &&
          pathname.includes('doctor') &&
          !pathname.includes('notFound') && <DoctorNavbar />}
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
                    path='/aboutus'
                    render={() => (
                      <div className='page'>
                        <AboutUs />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path='/aboutproject'
                    render={() => (
                      <div className='page'>
                        <AboutProject />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path='/doctors/aboutus'
                    render={() => (
                      <div className='page'>
                        <AboutUs />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path='/doctors/aboutproject'
                    render={() => (
                      <div className='page'>
                        <AboutProject />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/help'
                    render={() => (
                      <div className='page'>
                        <Helpdesk />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/doctors/help'
                    render={() => (
                      <div className='page'>
                        <Helpdesk isDoctor />
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
                  <PrivateRoute
                    exact
                    path='/oxymeter'
                    render={() => (
                      <div className='page'>
                        <Oxymeter title='Please drop your 25 secs video to monitor oxygen amount and heart rate' />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/appointment/oxymeter'
                    render={(props) => (
                      <div className='page'>
                        <Oxymeter
                          title='First check your spO2(Blood Oxygen) level and heart rate'
                          appointment
                          {...props}
                        />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/user'
                    render={() => (
                      <div className='page'>
                        <Profile />
                      </div>
                    )}
                  />{' '}
                  <Route
                    exact
                    path={`/reset/:token`}
                    render={(props) => (
                      <div className='page'>
                        <Particle />
                        <Forget {...props} midRoute='users' />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path={`/doctors/user`}
                    render={() => (
                      <div className='page'>
                        <Profile isDoctor />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path={`/doctors/reset/:token`}
                    render={(props) => (
                      <div className='page'>
                        <Particle />
                        <Forget {...props} midRoute='doctors' />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/payment'
                    render={() => (
                      <div className='page'>
                        <Payment />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/transactions'
                    render={() => (
                      <div className='page'>
                        <Transactions />
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
                  <PrivateRoute
                    exact
                    path='/logout'
                    render={() => (
                      <div className='page'>
                        <Particle />
                        <Logout />
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
                  <PrivateRoute
                    exact
                    path='/doctors/schedules'
                    render={(props) => (
                      <div className='page'>
                        <DoctorSchedule />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/doctors/mail'
                    render={(props) => (
                      <div className='page'>
                        <DoctorMail {...props} />
                      </div>
                    )}
                  />{' '}
                  <PrivateRoute
                    exact
                    path='/doctors/prescription'
                    render={(props) => (
                      <div className='page'>
                        <DoctorPrescription {...props} />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/records/prescription'
                    render={(props) => (
                      <div className='page'>
                        <PatientPrescriptionDetails {...props} />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/records'
                    render={() => (
                      <div className='page'>
                        <PatientPrescription />
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
                  <PrivateRoute
                    exact
                    path='/shopping/cart'
                    render={(props) => (
                      <div className='page'>
                        <Cart />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/shopping/orders'
                    render={(props) => (
                      <div className='page'>
                        <Orders />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/shopping/orders/details'
                    render={(props) => (
                      <div className='page'>
                        <OrderDetails {...props} />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/shopping/address'
                    render={(props) => (
                      <div className='page'>
                        <ConfirmationPage />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/shopping/confirm/:addressId'
                    render={(props) => (
                      <div className='page'>
                        <CaptchaPage {...props} />
                      </div>
                    )}
                  />
                  <PrivateRoute
                    exact
                    path='/shopping/invoice'
                    render={(props) => (
                      <div className='page'>
                        <Invoice {...props} />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path='/notFound'
                    render={() => (
                      <div className='page'>
                        <NotFound />
                      </div>
                    )}
                  />
                  <Redirect exact to='/notFound' />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        {/* <SimpleReactFooter
          title={title}
          description={description}
          columns={columns}
          youtube='UCFt6TSF464J8K82xeA?'
          copyright='Medico'
          iconColor='black'
          backgroundColor='black'
          fontColor='white'
          copyrightColor='white'
        /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
