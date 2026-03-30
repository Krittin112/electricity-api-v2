const request = require('supertest');
const app = require('../index');
describe('Electricity API Endpoints', () => {
    // Test Case 1: Total Usage - pass
    it('should return total electricity usage for all years', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });
    // Test Case 1: Total Usage - fail
    it('should return total electricity users for all years', async () => {
        const res2 = await request(app).get('/api/usage/total-by-year');
        expect(res2.status).toBe(404);
        expect(res2.body.message).toBe('Not Found');
    });




    // Test Case 2: Specific Province Usage - pass
    it('should return electricity usage for a specific province and year', async () => {
        const res = await request(app).get('/api/usage/Alberta/2566');
        expect(res.body.message).toBe('Data not found');
    });
    // Test Case 2: Specific Province Usage - fail
    it('should return user data for a specific province and year', async () => {
        const res2 = await request(app).get('/api/usage/Alberta/2565');
        expect(res2.status).toBe(200);
        expect(res2.body.province_name).toBe('Alberta');
        expect(res2.body.year).toBe(2565);
    });



    // Test Case 3: User History for a Province - pass
    it('should return user history for a specific province', async () => {
        const res = await request(app).get('/api/users/history/Bangkok');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    // Test Case 3: User History for a Province - fail
    it('should return usage history for a specific province', async () => {
        // fail test case
        const res = await request(app).get('/api/usage/history/Bangkok');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(false);
    });




    // API 4: Users of specific province by specific year - pass
    it('should return user data for a specific province and year', async () => {
        // pass test case
        const res = await request(app).get('/api/users/Bangkok/2565');
        expect(res.status).toBe(200);
        expect(res.body.province_name).toBe('Bangkok');
        expect(res.body.year).toBe(2565); 
    });
    // API 4: Users of specific province by specific year - fail
    it('should return user data for a specific province and year', async () => {
        const res2 = await request(app).get('/api/users/Bangkok/2566');
        expect(res2.status).toBe(200);
        expect(res2.body.message).toBe('Data not found');
    });




    // API 5: Usage history by specific province - pass
    it('should return usage data for a specific province and year', async () => {
        // pass test case
        const res = await request(app).get('/api/usage/Bangkok/2565');
        expect(res.status).toBe(200);
        expect(res.body.province_name).toBe('Bangkok');
        expect(res.body.year).toBe(2565);
    });
    // API 5: Usage history by specific province - fail
    it('should return usage data for a specific province and year', async () => {
        const res2 = await request(app).get('/api/usage/Bangkok/2566');
        expect(res2.status).toBe(200);
        expect(res2.body.message).toBe('Data not found');
    });


    // API 6: User history by specific province - pass
    it('should return user data for a specific province and year', async () => {
        // pass test case
        const res = await request(app).get('/api/users/Bangkok/2565');
        expect(res.status).toBe(200);
        expect(res.body.province_name).toBe('Bangkok');
        expect(res.body.year).toBe(2565);

    });
    // API 6: User history by specific province - fail
     it('should return user data for a specific province and year', async () => {
        const res2 = await request(app).get('/api/users/Bangkok/2566');
        expect(res2.status).toBe(200);
        expect(res2.body.message).toBe('Data not found');
     });
});