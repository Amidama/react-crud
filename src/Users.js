import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  }
}));

export default function SimplePaper() {
  const classes = useStyles();
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetch("https://www.mecallapi.com/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result)
        },
      )
  });

  return (
    <div className={classes.root}>
        <Container className={classes.container} maxWidth="md">
            <Paper className={classes.paper}>
              <Box display="flex">
                <Box flexGrow={1} >
                  <Typography variant="h6" gutterBottom>
                    Users
                  </Typography>
                </Box>
                <Box>
                  <Link to="/create">
                    <Button variant="contained" color="primary">
                      Create
                    </Button>
                  </Link>
                </Box>
              </Box>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Avartar</TableCell>
                      <TableCell align="center">Firstname</TableCell>
                      <TableCell align="center">Lastname</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell align="center" component="th" scope="row">
                          {user.id}
                        </TableCell>
                        <TableCell align="center"><img src={user.avatar} width="50px"/></TableCell>
                        <TableCell align="center">{user.fname}</TableCell>
                        <TableCell align="center">{user.lname}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        </Container>
    </div>
  );
}

