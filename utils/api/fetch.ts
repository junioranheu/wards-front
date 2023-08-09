import CONSTS_VERBOS_HTTP from '@/utils/consts/verbosHTTP';
import { Auth } from '@/utils/context/usuarioContext';
import gerarHorarioBrasilia from '@/utils/functions/gerar.horarioBrasilia';
import setDesabilitarBotoes from '@/utils/functions/set.desabilitarBotoes';
import { verificarIsTokenJWTValido } from '@/utils/functions/verificar.isTokenJWTValido';
import nProgress from 'nprogress';

export const Fetch = {
    async get(url: string) {
        return await this.requestApi(url, CONSTS_VERBOS_HTTP.GET);
    },

    async post(url: string, body: any) {
        return await this.requestApi(url, CONSTS_VERBOS_HTTP.POST, body);
    },

    async put(url: string, body: any) {
        return await this.requestApi(url, CONSTS_VERBOS_HTTP.PUT, body);
    },

    async delete(url: string, body: any) {
        return await this.requestApi(url, CONSTS_VERBOS_HTTP.DELETE, body);
    },

    async requestApi(url: string, method: string, body: any | null = null) {
        nProgress.start();
        setDesabilitarBotoes(true);

        const token = Auth?.get()?.token ?? '';
        verificarIsTokenJWTValido(token);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log(`Erro ${responseJson.status} em ${url}. Tipo de erro: ${responseJson.title}`);
            }

            return responseJson;
        } catch (error: any) {
            const errorData = {
                'url': url,
                'body': body,
                'erro': error.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            };

            console.table(errorData);
            return null;
        } finally {
            nProgress.done();
            setDesabilitarBotoes(false);
        }
    },

    async getCorsExterno(url: string) {
        const token = Auth?.get()?.token ?? '';
        verificarIsTokenJWTValido(token);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(url, {
                method: CONSTS_VERBOS_HTTP.GET,
                headers: headers
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log(`Erro ${responseJson.status} em ${url}. Tipo de erro: ${responseJson.title}`);
            }

            return responseJson;
        } catch (error: any) {
            const errorData = {
                'url': url,
                'erro': error.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            };

            console.table(errorData);
            return null;
        } finally {
            nProgress.done();
            setDesabilitarBotoes(false);
        }
    },

    async postIFormFile(url: string, body: FormData) {
        const token = Auth?.get()?.token ?? '';
        verificarIsTokenJWTValido(token);

        const headers = {
            'Accept': 'application/json',
            'enctype': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(url, {
                method: CONSTS_VERBOS_HTTP.POST,
                headers: headers,
                body: body
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log(`Erro ${responseJson.status} em ${url}. Tipo de erro: ${responseJson.title}`);
            }

            return responseJson;
        } catch (error: any) {
            const errorData = {
                'url': url,
                'body': body,
                'erro': error.message,
                'data': gerarHorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            };

            console.table(errorData);
            return null;
        } finally {
            nProgress.done();
            setDesabilitarBotoes(false);
        }
    }
};