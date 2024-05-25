import { api } from '../config/apiconfig';

const usePrivateApi = () => {
    api.interceptors.request.use(
        (config) => {
            if (!config.headers['Authorization']) {
                config.headers[
                    'Authorization'
                ] = `Bearer ${localStorage.getItem('accessToken')}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    return api;
};

export default usePrivateApi;
