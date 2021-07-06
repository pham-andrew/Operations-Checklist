

const Login = () => {
    const Handler = (e) =>{
        e.preventDefault();
        let requestOptions ={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        }
        fetch('http://localhost:3001/login', requestOptions)
    }


    return(
        <div>
            <form onSubmit={Handler}>
                Username: <input type="text" id="username" /><br/>
                Password: <input type="text" id="password"/><br/>
                <button type="submit" >Sign in</button>
            </form>
            <p> Or <a href="/signup">sign up</a> if you don't have an account.</p>
        </div>
    )
}

export default Login;