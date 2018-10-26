var express = require('express')
var fileSystem = require('fs')

var server = express()

var getMeshHandler = function(request, response)
{
    fileReadHandler = function(error, data)
    {
        response.send(JSON.stringify(data))
    }

    var meshName = request.params['meshName']

    fileSystem.readFile(__dirname + '/' + meshName + '.json', 'utf8', fileReadHandler)
}

server.get('/getMesh/:meshName', getMeshHandler)

server.listen(7003, () => console.log('TowerDef Server is on.'))