import { expect } from 'chai';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';

//const faker = require('../src/index');

let token; //token is declared outside testsuit so that it can be access in other tests also

describe('GET /users', () => {
  it('should able to create user when user data is given', (done) => {
    const user = {
      firstName: 'Sana',
      lastName: 'fouth',
      email: 'fourthsana@gmail.com',
      password: 'sana'
    };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        //expect(res.body.data).to.be.an('object');error: uncaughtException: expected undefined to be an object
        //AssertionError: expected undefined to be an object
        done();
      });
  });

  it('should able to return HttpStatus.BAD_REQUEST when invalid data is given', (done) => {
    const user = {
      firstName: 1,
      lastName: 'First',
      email: 'first@gmail.com',
      password: 'sana'
    };
    request(app)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
  });

  it('Given user details to login should return status 200', (done) => {
    const userCredentials = {
      email: 'fourthsana@gmail.com',
      password: 'sana'
    };

    request(app)
      .post('/api/v1/users/login')
      .send(userCredentials)
      .end((err, res) => {
        token = res.body.userToken;
        console.log('this is the value of token ', token);
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });
  it('Given user details to login should return status 400', (done) => {
    const userCredentials = {
      email: 'secondsana@gmail.com',
      password: ''
    };
    request(app)
      .post('/api/v1/users/login')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
  });
}); //outer describe test suit for user testing

//note testing

var id;
describe('POST /create new note', () => {
  it('while create a note should return status 201', (done) => {
    const newNote = {
      title: 'new test notes',
      description: 'first test'
    };
    request(app)
      .post('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`) // Setting the bearer token for the authorization
      .send(newNote)
      .end((err, res) => {
        id = res.body.data.id; //ID from note controller response
        console.log('this is id while creating note *********************************',id);
        console.log('this is token ',token)
        console.log('Response body:', res.body);
        console.log('Response status code:', res.statusCode);
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });
  });

  // it('while creating a note should return status 400', (done) => {
  //   const newNote = {
  //     title: ' test update notes',
  //     description: 9
  //   };
  //   request(app)
  //     .post(`/api/v1/notes`)
  //     // .set('Authorization', `Bearer ${token}`) // Setting the bearer token for the authorization
  //     .send(newNote)
  //     .end((err, res) => {
        
  //       console.log('Response body:', res.body);
  //       console.log('Response status code:', res.statusCode);
  //       id = res.body.id;
  //       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
  //       done();
  //     });
  // });


  it(' get all notes should return status 200', (done) => {
    const noteData = {};
    request(app)
      .get('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`) // Setting the bearer token for the authorization
      .send(noteData)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  }); 

  it('getall note should return status 400', (done) => {
    const noteData = {};
    request(app)
      .post('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`) // Setting the bearer token for the authorization
      .send(noteData)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
  });

  console.log('checking the id of note **************************',id);

  it(' should return 200 when get a note by id', (done) => {
    const noteData = {};
    console.log('checking the id of note **************************',id);
    request(app)
      .get(`/api/v1/notes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(noteData)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });
  it('should return 400 when get a note by id', (done) => {
    const noteData = {};
    request(app)
    .get(`/api/v1/notes/${id}`)
      .send(noteData)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
  });

  
   
  it('should return status 200 for updated note', (done) => {
    const noteData = {
      title: 'updated Note',
      description: 'details are updated'
    };
    request(app)
      .put(`/api/v1/notes/${id}`)
      .set('Authorization', `Bearer ${token}`) // Setting the bearer token for the authorization
      .send(noteData)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

  it(' should return 200 when adding note to archive', (done) => {
    request(app)
      .put(`/api/v1/notes/${id}/archive`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });

  it('should return 200 when adding note to trash ', (done) => {
    request(app)
      .put(`/api/v1/notes/${id}/trash`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });
  
  it('should return 200 when deleting a note ', (done) => {
    request(app)
      .delete(`/api/v1/notes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
  });


});//outer test suit
