class Auth{
    static authToken(token){
        localStorage.setItem('token', token)
    }

    static getToken(){
      return  localStorage.getItem('token')
    }

    static deauthUser(){
        localStorage.removeItem('token')
    }
}
export default Auth