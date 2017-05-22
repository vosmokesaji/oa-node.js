var debug = require('debug')('oa: api/project/newflow');
var dbOps = require('../../modules/Db').exec
var cleanCallback = require('sync_back').run
module.exports = function (req, res, api, reqBody) {cleanCallback(function* (callback) {
  var return4Fail = api.back4Fail
  var return4Success = api.back4Success
  var loginUID = req.session.user
  var SQLStatement = 'SELECT status, node FROM user WHERE id = '+loginUID
  var userInfo = (yield dbOps(SQLStatement, callback.next))[0]
  SQLStatement = 'SELECT ispersonnel FROM node WHERE id = '+userInfo.node
  userInfo.isPersonnel = (yield dbOps(SQLStatement, callback.next))[0].ispersonnel
  if(userInfo.status != 2 && userInfo.isPersonnel != 1) return return4Fail(401, 0, '当前登录用户无权使用本接口。')
  for (var i in reqBody.flow){
    SQLStatement = 'SELECT id FROM user WHERE id = '+reqBody.flow[i]
    var result = (yield dbOps(SQLStatement, callback.next))[0]
    var j = (+i)+1
    if(!result) return return4Fail(400, 0, '流程中，第 '+j+' 步 UID 不存在')
  }
  SQLStatement = "INSERT INTO flow (title, description, flow, status) VALUES('"+reqBody.title+"', '"+reqBody.description+"', '"+JSON.stringify(reqBody.flow)+"', 1)"
  var result = yield dbOps(SQLStatement, callback.next)
  return4Success({
    id: result.insertId
  })
})}