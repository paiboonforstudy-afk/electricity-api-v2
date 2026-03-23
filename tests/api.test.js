const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {

    // API 1: Total electricity usages for each year
    it('should return total electricity usage for each year', async () => {
        const res = await request(app).get('/api/usages/totalyear');
        expect(res.statusCode).toEqual(200); 
        expect(typeof res.body).toBe('object'); 
    });

    // API 2: Total electricity users for each year
    it('should return total electricity users for each year', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe('object');
    });

    // API 3: Usage of specific province by specific year
    it('should return usage for a specific province and year', async () => {
        const res = await request(app).get('/api/usage/Bangkok/2566'); 
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('province_name'); 
    });

    // API 4: Users of specific province by specific year
    it('should return users for a specific province and year', async () => {
        const res = await request(app).get('/api/abc/Bangkok/2566');
        expect(res.statusCode).toEqual(200); 
    });

    // API 5: Usage history by specific province
    it('should return usage history for a specific province', async () => {
        const res = await request(app).get('/api/def/history/Bangkok');
        expect(res.statusCode).toEqual(200); 
        expect(Array.isArray(res.body)).toBe(true);
    });

    // API 6: User history by specific province
    it('should return user history for a specific province', async () => {
        const res = await request(app).get('/api/pastusers/Bangkok');
        expect(res.statusCode).toEqual(200); 
        expect(Array.isArray(res.body)).toBe(true); 
    });

    // Error Handling Test
    it('should return 404 for non-existent province or year', async () => {
        const res = await request(app).get('/api/usage/Alberta/2566');
        expect(res.body.message).toBe('Data not found'); 
    });
});