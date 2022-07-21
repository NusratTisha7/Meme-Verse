import axios from 'axios';
import {API} from '../utils/config';

export const verifyEmail=(email)=>{
    return axios.post(`${API}/reset/verify-email`,email,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const resetCodeApi=(email,code)=>{
    let data={
        email,code 
    }
    console.log("data",data)
    return axios.post(`${API}/reset/reset-code`,data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const resetPassword=(data)=>{
    return axios.post(`${API}/reset/reset-pass`,data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}
