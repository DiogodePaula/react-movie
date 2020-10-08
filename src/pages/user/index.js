import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import imgUser from '../image/adam.jpg';
import { Article, Button } from '../movies/styles';

const Example = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState('');

  async function handleUser() {
    await api
      .post('/users', { name, email, age, password })
      .then((response) => setUsers([...users, response.data]))
      .catch((error) => console.log(error));
    setName('');
    setEmail('');
    setAge('');
    setPassword('');
  }

  return (
    <div
      style={{
        backgroundImage: `url(${imgUser})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <br />
      <br />
      <Article
        style={{
          width: '600px',
          margin: 'auto',
        }}
      >
        <FormGroup>
          <Label for="examplePassword">Name</Label>
          <Input
            type="text"
            value={name}
            // id="examplePassword"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            value={email}
            // id="exampleEmail"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Age</Label>
          <Input
            type="number"
            value={age}
            // id="examplePassword"
            placeholder="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            value={password}
            // id="examplePassword"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleUser}>Cadastrar</Button>
        <Link to="/login" style={{ paddingLeft: '10px' }}>
          <Button>Voltar</Button>
        </Link>
      </Article>
    </div>
  );
};

export default Example;
