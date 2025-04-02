import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';
import { config } from '../config';

// Mock GDS service
jest.mock('../src/services/gdsService', () => ({
  __esModule: true,
  default: {
    getMissions: jest.fn().mockResolvedValue({
      status: 200,
      data: {
        C_Gen_Mission: [
          {
            MIS_ID: '123',
            MIS_TSE_ID: '1',
            MIS_TVE_ID: '1',
            MIS_DATE_DEBUT: '2023-10-20',
            MIS_HEURE_DEBUT: '10:00',
            MIS_HEURE_FIN: '11:30'
          }
        ]
      }
    }),
    createMission: jest.fn().mockResolvedValue({
      status: 201,
      data: {
        C_Gen_Mission: [
          {
            MIS_ID: '456',
            MIS_TSE_ID: '1',
            MIS_TVE_ID: '1',
            MIS_DATE_DEBUT: '2023-10-21',
            MIS_HEURE_DEBUT: '09:00',
            MIS_HEURE_FIN: '10:30'
          }
        ]
      }
    }),
    setCallback: jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: 'success'
      }
    })
  }
}));

describe('Mission API', () => {
  let token: string;

  beforeAll(() => {
    // Create a test token
    token = jwt.sign(
      {
        id: '1',
        username: 'testuser',
        apiKey: 'test_api_key',
        secret: 'test_secret'
      },
      config.jwt.SECRET,
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/missions', () => {
    it('should return missions when authenticated', async () => {
      const response = await request(app)
        .get('/api/missions')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.C_Gen_Mission).toBeDefined();
      expect(response.body.data.C_Gen_Mission.length).toBeGreaterThan(0);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app).get('/api/missions');
      expect(response.status).toBe(401);
    });

    it('should filter missions by date range', async () => {
      const response = await request(app)
        .get('/api/missions?MIS_DATE_DEBUT_MIN=2023-10-01&MIS_DATE_DEBUT_MAX=2023-10-31')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });

  describe('POST /api/missions', () => {
    it('should create a mission when authenticated with valid data', async () => {
      const missionData = {
        MIS_TSE_ID: '1',
        MIS_TVE_ID: '1',
        MIS_DATE_DEBUT: '2023-10-21',
        MIS_HEURE_DEBUT: '09:00',
        MIS_HEURE_FIN: '10:30'
      };

      const response = await request(app)
        .post('/api/missions')
        .set('Authorization', `Bearer ${token}`)
        .send(missionData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.C_Gen_Mission[0].MIS_ID).toBeDefined();
    });

    it('should return 400 when missing required fields', async () => {
      const invalidMissionData = {
        MIS_HEURE_DEBUT: '09:00',
        MIS_HEURE_FIN: '10:30'
      };

      const response = await request(app)
        .post('/api/missions')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidMissionData);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/missions/callback', () => {
    it('should set a callback for mission status changes', async () => {
      const callbackData = {
        mission_id: '123',
        callback_url: 'https://example.com/callback',
        events: ['status_change']
      };

      const response = await request(app)
        .post('/api/missions/callback')
        .set('Authorization', `Bearer ${token}`)
        .send(callbackData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });
});