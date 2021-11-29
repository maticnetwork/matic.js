import { ERROR_TYPE } from "../enums";
import { ErrorHelper } from "./error_helper";

export class Logger {

    private isEnabled: boolean;

    enableLog(value) {
        this.isEnabled = value ? true : false;
    }

    log(...message) {
        if (this.isEnabled) {
            console.log(...message);
        }
    }

    error(type: ERROR_TYPE, info?) {
        return new ErrorHelper(type, info);
    }
}