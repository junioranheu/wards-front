export default function normalizarCodigo(textoEntrada: string, nomeTag: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(textoEntrada, 'text/html');

    const elementosTag = Array.from(doc.querySelectorAll(nomeTag));

    for (const elementoTag of elementosTag) {
        elementoTag.textContent = handleIdentarCodigo(elementoTag.textContent!);
    }

    return doc.documentElement.innerHTML;
}

function handleIdentarCodigo(textoEntrada: string, espacosPorIndentacao: number = 4): string {
    const linhas = textoEntrada.split('\n');
    const linhasIndentadas: string[] = [];
    let nivelIndentacaoAtual = 0;

    const gerarIndentacao = () => ' '.repeat(nivelIndentacaoAtual * espacosPorIndentacao);

    for (const linha of linhas) {
        const linhaSemEspaco = linha.trim();

        if (linhaSemEspaco === '') {
            linhasIndentadas.push('');
            continue;
        }

        if (linhaSemEspaco.startsWith('}') || linhaSemEspaco.startsWith(']') || linhaSemEspaco.startsWith(')')) {
            nivelIndentacaoAtual--;
        }

        linhasIndentadas.push(gerarIndentacao() + linhaSemEspaco);

        if (linhaSemEspaco.endsWith('{') || linhaSemEspaco.endsWith('[') || linhaSemEspaco.endsWith('(')) {
            nivelIndentacaoAtual++;
        }
    }

    return linhasIndentadas.join('\n');
}