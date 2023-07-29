export default function setSliceString(str: string, max: number, isReticencias: boolean) {
    return `${str.slice(0, max ?? 200)}${(isReticencias ? '...' : '')}`;
}