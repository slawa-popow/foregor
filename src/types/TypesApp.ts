import { Request } from "express";

export interface MRequest extends Request {
    photoPath ?: string;
}