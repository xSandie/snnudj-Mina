// pages/auth/auth.js
const urlModel = require('../../utils/urlSet.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userPhone: '',
        userName: '',
        canChange: false //动态判断然后赋值
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userPhone: app.globalData.userPhone,
            userName: app.globalData.username
        })
        if (app.globalData.userPhone) {
            this.setData({
                canChange: true
            })
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
        //同步与全局的信息
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
            wx.showToast({
                title: '两次输入的密码不一致',
                icon: 'none'
            })
            return
        }
        if (formData.password == '') {
            //弹窗提示
            wx.showToast({
                title: '默认密码为 12345678',
                icon: 'none'
            })
            formData.password = '12345678'
        }
        console.log(formData)
            //TODO:修改账号密码的请求
        var send_data = {
            'password': formData.password,
            'userName': formData.userName,
            'userPhone': formData.userPhone,
            'userId': app.globalData.userId
        }
        wx.request({
            url: urlModel.url.changeUserInfo,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {
                    app.getUser().then(function() {
                        that.onLoad()
                    })
                } else {

                }
            }
        })
    },
    signUp: function(e) {
        var that = this
        var formData = e.detail.value
        if (formData.password != formData.confirmPassword) {
            //弹窗提示
            wx.showToast({
                title: '两次输入的密码不一致',
                icon: 'none'
            })
            return
        }
        if (formData.password == '') {
            //弹窗提示
            wx.showToast({
                title: '默认密码为 12345678',
                icon: 'none'
            })
            formData.password = '12345678'
        }
        console.log(formData)
            //TODO:注册请求
        var send_data = {
            'password': formData.password,
            'userName': formData.userName,
            'userPhone': formData.userPhone,
            'userId': app.globalData.userId
        }
        wx.request({
            url: urlModel.url.register,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {
                    app.getUser().then(function() {
                        that.onLoad()
                    })
                } else {

                }
            }
        })
    }
})