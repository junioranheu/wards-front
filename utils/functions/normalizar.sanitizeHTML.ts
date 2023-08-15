import sanitizeHtml from 'sanitize-html';

export default function normalizarSanitizeHTML(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: { 'img': ['src'] },
        // allowedSchemes: ['data', 'http', 'https']
        allowedSchemes: ['data', 'https']
    });
}