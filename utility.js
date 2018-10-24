var Utility = 
{
    loadJson : function(path, callback)
    {
        var client = new XMLHttpRequest();

        client.open('GET', path, true);
        client.onload = function() 
        {
            callback(null, client.responseText);
        }
        client.send();
    }
}