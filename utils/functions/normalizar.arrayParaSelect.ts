export default function normalizarArrayParaSelect<T>(arr: T[], value: string, label: string) {
    return arr.map((item: any) => ({
        value: item[value],
        label: item[label],
    }));
}