import axios from 'axios';
import {API} from '../utils/config';

export const login=(user)=>{
    return axios.post(`${API}/user/signin`,user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const registration=(user)=>{
    return axios.post(`${API}/user/signup`,user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}