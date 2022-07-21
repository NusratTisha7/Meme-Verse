import { useEffect, useState  } from 'react';
import Navabr from '../navbar/navbar'
import Card from 'react-bootstrap/Card';
import { getAllMemes, like, commentApi } from '../../api/memesApi'
import { userInfo } from '../../utils/auth';
import moment from 'moment'
import { API } from '../../utils/config';

let commentStyle = {
    cursor: 'pointer'
}

const Memes = () => {
    let [viewComment, setViewComment] = useState(false)
    let [memes, setMemes] = useState([])
    let [visible, setVisible] = useState(3)
    let [indexNo, setIndexNo] = useState('')
    const { token } = userInfo()

    const [comment, setComment] = useState({
        text: ''
    });

    let { text } = comment

    useEffect(() => {
        getAllMemes(token).then(res => {
            setMemes(res.data)
        })

    }, [memes])

    const handleLike = (memId) => () => {
        like(token, memId).then(res => console.log(res))
    }

    const showComments = (index) => ()=>{
        if(indexNo!==index){
            setViewComment(true)
        }else{
            setViewComment(!viewComment)
        }
        setIndexNo(index)
       
    }

    console.log("a",indexNo,viewComment)

    const handleChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const submitComment = (e, id, index) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            let comment = {
                memeId: id,
                comment: text
            }
            commentApi(token, comment).then(res => {
                setViewComment(true)
                document.getElementById(index).value = ''
            })
        }
    }

    const viewMore = () => {
        setVisible((pre) => pre + 3)
    }
    return (
        <div>
            <Navabr />
            <br/><br/>
            <div className='m-5'>
                {
                    memes && memes.map((item, index) => {
                        return (
                            <Card style={{ width: '600px' }} className='m-auto mb-5'>
                                <Card.Header>
                                    <span className='font-weight-bold'>{item.user?.name}</span> <br />
                                    <span className="text-muted small" >{moment(item.createdAt).format('lll')}</span>
                                </Card.Header>
                                <Card.Body >
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>

                                    <Card.Img variant="bottom" height='300px' src={`${API}/${item.meme}`} />
                                </Card.Body>
                                <Card.Footer >
                                    <div className='d-flex'>
                                        <div>
                                            <div>
                                                <svg style={{ cursor: 'pointer' }} onClick={handleLike(item._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={item.color} viewBox="0 0 16 16">
                                                    <path d={item.icon} />
                                                </svg>
                                                <span className='font-weight-bold ml-1' style={{ fontSize: '.7rem', color: `${item.color}` }}>{item.likes.length} Likes</span>
                                            </div>
                                        </div>
                                        <div className='ml-3' style={commentStyle} onClick={showComments(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='currentColor' viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            </svg>
                                            <span style={{ fontSize: '.7rem' }} className='font-weight-bold ml-1'>{item.comments.length} Comments</span>
                                        </div>
                                    </div>
                                    <div className='my-2'>
                                        <input id={index} onChange={handleChange} onKeyUp={(e) => submitComment(e, item._id, index)} name='text' type="text" class="form-control" placeholder="Write a comment......" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                    <div>
                                        {viewComment && indexNo===index &&(
                                            <div>
                                                {item.comments && item.comments.slice(0, visible).map(comment => {
                                                    return (
                                                        <div className='d-flex mb-2'>
                                                            <div className='m-auto'>
                                                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" class="rounded-circle shadow-4"
                                                                    style={{ width: "50px" }} alt="Avatar" />
                                                            </div>
                                                            <Card className='w-100 ml-2'>
                                                                <div className='m-2 '>
                                                                    <span className='font-weight-bold'>{comment.userName}</span> <br />
                                                                    <span className='small'>{comment.comment}</span>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    )
                                                })}
                                                {item.comments.length > visible && (
                                                    <p style={{ cursor: 'pointer', fontSize: '.9rem', textDecoration: 'underline', marginLeft: '3px' }} onClick={viewMore}>View 3 more comments</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Memes;