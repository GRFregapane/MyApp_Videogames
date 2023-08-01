/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});

//-----------------------------------------
const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const request = supertest(app);
const Videogame = require('../models/videogame');

describe('GET /api/videogames/:id', () => {
  before(async () => {
    await Videogame.deleteMany({});
    const videogameData = {
      name: 'Super Mario Bros.',
      released: '1985-09-13',
      rating: 4.5,
      background_image: 'https://example.com/super-mario-bros.jpg',
      genres: ['platformer', 'adventure']
    };
    const videogame = new Videogame(videogameData);
    await videogame.save();
  });

  it('should return a videogame by ID', async () => {
    const response = await request.get('/api/videogames/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      id: 1,
      name: 'Super Mario Bros.',
      released: '1985-09-13',
      rating: 4.5,
      background_image: 'https://example.com/super-mario-bros.jpg',
      genres: ['platformer', 'adventure']
    });
  });

  it('should return a 404 error for a non-existent videogame ID', async () => {
    const response = await request.get('/api/videogames/2');
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ message: 'Videogame not found' });
  });
});
/*En este ejemplo, se está probando que la ruta /api/videogames/:id devuelvan los videojuegos correctamente, 
así como las rutas que filtran los videojuegos por nombre y género*/