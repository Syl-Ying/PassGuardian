import cookie from "js-cookie";

// set cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// get key value from cookie  
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// set localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    // console.log('authenticate helper on signin response:', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        // check if cookie is set
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

// remove cookie and localStorage when sign out user 
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};