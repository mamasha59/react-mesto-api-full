import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from './ProfilePage'
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
function App() {
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  function signOut() { //---выход
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  function tokenCheck() {        // проверим токен
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email)
            setLoggedIn(true);
            history.push('/profile');
          }
        })
        .catch(err => {console.log(`Что-то не то...: ${err}`)});
    }
  }
  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleRegistration(password, email) {//----- регистрация 
    auth.register(password, email)
      .then((data) => {
        if (data) {
          setTooltip(!tooltip)
          history.push('/signin');
        }
      })
      .catch(err => {
        console.log(`Что-то не то...: ${err}`)
        setInfoTooltipOpen(true);
    });
  }


  function handleEnterUser(password, email) { //----автризация 
    auth.logIn(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/profile');
        }
      })
      .catch(err => {
        console.log(`Что-то не то...: ${err}`)
      setInfoTooltipOpen(true)
      });
      
  };
  
  function closeInfoPopup() { //---зкрытие попапа ошибка
    setInfoTooltipOpen(false)
  }
  return (
    <div className="page">
      <Switch>

        <ProtectedRoute path='/profile'
          loggedIn={loggedIn}
          component={Home}
          onLogout={signOut}
          email={email}>
        </ProtectedRoute>

        <Route path="/signup">         {/* ---регистрация*/}
          <Register onRegister={handleRegistration} />
        </Route>

        <Route path="/signin" >        {/*---авторизация*/}
          <Login onEnter={handleEnterUser} />
        </Route>

        <Route exact path="/">          {/* --перенаправлени пользователя*/}
          {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>

      <InfoTooltip isOk={tooltip} isOpen={isInfoTooltipOpen} onClose={closeInfoPopup} />
    </div>
  );
}

export default App;
