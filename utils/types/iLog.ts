export default interface iLog {
    tipoRequisicao: string | null;
    endpoint: string | null;
    parametros: string | null;
    descricao: string | null;
    statusResposta: number;
    usuarioId: number | null;
}