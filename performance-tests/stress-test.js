import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    stages: [
        {
            target: 8,
            duration: '5s'
        },
        {
            target: 8,
            duration: '30s'
        },
        {
            target: 0,
            duration: '5s'
        },
    ],
    thresholds: {
        http_req_duration: ['p(95) < 3000'],
        'group_duration{group:::User registration}': ['p(95) < 10000'],
        'group_duration{group:::User Login}': ['p(95) < 5000'],
        http_req_failed: ['rate < 0.01']
    }
}

export default function() {

    let regBody;
    let accessToken;
    let crocId;

    //User registration
    group('User registration', () => {

        regBody = {
            'username': `gokul_${randomString(5)}`,
            'password': 'Test123'
    
        }
    
        let regResp = http.post(
            'https://test-api.k6.io/user/register/',
            JSON.stringify(regBody),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    
        check(regResp, {
            'Check status code is 201':(r) => r.status === 201,
            'Check username created':(r) => r.json().username === regBody.username
        });

        sleep(2);
    });


    //User Login 
    group('User Login', () => {

        let loginResp = http.post(
            'https://test-api.k6.io/auth/token/login/',
            JSON.stringify(regBody),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    
        check(loginResp, {
            'Check status code is 200':(r) => r.status === 200
        });

        accessToken = loginResp.json().access;
    });

    group('Create crocodile', () => {

        let crocName = `Jason_${randomString(5)}`;

        const createCrocodile = {
            'name': crocName,
            "sex": 'M',
            "date_of_birth": "1987-06-12"
        }

        let crocCreateResp = http.post(
            'https://test-api.k6.io/my/crocodiles/',
            JSON.stringify(createCrocodile),
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'Application/json'
                }
            }
        );

        check(crocCreateResp, {
            'check status code is 201': (r) => r.status === 201,
            'Check username created':(r) => r.json().name === crocName
        });

        crocId = crocCreateResp.json().id;
        console.log(`####################### ${crocId}`);

        sleep(2);
    });

    group('Delete a crocodile', () => {

        let crocDelResp = http.del(
            `https://test-api.k6.io/my/crocodiles/${crocId}`,
            null,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        );

        check(crocDelResp, {
            'Check status code is 200': (r) => r.status === 200
        })
    });
}
