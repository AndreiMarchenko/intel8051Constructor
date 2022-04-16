export default function toHex(number) {
    if (number === null || number === undefined) {
        return '';
    }

    if (number === 'z') {
        return 'z';
    }

    const withoutPrefix = number.toString(16).length === 1
        ? (`0${number.toString(16)}`).replace('0x', '')
        : number.toString(16).replace('0x', '');

    return `0x${withoutPrefix}`;
}