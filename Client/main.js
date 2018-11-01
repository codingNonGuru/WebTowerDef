var game = 
{
	gl : null,

	Initialize : function() 
	{
		var canvas = document.getElementById('game-surface')
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
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		shaderManager.useProgram()
		bufferManager.Bind()

		var program = shaderManager.getProgram()
		var matrixLocation = gl.getUniformLocation(program, 'matrix');
		
		var worldMatrix = new Float32Array(16);
		var projMatrix = new Float32Array(16);
		var viewMatrix = new Float32Array(16);

		mat4.identity(worldMatrix)
		mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0])
		mat4.perspective(projMatrix, glMatrix.toRadian(45.0), canvas.clientWidth / canvas.clientHeight, 0.1, 100.0)

		var finalMatrix = projMatrix * viewMatrix * worldMatrix;

		gl.uniformMatrix4fv(matrixLocation, gl.FALSE, finalMatrix);

		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
}