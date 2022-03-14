document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get('returnUrl');
    const itParam = searchParams.get('i_t');
    const rtParam = searchParams.get('r_t');
    const expParam = searchParams.get('exp');
    const itStorage = localStorage.getItem('i_t');
    const rtStorage = localStorage.getItem('r_t');
    const expStorage = localStorage.getItem('exp');
    
    const targetOrigin = '*'
    
    if (window.location.pathname.includes('get') && document.referrer !== 'https://pedantic-chandrasekhar-e7a1e4.netlify.app/') initGet();
    if (window.location.pathname.includes('store') && document.referrer !== 'https://pedantic-chandrasekhar-e7a1e4.netlify.app/') initStore();
    if (document.referrer === 'https://pedantic-chandrasekhar-e7a1e4.netlify.app/') 
        window.addEventListener('message', (event) => {
            switch(event.data.action) {
                case 'GET_TOKENS': {
                    if (itStorage, rtStorage, expStorage) {
                        setTimeout(() => {
                            window.parent.postMessage({
                                action: 'GET_TOKENS_RESPONSE',
                                i_t: itStorage,
                                r_t: rtStorage,
                                exp: expStorage
                            }, targetOrigin);
                        }, 3000)
                    } else {
                        setTimeout(() => {
                            window.parent.postMessage({
                                action: 'GET_TOKENS_RESPONSE',
                                i_t: null,
                                r_t: null,
                                exp: null
                            }, targetOrigin);
                        }, 3000)
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
                    setTimeout(() => {
                        window.parent.postMessage({action: 'STORE_TOKENS_RESPONSE', i_t, r_t, exp}, targetOrigin);
                    }, 3000)
                    return;
                }
                    
            }
        }, false);
    
    
    function initGet() {
        if (itStorage && rtStorage && expStorage) {
            mainContent.querySelector('p').innerText = 'Tokens available';
            setTimeout(() => {
                mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
                window.location.assign(`${returnUrl}?i_t=${itStorage}&r_t=${rtStorage}&exp=${expStorage}`);
            }, 3000);
        } else {
            setTimeout(() => {
                mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
                console.log(returnUrl);
                window.location.assign(returnUrl);
            }, 3000);
         }
    }
    
    function initStore() {
        if (itParam && rtParam && expParam) {
            localStorage.setItem('i_t', itParam);
            localStorage.setItem('r_t', rtParam);
            localStorage.setItem('exp', expParam);
            setTimeout(() => {
                mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
                console.log(returnUrl);
                window.location.assign(returnUrl);
            }, 3000);
        } else {
            setTimeout(() => {
                mainContent.querySelector('p').innerText = `redirecting to ${returnUrl}`;
                console.log(returnUrl);
                window.location.assign(returnUrl);
            }, 3000);
         }
    }

});
