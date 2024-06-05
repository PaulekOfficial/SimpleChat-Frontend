// @ts-ignore
import AuthorizationService from './AuthorizationService.ts';
// @ts-ignore
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/v1/accounts/';

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
};

export type ChangePasswordResponse = {
    success: boolean;
    message: string;
};

export type ChangePasswordResponseBody = {
    data: ChangePasswordResponse;
    links: {
        self: string;
        home: string;
    };
};

class AccountService {
    static getAccountId(): number | undefined {
        const userId = Cookies.get('userId');
        return userId ? parseInt(userId) : undefined;
    }

    static async changePassword(id: number, request: ChangePasswordRequest): Promise<ChangePasswordResponseBody> {
        try {
            const response = await AuthorizationService.authorizedAxios().post(API_URL + id + '/change-password', request);
            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    }

    static async getAvatar(id: number): Promise<any> {
        try {
            const httpResponse = await AuthorizationService.authorizedAxios().get(API_URL + id + '/avatar', { responseType: 'blob' });
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

    static async setAvatar(file: File, id: number): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('files', file);

            const response = await AuthorizationService.authorizedAxios().post(API_URL + id + '/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response;
        } catch (error) {
            console.error('Error setting avatar:', error);
            return error;
        }
    }
}

export default AccountService;