import { Request } from 'express';
import axios from "axios";
import { generateLimoToken } from "../controllers/auth";
import { config } from '../config';

const GDS_URL = config.gds.API_URL;

export const getMissions = async (
  filter: Record<string, string> = {},
  payload: Record<string, string> = {},
) => {
  const token = generateLimoToken(payload);
  console.log('token: ', token);
  try {
    const response = await axios.post(
      `${GDS_URL}/get-ressource`,
      {},
      {
        headers: {
          alg: 'HS256',
          typ: 'JWT',
          apiKey: config.gds.API_KEY,
          time: Math.floor(Date.now() / 1000),
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch missions");
  }
};

export const createMission = async (missionData: any) => {
  const token = generateLimoToken(missionData);

  try {
    const response = await axios.post(
      `${GDS_URL}/set-ressource-v2`,
      missionData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create mission");
  }
};

export const setCallback = async (callbackUrl: string) => {
  const token = generateLimoToken();

  try {
    const response = await axios.post(
      `${GDS_URL}/set-callback`,
      {
        url: callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to set callback");
  }
};
