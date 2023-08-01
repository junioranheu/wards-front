import { Auth } from '@/utils/context/usuarioContext';
import { iUsuarioRole } from '@/utils/types/iUsuario';

export default function verificarAcessoIsExibirElemento(listaRolesNecessarias: number[]): boolean {
    const listaRolesUsuario = Auth?.get()?.usuarioRoles as iUsuarioRole[];

    if (listaRolesUsuario?.length < 1 || !listaRolesUsuario) {
        return false;
    }

    let isExibir = false;

    // console.log('listaRolesNecessarias', listaRolesNecessarias);
    // console.log('listaRolesUsuario', listaRolesUsuario);

    listaRolesUsuario.forEach((r: iUsuarioRole) => {
        listaRolesNecessarias.forEach((n: number) => {
            if ((r.roleId.toString() === n.toString()) && !isExibir) {
                isExibir = true;
            }
        });
    })

    return isExibir;
}