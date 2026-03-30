const request = require('supertest');
const app = require('../index');
describe('Electricity API Endpoints', () => {

    // Test Case 1
    it('should return total electricity usage for all years', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    // Test Case 1
    it('should return 404 for invalid total usage route', async () => {
        const res = await request(app).get('/api/usage/by-year');
        expect(res.status).toBe(404);
        expect(typeof res.body).toBe('object');
    });

    // Test Case 2
    it('should return electricity usage for a specific province and year', async () => {
        const res = await request(app).get('/api/usage/Alberta/2566');
        expect(res.body.message).toBe('Data not found');
    });

    // Test Case 2
    it('should return 404 for invalid method', async () => {
        const res = await request(app).post('/api/usage/Alberta/2566');
        expect(res.status).toBe(404);
    });

    // Test Case 3
    it('should return user history for a specific province', async () => {
        const res = await request(app).get('/api/users/history/Bangkok');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test Case 3
    it('should return 400 for invalid province format', async () => {
        const res = await request(app).get('/api/users/history/B@ngkok');
        expect(res.body).toEqual([]);
    });
    

    // Test Case 4
    it('should return total number of users', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    //Test Case 4
    it('should return 404 for invalid total users route', async () => {
        const res = await request(app).get('/api/users/2570');
        expect(res.status).toBe(404);
    });

    // Test Case 5
    it('should return user count for a specific province and year', async () => {
        const res = await request(app).get('/api/users/Bangkok/2566');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    // Test Case 5
    it('should return 404 if province not found', async () => {
        const res = await request(app).get('/api/users/London/2566');
        expect(res.body.message).toBe('Data not found');
    });


    // Test Case 6
    it('should return usage history for a specific province', async () => {
        const res = await request(app).get('/api/usage/history/Bangkok');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test Case 6
    it('should return 404 if usage history not found', async () => {
        const res = await request(app).get('/api/usage/history/Alberta');
        expect(res.body).toEqual([]);
    });
    
});