export default function filtroPaginacaoInput(index: number, limit: number, isSelectAll: boolean) {
    return `index=${index}&limit=${limit}&isSelectAll=${isSelectAll}`;
}