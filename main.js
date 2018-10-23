var InitDemo = function () 
{
	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}
    
	shaderManager.initializeShaders(gl);

	var buffer = new Buffer();

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	shaderManager.useProgram();
	buffer.Bind();

	gl.drawArrays(gl.TRIANGLES, 0, 3);
};