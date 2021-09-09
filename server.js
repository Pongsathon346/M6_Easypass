var http = require('http');
var url = require('url');
var array = []
const {fillmoney, showlocation,pay,checkmoney,showpayment} = require('./easypass');
 
http.createServer(function (req, res) {
    var request_path = url.parse(req.url, true);
    var message = '';
    var status = 200;
    var data = "";
    
    let response_object = {
        statusCode: status,
        message: message,
        data: data

    }

    switch (request_path.pathname) {
        case '/fillmoney':
            if(req.method == "POST") {
                let req_input = [];
                req
                   .on("data", (chunk) => {
                       req_input.push(chunk);
                   }) 
                   .on("end", () => {
                       let json_data = JSON.parse(Buffer.concat(req_input).toString());
                       try {
                           response_object.data = fillmoney(json_data.id,json_data.amount);
                           response_object.message = "success";
                           res.writeHead(200, {'Content-Type': 'application/json' });
                           res.end(JSON.stringify(response_object));
                       } catch (err) {
                           message += err;
                           console.log(err);
                       }
                   });
            } else {
                throw "method not match";
            }   
            break;

        case '/pay':
            if(req.method == "POST") {
                let req_input = [];
                req
                    .on("data", (chunk) => {
                        req_input.push(chunk);
                    }) 
                    .on("end", () => {
                        let json_data = JSON.parse(Buffer.concat(req_input).toString());
                        try {
                            response_object.data = pay(json_data.id,json_data.idLoca);
                            response_object.message = "success";
                            res.writeHead(200, {'Content-Type': 'application/json' });
                            res.end(JSON.stringify(response_object));
                        } catch (err) {
                            message += err;
                            console.log(err);
                        }
                    });
            } else {
                throw "method not match";
            }   
            break;

        case '/showlocation':
            try {
                let showIem =  showlocation();
                message += 'success';
                response_object.data = showIem
                status = 200;
                res.writeHead(200, {'Content-Type': 'application/json' });
                res.end(JSON.stringify(response_object));
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
                response_object.data = showIem
                status = 200;
                res.writeHead(200, {'Content-Type': 'application/json' });
                res.end(JSON.stringify(response_object));
            } catch (e) {
                message += e;
                status = 400;
                console.log(e);
            }
            break;   
        case '/showpayment':
            try {
                let showIem =  showpayment(request_path.query.id);
                message += 'success';
                response_object.data = showIem
                status = 200;
                res.writeHead(200, {'Content-Type': 'application/json' });
                res.end(JSON.stringify(response_object));
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
    
   

}).listen(6060);
console.log('Server started at port 6060');