import Moment from 'moment-timezone';

export default function gerarHorarioBrasilia() {
    Moment.tz.setDefault('America/Sao_Paulo');
    return Moment();
}