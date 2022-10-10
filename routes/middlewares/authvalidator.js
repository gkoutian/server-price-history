const { expressjwt: jwt } = require('express-jwt');

module.exports = jwt({
    secret: 'mysecretolargo',
    algorithms: ["HS256"],
    getToken: function(req) {
        if (req.headers && req.headers['x-access-token']) {
            return req.headers['x-access-token'];
        } else {
            return null;
        }
    }
});
