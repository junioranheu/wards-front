import CONSTS_VERBOS_HTTP from '@/utils/consts/verbosHTTP';
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
            'Content-Type': 'application/json'
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
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
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
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);
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
            'Content-Type': 'application/json'
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
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
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
            // Aviso.error('Houve uma falha na requisição POST ao servidor!', 5000);
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
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
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
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
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
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);
        }

        nProgress.done();
        setDesabilitarBotoes(false);

        return respostaJson;
    }
}