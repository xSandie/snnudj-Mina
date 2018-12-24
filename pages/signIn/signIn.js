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
        myUsername: '马正平',
        canSignIn: true,
        signInId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //TODO:主页进入逻辑
        if (options.Id) {
            var signInId = options.Id
            this.setData({
                signInId: signInId
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
                    if (res.statusCode == 200) {
                        that.setData({
                            pubuserName: res.data.pubuserName,
                            pubuserPhone: res.data.pubuserPhone,
                            endTime: res.data.endTime,
                            signInNum: res.data.signInNum,
                            canSignIn: res.data.canSignIn
                        })
                    } else {}
                }
            })

        } else {
            //TODO:扫码进入逻辑

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
                            canSignIn: res.data.canSignIn
                        })
                    } else {}
                }
            })
        }

    },


    /**
     * TODO:用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    signIn: function() {
        //TODO:点击签到逻辑
        var that = this
        wx.request({
            url: urlModel.url.SignIn,
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

    },
    navHome: function() {
        wx.reLaunch({
            url: '../home/home',
        })
    }
})