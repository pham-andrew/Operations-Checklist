import Alert from './Alert'

let alert = <Alert message="Invalid credentials!"/>

const Login = () => {
    const Handler = (e) =>{
        e.preventDefault();
        let requestOptions ={
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        }
        fetch('http://localhost:3001/login', requestOptions)
            .then( res=>{
                if(res.status === 401){
                    return console.log('invalid credentials')
                }
                if(res.status === 200){
                    return window.location.href = '/'
                }
            })
    }


    return(
        <div>
            <form onSubmit={Handler}>
                Username: <input type="text" id="username" /><br/>
                Password: <input type="password" id="password"/><br/>
                <button type="submit" >Sign in</button>
            </form>
            <p> Or <a id="signup" href="/signup">sign up</a> if you don't have an account.</p>
        </div>
    )
}

export default Login;