import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { registration } from '../../api/userApi'
import { authenticate, isAuthenticated } from '../../utils/auth';
import { Message } from '../../utils/alert';
import { Redirect, Link } from 'react-router-dom';

const Register = ({history}) => {
    const paperStyle = { padding: 20, height: '70vh', width: 350, margin: "100px auto" }
    const avatarStyle = { backgroundColor: "#527a7a" }
    const btnStyle = { margin: '30px 0', backgroundColor: "#527a7a", color: 'white' }
    const txtFieldstyle = { marginTop: '10px' }

    const [registrationForm, setRegistrationForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = registrationForm;

    const handleChange = e => {
        setRegistrationForm({
            ...registrationForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        registration({ name, email, password })
            .then(response => {
                setRegistrationForm({
                    name: '',
                    email: '',
                    password: ''
                })
                Message(true, 'Registration completed!')
                history.push('/')

            }).catch(e => {
                Message(false, e.response.data)
            })
    }

    const signInForm = () => (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' className='mt-3'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h5 class="text-xl md:text-2xl font-bold leading-tight mt-2">Create an account</h5>
                </Grid>
                <TextField label='Username' name="name" value={name} fullWidth required onChange={handleChange} />
                <TextField label='Email' name="email" value={email} fullWidth required onChange={handleChange} />
                <TextField label='Password' name="password" value={password} type='password' fullWidth required style={txtFieldstyle} onChange={handleChange} />
                <Button type='submit' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}>Create</Button>
                <span style={{ fontSize: '.9rem' }}>Already have an account?</span> <Link to="/" style={{ color: '#527a7a' }}>Login</Link>
            </Paper>
        </Grid>
    )

    return (
        <div>
            {signInForm()}
        </div>
    )
}

export default Register;