var game = 
{
	gl : null,

	canvas : null,

	Initialize : function() 
	{
		canvas = document.getElementById('game-surface')
		gl = canvas.getContext('webgl')

		if (!gl) 
		{
			console.log('WebGL not supported, falling back on experimental-webgl')
			gl = canvas.getContext('experimental-webgl')
		}

		if (!gl) 
		{
			alert('Your browser does not support WebGL')
		}
		
		shaderManager.Initialize()
		bufferManager.Initialize(onDone => {this.StartLoop()})
	},

	StartLoop : function()
	{
		var camera = new Camera()
		
		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);

		shaderManager.useProgram()
		bufferManager.Bind()

		var program = shaderManager.getProgram()
		var matrixLocation = gl.getUniformLocation(program, 'finalMatrix')

		gl.uniformMatrix4fv(matrixLocation, gl.FALSE, camera.Matrix)

		gl.drawArrays(gl.TRIANGLES, 0, bufferManager.buffer.VertexCount)
	}
}