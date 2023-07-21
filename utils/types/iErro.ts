export default interface iErro {
    caminho: {
        value: string;
        hasValue: boolean;
    };

    codigo: number;
    data: Date | string;
    mensagens: string[] | null;
}