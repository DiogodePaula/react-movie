import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Div, Article, Section, Img, Button } from './styles';
import img from '../image/vingadores.jpg';
import logo from '../image/logo.png';

import * as loginActions from '../../store/login/action';

export default () => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState('');

  const [name, setName] = useState('');
  const [watched, setWatched] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');

  async function handleMovie() {
    await api
      .post('/movies', { name, watched, type, duration })
      .then((response) => setMovies([...movies, response.data]))
      .catch((error) => console.log(error));
    setName('');
    setWatched('');
    setType('');
    setDuration('');
  }

  return (
    <Section
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Div>
        <Nav style={{ padding: '20px' }}>
          <NavItem className="ml-2" style={{ width: '13%' }}>
            <Img src={logo} alt="FILMESFLIX" className="w-75" />
          </NavItem>
          <NavItem>
            <NavLink style={{ paddingLeft: '10%' }} className="ml-auto">
              <Button
                type="button"
                onClick={() => dispatch(loginActions.logout())}
              >
                Logout
              </Button>
            </NavLink>
          </NavItem>
        </Nav>
        <hr />
      </Div>
      <Article>
        <Form style={{ width: '450px', margin: 'auto' }}>
          <FormGroup>
            <Label>Nome do Filme</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Gênero</Label>
            <Input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Duração</Label>
            <Input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </FormGroup>
          <FormGroup check style={{ paddingLeft: '0' }}>
            <Label check>Já assistiu</Label>
            <Input
              type="check"
              value={watched}
              onChange={(e) => setWatched(e.target.value)}
            />
            <br />

            <FormGroup row>
              <div
                style={{ marginLeft: '1em', marginBottom: '1em' }}
                htmlFor="checkbox2"
                sm={2}
              >
                Já assistiu?
              </div>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="checkbox2" /> Sim
                  </Label>
                  <br />
                  <Label check>
                    <Input type="checkbox" id="checkbox2" /> Não
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
          </FormGroup>
          <div style={{ width: '150px', margin: 'auto', padding: '1.5em' }}>
            <Button
              onClick={handleMovie}
              style={{
                width: '130%',
                margin: 'auto',
              }}
            >
              Cadastrar
            </Button>
          </div>
        </Form>
      </Article>
    </Section>
  );
};
