//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let City = require('../models/city').CityModel;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var log = require('../libs/log')(module);

chai.use(chaiHttp);

describe('City', () => {
    let token = "";

    beforeEach((done) => { // clear database 
            City.deleteMany({}, (err) => {                  
             done();        
             });
        }); 
        before((done) => { // auth
            chai.request(server)
                .post('/api/v1/users/login/')
                .send({email:'admin@gmail.com',password:'admin1234'})
                .end(function(err, res) {
                    res.status.should.equal(201);
                    res.body.data.should.be.a('string');
                    token = res.body.data;    
                    done();             
                });                
            }); 

            afterEach((done) => { 
                done();  
            }); 
/*
  * tests
  */
  describe('/GET city all', () => {
      it('it should GET empty array', (done) => {
        chai.request(server)
            .get('/api/v1/world/city/all')
            .set('x-access-token' , token)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.result.docs.should.be.a('array');
                res.body.result.docs.length.should.be.eql(0);
                res.body.result.total.should.be.eql(0);
                res.body.result.page.should.be.eql(1);
                res.body.result.pages.should.be.eql(1);
                res.body.result.limit.should.be.eql(10);
              done();
            });
      });
  });

  describe('/POST city (route \'/api/v1/world/city/\')', () => {
    it('it should PUT city', (done) => {
      chai.request(server)
          .post('/api/v1/world/city')
          .set('x-access-token' , token)
          .send({name:'Kohtla-Jarve', id: 1, district: "Ida", population: 10000})
          .end((err, res) => {
              log.info(res.body);
              res.status.should.equal(200);
              res.body.city.should.be.a('object');
              res.body.city.name.should.be.eql('Kohtla-Jarve');
              res.body.city.id.should.be.eql(1);
              res.body.city.population.should.be.eql(10000);
            done();
          });
    });
});

describe('/GET city all', () => {
    it('it should GET array with one element', (done) => {
        let city = new City({name:'Kohtla-Jarve', id: 1, district: "Ida", population: 10000});
        city.save((err, city) => {
      chai.request(server)
          .get('/api/v1/world/city/all')
          .set('x-access-token' , token)
          .end((err, res) => {
              res.status.should.equal(200);
              res.body.result.docs.should.be.a('array');
              res.body.result.docs.length.should.be.eql(1);
              res.body.result.total.should.be.eql(1);
              res.body.result.page.should.be.eql(1);
              res.body.result.pages.should.be.eql(1);
              res.body.result.limit.should.be.eql(10);
            done();
          });
        });
    });
});

  describe('/GET city by Id (route \'/api/v1/world/city/:id\')', () => {
    it('it should GET error status 404 when id is empty', (done) => {
      chai.request(server)
          .get('/api/v1/world/city/:id')
          .set('x-access-token' , token)
          .send({id:''})
          .end((err, res) => {
              res.status.should.equal(404);
            done();
          });
    });

    it('it should GET city by Id', (done) => {
      chai.request(server)
          .get('/api/v1/world/city/'+city._id)
          .set('x-access-token' , token)
          .end((err, res) => {
              res.status.should.equal(200);
            done();
          });
    });
});

describe('/PUT city (route \'/api/v1/world/city/:id\')', () => {
    it('it should GET city by Id', (done) => {
        city.name = "Johvi";
      chai.request(server)
          .put('/api/v1/world/city/'+city._id)
          .set('x-access-token' , token)
          .send(city)
          .end((err, res) => {
              res.status.should.equal(200);
              res.body.should.have.property('message').eql('City updated.');
            done();
          });
    });
});

describe('/DELETE city (route \'/api/v1/world/city/:id\')', () => {
    it('it should GET city by Id', (done) => {
      chai.request(server)
          .delete('/api/v1/world/city/'+city._id)
          .set('x-access-token' , token)
          .end((err, res) => {
              res.status.should.equal(200);
              res.body.city.should.be.a('object');
              res.body.city._id.should.be.eql(city._id);
            done();
          });
    });
});

});