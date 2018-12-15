// pages/pubSignOn/pubSignOn.js
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
        createTime: '2018-11-30 19:00'
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
    },
    saveImg: function() {
        console.log('保存二维码')
    }
})