import sanitizeHtml from 'sanitize-html';

export default function normalizarSanitizeHTML(html: string): string {
    return sanitizeHtml(html);
}