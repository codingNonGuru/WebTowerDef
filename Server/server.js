var express = require('express')
var fileSystem = require('fs')

var server = express()

var getMeshHandler = function(request, response)
{
    fileReadHandler = function(error, data)
    {
        response.send(data)
    }

    fileSystem.readFile(__dirname + '/mesh.json', fileReadHandler)
}

server.get('/getMesh/:meshName', getMeshHandler)

server.listen(7003, () => console.log('TowerDef Server is on.'))