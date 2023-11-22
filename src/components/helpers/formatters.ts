export function formatPrice(number) {
    if (number >= 1000) {
        const formattedNumber = (number / 1000).toFixed(3);
        return formattedNumber.replace(".", " ");
    } 
    return number.toString();
}