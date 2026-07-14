varying vec2 vUv;
uniform float uTime;
void main(){vUv=uv;vec3 p=position;p+=normal*sin(uv.y*10.0+uTime)*0.01;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}
