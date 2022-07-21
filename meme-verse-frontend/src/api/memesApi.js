import axios from 'axios';
import {API} from '../utils/config';

export const getAllMemes=(token)=>{
    return axios.get(`${API}/meme/getalls`,{
        headers:{
            'Content-Type':'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const like=(token,memeId)=>{
    let id={
        memeId
    }
    return axios.put(`${API}/meme/like`,id,{
        headers:{
            'Content-Type':'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const commentApi=(token,comment)=>{
    return axios.put(`${API}/meme/comment`,comment,{
        headers:{
            'Content-Type':'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const shareMeme=(token,formData)=>{
    return axios.post(`${API}/meme/share`,formData,{
        headers:{
            'Content-Type':'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}