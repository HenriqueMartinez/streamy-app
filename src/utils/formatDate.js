export default function formatDate(input, options) {
    if (!input) {
        return "";
    }

    const date = new Date(input);

    if (isNaN(date.getTime())) {
        return input.toString();
    }

    const monthNames = [
        "jan", "fev", "mar", "abr", "mai", "jun",
        "jul", "ago", "set", "out", "nov", "dez"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month}. de ${year}`;
}
