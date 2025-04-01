import { Request, Response } from 'express';
import { getMissions, createMission } from '../services/limo';

export const getMissionsList = async (req: Request, res: Response) => {
  console.log('aaaaaaaaaa');
  try {
    const { startDate, endDate } = req.query;
    
    const filters: Record<string, string> = {};
    const mission = req.body;
    if (startDate) filters['MIS_DATE_DEBUT#MIN'] = startDate as string;
    if (endDate) filters['MIS_DATE_DEBUT#MAX'] = endDate as string;
    
    const missions = await getMissions(filters, mission);
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: "error" as string });
  }
};

export const createNewMission = async (req: Request, res: Response) => {
  try {
    const mission = req.body;
    const newMission = await createMission(mission);
    res.status(201).json(newMission);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};