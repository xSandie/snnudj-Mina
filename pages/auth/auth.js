// pages/auth/auth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userPhone: 18349250473,
        userName: '向书晗',
        canChange: true
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
    userinfoChange: function(e) {
        //加入判断手机号是否正确的逻辑
        var formData = e.detail.value
        if (formData.userName == '') {
            formData.userName = this.data.userName
        }
        if (formData.userPhone == '') {
            formData.userPhone = this.data.userPhone
        }
        if (formData.password != formData.confirmPassword) {
            //弹窗提示
            return
        }
        if (formData.password == '') {
            //弹窗提示
            formData.password = '12345678'
        }
        console.log(formData)
    },
    signUp: function(e) {
        var formData = e.detail.value
        if (formData.password != formData.confirmPassword) {
            //弹窗提示
            return
        }
        if (formData.password == '') {
            //弹窗提示
            formData.password = '12345678'
        }
        console.log(formData)
    }
})