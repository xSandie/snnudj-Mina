// pages/home/home.js
const app = getApp()
const urlModel = require('../../utils/urlSet.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: 0,
        navbar: ['进行中', '已结束'],
        currentTab: 0,
        nextPage: 1, //下一页，用于分页
        joinedAct: [{
            'pubPhoneNum': 18349250473,
            'pubName': '向书晗',
            'signInTotal': 90,
            'signInTime': '05-07 16:00',
            'endTime': '11-29 21:00',
            'signInId': 123
        }, {
            'pubPhoneNum': 18349250473,
            'pubName': '向书晗',
            'signInTotal': 90,
            'signInTime': '05-07 16:00',
            'endTime': '11-29 21:00',
            'signInId': 123
        }],
        pubAct: [{
                'pubTime': '11-29 18:00',
                'haveSignIn': 89,
                'needSignIn': 90,
                'urgent': true,
                'endTime': '11-29 21:00',
                'signInId': 123
            }, {
                'pubTime': '11-29 18:00',
                'haveSignIn': 89,
                'needSignIn': 90,
                'urgent': true,
                'endTime': '11-29 21:00',
                'signInId': 123
            }

        ],
        finJoinedAct: [{
            'pubPhoneNum': 18349250473,
            'pubName': '向书晗',
            'signInTotal': 90,
            'signInTime': '05-07 16:00',
            'endTime': '11-29 21:00',
            'signInId': 123
        }, {
            'pubPhoneNum': 18349250473,
            'pubName': '向书晗',
            'signInTotal': 90,
            'signInTime': '05-07 16:00',
            'endTime': '11-29 21:00',
            'signInId': 123
        }],
        finPubAct: [{
                'pubTime': '11-29 18:00',
                'haveSignIn': 89,
                'needSignIn': 90,
                'urgent': true,
                'endTime': '11-29 21:00',
                'signInId': 123
            }, {
                'pubTime': '11-29 18:00',
                'haveSignIn': 89,
                'needSignIn': 90,
                'urgent': true,
                'endTime': '11-29 21:00',
                'signInId': 123
            }

        ],
        timeIcon: '../../images/timeIcon.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight
        })
        app.getUser().then(function(res) {
            wx.showLoading({
                title: '加载列表中',
                mask: true
            })
            var send_data = {
                'userId': app.globalData.userId,
            }
            wx.request({
                url: urlModel.url.getOngoSignIn, //TODO:请求未完成签到url
                method: 'GET',
                data: send_data,
                success: function(res) {
                    // console.log(res)
                    if (res.statusCode == 200) {
                        that.setData({
                            joinedAct: res.data.joinedAct,
                            pubAct: res.data.pubAct
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '加载成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: '加载失败，请下拉重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }

                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '加载失败，请下拉重试',
                        icon: 'none',
                        duration: 2000
                    })
                },
                complete: function() {}
            })

        })
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        var that = this
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        this.setData({
            nextPage: 1
        })
        setTimeout(() => {}, 500)
        if (this.data.currentTab == 1) {
            //TODO:请求已完成刷新
            wx.request({
                url: urlModel.url.getFinSignIn,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'nextPage': that.data.nextPage
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            finJoinedAct: res.data.finJoinedAct,
                            finPubAct: res.data.finPubAct
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新失败，请重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        } else {
            //TODO:未完成刷新
            var send_data = {
                'userId': app.globalData.userId
            }
            wx.request({
                url: urlModel.url.getOngoSignIn,
                method: 'GET',
                data: send_data,
                success: function(res) {
                    // console.log(res)
                    if (res.statusCode == 200) {
                        that.setData({
                            joinedAct: res.data.joinedAct,
                            pubAct: res.data.pubAct
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新失败，请重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                },
                complete: function() {

                }
            })
        }


    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this
        this.setData({
            nextPage: that.data.nextPage + 1
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        setTimeout(function() {

        }, 500);
        if (this.data.currentTab == 1) {
            //TODO: 获取已完成下一页
            wx.request({
                url: urlModel.url.getFinSignIn,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'nextPage': that.data.nextPage
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            finJoinedAct: that.data.finJoinedAct.concat(res.data.finJoinedAct),
                            finPubAct: that.data.finPubAct.concat(res.data.finPubAct)
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '加载成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: '加载失败，请重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '加载失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })

        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    navbarTap: function(e) {
        var that = this
        this.setData({
            currentTab: e.currentTarget.dataset.idx,
            nextPage: 1
        })
        setTimeout(() => {}, 500)
        if (this.data.currentTab == 1) {
            //TODO:切换到已完成
            console.log(this.data.currentTab)
            wx.showLoading({
                title: '刷新中',
                mask: true
            })
            wx.request({
                url: urlModel.url.getFinSignIn,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'nextPage': that.data.nextPage
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            finJoinedAct: res.data.finJoinedAct,
                            finPubAct: res.data.finPubAct
                        })
                    } else {}
                }
            })

            wx.hideLoading()
        } else {
            //TODO:在未完成
            wx.request({
                url: urlModel.url.getOngoSignIn, //填充请求订单
                method: 'GET',
                data: {
                    'userId': app.globalData.userId
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            joinedAct: res.data.joinedAct,
                            pubAct: res.data.pubAct
                        })
                    }
                },
                fail: function() {},
                complete: function() {}
            })
        }
    },
    fin_signIn: function(e) {
        var that = this
        var signInId = e.currentTarget.dataset.signInId
        wx.showModal({
            title: '确认结束',
            content: '结束后，仍可在首页“已结束”选项栏中，临时开启10分钟',
            confirmColor: '#d13742',
            confirmText: '结束签到',
            success: function(res) {
                if (res.confirm) {
                    //TODO:执行结束签到逻辑
                    wx.request({
                        url: urlModel.url.endSignIn, //填充请求订单
                        method: 'POST',
                        data: {
                            'userId': app.globalData.userId,
                            'signInId': signInId
                        },
                        success: function(res) {
                            if (res.statusCode == 200) {
                                //TODO:调用刷新
                                wx.showToast({
                                    title: '成功结束',
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.onPullDownRefresh()
                            } else {
                                wx.showToast({
                                    title: '失败，请重试',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function() {
                            wx.showToast({
                                title: '失败，请重试',
                                icon: 'none',
                                duration: 2000
                            })
                        },
                        complete: function() {}
                    })
                }
            }
        })
    },
    toPub: function() {
        wx.navigateTo({
            url: '../pubSignOn/pubSignOn',
        })
    },
    toDetail: function(e) {
        var signInId = e.currentTarget.dataset.signInId
        wx.navigateTo({
            url: '../signIn/signIn?Id=' + signInId,
        })
    },
    toPubDetail: function(e) {
        var signInId = e.currentTarget.dataset.signInId
        wx.navigateTo({
            url: '../signOnProcess/signOnProcess?Id=' + signInId,
        })
    },
    tempOpen: function(e) {
        var that = this
        var signInId = e.currentTarget.dataset.signInId
        wx.showModal({
            title: '注意',
            content: '临时开启10分钟后，将会自动结束，请及时签到',
            confirmColor: '#d13742',
            confirmText: '确认开启',
            success: function(res) {
                if (res.confirm) {
                    //TODO:临时开启十分钟逻辑，调用下拉刷新
                    wx.request({
                        url: urlModel.url.tempOpen,
                        method: 'POST',
                        data: {
                            'userId': app.globalData.userId,
                            'signInId': signInId
                        },
                        success: function(res) {
                            if (res.statusCode == 200) {
                                that.onPullDownRefresh()
                            } else {}
                        }
                    })

                }
            }
        })
    }
})