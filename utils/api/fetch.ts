import CONSTS_VERBOS_HTTP from '@/utils/consts/verbosHTTP';
import { Auth } from '@/utils/context/usuarioContext';
import gerarHorarioBrasilia from '@/utils/functions/gerar.horarioBrasilia';
import setDesabilitarBotoes from '@/utils/functions/set.desabilitarBotoes';
import nProgress from 'nprogress';

export const Fetch = {
    async getApi(url: string) {
        nProgress.start();
        setDesabilitarBotoes(true);

        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth?.get()?.token ?? ''}`
        }

        try {
            let resposta = await fetch(url, {
                method: CONSTS_VERBOS_HTTP.GET,
                headers: headers
            });

            // console.log(resposta);

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
                nProgress.done();
                setDesabilitarBotoes(false);
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'erro': erro.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            nProgress.done();
            setDesabilitarBotoes(false);
            // Aviso.toast('Houve uma falha na requisição GET ao servidor!', 5000, CONSTS_EMOJIS.ERRO, true);
        }

        nProgress.done();
        setDesabilitarBotoes(false);

        return respostaJson;
    },

    async postApi(url: string, body: string | any | null) {
        let respostaJson = await Fetch.conteudoPostPutDelete(CONSTS_VERBOS_HTTP.POST, url, body);
        return respostaJson;
    },

    async putApi(url: string, body: string | any | null) {
        let respostaJson = await Fetch.conteudoPostPutDelete(CONSTS_VERBOS_HTTP.PUT, url, body);
        return respostaJson;
    },

    async deleteApi(url: string, body: string | any | null) {
        let respostaJson = await Fetch.conteudoPostPutDelete(CONSTS_VERBOS_HTTP.DELETE, url, body);
        return respostaJson;
    },

    async conteudoPostPutDelete(verboHTTP: string, url: string, body: string | any | null) {
        nProgress.start();
        setDesabilitarBotoes(true);

        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth?.get()?.token ?? ''}`
        }

        try {
            let resposta = await fetch(url, {
                method: verboHTTP,
                headers: headers,
                body: JSON.stringify(body)
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
                nProgress.done();
                setDesabilitarBotoes(false);
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'body': body,
                'erro': erro.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            nProgress.done();
            setDesabilitarBotoes(false);
            // Aviso.toast('Houve uma falha na requisição POST/PUT/DELETE ao servidor!', 5000, CONSTS_EMOJIS.ERRO, true);
        }

        nProgress.done();
        setDesabilitarBotoes(false);

        return respostaJson;
    },

    async getApiCorsExterno(url: string) {
        nProgress.start();
        setDesabilitarBotoes(true);

        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${Auth?.get()?.token ?? ''}`
        }

        try {
            let resposta = await fetch(url, {
                method: CONSTS_VERBOS_HTTP.GET,
                headers: headers
            });

            // console.log(resposta);

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
                nProgress.done();
                setDesabilitarBotoes(false);
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'erro': erro.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            nProgress.done();
            setDesabilitarBotoes(false);
            // Aviso.toast('Houve uma falha na requisição GET (externo) ao servidor!', 5000, CONSTS_EMOJIS.ERRO, true);
        }

        nProgress.done();
        setDesabilitarBotoes(false);

        return respostaJson;
    },

    async postIFormFileApi(url: string, body: FormData) {
        nProgress.start();
        setDesabilitarBotoes(true);

        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'enctype': 'multipart/form-data',
            'Authorization': `Bearer ${Auth?.get()?.token ?? ''}`
        }

        try {
            let resposta = await fetch(url, {
                method: CONSTS_VERBOS_HTTP.POST,
                headers: headers,
                body: body // Para esse caso, sem "JSON.stringify()" pelamor;
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
                nProgress.done();
                setDesabilitarBotoes(false);
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'body': body,
                'erro': erro.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            nProgress.done();
            setDesabilitarBotoes(false);
            // Aviso.toast('Houve uma falha na requisição POST (iFormFile) ao servidor!', 5000, CONSTS_EMOJIS.ERRO, true);
        }

        nProgress.done();
        setDesabilitarBotoes(false);

        return respostaJson;
    }

}