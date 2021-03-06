var express = require('express');
var router = express.Router();
var debug = require('debug')('oa:api');
var util = require('util')
var Db = require('./modules/Db')
var 调用数据库 = require('./modules/Db').exec
var sync = require('sync_back').run
var 动态验证码 = require('authenticator');
var interface = {}
var 空 = null
interface.project = {}
interface.user = {}
interface.node = {}
interface.notification = {}
interface.announcement = {}
interface.project.newtemplate = require('./api/project/newtemplate')
interface.project.publishtemplate = require('./api/project/publishtemplate')
interface.project.newproject = require('./api/project/newproject')
interface.project.submitproject = require('./api/project/submitproject')
interface.project.reviewproject = require('./api/project/reviewproject')
interface.project.getprojectlist = require('./api/project/getprojectlist')
interface.project.getprojectdetail = require('./api/project/getprojectdetail')
interface.project.gettemplatelist = require('./api/project/gettemplatelist')
interface.project.gettemplatedetail = require('./api/project/gettemplatedetail')
interface.project.newflow = require('./api/project/newflow')
interface.project.getflowlist = require('./api/project/getflowlist')
interface.project.getflowdetail = require('./api/project/getflowdetail')
interface.project.deltemplate = require('./api/project/deltemplate')
interface.project.delproject = require('./api/project/delproject')
interface.project.bind = require('./api/project/bind')
interface.user.newuser = require('./api/user/newuser')
interface.user.recovery = require('./api/user/recovery')
interface.user.confirmtoken = require('./api/user/confirmtoken')
interface.user.login = require('./api/user/login')
interface.user.signout = require('./api/user/signout')
interface.user.getinfo = require('./api/user/getinfo')
interface.user.getlist = require('./api/user/getlist')
interface.node.newnode = require('./api/node/newnode')
interface.node.getnodelist = require('./api/node/getnodelist')
interface.notification.getnotification = require('./api/notification/getnotification')
interface.announcement.send = require('./api/announcement/send')
interface.announcement.getdetail = require('./api/announcement/getdetail')
interface.announcement.getlist = require('./api/announcement/getlist')
  /*
   * 用户
   * /user
   * 包括用户登录、新建用户、管理用户的接口。
   */
  // 用户登录
router.post('/user/login', function (req, res, next) {
  var post = req.body
  run(req, res, {
    'login': false
  }, function (api) {
    interface.user.login(req, res, api, post)
  })
})
// 注销登录
router.get('/user/signout', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.user.signout(req, res, api, post)
  })
})
//获取登录用户信息
router.get('/user/getinfo', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.user.getinfo(req, res, api, post)
  })
})
// 重置动态验证码
router.post('/user/recovery', function (req, res, next) {
  var post = req.body
  run(req, res, {
    login: false
  }, function (api) {
    interface.user.recovery(req, res, api, post)
  })
})
// 确认重置动态验证码
router.post('/user/confirmtoken', function (req, res, next) {
  var post = req.body
  run(req, res, {
    login: false
  }, function (api) {
    interface.user.confirmtoken(req, res, api, post)
  })
})
// 新建用户
router.post('/user/newuser', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.user.newuser(req, res, api, post)
  })
})
// 获取所有用户列表
router.get('/user/getlist', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.user.getlist(req, res, api, post)
  })
})
/*
 * 专案
 * /project
 * 包括专案模板和专案本身的操作接口。
 */
// 新建专案模板
router.post('/project/newtemplate', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.newtemplate(req, res, api, post)
  })
})
// 发布专案模板
router.post('/project/publishtemplate', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.publishtemplate(req, res, api, post)
  })
})
// 新建流程
router.post('/project/newflow', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.newflow(req, res, api, post)
  })
})
// 绑定模板与流程
router.post('/project/bind', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.bind(req, res, api, post)
  })
})
// 新建专案
router.post('/project/newproject', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.newproject(req, res, api, post)
  })
})
// 将专案提交审核
router.post('/project/submitproject', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.submitproject(req, res, api, post)
  })
})
// 审核专案
router.post('/project/reviewproject', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.reviewproject(req, res, api, post)
  })
})
// 删除 / 归档专案模板
router.post('/project/deltemplate', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.deltemplate(req, res, api, post)
  })
})
// 删除 / 归档专案
router.post('/project/delproject', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.project.delproject(req, res, api, post)
  })
})
// 获取专案列表
router.get('/project/getprojectlist', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.project.getprojectlist(req, res, api, post)
  })
})
// 获取专案详情
router.get('/project/getprojectdetail', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.project.getprojectdetail(req, res, api, post)
  })
})
// 获取模板列表
router.get('/project/gettemplatelist', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.project.gettemplatelist(req, res, api, post)
  })
})
// 获取模板详情
router.get('/project/gettemplatedetail', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.project.gettemplatedetail(req, res, api, post)
  })
})
// 获取流程列表
router.get('/project/getflowlist', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.project.getflowlist(req, res, api, post)
  })
})
// 获取流程详情
router.get('/project/getflowdetail', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.project.getflowdetail(req, res, api, post)
  })
})

/*
 * 部门
 * /node
 * 包括部门管理和查询接口
 */
// 创建新部门
router.post('/node/newnode', function (req, res, next) {
  var post = req.body
  run(req, res, {}, function (api) {
    interface.node.newnode(req, res, api, post)
  })
})
// 获取所有部门列表
router.get('/node/getnodelist', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.node.getnodelist(req, res, api, post)
  })
})
  /*
   * 通知
   * /notification
   * 获取通知
   */
  // 获取通知
router.get('/notification/getnotification', function (req, res, next) {
    var post = req.body
    run(req, res, {}, function (api) {
      interface.notification.getnotification(req, res, api, post)
    })
  })
  /*
   * 公告
   * /announcement
   * 公司内的公告系统
   */
  //发布公告
router.post('/announcement/send', function (req, res, next) {
    var post = req.body
    run(req, res, {}, function (api) {
      interface.announcement.send(req, res, api, post)
    })
  })
  //获取公告详情
router.get('/announcement/getdetail', function (req, res, next) {
    var post = req.query
    run(req, res, {}, function (api) {
      interface.announcement.getdetail(req, res, api, post)
    })
  })
  // 获取公告列表
router.get('/announcement/getlist', function (req, res, next) {
  var post = req.query
  run(req, res, {}, function (api) {
    interface.announcement.getlist(req, res, api, post)
  })
})

function run(req, res, opt, fun) {
  sync(function* (api) {
    var needLogin = opt.login != null ? opt.login : true
    var needDb = opt.db != null ? opt.db : true
    if (needLogin && req.session.user == null) return failBack(401, 0, "未登录至系统。")
    var api = {}
    if (needDb) api.dbExec = function (sql, back) {
      Db.exec(sql, back)
    }
    api.back4Success = successBack
    api.back4Fail = failBack
    fun(api)

    function successBack(data) {
      var json = {}
      json.status = 'Success'
      if (data != null) json.data = data
      res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
      });
      res.end(JSON.stringify(json));
    }

    function failBack(httpCode, code, des) {
      var json = {}
      json.status = 'Fail'
      json.code = code
      json.description = des
      res.writeHead(httpCode, {
        'Content-Type': 'application/json;charset=utf-8'
      });
      res.end(JSON.stringify(json));
    }
  })
}
module.exports = router;
