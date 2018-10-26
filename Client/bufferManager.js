var bufferManager = 
{
    buffer : null,

    onDone : null,

    OnBufferFetched : function()
    {
        this.onDone()
    },

    Initialize : function(onDone)
    {
        this.onDone = onDone

        this.buffer = new Buffer()
    },

    Bind : function()
    {
        this.buffer.Bind()
    }
}