import { ERROR_TYPE } from "../enums";
import { IError } from "../interfaces";

export class ErrorHelper implements IError {
    type: ERROR_TYPE;
    message: string;

    constructor(type: ERROR_TYPE, info?) {
        this.type = type;
        this.message = this.getMsg_(info);
    }

    throw() {
        throw this.get();
    }

    get() {
        return {
            message: this.message,
            type: this.type
        } as IError;
    }

    private getMsg_(info) {
        let errMsg: string;
        switch (this.type) {
            case ERROR_TYPE.AllowedOnChild:
                errMsg = `The action ${info} is allowed only on child token.`;
                break;
            case ERROR_TYPE.AllowedOnRoot:
                errMsg = `The action ${info} is allowed only on root token.`;
                break;
            default:
                if (!this.type) {
                    this.type = ERROR_TYPE.Unknown;
                }
                errMsg = this.message;
                break;
        }
        return errMsg;
    }
}