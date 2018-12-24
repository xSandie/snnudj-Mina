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