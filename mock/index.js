
let Mock = require('mockjs')

// note data
export const node = Mock.mock({
    "data|20": [{
        "moment": new Date(),
        "id|+1": 1,
        "userId|+1": 10,
        "message|24-96": "@cword",
        "label|0-10": 0,
        "name": "@cname",
        "like|0-120": 0,
        "favor|0-120": 0,
        "comment|0-120": 0,
        "imgurl|0-4": 0,
        "revoke|0-20": 0,
        "report|0-20": 0,

        "type":0,
    }]
})

// photo data
export const photo = Mock.mock({
    "data|20": [{
        "moment": new Date(),
        "id|+1": 1,
        "userId|+1": 10,
        "message|24-96": "@cword",
        "label|0-6": 0,
        "name": "@cname",
        "like|0-120": 0,
        "favor|0-120": 0,
        "comment|0-120": 0,
        "imgurl|1-10": 0, 
        "revoke|0-20": 0,
        "report|0-20": 0,

        "type":0,
    }]
})

// comment data
export const comment = Mock.mock({
    "data|19": [{
        "moment": new Date(),
        "id|+1": 1,
        "userId|+1": 10,
        "message|24-96": "@cword",
        "name": "@cname",
        "imgurl|0-9": 0,
    }]
})