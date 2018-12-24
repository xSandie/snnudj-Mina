const urlModel = require('../../utils/urlSet.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '向书晗', //签到发起时名字
        userPhone: 18349250473, //签到发起时手机号
        createTime: '11-29 19:00', //签到创建时间
        processing: true,
        endTime: '11-30 20:00', //结束时间，自动或者手动，会刷新
        haveSignIn: 88,
        needSignIn: 90,
        signInId: 0,
        signInPeople: [{
                username: '张筠瑶',
                userPhone: 15529268167,
                signInTime: '19:00'
            },
            {
                username: '张筠瑶',
                userPhone: 15529268167,
                signInTime: '19:00'
            },
            {
                username: '张筠瑶',
                userPhone: 15529268167,
                signInTime: '19:00'
            },
            {
                username: '张筠瑶',
                userPhone: 15529268167,
                signInTime: '19:00'
            }
        ],
        qrCode: '' //二维码地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.Id) {
            console.log(options.Id)
                //TODO:首页进入逻辑
            var signInId = options.Id
            this.setData({
                signInId: signInId
            })
            var that = this
            wx.request({
                url: urlModel.url.pubSignInDetail,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'signInId': signInId
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            signInPeople: res.data.signInPeople,
                            username: res.data.username,
                            userPhone: res.data.userPhone,
                            createTime: res.data.createTime,
                            processing: res.data.processing,
                            endTime: res.data.endTime,
                            needSignIn: res.data.needSignIn,
                            qrCode: res.data.qrCode
                        })
                    } else {}
                }
            })

        } else {
            //TODO:扫码进入逻辑，考虑从普通签到页面跳转
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        var that = this
        wx.request({
            url: urlModel.url.pubSignInDetail,
            method: 'GET',
            data: {
                'userId': app.globalData.userId,
                'signInId': this.data.signInId
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        signInPeople: res.data.signInPeople,
                        username: res.data.username,
                        userPhone: res.data.userPhone,
                        createTime: res.data.createTime,
                        processing: res.data.processing,
                        endTime: res.data.endTime,
                        needSignIn: res.data.needSignIn,
                        qrCode: res.data.qrCode
                    })
                } else {}
            }
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    finSignIn: function() {
        var that = this
        wx.showModal({
            title: '确认结束',
            content: '结束后，仍可临时开启10分钟',
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
                            'signInId': that.data.signInId
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
                                    title: '结束失败，请重试',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function() {
                            wx.showToast({
                                title: '结束失败，请重试',
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
    getQRCode: function() {

    },
    tempOpenSignIn: function() {
        var that = this
            //TODO:临时开启十分钟接口
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
                            'signInId': that.data.signInId
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