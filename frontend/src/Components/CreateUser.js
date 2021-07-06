

const CreateUser = () => {
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
        console.log(requestOptions.username)
        fetch('http://localhost:3001/user', requestOptions)
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