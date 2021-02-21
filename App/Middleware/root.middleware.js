export default () => next => action => {
    if (action.url) {
        return fetch(action.url, {
            method: action.method,
            headers: action.headers,
            body: action.body
        })
            .then(res => {
                if (__DEV__) {
                    console.log('Network response', res);
                }//if 200ok not do json when forgot pass or change user data
                if (res.url.includes('forgot') === true) {
                    return { statusApi: { ok: res.ok } }
                } else {
                    return res.json().then(body => {
                        if (__DEV__) {
                            console.log('Network response', body);
                        }
                        return { data: body, statusApi: { ok: res.ok } }
                    });
                }
            })
            .then(data => {
                return next({ ...action, data, ...data });
            }).catch(error => {
                if (__DEV__) {
                    console.log('error', error, action);
                }
                return next({ ...action, statusApi: { ok: false } });
            });

    } else {
        return next(action);
    }
};
