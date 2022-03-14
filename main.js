document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    
    const targetOrigin = '*'
    
    // if (window.location.pathname.includes('get') && document.referrer !== 'https://pedantic-chandrasekhar-e7a1e4.netlify.app/') initGet();
    // if (window.location.pathname.includes('store') && document.referrer !== 'https://pedantic-chandrasekhar-e7a1e4.netlify.app/') initStore();
    if (document.referrer === 'https://pedantic-chandrasekhar-e7a1e4.netlify.app/') 
        window.addEventListener('message', (event) => {
            switch(event.data.action) {
                case 'GET_TOKENS': {
                    const itStorage = localStorage.getItem('i_t');
                    const rtStorage = localStorage.getItem('r_t');
                    const expStorage = localStorage.getItem('exp');
                    if (itStorage, rtStorage, expStorage) {
                        window.parent.postMessage({
                            action: 'GET_TOKENS_RESPONSE',
                            i_t: itStorage,
                            r_t: rtStorage,
                            exp: expStorage
                        }, targetOrigin);
                    } else {
                        window.parent.postMessage({
                            action: 'GET_TOKENS_RESPONSE',
                            i_t: null,
                            r_t: null,
                            exp: null
                        }, targetOrigin);
                    }
                    return;
                }
                case 'STORE_TOKENS': {
                    const {i_t, r_t, exp, ...data} = event.data;
                    localStorage.setItem('i_t', i_t);
                    localStorage.setItem('r_t', r_t);
                    localStorage.setItem('exp', exp);
                    console.log([
                        localStorage.getItem('i_t', i_t),
                        localStorage.getItem('r_t', r_t),
                        localStorage.getItem('exp', exp)
                    ])
                    window.parent.postMessage({action: 'STORE_TOKENS_RESPONSE', i_t, r_t, exp}, targetOrigin);
                    return;
                }
                    
            }
        }, false);
    
    
    // function initGet() {
    //     if (itStorage && rtStorage && expStorage) {
    //         mainContent.querySelector('p').innerText = 'Tokens available';
    //         mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
    //         window.location.assign(`${returnUrl}?i_t=${itStorage}&r_t=${rtStorage}&exp=${expStorage}`);
    //     } else {
    //         mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
    //         console.log(returnUrl);
    //         window.location.assign(returnUrl);
    //      }
    // }
    
    // function initStore() {
    //     if (itParam && rtParam && expParam) {
    //         localStorage.setItem('i_t', itParam);
    //         localStorage.setItem('r_t', rtParam);
    //         localStorage.setItem('exp', expParam);
    //         mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
    //         console.log(returnUrl);
    //         window.location.assign(returnUrl);
    //     } else {
    //         mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
    //         console.log(returnUrl);
    //         window.location.assign(returnUrl);
    //      }
    // }

});
