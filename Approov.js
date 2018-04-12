import {NativeModules} from 'react-native';


const fetchWithToken = (input, init) => {
    return Approov.fetchApproovToken(input)
        .then(token => {
            //console.log('token: ' + token);
            //alert('init: ' + JSON.stringify(init, null, 2), 'Response');
            var initplus;
            if (init == null) {
                initplus = { 'headers' : { 'Approov-Token': token } };
            } else {
                initplus = { ...init };
                if ('headers' in init) {
                    initplus.headers.append('Approov-Token', token);
                } else {
                    initplus.headers = { 'Approov-Token': token };
                }
            }
            //alert('initplus: ' + JSON.stringify(initplus, null, 2), 'Response');

            return fetch(input, initplus)
                .then((response) => {
                    if (response.ok) {
                        return response;
                    }
                    else {
                        throw new Error('HTTP response status is ' + response.status);
                    }
                })
                .catch((error) => {
                    throw error;
                })
        })
        .catch((error) => {
            throw error;
        })
};

const Approov = Object.assign({ fetch: fetchWithToken }, NativeModules.Approov);

export default Approov;

// end of file
