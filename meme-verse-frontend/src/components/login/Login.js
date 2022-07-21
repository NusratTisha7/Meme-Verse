import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from '../../api/userApi'
import { authenticate, isAuthenticated } from '../../utils/auth';
import { Message } from '../../utils/alert';
import { Redirect, Link } from 'react-router-dom';

const Login = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 350, margin: "100px auto" }
    const avatarStyle = { backgroundColor: "#527a7a" }
    const btnStyle = { margin: '30px 0', backgroundColor: "#527a7a", color: 'white' }
    const txtFieldstyle = { marginTop: '10px' }
    const forgrtPassStyle = {
        color:'red',
        fontSize: '.9rem',
        cursor:'pointer',
        textDecoration:'underline'
    }
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginForm;

    const handleChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        if (email === '' || password === '') {
            Message(true, 'Please fill in all the required fields')
        }
        else {
            e.preventDefault();
            login({ email, password })
                .then(response => {
                    authenticate(response.data.token, () => {
                        setLoginForm({
                            email: '',
                            password: ''
                        })
                        Message(true, 'Successfully logged in')
                    })
                }).catch(e => {
                    setLoginForm({
                        email: '',
                        password: ''
                    })
                    Message(false, 'Invalid Credentials')
                })
        }
    }


    const signInForm = () => (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' className='mt-3'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">Log In</h1>
                </Grid>

                <TextField label='Email' name="email" value={email} fullWidth required onChange={handleChange} />
                <TextField label='Password' name="password" value={password} type='password' fullWidth required style={txtFieldstyle} onChange={handleChange} />
                <Button type='submit' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}>Login</Button>
                <Link to="/verify-email"><p style={forgrtPassStyle}>Forgotten Password?</p></Link>
                <Link to="/register" style={{ color: '#527a7a' }}>Create a new account</Link>
            </Paper>
        </Grid>
    )

    return (
        <div>
            {isAuthenticated() ? <Redirect to="/memes" /> : ""}
            {signInForm()}
        </div>
    )
}
export default Login;