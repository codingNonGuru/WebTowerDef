var express = require('express')

var server = express()

var requestHandler = function(request, response)
{
    response.send('great stuff!')
}

server.get('/', requestHandler)