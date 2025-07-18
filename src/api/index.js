import fetch from '@/utils/axios'


export const insertWallApi = (data) => {
    return fetch.post('/insertwall', data);
}

export const signIpApi = () => fetch.post('/signip')


export const findWallPageApi = data => fetch.post('/findwallpage', data)

export const insertFeedbackApi = data => fetch.post('/insertfeedback', data)

export const insertCommentApi = data => fetch.post('/insertcomment', data)

export const findCommentPageApi = data => fetch.post('/findcommentpage', data)
