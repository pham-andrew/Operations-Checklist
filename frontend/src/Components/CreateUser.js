

const CreateUser = () => {
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
        fetch('http://localhost:3001/user', requestOptions)
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
                Password: <input type="text" id="password"/><br/>
                <button type="submit" >Create Account</button>
            </form>
        </div>
    )
}

export default CreateUser;