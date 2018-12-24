var url = new Object({
    codeUrl: 'http://127.0.0.1:5000/mina/auth/login',

    getOngoSignIn: 'http://127.0.0.1:5000/mina/pay/set',
    getFinSignIn: 'http://127.0.0.1:5000/mina/pay/getmy',
    endSignIn: 'http://127.0.0.1:5000/mina/certif/get',
    tempOpen: 'http://127.0.0.1:5000/mina/certif/certif',

    SignInDetail: 'http://127.0.0.1:5000/mina/auth/setAvatar',
    SignIn: 'http://127.0.0.1:5000/mina/addr/set',
    pubSignInDetail: 'http://127.0.0.1:5000/mina/addr/get',

    pubSignIn: 'http://127.0.0.1:5000/mina/orders/get',
    refreshPubSignIn: 'http://127.0.0.1:5000/mina/order/pub',
    changeUserInfo: 'http://127.0.0.1:5000/mina/orders/list',
    register: 'http://127.0.0.1:5000/mina/order/preToSum',

    getSuggestion: 'http://127.0.0.1:5000/mina/order/recOrder',
    getIgnoreSuggestion: 'http://127.0.0.1:5000/mina/order/receiver',

    replySuggestion: 'http://127.0.0.1:5000/mina/order/publisher',
    IgnoreSuggestion: 'http://127.0.0.1:5000/mina/order/changeMode',
    pubSuggestion: 'http://127.0.0.1:5000/mina/police/reportpub',
    getMyInfo: 'http://127.0.0.1:5000/mina/auth/usrinfo',

})

exports.url = url;