import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

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
            {/* <Alert severity="error" display="none">Invalid Credentials</Alert> */}
            <Grid container container justify="center">
                <form onSubmit={Handler}>
                    <Grid item xs={12}>
                        <TextField id="username" label="Username" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="password" type="password" label="Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" id="signup" color="primary" type="submit" >Create Account</Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default CreateUser;