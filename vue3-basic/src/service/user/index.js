import axios from 'axios';

export const register = (nickname, password) => {
    axios.post('/user/register', {
        nickname,
        password,
    });
};
