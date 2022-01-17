export function emptyStrToNull(value: any, originalValue: any) {
    if (typeof originalValue === 'string' && originalValue === '') {
        return null;
    }
    return value;
}