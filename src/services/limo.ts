import axios from "axios";
import jwt from 'jsonwebtoken';
import { generateLimoToken } from "../controllers/auth";
import { config } from '../config';
import { Data, MissionFilter } from "../types";

const GDS_URL = config.gds.API_URL;

export const getMissions = async () => {
  const payload: Data = {
    limo: config.gds.LIMO,
    params: {
      C_Gen_Mission: {}
    }
  };

  const token = generateLimoToken(payload);
  const decodedHeader = jwt.decode(token, { complete: true })?.header;

  try {
    const response = await axios.post(
      `${GDS_URL}/get-ressource`,
      payload,
      {
        headers: {
          ...decodedHeader,
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
  const decodedHeader = jwt.decode(token, { complete: true })?.header;
  try {
    const response = await axios.post(
      `${GDS_URL}/set-ressource-v2`,
      missionData,
      {
        headers: {
          ...decodedHeader,
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
  const decodedHeader = jwt.decode(token, { complete: true })?.header;

  try {
    const response = await axios.post(
      `${GDS_URL}/set-callback`,
      {
        url: callbackUrl,
      },
      {
        headers: {
          ...decodedHeader,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to set callback");
  }
};
