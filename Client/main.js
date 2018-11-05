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
		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.enable(gl.DEPTH_TEST);
		/*gl.enable(gl.CULL_FACE);
		gl.frontFace(gl.CCW);
		gl.cullFace(gl.BACK);*/

		shaderManager.useProgram()
		bufferManager.Bind()

		var program = shaderManager.getProgram()
		var matrixLocation = gl.getUniformLocation(program, 'finalMatrix')
		
		var worldMatrix = new Float32Array(16)
		var projMatrix = new Float32Array(16)
		var viewMatrix = new Float32Array(16)

		mat4.identity(worldMatrix)
		mat4.lookAt(viewMatrix, [8, 8, 8], [0, 0, 0], [0, 0, 1])
		var screenRatio = canvas.clientWidth / canvas.clientHeight
		mat4.perspective(projMatrix, 60.0 / 57.297, screenRatio, 0.1, 100.0)

		var resultMatrix = new Float32Array(16)
		mat4.mul(resultMatrix, projMatrix, viewMatrix)

		var finalMatrix = new Float32Array(16)
		mat4.mul(finalMatrix, resultMatrix, worldMatrix)

		gl.uniformMatrix4fv(matrixLocation, gl.FALSE, finalMatrix)

		gl.drawArrays(gl.TRIANGLES, 0, bufferManager.buffer.VertexCount)
	}
}