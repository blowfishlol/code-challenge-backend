export default class History {
    command: string;
    result: number;
    timestamp: Date;

    constructor(command: string,  result: number, timestamp: Date = new Date()) {
        this.command = command;
        this.result = result;
        this.timestamp = timestamp;
    }
}