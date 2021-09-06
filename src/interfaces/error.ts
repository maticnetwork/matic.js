import { ERROR_TYPE } from "../enums";

export interface IError {
    type: ERROR_TYPE;
    message: string;
}