import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080/api', // LOCAL
  baseURL: 'https://plantilla-backend-springboot-production.up.railway.app/api', // RAILWAY
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                localStorage.removeItem('token');
                window.location.href = '/sign-in';
                return Promise.reject(error);
            }

            try {
                const response = await axiosAuthInstance.post<{ token: string }>('/refresh', null, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                const newAccessToken = response.data.token;
                localStorage.setItem('token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = '/sign-in';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const axiosAuthInstance = axios.create({
  // baseURL: 'http://localhost:8080/api/auth', //LOCAL
  baseURL: 'https://plantilla-backend-springboot-production.up.railway.app/api/auth', //RAILWAY
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance, axiosAuthInstance };
