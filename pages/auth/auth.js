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
    onShow: function() {},

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
        wx.showLoading({
            title: '修改中',
            mask: true
        })
        wx.request({
            url: urlModel.url.changeUserInfo,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.hideLoading()
                    app.getUser().then(function() {
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 2000
                        })
                        that.onLoad()
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '修改失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '修改失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
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
        wx.showLoading({
            title: '注册中',
            mask: true
        })
        wx.request({
            url: urlModel.url.register,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.hideLoading()
                    app.getUser().then(function() {

                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            duration: 2000
                        })
                      wx.reLaunch({
                        url: '/pages/home/home',
                      })
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '注册失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '注册失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }
})