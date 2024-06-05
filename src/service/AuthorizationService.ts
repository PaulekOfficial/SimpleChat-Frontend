// @ts-ignore
import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/authenticate/';

class AuthorizationService {
    authorizedAxios() {
        let token = Cookies.get('token');
        let tokenType = Cookies.get('tokenType');

        // @ts-ignore
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: tokenType + ' ' + token,
                'Access-Control-Allow-Origin': '*'
            }
        };

        return axios.create(config);
    }

    async verify(): Promise<boolean> {
        try {
            let httpResponse = await this.authorizedAxios().get(API_URL + 'verify');

            return httpResponse.status === 200;
        } catch (err: any) {
            console.log(err.message);

            if (err.response && err.response.data && err.response.data.message) {
                const errorMessage = err.response.data.message;
                console.log(errorMessage);
            }

            return false;
        }
    }

    async login(login: string, password: string) {
        try {
            const loginData = {
                login: login,
                password: password
            };

            let httpResponse = await axios.post(API_URL + 'signin', loginData);

            let jsonResponse = JSON.parse(httpResponse.request.response);

            if (jsonResponse.error) {
                return 401;
            }

            Cookies.set('tokenType', jsonResponse.type, { expires: 30 });
            Cookies.set('token', jsonResponse.token, { expires: 30 });
            Cookies.set('refreshToken', jsonResponse.refreshToken, { expires: 30 });
            Cookies.set('email', jsonResponse.email, { expires: 30 });
            Cookies.set('userId', jsonResponse.id, { expires: 30 });

            return httpResponse;
        } catch (err: any) {
            console.log(err.message);

            if (err.response && err.response.data && err.response.data.message) {
                const errorMessage = err.response.data.message;
                console.log(errorMessage);
            }

            return err;
        }
    }

    async register(username: string, email: string, password: string) {
        try {
            const userData = {
                username: username,
                email: email,
                password: password
            };

            let httpResponse = await axios.post(API_URL + 'signup', userData);

            let jsonResponse = JSON.parse(httpResponse.request.response);

            if (jsonResponse.error) {
                return 401;
            }

            return httpResponse;
        } catch (err: any) {
            console.log(err.message);

            if (err.response && err.response.data && err.response.data.message) {
                const errorMessage = err.response.data.message;
                console.log(errorMessage);
            }

            return err;
        }
    }

    async logout(): Promise<boolean> {
        try {
            let token = Cookies.get('refreshToken');

            const data = {
                refreshToken: token
            };

            await this.authorizedAxios().post(API_URL + 'logout', data);

            Cookies.remove('tokenType');
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            Cookies.remove('email');
            Cookies.remove('userId');

            return true;
        } catch (err) {
            /* empty */

            return false;
        }
    }

    // eslint-disable-next-line no-unused-vars
    getToken(): string {
        return Cookies.get('token');
    }

    async isAuthenticated(): Promise<boolean> {
        const token = Cookies.get('token');

        if (token === undefined) {
            return false;
        }

        let authOk = await this.verify();
        let result = token && authOk;

        if (!result) {
            return this.logout();
        }

        return result;
    }
}

export default new AuthorizationService();
