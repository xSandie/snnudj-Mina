// pages/suggestion/suggestion.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        admin: true,
        suggestions: [{
            sugId: 1,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            reply: '这是回复待收到回复骄傲是打开房间啊看撒娇的发四点九分爱上绝地反击啊的骄傲首府喀山吉萨大反击撒地方骄傲是的风景发货v啊上半场遵从经典赛弗内安的肌肤阿道夫呢与他'
        }, {
            sugId: 2,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            reply: '这是回复待收到回复骄傲是打开房间啊看撒娇的发四点九分爱上绝地反击啊的骄傲首府喀山吉萨大反击撒地方骄傲是的风景发货v啊上半场遵从经典赛弗内安的肌肤阿道夫呢与他'
        }, {
            sugId: 3,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假'
        }],
        ignoreSug: [{
            sugId: 4,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假'
        }, {
            sugId: 5,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            reply: '这是回复待收到回复骄傲是打开房间啊看撒娇的发四点九分爱上绝地反击啊的骄傲首府喀山吉萨大反击撒地方骄傲是的风景发货v啊上半场遵从经典赛弗内安的肌肤阿道夫呢与他'
        }, {
            sugId: 6,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            reply: '这是回复待收到回复骄傲是打开房间啊看撒娇的发四点九分爱上绝地反击啊的骄傲首府喀山吉萨大反击撒地方骄傲是的风景发货v啊上半场遵从经典赛弗内安的肌肤阿道夫呢与他'
        }],
        statusBarHeight: 0,
        navbar: ['回复中', '已忽略'],
        currentTab: 0,
        nextPage: 1, //下一页，用于分页
        contentHeight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            contentHeight: app.globalData.screenHeight - 230 - 330
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
    }
})