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
        var that = this
        if (options.Id) {
            console.log(options.Id)
                //TODO:首页进入逻辑
            var signInId = options.Id
            this.setData({
                signInId: signInId
            })
            wx.showLoading({
                title: '加载中',
                mask: true
            })
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
                            haveSignIn: res.data.haveSignIn,
                            qrCode: res.data.qrCode
                        })
                        wx.hideLoading()
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
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        wx.request({
            url: urlModel.url.pubSignInDetail,
            method: 'GET',
            data: {
                'userId': app.globalData.userId,
                'signInId': that.data.signInId
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
                        haveSignIn: res.data.haveSignIn,
                        qrCode: res.data.qrCode
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
                        title: '刷新失败',
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
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var that = this
        return {
            title: that.data.username + '发起的签到',
            path: '/pages/signIn/signIn?Id=' + that.data.signInId
        }
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
        console.log('保存二维码')
        var that = this
        wx.showModal({
            title: '选择',
            content: '查看二维码还是直接保存？',
            confirmText: '查看',
            cancelText: '保存',
            cancelColor: '#F40B31',
            confirmColor: '#999ba1',
            success: function(res) {
                //确定查看取消保存
                if (res.confirm) {
                    wx.previewImage({
                        urls: [that.data.qrCode],
                    })
                } else {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            // console.log("2-授权《保存图片》权限成功");
                            // util.downloadImage(downloadUrl);
                            wx.downloadFile({
                                url: that.data.qrCode,
                                success: function(res) {
                                    // console.log(res)
                                    wx.saveImageToPhotosAlbum({
                                        filePath: res.tempFilePath,
                                        success: function(res) {
                                            // console.log(res)
                                            wx.showToast({
                                                title: '保存成功',
                                                icon: 'success',
                                                duration: 2000
                                            })
                                        },
                                        fail: function(res) {
                                            wx.showToast({
                                                title: '保存失败，请重试',
                                                icon: 'none',
                                                duration: 2000
                                            })
                                        }
                                    })
                                },
                                fail: function() {
                                    // console.log('fail')
                                }
                            })
                        },
                        fail() {
                            // 用户拒绝了授权  
                            // console.log("2-授权《保存图片》权限失败");
                            // 打开设置页面 
                            wx.showToast({
                                title: '请再次点击，并授权',
                                icon: 'none'
                            })
                        }
                    })
                }
            }
        })

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
                    wx.showLoading({
                        title: '开启中',
                        mask: true
                    })
                    wx.request({
                        url: urlModel.url.tempOpen,
                        method: 'POST',
                        data: {
                            'userId': app.globalData.userId,
                            'signInId': that.data.signInId
                        },
                        success: function(res) {
                            if (res.statusCode == 200) {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '开启成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.onPullDownRefresh()
                            } else {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '失败，请重试',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function() {
                            wx.hideLoading()
                            wx.showToast({
                                title: '失败，请重试',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })

                }
            }
        })
    }
})