export default function verificarIsAndroid() {
    return /Android/.test(navigator.userAgent);
}