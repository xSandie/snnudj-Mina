const urlModel = require('../../utils/urlSet.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        admin: false,
        suggestions: [{
            sugId: 1,
            sugTitle: '这里是建议的标题',
            sugContent: '暂时什么都没有',
            reply: ['回复人名字', '暂时什么都没有'],
        }],
        ignoreSug: [{
            sugId: 1,
            sugTitle: '这里是建议的标题',
            sugContent: '暂时什么都没有'
        }],
        statusBarHeight: 0,
        navbar: ['回复中', '已忽略'],
        currentTab: 0,
        nextPage: 1, //下一页，用于分页
        contentHeight: 0,
        replySuggestionId: null, //回复的建议id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '获取中',
            mask: true
        })
        this.setData({
            admin: app.globalData.admin
        })
        var that = this
        wx.request({
            url: urlModel.url.getSuggestion,
            method: 'GET',
            data: {
                'userId': app.globalData.userId,
                'nextPage': that.data.nextPage
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '获取成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.setData({
                        suggestions: res.data.suggestions
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '获取失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
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
        var that = this
        if (!this.data.admin) {
            this.setData({
                statusBarHeight: app.globalData.statusBarHeight,
                contentHeight: app.globalData.screenHeight - 254 - 330
            })
        } else {
            this.setData({
                statusBarHeight: app.globalData.statusBarHeight,
                contentHeight: app.globalData.screenHeight - 254 - 256
            })
        }
        console.log(this.data.contentHeight)
        this.onPullDownRefresh()
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
        var that = this
            //不考虑忽略那块的刷新
        this.setData({
            nextPage: 1,
            currentTab: 0
        })
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        setTimeout(function() {

        }, 500);
        wx.request({
            url: urlModel.url.getSuggestion,
            method: 'GET',
            data: {
                'userId': app.globalData.userId,
                'nextPage': that.data.nextPage
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.setData({
                        suggestions: res.data.suggestions
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '刷新失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    navbarTap: function(e) {
        var that = this
        this.setData({
            currentTab: e.currentTarget.dataset.idx,
            nextPage: 1
        })
        setTimeout(function() {}, 500);
        if (this.data.currentTab == 1) {
            //TODO:切换到忽略页面
            wx.request({
                url: urlModel.url.getIgnoreSuggestion,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'nextPage': this.data.nextPage
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            ignoreSug: res.data.ignoreSug
                        })
                    }
                }
            })

        } else {
            //TODO:切换到建议页面
            wx.request({
                url: urlModel.url.getSuggestion,
                method: 'GET',
                data: {
                    'userId': app.globalData.userId,
                    'nextPage': this.data.nextPage
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            suggestions: res.data.suggestions
                        })
                    }
                }
            })

        }

    },
    IgnoreSug: function(e) {
        var selectId = e.currentTarget.dataset.id
            //TODO:忽略建议，先弹窗是否确定
        var that = this
        wx.showModal({
            title: '注意',
            content: '忽略后无法恢复',
            confirmText: '取消',
            confirmColor: '#F40B31',
            cancelText: '确认忽略',
            success: function(res) {
                if (res.confirm) {
                    return
                } else {
                    //TODO:发起忽略请求
                    wx.request({
                        url: urlModel.url.IgnoreSuggestion,
                        method: 'POST',
                        data: {
                            'userId': app.globalData.userId,
                            'sugId': selectId
                        },
                        success: function(res) {
                            if (res.statusCode == 200) {
                                wx.showToast({
                                    title: '已忽略',
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.onLoad()
                            } else {
                                wx.showToast({
                                    title: '失败，请重试',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function() {

                            wx.showToast({
                                title: '失败，请检查网络',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })

                }
            }

        })

    },
    reply: function(e) {
        var that = this
        if (!this.data.admin) {
            return
        } //不是管理员，直接返回
        // console.log(e)
        var tempSug = new Array()
        var selectId = e.currentTarget.dataset.id
        var tempSuggestions = this.data.suggestions
        for (var index in tempSuggestions) {
            if (tempSuggestions[index].sugId == selectId) {
                if (tempSuggestions[index].reply) {
                    tempSug.push(tempSuggestions[index])
                    continue
                }
                tempSuggestions[index].select = true
                this.setData({
                    replySuggestionId: tempSuggestions[index].sugId
                })
            } else {
                tempSuggestions[index].select = false
            }
            tempSug.push(tempSuggestions[index])
        }
        this.setData({
                suggestions: tempSug
            })
            // console.log(this.data.suggestions)
    },
    pubSuggest: function(e) {
        var that = this
        console.log(e);
        //TODO:发布建议
        wx.showLoading({
            title: '发布中',
            mask: true
        })
        var send_data = {
            'userId': app.globalData.userId,
            'content': e.detail.value.content,
            'title': e.detail.value.title
        }
        wx.request({
            url: urlModel.url.pubSuggestion,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.onPullDownRefresh()
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
        })

    },
    pubReply: function(e) {
        var that = this
        console.log(e);
        //TODO:发布回复
        var send_data = {
            'sugId': that.data.replySuggestionId,
            'userId': app.globalData.userId,
            'content': e.detail.value.content
        }
        if (that.data.replySuggestionId) {
            wx.showLoading({
                title: '回复中',
                mask: true
            })
            wx.request({
                url: urlModel.url.replySuggestion,
                method: 'POST',
                data: send_data,
                success: function(res) {
                    if (res.statusCode == 200) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '回复成功',
                            icon: 'success',
                            duration: 2000
                        })
                        that.onPullDownRefresh()
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: '回复失败，请重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '回复失败，请检查网络',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    },
    moreIgnore: function() {
        var that = this
        this.setData({
            nextPage: that.data.nextPage + 1
        })
        setTimeout(function() {}, 500);
        wx.request({
            url: urlModel.url.getIgnoreSuggestion,
            method: 'GET',
            data: {
                'userId': app.globalData.userId,
                'nextPage': this.data.nextPage
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    //TODO:更多忽略建议
                    that.setData({
                        ignoreSug: that.data.ignoreSug.concat(res.data.ignoreSug)
                    })
                    wx.hideLoading()
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '加载失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
        })

    },
    moreSuggestion: function() {
        //TODO:更多建议
        var that = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        this.setData({
            nextPage: that.data.nextPage + 1
        })
        setTimeout(function() {}, 500);
        wx.request({
            url: urlModel.url.getSuggestion,
            method: 'GET',
            data: {
                'userId': app.globalData.userId,
                'nextPage': this.data.nextPage
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        suggestions: that.data.suggestions.concat(res.data.suggestions)
                    })
                    wx.hideLoading()
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '加载失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '失败，请检查网络',
                    icon: 'none',
                    duration: 2000
                })
            }
        })

    }
})