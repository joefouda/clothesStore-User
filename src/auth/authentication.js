import axios from "axios"
class Authentication {
    Signup(data){
        return axios.post('http://localhost:3000/api/v1/user/signup',data)
    }
    logIn(data){
        return axios.post('http://localhost:3000/api/v1/user/login',data)
    }

    logOut(){
        localStorage.removeItem('token');
    }

    isAuthinticated(){
        return localStorage.getItem('token');
    }
}

export default new Authentication()