export default function normalizarBlobParaImagemBase64(blob: string) {
    return `data:image/jpg;base64,${blob}`;
}