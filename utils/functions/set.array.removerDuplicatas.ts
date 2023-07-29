export default function setRemoverDuplicatas<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}