/**
 * Created by qoder on 16/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {  // 查询数量
            Model.count(queryParams).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {   // 查询一页的记录
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        var count = results.count;
        $page.pageCount = (count - 1) / pageSize + 1;
        $page.results = results.records;
        callback(err, $page);
    });
};

module.exports = {
    pageQuery: pageQuery
};