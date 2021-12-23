interface  IErrorCodes {
    [key: string]: string
}

const errorCodes: IErrorCodes = {
    EMAIL_NOT_FOUND: 'User with this email not found',
    INVALID_PASSWORD: 'Invalid password',
    EMAIL_EXISTS: 'User with this email already exist',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Try later',
}

export function error(code: string): string {
    return errorCodes[code] ? errorCodes[code] : 'Undefined error';
}
