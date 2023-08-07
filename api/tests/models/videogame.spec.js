const { Videogame, conn } = require('../../src/db');
const { expect } = require('chai');
const videogame = {
  name: 'Counter Strike',
  description:'blabla',
  platforms:[3,4]
};

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators and post', () => {
    beforeEach(async() => await Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name, description and platforms', () => {
        Videogame.create({
                name: "FIFA",
                description: "futbol",
                platforms:[3,1]
              })
          .then(()=>done())
          .catch(()=>done())
        
      });
    });
/*La primera prueba valida que se lance un error si el nombre del videojuego es nulo al intentar crear un nuevo registro 
en la base de datos.
La segunda prueba verifica que el método create funcione correctamente cuando se proporciona un nombre válido,
una descripción y una plataforma*/    

describe("Creating games", () => {
     
      it("should return the game created", async () => {
        let temp = await Videogame.create({
          name: "FIFA",
          description: "futbol",
          platforms:[3,1],
          
        });
        
        expect(temp.dataValues.name).to.equal("FIFA");
        expect(temp.dataValues.description).to.equal("futbol");
        expect(temp.dataValues.platforms).to.deep.equal([3,1]);
      });
    });
  });
});
/*La prueba verifica que el método create devuelva el juego creado correctamente y que los valores sean los esperados.*/

