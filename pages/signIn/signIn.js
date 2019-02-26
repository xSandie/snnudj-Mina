const urlModel = require('../../utils/urlSet.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pubuserPhone: 18349250473,
        pubuserName: '向书晗',
        endTime: '2018-11-30 19:00',
        signInNum: 99,
        myUsername: '',
        canSignIn: true,
        signInId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var that = this
        if (options.scene) { //TODO:扫码进入逻辑
            let signInId = decodeURIComponent(options.scene);
            if (!app.globalData.userPhone) {
                app.getUser().then(function(res) {
                    var signInId = options.Id
                    that.setData({
                        signInId: signInId
                    })
                    console.log(signInId)
                    wx.showLoading({
                        title: '加载中',
                        mask: true
                    })
                    wx.request({
                        url: urlModel.url.SignInDetail,
                        method: 'GET',
                        data: {
                            'userId': app.globalData.userId,
                            'signInId': signInId
                        },
                        success: function(res) {
                            if (res.statusCode == 200) {
                                that.setData({
                                    pubuserName: res.data.pubuserName,
                                    pubuserPhone: res.data.pubuserPhone,
                                    endTime: res.data.endTime,
                                    signInNum: res.data.signInNum,
                                    canSignIn: res.data.canSignIn,
                                  myUsername: res.data.myName
                                })
                                wx.hideLoading()
                                wx.showToast({
                                    title: '加载成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            } else if (res.statusCode == 403) {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '您无法为您发布的签到签到',
                                    icon: 'none',
                                    duration: 2000
                                })
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: '../home/home',
                                    })
                                }, 2000);
                            } else {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '加载失败',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function() {
                            wx.hideLoading()
                            wx.showToast({
                                title: '加载失败，请检查网络',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                })
            } else {
                var signInId = options.Id
                that.setData({
                    signInId: signInId
                })
                console.log(signInId)
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                wx.request({
                    url: urlModel.url.SignInDetail,
                    method: 'GET',
                    data: {
                        'userId': app.globalData.userId,
                        'signInId': signInId
                    },
                    success: function(res) {
                        if (res.statusCode == 200) {
                            that.setData({
                                pubuserName: res.data.pubuserName,
                                pubuserPhone: res.data.pubuserPhone,
                                endTime: res.data.endTime,
                                signInNum: res.data.signInNum,
                              canSignIn: res.data.canSignIn,
                              myUsername: res.data.myName
                            })
                            wx.hideLoading()
                            wx.showToast({
                                title: '加载成功',
                                icon: 'success',
                                duration: 2000
                            })
                        } else if (res.statusCode == 403) {
                            wx.hideLoading()
                            wx.showToast({
                                title: '您无法为您发布的签到签到',
                                icon: 'none',
                                duration: 2000
                            })
                            setTimeout(function() {
                                wx.switchTab({
                                    url: '../home/home',
                                })
                            }, 2000);
                        } else {
                            wx.hideLoading()
                            wx.showToast({
                                title: '加载失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    },
                    fail: function() {
                        wx.hideLoading()
                        wx.showToast({
                            title: '加载失败，请检查网络',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })

            }
        } else if (options.Id) {
            var signInId = options.Id
            if (!app.globalData.userPhone) {
                //点击分享链接进入
                app.getUser().then(function(res) {
                    var signInId = options.Id
                    that.setData({
                        signInId: signInId,
                        myUsername: app.globalData.username
                    })
                    console.log(signInId)
                    wx.showLoading({
                        title: '加载中',
                        mask: true
                    })
                    wx.request({
                        url: urlModel.url.SignInDetail,
                        method: 'GET',
                        data: {
                            'userId': app.globalData.userId,
                            'signInId': signInId
                        },
                        success: function(res) {
                            console.log('点击分享链接前，未获得用户，经历了获取用户')
                            console.log(res)
                            if (res.statusCode == 200) {
                                that.setData({
                                    pubuserName: res.data.pubuserName,
                                    pubuserPhone: res.data.pubuserPhone,
                                    endTime: res.data.endTime,
                                    signInNum: res.data.signInNum,
                                    canSignIn: res.data.canSignIn
                                })
                                wx.hideLoading()
                                wx.showToast({
                                    title: '加载成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            } else if (res.statusCode == 403) {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '您无法为您发布的签到签到',
                                    icon: 'none',
                                    duration: 2000
                                })
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: '../home/home',
                                    })
                                }, 2000);
                            } else {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '加载失败',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function() {
                            wx.hideLoading()
                            wx.showToast({
                                title: '刷新失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                })
            } else {
                //点击分享链接前，已获得用户
                var signInId = options.Id
                wx.showLoading({
                    title: '加载中',
                    mask: true
                })
                this.setData({
                    signInId: signInId,
                    myUsername: app.globalData.username
                })
                console.log(signInId)
                var that = this
                wx.request({
                    url: urlModel.url.SignInDetail,
                    method: 'GET',
                    data: {
                        'userId': app.globalData.userId,
                        'signInId': signInId
                    },
                    success: function(res) {
                        console.log('点击分享链接前，已获得用户')
                        console.log(res)
                        if (res.statusCode == 200) {
                            that.setData({
                                pubuserName: res.data.pubuserName,
                                pubuserPhone: res.data.pubuserPhone,
                                endTime: res.data.endTime,
                                signInNum: res.data.signInNum,
                              canSignIn: res.data.canSignIn,
                              myUsername: res.data.myName
                            })
                            wx.hideLoading()
                            wx.showToast({
                                title: '加载成功',
                                icon: 'success',
                                duration: 2000
                            })
                        } else
                        if (res.statusCode == 403) {
                            wx.hideLoading()
                            wx.showToast({
                                title: '您无法为您发布的签到签到',
                                icon: 'none',
                                duration: 2000
                            })
                            setTimeout(function() {
                                wx.switchTab({
                                    url: '../home/home',
                                })
                            }, 2000);
                        } else {
                            wx.hideLoading()
                            wx.showToast({
                                title: '加载失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    },
                    fail: function() {
                        wx.hideLoading()
                        wx.showToast({
                            title: '加载失败，请检查网络',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (app.globalData.userPhone && this.data.signInId != '') {
            this.onPullDownRefresh()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * TODO:页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

        var that = this
        if (this.data.signInId != '') {
            wx.showLoading({
                title: '刷新中',
                mask: true
            })
            wx.request({
                url: urlModel.url.SignInDetail,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'signInId': this.data.signInId
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            pubuserName: res.data.pubuserName,
                            pubuserPhone: res.data.pubuserPhone,
                            endTime: res.data.endTime,
                            signInNum: res.data.signInNum,
                          canSignIn: res.data.canSignIn,
                          myUsername: res.data.myName
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else if (res.statusCode != 403) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新失败',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }

    },


    /**
     * TODO:用户点击右上角分享
     */
    onShareAppMessage: function() {
        var that = this
        return {
            title: that.data.pubuserName + '发起的签到',
            path: '/pages/signIn/signIn?Id=' + that.data.signInId
        }
    },
    signIn: function() {
        //TODO:点击签到逻辑
        var that = this
        wx.showLoading({
            title: '签到中',
            mask: true
        })
        wx.request({
            url: urlModel.url.SignIn,
            method: 'POST',
            data: {
                'userId': app.globalData.userId,
                'signInId': that.data.signInId
            },
            success: function(res) {
                console.log('签到')
                console.log(res)
                if (res.statusCode == 200) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '签到成功',
                        icon: 'success',
                        duration: 2000
                    })
                    setTimeout(function() {

                    }, 1000);
                    that.onPullDownRefresh()
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '签到失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '签到失败，请重试',
                    icon: 'none',
                    duration: 2000
                })
            }
        })

    },
    navHome: function() {
        wx.reLaunch({
            url: '../home/home',
        })
    }
})