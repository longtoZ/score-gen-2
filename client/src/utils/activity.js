import axios from 'axios';

const get = () => {
    return new Promise((resolve, reject) => {
        const userInfoData = JSON.stringify({
            language: window.navigator.language,
            userAgent: window.navigator.userAgent,
            mobile: window.navigator.userAgentData.mobile,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth,
                orientation: window.screen.orientation.type,
            },
        });
        const time = new Date().toString();
    
            axios
            .get('https://freeipapi.com/api/json')
            .then((res) => {
                const data = {
                    ip: res.data.ipAddress,
                    time: time,
                    userInfo: userInfoData,
                    data: Object.entries(res.data)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('\n'),
                };
                return data;
            })
            .then((data) => {
                axios.get(process.env.REACT_APP_SERVER + '/api/track/get', {
                    params: { ip: data.ip },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + process.env.REACT_APP_SECRET_KEY,
                    },
                }).then((res) => {
                    resolve({
                        length: res.data.length,
                        data,
                    })
                }) 
            }).catch((error) => reject(error));


    })
}

const update = (length, data) => {
    if (length > 0) {
        axios.put(process.env.REACT_APP_SERVER + '/api/track/put', {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' + process.env.REACT_APP_SECRET_KEY,
            },
        });
    } else {
        axios.post(process.env.REACT_APP_SERVER + '/api/track/post', {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' + process.env.REACT_APP_SECRET_KEY,
            },
        });
    }
} 

export const track = () => {
 get().then((res) => {
     update(res.length, res.data);
 }).catch(() => {

 });
};
