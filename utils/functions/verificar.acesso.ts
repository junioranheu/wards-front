import CONSTS_TELAS from '@/utils/consts/telas';
import { Auth } from '@/utils/context/usuarioContext';
import { iUsuarioRole } from '@/utils/types/iUsuario';

export default function verificarAcesso(listaRolesNecessarias: number[], isFullLiberado: boolean = false): boolean | void {
    const listaRolesUsuario = Auth?.get()?.usuarioRoles as iUsuarioRole[];

    if (listaRolesUsuario?.length < 1 || !listaRolesUsuario) {
        window.location.href = CONSTS_TELAS.ERRO;
        return false;
    }

    let isTemAcesso = isFullLiberado ? true : false;

    // console.log('listaRolesNecessarias', listaRolesNecessarias);
    // console.log('listaRolesUsuario', listaRolesUsuario);

    if (!isFullLiberado) {
        listaRolesUsuario.forEach((r: iUsuarioRole) => {
            listaRolesNecessarias.forEach((n: number) => {
                if ((r.roleId.toString() === n.toString()) && !isTemAcesso) {
                    isTemAcesso = true;
                }
            });
        })

        if (!isTemAcesso) {
            window.location.href = CONSTS_TELAS.ERRO;
            return false;
        }
    }

    return isTemAcesso;
}