import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Message } from '../../utils/alert';
import { verifyEmail } from '../../api/resetPassApi';
import {useHistory,Link} from "react-router-dom";


const VerifyEmail = () => {
    let history = useHistory();
    const [resetEmail, setResetEmail] = useState({
        email: '',
        disabled:false
    });

    const { email,disabled } = resetEmail;

    const handleChange = e => {
        setResetEmail({
            ...resetEmail,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        setResetEmail({
            ...resetEmail,
            disabled:true
        })
        if(email===''){
            Message(false,'Please enter your email')
            setResetEmail({
                ...resetEmail,
                disabled:false
            })
        }else{
            verifyEmail({email}).then(res=>{
                setResetEmail({
                    ...resetEmail,
                    disabled:false
                })
                history.push({
                    pathname: `/reset-code/${email}`,
                });
            }).catch(e=>{
                Message(false,e.response.data)
            })
        }
    }

    const emailForm = () => (
        <div style={{ marginTop: '150px' }}>
            <Card style={{ width: '600px' }} className='m-auto'>
                <Card.Header>
                    <span className='font-weight-bold'>Find Your Account</span> <br />
                </Card.Header>
                <Card.Body className='p-5'>
                    <Card.Text>
                        Please enter your email address for reset password.
                        <input onChange={handleChange} type="text" name='email' placeHolder='Email address' class="form-control mt-2" aria-label="Username" aria-describedby="basic-addon1" />
                    </Card.Text>
                </Card.Body>
                <Card.Footer >
                    <button className='btn btn-primary' disabled={disabled} onClick={handleSubmit}>Search</button>
                    <Link to="/" style={{ color: '#527a7a' }}><svg style={{marginLeft:'10px',fontWeight:'bold'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right float-end" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg></Link>
                </Card.Footer>
            </Card>
        </div>
    )

    return (
        <div>
            {emailForm()}
        </div>
    )
}
export default VerifyEmail;