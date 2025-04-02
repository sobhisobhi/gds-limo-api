import { Request, Response } from 'express';
import { getMissions, createMission } from '../services/limo';
import { Mission, Data } from '../types';

type MissData = Record<string, { C_Gen_Mission: Mission[] }>;

function isArrayOfString(value: any): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function filterMissions(miss: MissData, filters: Data[]): Mission[] {
  let result: Mission[] = [];

  filters.forEach(filter => {
    const { limo, params } = filter;
    if (!miss[limo]) return; // Vérifier si la clé "limo" existe

    let missions = miss[limo].C_Gen_Mission;

    // Vérifier si C_Gen_Mission est un tableau d'IDs
    if (params.C_Gen_Mission) {

    // Vérifier si C_Gen_Mission est un objet contenant les filtres de dates
    if (typeof params.C_Gen_Mission === "object" 
      && !Array.isArray(params.C_Gen_Mission)
      && params.C_Gen_Mission !== null) {
      const dateFilters = params.C_Gen_Mission;

      if (dateFilters["MIS_DATE_DEBUT#MIN"]) {
        const minDate = new Date(dateFilters["MIS_DATE_DEBUT#MIN"]);
        missions = missions.filter(mission =>
          new Date(mission.MIS_DATE_DEBUT) >= minDate
        );
      }

      if (dateFilters["MIS_DATE_DEBUT#MAX"]) {
        const maxDate = new Date(dateFilters["MIS_DATE_DEBUT#MAX"]);
        missions = missions.filter(mission =>
          new Date(mission.MIS_DATE_DEBUT) <= maxDate
        );
      }
    }
  }
    result = [...result, ...missions]; // Ajouter au résultat global
  });
  return result;
}
export const getMissionsList = async (req: Request, res: Response) => {
  try {
    const missions = await getMissions();
    res.status(200).json(filterMissions(missions, req.body));

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