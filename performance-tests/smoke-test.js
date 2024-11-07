import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
// import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const baseUrl = __ENV.BASE_URL || 'https://test-api.k6.io';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_duration: ['p(95) < 300'],
        http_req_failed: ['rate < 0.01']
    }
}


export default function() {

    let res = http.get(`${baseUrl}/public/crocodiles/`);
    let crocodiles = res.json();
    let crocodileNames = crocodiles.map((item) => item.name);
    const randomCrocName = randomItem(crocodileNames);

    console.log(`croc name random is ~~~~~~~~~~~~~~~ ${randomCrocName}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'check response body contains croc name': (r) => r.body.includes(randomCrocName)
    });
}

// export function handleSummary(data) {
//     return {
//       "summary.html": htmlReport(data),
//     };
// }
