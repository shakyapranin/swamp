export default class InvalidDataException extends Error{
    constructor(message: string) {
        super(message);
    }
}