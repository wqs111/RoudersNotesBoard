import fetch from '@/utils/axios'


export const insertWallApi = (data) => {
    return fetch.post('/insertwall', data);
}

export const signIpApi = () => fetch.post('/signip')