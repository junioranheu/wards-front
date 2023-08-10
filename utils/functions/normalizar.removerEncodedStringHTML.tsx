export default function normalizarRemoverEncodedStringHTML(html: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
}