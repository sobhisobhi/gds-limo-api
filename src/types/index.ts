export interface CustomJWTHeader {
    alg: string;
    typ: string;
    apiKey: string;
    time: number;
  }

export interface Params {
    C_Gen_Mission: string[] | MissionFilter,
  }

export interface Data {
    limo: string;
    params: {
      C_Gen_Mission?: string[] | MissionFilter;
  };
  }

// Filter options for missions
export interface MissionFilter {
    'MIS_DATE_DEBUT#MIN'?: string;
    'MIS_DATE_DEBUT#MAX'?: string;
  }

// Mission types
export interface Mission {
    MIS_ID?: string;
    ref?: string;
    MIS_TSE_ID: string;
    MIS_TVE_ID: string;
    MIS_DATE_DEBUT: string;
    MIS_HEURE_DEBUT: string;
    MIS_HEURE_FIN: string;
    C_Gen_EtapePresence?: EtapePresence[];
    C_Gen_Presence?: Presence[];
    C_Com_FraisMission?: FraisMission[];
  }
  
  export interface EtapePresence {
    EPR_TRI: string;
    EPR_LIE_ID: string | Lieu;
  }
  
  export interface Lieu {
    LIE_TLI_ID: string;
    LIE_FORMATED: string;
    LIE_VILLE: string;
    LIE_CP: string;
    LIE_PAY_ID: string;
    LIE_LAT: string;
    LIE_LNG: string;
  }
  
  export interface Presence {
    PRS_TRI: string;
    PRS_PAS_ID: string | Passager;
    PRS_CMI?: PrsCmi;
  }

  export interface PrsCmi {
    NB_ADULTE: string;
    NB_BEBE: string;
    NB_ENFANT: string;
    NBRE_BAGAGE_CABINE: string;
    NBRE_BAGAGE_SOUTE: string;
    NB_GUIDE: string;
    NB_HANDICAPE_ASSISTE: string;
    NB_HANDICAPE_NON_ASSISTE: string;
    NB_GRAND_SAC: string;
    NB_HANDICAPE_FAUTEUIL: string;
    NB_SIEGE_AUTO: string;
    NB_SIEGE_BEBE: string;
    NB_SIEGE_REHAUSSEUR: string;
  }

  export interface Passager {
    PAS_CIV_ID: string;
    PAS_NOM: string;
    PAS_PRENOM: string;
    PAS_LAN_ID: string;
    PAS_TELEPHONE?: string;
    PAS_FLAG_SMS?: string;
  }
  
  export interface FraisMission {
    FMI_SER_ID: string;
    FMI_LIBELLE: string;
    FMI_QTE: string;
    FMI_VENTE_HT: string;
    FMI_TVA: string;
  }