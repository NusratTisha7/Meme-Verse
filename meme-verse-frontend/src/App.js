import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './components/login/Login'
import Register from './components/Register/register'
import VerifyEmail from './components/resetPassword/verifyEmail'
import ResetCode from './components/resetPassword/resetCode'
import ResetPass from './components/resetPassword/resetPass'
import Memes from './components/Memes/Memes'
import PrivateRoute from './components/privateRoute/PrivateRoute';
import  './App.css';

const App = () => {

    return (

        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/verify-email" exact component={VerifyEmail}/>
            <Route path="/reset-code/:email" exact component={ResetCode}/>
            <Route path="/reset-password/:email" exact component={ResetPass}/>
            <PrivateRoute path="/memes">
                <Memes />
            </PrivateRoute >
        </Switch>
    )
}
export default App