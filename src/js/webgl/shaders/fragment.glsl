varying vec2 vUv;
uniform vec3 uColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){float grain=hash(vUv*120.0)*.12;float edge=smoothstep(.0,.08,vUv.y)*smoothstep(1.,.92,vUv.y);gl_FragColor=vec4(uColor+grain,edge);}
