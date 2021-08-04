import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserUpdate() {
  const classes = useStyles();

  const { id } = useParams()
  const [fname, setFname] = useState(''); 
  const [lname, setLname] = useState(''); 
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [avatar, setAvatar] = useState(''); 

  useEffect(() => fetch("https://www.mecallapi.com/api/users/" + id)
    .then(res => res.json())
    .then(
      (result) => {
        setFname(result.user.fname)
        setLname(result.user.lname)
        setUsername(result.user.username)
        setEmail(result.user.email)
        setAvatar(result.user.avatar)
      },
    ), [id]
  );

  const handleSubmit = event => {
        event.preventDefault()
        const data = {
            'id': id,
            'fname': fname,
            'lname': lname,
            'username': username,
            'email': email,
            'avatar': avatar,
        }
        fetch("https://www.mecallapi.com/api/users/update", {
            method: 'PUT',
            headers: {
                'Accept': 'application/from-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            alert(result['message'])
            if (result['status'] === 'ok') {
                window.location.href = '/'
            }
        })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit User (ID:{id})
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                onChange={(e) => setFname(e.target.value)}
                label="First Name"
                autoFocus
                value={fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                onChange={(e) => setLname(e.target.value)}
                label="Last Name"
                name="lname"
                value={lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="avatar"
                label="Avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.value)}
                value={avatar}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}