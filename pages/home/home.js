// pages/home/home.js
const app = getApp()
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
            'signInNum': '',
            'admin': true,
            'signInTotal': 90,
            'signInTime': '05-07 16:00',
            'endTime': '11-29 21:00',
            'signInId': 123
        }, {
            'pubPhoneNum': 18349250473,
            'pubName': '向书晗',
            'signInNum': '',
            'admin': true,
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
        finJoinedAct: [],
        finPubAct: [],
        timeIcon: '../../images/timeIcon.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this
        this.setData({
            nextPage: that.data.nextPage + 1
        })
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
    },
    fin_signIn: function(e) {
        var that = this
        var signInId = e.currentTarget.dataset.signInId
        wx.showModal({
            title: '确认结束',
            content: '结束后，仍可在上方“已结束”选项栏中，临时开启10分钟',
            confirmColor: '#d13742',
            confirmText: '结束签到',
            success: function(res) {
                if (res.confirm) {
                    //执行取消订单逻辑
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
        var signInId = e.currentTarget.dataset.signInId
            //临时开启十分钟逻辑        
    }
})