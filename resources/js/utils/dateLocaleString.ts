
export default function dateLocaleString(isoString: string): string {
    const date = new Date(isoString);

    return date.toLocaleString('id-ID', {
        timeZone: 'Asia/Makassar',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}