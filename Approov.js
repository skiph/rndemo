import {NativeModules} from 'react-native';

const fetchWithToken = (input, init) => {
    return new Promise((resolve, reject) => {
        Approov.fetchApproovToken(input)
        .then(token => {
            var initplus = {};
            if (init == null) {
                initplus = { 'headers' : { 'Approov-Token': token } };
            } else if ('headers' in init) {
                initplus.headers.append('Approov-Token', token);
            } else {
                initplus.headers = { 'Approov-Token': token };
            }

            //alert('initplus: ' + JSON.stringify(initplus, null, 2), 'Response');
            //console.log('token: ' + token);
            
            fetch(input, initplus)
            .then((response) => {
                if (response.ok) {
                    resolve(response);
                }
                else {
                    reject(Error('HTTP response status is ' + response.status));
                }
            })
            .catch((error) => {
                reject(error);
            })
        })
        .catch((error) => {
            reject(error);
        })
    })
};

const Approov = Object.assign({ fetch: fetchWithToken }, NativeModules.Approov);

export default Approov;

// end of file
