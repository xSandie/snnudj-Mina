const urlModel = require('../../utils/urlSet.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '马正平',
        userPhone: 18349250473,
        userCreateTime: '2018-11-30',
        totalJoin: 10,
        totalPub: 30
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        var that = this
        wx.request({
            url: urlModel.url.getMyInfo,
            method: 'GET',
            data: {
                'userId': app.globalData.userId
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    //TODO:个人中心
                    that.setData({
                        username: res.data.username,
                        userCreateTime: res.data.userCreateTime,
                        totalJoin: res.data.totalJoin,
                        totalPub: res.data.totalPub
                    })
                }
            }
        })
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
            url: urlModel.url.getMyInfo,
            method: 'GET',
            data: {
                'userId': app.globalData.userId
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    //TODO:个人中心
                    that.setData({
                        username: res.data.username,
                        userCreateTime: res.data.userCreateTime,
                        totalJoin: res.data.totalJoin,
                        totalPub: res.data.totalPub
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
                    title: '刷新失败,请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    toPub: function() {
        wx.navigateTo({
            url: '../pubSignOn/pubSignOn',
        })
    },
    toChange: function() {
        wx.navigateTo({
            url: '../auth/auth',
        })
    }
})