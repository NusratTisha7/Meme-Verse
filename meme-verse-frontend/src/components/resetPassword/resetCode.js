import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Message } from '../../utils/alert';
import { resetCodeApi } from '../../api/resetPassApi';
import { useHistory, useParams, Link } from "react-router-dom";

const ResetCode = () => {

    let history = useHistory();
    let { email } = useParams()

    const [resetCode, setResetCode] = useState({
        code: ''
    });

    const { code } = resetCode;

    const handleChange = e => {
        setResetCode({
            ...resetCode,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        resetCodeApi(email, code).then(res => {
            history.push({
                pathname: `/reset-password/${email}`,
            });
        }).catch(e => {
            Message(false, e.response.data)
        })
    }

    const codeForm = () => (
        <div style={{ marginTop: '150px' }}>
            <Card style={{ width: '600px' }} className='m-auto'>
                <Card.Header>
                    <span className='font-weight-bold'>A reset code is given to your gmail account</span> <br />
                </Card.Header>
                <Card.Body className='p-5'>
                    <Card.Text>
                        <p style={{color:'red'}}>If not found check in spam folder!</p>
                        Enter Code
                        <input onChange={handleChange} type="text" name='code' placeHolder='enter code' class="form-control mt-2" aria-label="Username" aria-describedby="basic-addon1" />
                    </Card.Text>
                </Card.Body>
                <Card.Footer >
                    <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                    <Link to="/verify-email" style={{ color: '#527a7a' }}><svg style={{marginLeft:'10px',fontWeight:'bold'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right float-end" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg></Link>
                </Card.Footer>
            </Card>
        </div>
    )

    return (
        <div>
            {codeForm()}
        </div>
    )
}
export default ResetCode;