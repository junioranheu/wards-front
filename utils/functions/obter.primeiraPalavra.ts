export default function obterPrimeiraPalavra(str: string) {
    const strSplitada = str?.split(' ');
    const primeiraPalavra = strSplitada && strSplitada[0];

    return primeiraPalavra;
}