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
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            reply: ['回复人名字', '这是回复待收到回复骄傲是打开房间啊看撒娇的发四点九分爱上绝地反击啊的骄傲首府喀山吉萨大反击撒地方骄傲是的风景发货v啊上半场遵从经典赛弗内安的肌肤阿道夫呢与他'],
        }, {
            sugId: 2,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            reply: ['回复人名字', '这是回复待收到回复骄傲是打开房间啊看撒娇的发四点九分爱上绝地反击啊的骄傲首府喀山吉萨大反击撒地方骄傲是的风景发货v啊上半场遵从经典赛弗内安的肌肤阿道夫呢与他'],
            select: false
        }, {
            sugId: 3,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
            select: false
        }],
        ignoreSug: [{
            sugId: 4,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假'
        }, {
            sugId: 5,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假',
        }, {
            sugId: 6,
            sugTitle: '这里是建议的标题',
            sugContent: '这里是建议的内容哈哈哈哈哈哈哈哈哈哈哈啊狂顶喀什酱豆腐卡卡的付款撒卡岛附近卡喀什地方就卡扩大撒赖激发开始夫卡是肌肤的卡健康ask大家发快递放假'
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
                    that.setData({
                        suggestions: res.data.suggestions
                    })
                }
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
        this.setData({
            nextPage: 1
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
                    that.setData({
                        suggestions: res.data.suggestions
                    })
                }
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

                    }
                }
            })

        }

    },
    IgnoreSug: function(e) {
        var selectId = e.currentTarget.dataset.id
            //TODO:忽略建议，先弹窗是否确定

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
        var send_data = {

        }
        wx.request({
            url: urlModel.url.pubSuggestion,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {

                }
            }
        })

    },
    pubReply: function(e) {
        var that = this
        console.log(e);
        //TODO:发布回复
        var send_data = {

        }
        wx.request({
            url: urlModel.url.replySuggestion,
            method: 'POST',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {

                }
            }
        })

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
                }
            }
        })

    },
    moreSuggestion: function() {
        //TODO:更多建议
        var that = this
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

                }
            }
        })

    }
})