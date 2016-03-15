'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _handlers = require('./handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var app = (0, _express2['default'])();

app.use((0, _cors2['default'])());

app.get('/', _handlers2['default'].rootHandler);

app.get('/api/menus', _handlers2['default'].apiHandler);

app.get('/api/menus/local', function (req, res) {
    _fs2['default'].readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

exports = module.exports = app;