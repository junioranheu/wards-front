export default function verificarIsMobile() {
    try {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    } catch (error: unknown) {
        return false;
    }
}