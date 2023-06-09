import {v4 as uuidv4} from 'uuid'
export const getUUID = () => {
    //判断本地存储是否有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //若果没有生成一个
    if(!uuid_token){
        //生成token，并本地存储
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}