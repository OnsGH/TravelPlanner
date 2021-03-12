// Link to your server file
const supertest = require('supertest');
let server="";
let request="";

/***
 * The server should not be running while doing the test
 ***/
describe('loading express', function () {
   
    beforeEach(function () {
        
        server = require('../src/server') ;
        request = supertest(server);
    });
    afterEach(function () {
      server.close();
    });
it('gets the test endpoint', async done => {
    const response = await request.get('/test');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"message": "this is a message", "time": "now", "title": "test json response"});
   
    done();
  });
  it('responds to /all', async done => {
    const response = await request.get('/all'); 
    expect(response.status).toBe(200);
    done();
    });
})

