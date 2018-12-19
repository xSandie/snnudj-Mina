// pages/signOnProcess/signOnProcess.js
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
        console.log(options.Id)
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    finSignIn: function() {

    },
    getQRCode: function() {

    },
    tempOpenSignIn: function() {
        //临时开启十分钟接口
    }
})