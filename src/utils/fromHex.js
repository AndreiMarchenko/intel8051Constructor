export default function fromHex(hexString) {
    if (isNaN(parseInt(hexString, 16)) || hexString === '') {
        return '';
    }
    return parseInt(hexString, 16);
}