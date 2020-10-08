import React, { useState, useEffect } from 'react';

import { NavItem, Nav, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Div, Article, Button, Section } from '../movies/styles';
import img from '../image/senhor.jpg';
import logo from '../image/logo.png';

import api from '../../services/api';

const MyMovies = () => {
  const [movies, setMovies] = useState([]);
  const uid = localStorage.getItem('userUid');

  async function handleDeleteMovie(uid) {
    await api
      .delete(`/movies/${uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => {
        setMovies(movies.filter((movie) => movie.uid !== uid));
      })
      .catch((error) => console.log('Erro ao deletar filme'));
  }

  useEffect(() => {
    api
      .get(`/movies/user/${uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenAuth')}`,
        },
      })
      .then((response) => setMovies(response.data.movies))
      .catch((error) => alert('Erro ao buscar filmes cadastrados.'));
  }, []);

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
            <img src={logo} alt="FILMESFLIX" className="w-75" />
          </NavItem>
          <NavItem>
            <Link to="/" style={{ paddingLeft: '10%' }} className="ml-auto">
              <Button type="button">Cadastrar filmes</Button>
            </Link>
          </NavItem>
        </Nav>
      </Div>
      <Article style={{ width: '50%', opacity: '0.8', padding: '21px' }}>
        <Table
          style={{
            width: '100%',
            margin: 'auto',
            paddingTop: '50px',
            color: '#ffffff',
          }}
        >
          <thead>
            <tr>
              <th>Nome</th>
              <th>Duração</th>
              <th>Gênero</th>
              <th>Já assistiu</th>
              <th>Excluir Filme?</th>
            </tr>
          </thead>
          <tbody style={{}}>
            {movies.map((movie) => (
              <React.Fragment key={movie.uid}>
                <tr>
                  <td>{movie.name}</td>
                  <td>{movie.duration}</td>
                  <td>{movie.type}</td>
                  <td>{`${movie.watched ? 'Sim' : 'Não'}`}</td>
                  <td>
                    <span>
                      <Button
                        style={{ width: '100px' }}
                        onClick={() => handleDeleteMovie(movie.uid)}
                      >
                        Excluir
                      </Button>
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Article>
    </Section>
  );
};

export default MyMovies;
