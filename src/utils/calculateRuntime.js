export default function calculateRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        if (remainingMinutes > 0) {
            return `${hours}h ${remainingMinutes}min`;
        } else {
            return `${hours}h`;
        }
    } else {
        return `${remainingMinutes}min`;
    }
}
