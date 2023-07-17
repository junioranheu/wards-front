export default function gerarStringAleatoria(max: number): string {
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < max; i++) {
        const randomIndex = Math.floor(Math.random() * c.length);
        result += c.charAt(randomIndex);
    }

    return result;
}