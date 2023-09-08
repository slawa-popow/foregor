import { Request } from "express";

export interface MRequest extends Request {
    photoPath ?: string;
}


export interface TeleUser  {
    id: number;
    first_name ?: string;
    last_name ?: string;
    username ?: string;
    language_code ?: string;
    allows_write_to_pm ?: boolean;
}

export interface Teledata {
    query_id: string;
    user: TeleUser;
    auth_date: number;
    hash: string;
}

 // teledata:  {
    //     query_id: 'AAHrOrtzAAAAAOs6u3MMOL44',
    //     user: {
    //       id: 1941650155,
    //       first_name: 'Slava',
    //       last_name: '',
    //       username: 'Pwg90',
    //       language_code: 'ru',
    //       allows_write_to_pm: true
    //     },
    //     auth_date: '1694156804',
    //     hash: 'edf8278eebeb8f35e9d7e162afaf7038743be156699cc05b62e6c02d49f05e92'
    //   }