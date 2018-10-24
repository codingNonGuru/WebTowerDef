class Buffer
{
	constructor()
	{
        var onMeshLoaded = function(meshData) 
        { 
            this.mesh = JSON.parse(meshData);

            UploadMesh(); 
        }

        Utility.loadJson('file://localhost/mesh.json/', onMeshLoaded);
    }
    
    UploadMesh() 
    {
        this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.vertices), gl.STATIC_DRAW);

		var program = shaderManager.getProgram();
		var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
		var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
		
		gl.vertexAttribPointer
		(
			positionAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);

		gl.vertexAttribPointer
		(
			colorAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);

		gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocation);

		gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

	Bind()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	}
}