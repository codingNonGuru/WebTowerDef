class Camera
{
    constructor()
    {
        this.worldMatrix = new Float32Array(16)
		this.projMatrix = new Float32Array(16)
        this.viewMatrix = new Float32Array(16)
        
        this.resultMatrix = new Float32Array(16)
        this.finalMatrix = new Float32Array(16)
    }

    get Matrix()
    {
        mat4.identity(this.worldMatrix)
        mat4.lookAt(this.viewMatrix, [8, 8, 8], [0, 0, 0], [0, 0, 1])
		var screenRatio = canvas.clientWidth / canvas.clientHeight
		mat4.perspective(this.projMatrix, glMatrix.toRadian(60.0), screenRatio, 0.1, 100.0)

		mat4.mul(this.resultMatrix, this.projMatrix, this.viewMatrix)

        mat4.mul(this.finalMatrix, this.resultMatrix, this.worldMatrix)
        
        return this.finalMatrix
    }
}