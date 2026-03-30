const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {

    // API 1: Total electricity usages for each year
    describe('API 1: Total electricity usages for each year', () => {
        it('valid: should return total electricity usage for each year', async () => {
            const res = await request(app).get('/api/usages/totalyear');
            expect(res.statusCode).toEqual(200); 
            expect(typeof res.body).toBe('object'); 
        });

        it('invalid: should return 404 for POST method', async () => {
            const res = await request(app).post('/api/usages/totalyear');
            expect(res.statusCode).toEqual(404);
        });
    });

    // API 2: Total electricity users for each year
    describe('API 2: Total electricity users for each year', () => {
        it('valid: should return total electricity users for each year', async () => {
            const res = await request(app).get('/api/users/total-by-year');
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toBe('object');
        });

        it('invalid: should return 404 for POST method', async () => {
            const res = await request(app).post('/api/users/total-by-year');
            expect(res.statusCode).toEqual(404);
        });
    });

    // API 3: Usage of specific province by specific year
    describe('API 3: Usage of specific province by specific year', () => {
        it('valid: should return usage for a specific province and year', async () => {
            const res = await request(app).get('/api/usage/Bangkok/2566'); 
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('province_name'); 
        });

        it('invalid: should return 404 for non-existent province', async () => {
            const res = await request(app).get('/api/usage/Alberta/2566');
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Data not found');
        });
    });

    // API 4: Users of specific province by specific year
    describe('API 4: Users of specific province by specific year', () => {
        it('valid: should return users for a specific province and year', async () => {
            const res = await request(app).get('/api/abc/Bangkok/2566');
            expect(res.statusCode).toEqual(200); 
            expect(res.body).toHaveProperty('province_name');
        });

        it('invalid: should return 404 for non-existent province', async () => {
            const res = await request(app).get('/api/abc/Alberta/2566');
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Data not found');
        });
    });

    // API 5: Usage history by specific province
    describe('API 5: Usage history by specific province', () => {
        it('valid: should return usage history for a specific province', async () => {
            const res = await request(app).get('/api/def/history/Bangkok');
            expect(res.statusCode).toEqual(200); 
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('invalid: should return empty array for non-existent province', async () => {
            const res = await request(app).get('/api/def/history/Alberta');
            expect(res.statusCode).toEqual(200); 
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        });
    });

    // API 6: User history by specific province
    describe('API 6: User history by specific province', () => {
        it('valid: should return user history for a specific province', async () => {
            const res = await request(app).get('/api/pastusers/Bangkok');
            expect(res.statusCode).toEqual(200); 
            expect(Array.isArray(res.body)).toBe(true); 
        });

        it('invalid: should return empty array for non-existent province', async () => {
            const res = await request(app).get('/api/pastusers/Alberta');
            expect(res.statusCode).toEqual(200); 
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        });
    });

});