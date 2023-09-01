import axios from 'axios';
// const baseURL = 'https://6304-212-21-27-181.ngrok-free.app';
const baseURL = 'https://api.qkeruen.kz';

export const api = axios.create({
  // mode: 'no-cors',
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response = {} } = error;
    const { status = {}, data = {} } = response;

    const { errors = {} } = data;

    // const { message } = response.data;


    // if (status === 500 && message) {
    //   showMessage({ type: 'error', title: 'Ошибка при выполнении запроса', message });
    //   return Promise.reject(error);
    // }

    /* Нет ответа от сервера */
    // if (!Object.keys(data).length || status === 500) {
    //   showMessage({ type: 'error', title: 'Ошибка соединения', message: 'Нет ответа от сервера' });

    //   return Promise.reject(error);
    // }

    // if (typeof data === 'string') {
    //   showMessage({ type: 'error', title: 'Ошибка', message: data });
    // } else if (data.title) {
    //   showMessage({ type: 'error', title: 'Ошибка', message: data.title });
    // } else if (data.Message) {
    //   showMessage({ type: 'error', title: 'Ошибка', message: data.Message });
    // } else if (Object.entries(errors).length) {
    //   for (const [title, errorArray] of Object.entries(errors)) {
    //     const errorsString = errorArray.reduce((acc, errorText) => `${acc}\n${errorText}`, '');

    //     showMessage({ type: 'error', title, message: errorsString });
    //   }
    // } else {
    //   for (const [title, errorArray] of Object.entries(data)) {
    //     if (Array.isArray(errorArray)) {
    //       const errorsString = errorArray.reduce((acc, errorText) => `${acc}\n${errorText}`, '');
    //       showMessage({ type: 'error', title, message: errorsString });
    //     }
    //   }
    // }

    // if (status === 403) {
    //   showMessage({ type: 'error', title: 'Ошибка', message: 'Отсутствуют необходимые права' });
    // }

    if (status === 401) {
      this.$store.commit('LOGOUT');
    }

    // return Promise.reject(error);
  },
);

export function createApi(token) {
  api.defaults.headers = {
    ...api.defaults.headers,
    Authorization: `${token}`,
  };
}
