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
                    } else {}
                }
            })

        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

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
                } else {}
            }
        })

    },
    saveImg: function() {
        console.log('保存二维码')
    }
})