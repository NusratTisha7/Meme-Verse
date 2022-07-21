import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {shareMeme} from '../../api/memesApi';
import { userInfo } from '../../utils/auth';
import { Message } from '../../utils/alert';

const MemeModal = ({ open ,modalOpen}) => {
    const { token } = userInfo()
    const [meme, setMeme] = useState({
        description: '',
        formData:''
    });

    const {formData} = meme

    useEffect(() => {
        setMeme({
            ...meme,
            formData: new FormData()
        })
    }, [])

    const handleChange = (e) =>{
        const value = e.target.name === 'meme' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setMeme({
            ...meme,
            [e.target.name]: value,
        })
        
    }

    const handleSubmit = e => {
        shareMeme(token,formData).then(
            res=>{
                modalOpen()
                Message(true,'Meme Shared successfully!')

            }
        )
    }

    return (
        <div>
            <Modal show={open} className='mt-5'>
                <Modal.Header closeButton onClick={modalOpen}>
                    <Modal.Title>Share Meme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control name='description' as="textarea" placeholder='Write description here...' rows={3} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Meme</Form.Label>
                            <Form.Control type="file" name="meme" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-start'>
                    <Button variant="dark" onClick={handleSubmit}>
                        Share
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default MemeModal;