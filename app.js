const urlModel = require('utils/urlSet.js') //app.js

App({
    onLaunch: function() {
        var that = this
            // 登录
        wx.getSystemInfo({
            success: res => {
                console.log(res)
                    //导航高度
                that.globalData.statusBarHeight = res.statusBarHeight;
                var rpxPX = 750 / res.screenWidth
                that.globalData.screenHeight = res.windowHeight * rpxPX
                console.log(that.globalData.screenHeight)
            },
            fail(err) {
                console.log(err);
            }
        })

    },
    getUser: function() {
        var that = this
        return new Promise(function(resolve, reject) {
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.login({
                success: function(res) {
                    if (res.code) {
                        console.log(res.code)
                            //发起网络请求
                        wx.request({
                            url: urlModel.url.codeUrl,
                            data: {
                                code: res.code
                            },
                            success: function(res) {
                                //   console.log(res.data)//服务器解密后，客户端收到基本信息                      
                                // console.log('code')
                                // console.log(res)
                                if (res.statusCode == 200) {
                                    console.log(res)
                                    that.globalData.openId = res.data.openId
                                    that.globalData.userId = res.data.userId
                                    if (res.data.userPhone) {
                                        that.globalData.admin = res.data.admin,

                                            that.globalData.username = res.data.username,
                                            that.globalData.userPhone = res.data.userPhone,
                                            that.globalData.date = res.data.date,
                                            that.globalData.startDate = res.data.startDate,
                                            that.globalData.endDate = res.data.endDate
                                        wx.hideLoading()
                                    } else {
                                        wx.hideLoading()
                                        wx.navigateTo({ //新用户前往认证
                                            url: '/pages/auth/auth',
                                        })
                                    }


                                } else {
                                    wx.hideLoading()
                                    wx.showToast({
                                        title: '抱歉，请关闭微信重试',
                                        icon: 'none',
                                        duration: 10000,
                                        mask: true,
                                        success: function() {}
                                    })
                                }
                                resolve(res);
                            },
                            fail: function() {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '网络不太畅通，请检查网络，再关闭微信重试',
                                    icon: 'none',
                                    duration: 10000,
                                    mask: true,
                                    success: function() {}
                                })
                                reject('error');
                                //app.globalData.userInfo = "dfjkadhfkahfauhf"
                            }
                        })
                    } else {
                        reject('error');
                        // console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        })
    },
    globalData: {
        statusBarHeight: 0,
        userInfo: null,
        screenHeight: 0,
        endDate: '',
        startDate: '',
        date: '',
        userPhone: false,
        username: '',
        openId: '',
        userId: '',
        admin: false
    }
})