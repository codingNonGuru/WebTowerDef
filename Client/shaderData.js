var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'uniform mat4 finalMatrix;',
'uniform mat4 viewMatrix;',
'uniform mat4 projMatrix;',
'uniform mat4 worldMatrix;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = finalMatrix * vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');