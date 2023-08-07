/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description:'mario bros reloaded',
  platforms:[3,4]
};

describe('Genre routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(async() => await Videogame.sync({ force: true }))
  describe('GET /genres', () => {
    it('should get 200', () =>
      agent.get('/genres').expect(200)
    );
    it('genres should have a length of 19',()=>
      agent.get('/genres').then((res)=>{
        expect(res.body.length).to.equal(19)
      })
    )
  });
});

/*realiza pruebas de ruta para verificar que la ruta /genres del servidor responda correctamente con el código 
de estado 200 y que devuelva un array de géneros con la longitud esperada*/