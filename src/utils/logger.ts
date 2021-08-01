export class Logger {

    private isEnabled: boolean;

    enableLog(value) {
        this.isEnabled = true;
    }

    log(...message) {
        if (this.isEnabled) {
            console.log(...message);
        }
    }
}