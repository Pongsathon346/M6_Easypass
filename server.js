var http = require('http');
var url = require('url');
var array = []
const {fillmoney, showlocation} = require('./easypass');

http.createServer(function (req, res) {
    var request_path = url.parse(req.url, true);
    var message = '';

    switch (request_path.pathname) {
        case '/fillmoney':
            try {
                let showIem =  fillmoney(request_path.query.id,request_path.query.amount);
                message += 'success';
                data = showIem
                status = 200;
            } catch (e) {
                message += e;
                status = 400;
                console.log(e);
            }
            break;
        case '/showlocation':
            try {
                let showIem =  showlocation();
                message += 'success';
                data = showIem
                status = 200;
            } catch (e) {
                message += e;
                status = 400;
                console.log(e);
            }
            break;
        case '/checkmoney':
            try {
                let showIem =  checkmoney(request_path.query.id);
                message += 'success';
                data = showIem
                status = 200;
            } catch (e) {
                message += e;
                status = 400;
                console.log(e);
            }
            break;

        
        default:
            status = 404;
            message = 'Path Not Found';
            break;
    }
    
    let response_object = {
        status: status,
        message: message,
        data: data

    }
    
    
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(response_object));

}).listen(6060);
console.log('Server started at port 6060');