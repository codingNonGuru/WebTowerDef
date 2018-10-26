var Utility = 
{
    fetchJson : function(name, callback)
    {
        var client = new XMLHttpRequest()

        var path = 'http://localhost:7003/' + 'getMesh/' + name

        client.open('GET', path, true)
        client.setRequestHeader('Access-Control-Allow-Headers', '*')
        //client.setRequestHeader('Content-type', 'application/json')
        client.setRequestHeader('Access-Control-Allow-Methods', '*')
        client.setRequestHeader('Access-Control-Allow-Origin', '*')

        client.onload = function() 
        {
            callback(null, client.responseText)
        }
        client.send()
    }
}