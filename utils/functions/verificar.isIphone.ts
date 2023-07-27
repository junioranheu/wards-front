export default function verificarIsIphone() {
    return /iPhone|iPod/.test(navigator.userAgent);
}