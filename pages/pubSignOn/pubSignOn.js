const urlModel = require('../../utils/urlSet.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CodeGen: true,
        date: '2018-12-31',
        startDate: '2018-12-30',
        endDate: '2019-2-27', //默认两个月
        time: '21:00',
        createTime: '2018-11-30 19:00',
        CodeURl: '',
        signInId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            CodeGen: false,
            date: app.globalData.date,
            endDate: app.globalData.endDate,
            startDate: app.globalData.startDate
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
        if (this.data.signInId == '') {
            return
        } else {
            wx.showLoading({
                title: '刷新中',
                mask: true
            })
            var that = this
            wx.request({
                url: urlModel.url.refreshPubSignIn,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'signInId': that.data.signInId
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            CodeURl: res.data.CodeURl,
                            CodeGen: true,
                            createTime: res.data.createTime
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
                        title: '刷新失败，请检查网络',
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
        var that = this
        if (that.data.signInId != '') {
            return {
                title: app.globalData.username + '发起的签到',
                path: '/pages/signIn/signIn?Id=' + that.data.signInId
            }
        } else {
            return {
                title: '快来发布签到吧',
                path: '/pages/home/home'
            }
        }

    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    },
    submitSignIn: function(e) {

        var formData = e.detail.value
        if (formData.peopleNum == "") {
            formData.peopleNum = 100
        }
        console.log(formData)
            //TODO:点击发布并生成二维码
        wx.showLoading({
            title: '发布中',
            mask: true
        })
        var that = this
        wx.request({
            url: urlModel.url.pubSignIn,
            method: 'POST',
            data: {
                'userId': app.globalData.userId,
                'peopleNum': formData.peopleNum,
                'endDateTime': formData.endDate + ' ' + formData.endTime
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        createTime: res.data.createTime,
                        CodeURl: res.data.CodeURl,
                        CodeGen: true,
                        signInId: res.data.signInId
                    })
                    wx.hideLoading()
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '发布失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '发布失败，请重试',
                    icon: 'none',
                    duration: 2000
                })
            }
        })

    },
    viewImg: function() {
        var that = this
        wx.previewImage({
            urls: [that.data.CodeURl],
        })
    },
    saveImg: function() {
        console.log('保存二维码')
        var that = this
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
                // console.log("2-授权《保存图片》权限成功");
                // util.downloadImage(downloadUrl);
                wx.downloadFile({
                    url: that.data.CodeURl,
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
})