export const getRequestHeader = (isJson = true)=>{
    const headers={};

    if(isJson){
        headers['Content-type'] = 'application/json';
    }

    const token = localStorage.getItem('token');
    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';