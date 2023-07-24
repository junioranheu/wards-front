export function calcularIdade(dia: number, mes: number, ano: number): number {
    const dataNascimento: Date = new Date(ano, mes - 1, dia);
    const dataAtual: Date = new Date();

    const anosEmMilissegundos: number = dataAtual.getTime() - dataNascimento.getTime();

    const milissegundosPorAno: number = 31557600000;
    const ageInanos: number = anosEmMilissegundos / milissegundosPorAno;

    const idade: number = Math.floor(ageInanos);

    return idade;
}