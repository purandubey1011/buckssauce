import * as THREE from 'three';

export const initHeroScene = (canvas, initialColor) => {
  if(!canvas || !window.WebGLRenderingContext || matchMedia('(prefers-reduced-motion:reduce)').matches || innerWidth<700) throw new Error('fallback');
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.z=7;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
  const group=new THREE.Group();scene.add(group);
  const color=new THREE.Color(initialColor);const glass=new THREE.MeshPhysicalMaterial({color:new THREE.Color('#311309'),roughness:.18,metalness:.05,transmission:.15,transparent:true,opacity:.92});
  const body=new THREE.Mesh(new THREE.CylinderGeometry(1.05,.86,3.6,48),glass);body.position.y=-.35;group.add(body);
  const shoulder=new THREE.Mesh(new THREE.SphereGeometry(1.05,48,24,0,Math.PI*2,0,Math.PI/2),glass);shoulder.scale.y=.58;shoulder.position.y=1.45;group.add(shoulder);
  const neck=new THREE.Mesh(new THREE.CylinderGeometry(.43,.5,1.2,40),glass);neck.position.y=2;group.add(neck);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.42,40),new THREE.MeshStandardMaterial({color:'#0b0908',roughness:.45}));cap.position.y=2.76;group.add(cap);
  const uniforms={uColor:{value:color},uTime:{value:0},uProgress:{value:0}};
  const label=new THREE.Mesh(new THREE.CylinderGeometry(1.065,1.065,1.5,64,1,true,0,Math.PI*1.4),new THREE.ShaderMaterial({uniforms,transparent:true,vertexShader:`varying vec2 vUv;uniform float uTime;void main(){vUv=uv;vec3 p=position;p+=normal*sin(uv.y*10.0+uTime)*0.01;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,fragmentShader:`varying vec2 vUv;uniform vec3 uColor;uniform float uProgress;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}void main(){float grain=hash(vUv*120.0)*.12;float edge=smoothstep(.0,.08,vUv.y)*smoothstep(1.,.92,vUv.y);vec3 c=uColor+grain;gl_FragColor=vec4(c,edge*.98);}` ,side:THREE.DoubleSide}));label.position.y=-.45;label.rotation.y=-.7;group.add(label);
  scene.add(new THREE.HemisphereLight('#fff0d4','#3a150b',2.8));const key=new THREE.DirectionalLight('#ffd8a1',5);key.position.set(3,5,5);scene.add(key);
  let targetX=0,targetY=0,raf,visible=true;const onMove=e=>{targetX=(e.clientX/innerWidth-.5)*.45;targetY=(e.clientY/innerHeight-.5)*.2;};addEventListener('pointermove',onMove,{passive:true});
  const resize=()=>{const rect=canvas.getBoundingClientRect();renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();};resize();addEventListener('resize',resize);
  const observer=new IntersectionObserver(([entry])=>visible=entry.isIntersecting,{threshold:.05});observer.observe(canvas);
  const clock=new THREE.Clock();const render=()=>{raf=requestAnimationFrame(render);if(!visible)return;uniforms.uTime.value=clock.getElapsedTime();group.rotation.y+=(targetX-group.rotation.y)*.04;group.rotation.x+=(targetY-group.rotation.x)*.04;group.position.y=Math.sin(uniforms.uTime.value*.7)*.06;renderer.render(scene,camera);};render();
  return {setColor(next){uniforms.uColor.value.set(next);},destroy(){cancelAnimationFrame(raf);observer.disconnect();renderer.dispose();group.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}};
};
