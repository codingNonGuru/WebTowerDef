var shaderManager = 
{
	program : null, 

	gl : null,
	
	initializeShaders : function(canvasContext)
	{
		gl = canvasContext;

		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		gl.shaderSource(vertexShader, vertexShaderText);
		gl.shaderSource(fragmentShader, fragmentShaderText);

		gl.compileShader(vertexShader);
		if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
			console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
			return;
		}

		gl.compileShader(fragmentShader);
		if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
			console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
			return;
		}

		program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('ERROR linking program!', gl.getProgramInfoLog(program));
			return;
		}
		gl.validateProgram(program);
		if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
			console.error('ERROR validating program!', gl.getProgramInfoLog(program));
			return;
		}
	},

	useProgram : function()
	{
		gl.useProgram(program);
	},

	getProgram : function()
	{
		return program;
	}
}