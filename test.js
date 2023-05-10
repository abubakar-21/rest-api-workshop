const request = require('supertest');
const app = require('./src/index.js');

describe('Test API endpoints', () => {
    it('should get all cars', async () => {
        const res = await request(app).get('/bilar');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });

    it('should get a car by id', async () => {
        const res = await request(app).get('/bilar/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    });

    it('should return 404 for non-existing car', async () => {
        const res = await request(app).get('/bilar/10');
        expect(res.statusCode).toEqual(404);
    });

    it('should add a new car', async () => {
        const newCar = { make: 'Tesla', model: 'Model S', year: 2022 };
        const res = await request(app)
            .post('/bilar')
            .send(newCar);
        expect(res.statusCode).toEqual(200);
        expect(res.body.make).toEqual('Tesla');
        expect(res.body.model).toEqual('Model S');
        expect(res.body.year).toEqual(2022);
    });

    it('should update an existing car', async () => {
        const updatedCar = { make: 'Toyota', model: 'Camry', year: 2018 };
        const res = await request(app)
            .put('/bilar/1')
            .send(updatedCar);
        expect(res.statusCode).toEqual(200);
        expect(res.body.make).toEqual('Toyota');
        expect(res.body.model).toEqual('Camry');
        expect(res.body.year).toEqual(2018);
    });

    it('should partially update an existing car', async () => {
        const updatedFields = { year: 2020 };
        const res = await request(app)
            .patch('/bilar/2')
            .send(updatedFields);
        expect(res.statusCode).toEqual(200);
        expect(res.body.year).toEqual(2020);
    });

    it('should delete an existing car', async () => {
        const res = await request(app).delete('/bilar/3');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Car with ID 3 deleted');
    });

    it('should return 404 for non-existing car to update', async () => {
        const updatedCar = { make: 'Toyota', model: 'Camry', year: 2018 };
        const res = await request(app)
            .put('/bilar/10')
            .send(updatedCar);
        expect(res.statusCode).toEqual(404);
    });
});
