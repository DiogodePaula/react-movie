import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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

import { Div, Article, Section, Img, Button } from './styles';
import img from '../image/vingadores.jpg';
import logo from '../image/logo.png';

import api from '../../services/api';
import * as loginActions from '../../store/login/action';

const Movies = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [watched, setWatched] = useState(false);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [movies, setMovies] = useState([]);

  const user_uid = localStorage.getItem('userUid');

  async function handleMovie(e) {
    e.preventDefault();

    await api
      .post(
        '/movies',
        { name, watched, type, duration, user_uid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
          },
        }
      )
      .then((response) => {
        setMovies([...movies, response.data.movie]);
        alert('Filme cadatsrado com sucesso!!');
      })
      .catch((error) => alert('Erro ao cadastrar filme.', error));
    setName('');
    setWatched(false);
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
            <Link
              to="/movie"
              style={{ paddingLeft: '10%' }}
              className="ml-auto"
            >
              <Button type="button">Meus filmes</Button>
            </Link>
          </NavItem>
          <NavItem>
            <NavItem style={{ paddingLeft: '20%' }} className="ml-auto">
              <Button
                type="button"
                onClick={() => dispatch(loginActions.logout())}
              >
                Logout
              </Button>
            </NavItem>
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
            <FormGroup row>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      value={watched}
                      onChange={(e) => setWatched(e.target.checked)}
                    />
                    Marque esta opção se você já assistiu!
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

export default Movies;
