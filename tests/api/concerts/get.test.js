const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.models.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/performer/:performer', () => {
  beforeEach(async () => {
    const testConcertOne = new Concert({
      performer: 'Dua Lipa',
      genre: 'Pop',
      price: 35,
      day: 1,
      image: 'link',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      performer: 'Lady Gaga',
      genre: 'Pop',
      price: 55,
      day: 1,
      image: 'link',
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      performer: 'Lady Gaga',
      genre: 'Rock',
      price: 45,
      day: 2,
      image: 'link',
    });
    await testConcertThree.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
  });

  it('/existing :performer should return all concerts of that artist', async () => {
    const res = await request(server).get('/api/concerts/performer/Lady Gaga');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/nonexistent :performer should return error 404 and a message "Not found..."', async () => {
    const res = await request(server).get('/api/concerts/performer/Madonna');
    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not found...');
  });
});

describe('GET /api/concerts/genre/:genre', () => {
  beforeEach(async () => {
    const testConcertOne = new Concert({
      performer: 'Dua Lipa',
      genre: 'Pop',
      price: 35,
      day: 1,
      image: 'link',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      performer: 'Lady Gaga',
      genre: 'Pop',
      price: 55,
      day: 1,
      image: 'link',
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      performer: 'Lady Gaga',
      genre: 'Rock',
      price: 45,
      day: 2,
      image: 'link',
    });
    await testConcertThree.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
  });

  it('/existing :genre should return all concerts of that genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/nonexistent :genre should return error 404 and a message "Not found..."', async () => {
    const res = await request(server).get('/api/concerts/genre/Rap');
    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not found...');
  });
});

describe('GET /api/concerts/price/:price_min/:price_max', () => {
  beforeEach(async () => {
    const testConcertOne = new Concert({
      performer: 'Dua Lipa',
      genre: 'Pop',
      price: 35,
      day: 1,
      image: 'link',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      performer: 'Lady Gaga',
      genre: 'Pop',
      price: 55,
      day: 1,
      image: 'link',
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      performer: 'Lady Gaga',
      genre: 'Rock',
      price: 45,
      day: 2,
      image: 'link',
    });
    await testConcertThree.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
  });

  it('/provided :price_min and :price_max should return all concerts in the given price range', async () => {
    const res = await request(server).get('/api/concerts/price/45/55');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/when there are no concerts in the given price range it should return error 404 and a message "Not found..."', async () => {
    const res = await request(server).get('/api/concerts/price/15/30');
    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not found...');
  });
});

describe('GET /api/concerts/day/:day', () => {
  beforeEach(async () => {
    const testConcertOne = new Concert({
      performer: 'Dua Lipa',
      genre: 'Pop',
      price: 35,
      day: 1,
      image: 'link',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      performer: 'Lady Gaga',
      genre: 'Pop',
      price: 55,
      day: 1,
      image: 'link',
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      performer: 'Lady Gaga',
      genre: 'Rock',
      price: 45,
      day: 2,
      image: 'link',
    });
    await testConcertThree.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
  });

  it('/existing :day should return all concerts taking place during that day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/nonexistent :day should return error 404 and a message "Not found..."', async () => {
    const res = await request(server).get('/api/concerts/day/3');
    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not found...');
  });
});