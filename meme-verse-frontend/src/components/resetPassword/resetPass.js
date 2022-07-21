import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Message } from '../../utils/alert';
import { resetPassword } from '../../api/resetPassApi';
import { useHistory, useParams,Link } from "react-router-dom";

const ResetPass = () => {

    let history = useHistory();
    let { email } = useParams()

    const [resetPass, setResetPass] = useState({
        email, email,
        newPass: '',
        confirmPass: ''
    });

    let { newPass, confirmPass ,disabled} = resetPass

    const handleChange = e => {
        setResetPass({
            ...resetPass,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        if(newPass==confirmPass){
            resetPassword(resetPass).then(res => {
                history.push({
                    pathname: '/',
                });
                Message(true, 'Password change successfully')
            }).catch(e => {
                Message(false, e.response.data)
            })
        }else{
            Message(false, 'Password not matched')
        }
        
    }

    const resetPassForm = () => (
        <div style={{ marginTop: '100px' }}>
            <Card style={{ width: '600px' }} className='m-auto'>
                <Card.Header>
                    <span className='font-weight-bold'>Reset your password</span> <br />
                </Card.Header>
                <Card.Body className='p-5'>
                    <Card.Text>
                        New Password
                        <input onChange={handleChange} type="password" name='newPass' placeHolder='new password' class="form-control mt-2" aria-label="Username" aria-describedby="basic-addon1" />
                        <br />
                        Conform Password
                        <input onChange={handleChange} type="password" name='confirmPass' placeHolder='confirm password' class="form-control mt-2" aria-label="Username" aria-describedby="basic-addon1" />
                    </Card.Text>
                </Card.Body>
                <Card.Footer >
                    <button className='btn btn-primary' onClick={handleSubmit}>Reset</button>
                    <Link to={`/reset-code/${email}`} style={{ color: '#527a7a' }}><svg style={{marginLeft:'10px',fontWeight:'bold'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right float-end" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg></Link>
                </Card.Footer>
            </Card>
        </div>
    )

    return (
        <div>
            {resetPassForm()}
        </div>
    )
}
export default ResetPass;