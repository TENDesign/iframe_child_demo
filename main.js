document.addEventListener('DOMContentLoaded', () => {
    const allowedOrigins = ['https://pedantic-chandrasekhar-e7a1e4.netlify.app'];

    window.addEventListener('message', (event) => {
        if (event.origin !== allowedOrigins) return;
        switch(event.data.action) {
            case 'GET_TOKENS': {
                const itStorage = localStorage.getItem('i_t');
                const rtStorage = localStorage.getItem('r_t');
                const expStorage = localStorage.getItem('exp');
                if (itStorage, rtStorage, expStorage) {
                    window.parent.postMessage({
                        action: 'GET_TOKENS_RESPONSE',
                        payload: {
                            i_t: itStorage,
                            r_t: rtStorage,
                            exp: expStorage
                        }
                    }, allowedOrigins);
                } else {
                    window.parent.postMessage({
                        action: 'GET_TOKENS_RESPONSE',
                        payload: {
                            i_t: null,
                            r_t: null,
                            exp: null
                        }
                    }, allowedOrigins);
                }
                return;
            }
            case 'STORE_TOKENS': {
                const {i_t, r_t, exp, ...data} = event.data.payload;
                localStorage.setItem('i_t', i_t);
                localStorage.setItem('r_t', r_t);
                localStorage.setItem('exp', exp);
                console.log([
                    localStorage.getItem('i_t', i_t),
                    localStorage.getItem('r_t', r_t),
                    localStorage.getItem('exp', exp)
                ])
                window.parent.postMessage({
                    action: 'STORE_TOKENS_RESPONSE', 
                    payload: {i_t, r_t, exp}
                }, allowedOrigins);
                return;
            }
                
        }
    }, false);

});
