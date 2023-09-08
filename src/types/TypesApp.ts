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

 