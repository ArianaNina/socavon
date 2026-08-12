import*as THREE from"three";
import{OrbitControls}from"three/addons/controls/OrbitControls.js";
import{GLTFLoader}from"three/addons/loaders/GLTFLoader.js";
// ESCENA
const scene=new THREE.Scene();
const textureLoader=new THREE.TextureLoader();
scene.background=textureLoader.load("./fon.jpg");
// CÁMARA
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,2.8,10);
// RENDER
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
// MOUSE
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.enableRotate=true;
controls.enableZoom=true;
controls.enablePan=false;
controls.target.set(0,0.6,0);
controls.minPolarAngle=0.5;
controls.maxPolarAngle=Math.PI/2-0.05;
controls.update();
// LUCES
const ambientLight=new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambientLight);
const directionalLight=new THREE.DirectionalLight(0xffffff,3);
directionalLight.position.set(9,18,9);
directionalLight.castShadow=true;
directionalLight.shadow.mapSize.width=2048;
directionalLight.shadow.mapSize.height=2048;
scene.add(directionalLight);
const frontLight=new THREE.PointLight(0xffffff,800,400);
frontLight.position.set(0,8,2);
scene.add(frontLight);
const spotLight=new THREE.SpotLight(0xffffff,800);
spotLight.position.set(0,8,3);
spotLight.angle=Math.PI/4;
spotLight.penumbra=1;
spotLight.castShadow=true;
scene.add(spotLight);
const pointLight=new THREE.PointLight(0x0000ff,1800,800);
pointLight.position.set(-0.5,4,6);
pointLight.castShadow=true;
scene.add(pointLight);
// TEXTURA PISO
const texturaTierra=textureLoader.load("./piso1.jpg");
texturaTierra.wrapS=THREE.RepeatWrapping;
texturaTierra.wrapT=THREE.RepeatWrapping;
texturaTierra.repeat.set(7,7);
texturaTierra.colorSpace=THREE.SRGBColorSpace;
// FORMA PISO
const pisoShape=new THREE.Shape();
pisoShape.moveTo(-3.2,2.55);
pisoShape.lineTo(2.2,2.55);
pisoShape.lineTo(3.2,1.45);
pisoShape.lineTo(3.2,0.60);
pisoShape.lineTo(3.2,-1.45);
pisoShape.lineTo(2.20,-2.60);
pisoShape.lineTo(3.2,-4.45);
pisoShape.lineTo(1.40,-10.50);
pisoShape.lineTo(-2.35,-10.50);
pisoShape.lineTo(-3.20,-2.40);
pisoShape.lineTo(-2.55,-1.50);
pisoShape.lineTo(-3.20,-0.30);
pisoShape.lineTo(-3.20,1.45);
pisoShape.lineTo(-3.20,2.55);
// GEOMETRÍA PISO
const floorGeometry=new THREE.ShapeGeometry(pisoShape);
const posiciones=floorGeometry.attributes.position;
const uvs=floorGeometry.attributes.uv;
for(let i=0;i<posiciones.count;i++){
const x=posiciones.getX(i);
const y=posiciones.getY(i);
const u=((x+3.2)/6.4)*7;
const v=((y+3.2)/13.0)*7;
uvs.setXY(i,u,v);
}
uvs.needsUpdate=true;
// MATERIAL PISO
const floorMaterial=new THREE.MeshBasicMaterial({map:texturaTierra,side:THREE.DoubleSide});
// PISO PRINCIPAL
const floor=new THREE.Mesh(floorGeometry,floorMaterial);
floor.rotation.x=-Math.PI/2;
floor.position.set(0.5,-0.8,0);
scene.add(floor);
// GRADAS
const materialGradas=new THREE.MeshPhongMaterial({color:0xe58a45,shininess:30});
const cantidadGradas=6;
const anchoGradas=2.2;
const profundidadGrada=0.28;
const alturaGrada=0.07;
const centroX=0;
const frentePiso=10.50;
for(let i=0;i<cantidadGradas;i++){
const alto=alturaGrada*(cantidadGradas-i);
const z=frentePiso+i*profundidadGrada+profundidadGrada/2;
const geometriaGrada=new THREE.BoxGeometry(anchoGradas,alto,profundidadGrada);
const grada=new THREE.Mesh(geometriaGrada,materialGradas);
grada.position.set(centroX,-1.2+alto/2,z);
grada.castShadow=true;
grada.receiveShadow=true;
scene.add(grada);
}
// PISOS LATERALES
const materialLateral=new THREE.MeshBasicMaterial({
map:texturaTierra,
side:THREE.DoubleSide
});

const anchoLateral=0.76;
const largoLateral=1.75;
const grosorLateral=0.19;
const inclinacionLateral=0.20;

// IZQUIERDO
const geometriaLateralIzq=new THREE.BoxGeometry(
anchoLateral,
grosorLateral,
largoLateral
);
const lateralIzq=new THREE.Mesh(
geometriaLateralIzq,
materialLateral
);
lateralIzq.position.set(-1.45,-1.00,11.35);
lateralIzq.rotation.x=inclinacionLateral;
lateralIzq.castShadow=true;
lateralIzq.receiveShadow=true;
scene.add(lateralIzq);

// DERECHO
const geometriaLateralDer=new THREE.BoxGeometry(
anchoLateral,
grosorLateral,
largoLateral
);
const lateralDer=new THREE.Mesh(
geometriaLateralDer,
materialLateral
);
lateralDer.position.set(1.45,-1.00,11.35);
lateralDer.rotation.x=inclinacionLateral;
lateralDer.castShadow=true;
lateralDer.receiveShadow=true;
scene.add(lateralDer);

// BARANDAS LATERALES
const materialBarandaLateral=new THREE.MeshPhongMaterial({color:0x808080,shininess:80});
const alturaBarandaLateral=0.45;
const grosorBarandaLateral=0.035;
const separacionBaranda=0.25;
const inclinacionBaranda=0.20;
const baseBaranda=-1.00;

// IZQUIERDA
const xIzq=-1.83;
const largoBaranda=largoLateral;

const pasamanosIzq=new THREE.Mesh(
new THREE.BoxGeometry(grosorBarandaLateral,grosorBarandaLateral,largoBaranda),
materialBarandaLateral
);
pasamanosIzq.position.set(xIzq,baseBaranda+alturaBarandaLateral,11.35);
pasamanosIzq.rotation.x=inclinacionBaranda;
scene.add(pasamanosIzq);

const barraInferiorIzq=new THREE.Mesh(
new THREE.BoxGeometry(grosorBarandaLateral,grosorBarandaLateral,largoBaranda),
materialBarandaLateral
);
barraInferiorIzq.position.set(xIzq,baseBaranda+0.05,11.35);
barraInferiorIzq.rotation.x=inclinacionBaranda;
scene.add(barraInferiorIzq);

const cantidadPostesIzq=Math.ceil(largoBaranda/separacionBaranda);

for(let i=0;i<=cantidadPostesIzq;i++){
const t=i/cantidadPostesIzq;
const z=11.35-largoBaranda/2+largoBaranda*t;
const y=baseBaranda-Math.sin(inclinacionBaranda)*(z-11.35);

const posteIzq=new THREE.Mesh(
new THREE.BoxGeometry(grosorBarandaLateral,alturaBarandaLateral,grosorBarandaLateral),
materialBarandaLateral
);
posteIzq.position.set(xIzq,y+alturaBarandaLateral/2,z);
scene.add(posteIzq);
}

// DERECHA
const xDer=1.83;

const pasamanosDer=new THREE.Mesh(
new THREE.BoxGeometry(grosorBarandaLateral,grosorBarandaLateral,largoBaranda),
materialBarandaLateral
);
pasamanosDer.position.set(xDer,baseBaranda+alturaBarandaLateral,11.35);
pasamanosDer.rotation.x=inclinacionBaranda;
scene.add(pasamanosDer);

const barraInferiorDer=new THREE.Mesh(
new THREE.BoxGeometry(grosorBarandaLateral,grosorBarandaLateral,largoBaranda),
materialBarandaLateral
);
barraInferiorDer.position.set(xDer,baseBaranda+0.05,11.35);
barraInferiorDer.rotation.x=inclinacionBaranda;
scene.add(barraInferiorDer);

const cantidadPostesDer=Math.ceil(largoBaranda/separacionBaranda);

for(let i=0;i<=cantidadPostesDer;i++){
const t=i/cantidadPostesDer;
const z=11.35-largoBaranda/2+largoBaranda*t;
const y=baseBaranda-Math.sin(inclinacionBaranda)*(z-11.35);

const posteDer=new THREE.Mesh(
new THREE.BoxGeometry(grosorBarandaLateral,alturaBarandaLateral,grosorBarandaLateral),
materialBarandaLateral
);

posteDer.position.set(
xDer,
y+alturaBarandaLateral/2,
z
);

scene.add(posteDer);
}

// PISO ABAJO
const pisoAbajo=new THREE.Shape();
pisoAbajo.moveTo(-1.83,-12.18);
pisoAbajo.lineTo(1.83,-12.18);
pisoAbajo.lineTo(1.45,-18.00);
pisoAbajo.lineTo(-1.45,-18.00);
pisoAbajo.closePath();
const pisoAbajoGeometry=new THREE.ShapeGeometry(pisoAbajo);
const pisoAbajoMesh=new THREE.Mesh(pisoAbajoGeometry,floorMaterial);
pisoAbajoMesh.rotation.x=-Math.PI/2;
pisoAbajoMesh.position.set(0,-1.20,0);
scene.add(pisoAbajoMesh);
// DISEÑO VERDE
const texturaDiseño=textureLoader.load("./pasto.jpg");
texturaDiseño.wrapS=THREE.RepeatWrapping;
texturaDiseño.wrapT=THREE.RepeatWrapping;
texturaDiseño.repeat.set(1,1);
texturaDiseño.colorSpace=THREE.SRGBColorSpace;

const materialDiseño=new THREE.MeshBasicMaterial({
map:texturaDiseño,
side:THREE.DoubleSide
});

// FIGURA VERDE
function crearFiguraVerde(x,z,ancho,largo){
const forma=new THREE.Shape();
const r=ancho/2;
forma.moveTo(x+r,z-largo/2+r);
forma.lineTo(x+r,z+largo/2-r);
forma.absellipse(x,z+largo/2-r,r,r,0,Math.PI,false,0);
forma.lineTo(x-r,z-largo/2+r);
forma.absellipse(x,z-largo/2+r,r,r,Math.PI,Math.PI*2,false,0);
const geometria=new THREE.ShapeGeometry(forma);

const borde=new THREE.Mesh(
new THREE.ShapeGeometry(forma),
new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide})
);
const figura=new THREE.Mesh(geometria,materialDiseño);
figura.rotation.x=-Math.PI/2;
figura.position.y=-1.19;
scene.add(figura);
}

// FIGURA VERDE 1
crearFiguraVerde(0, -14.2, 0.45, 1.55);

// FIGURA VERDE 2
crearFiguraVerde(0, -16.1, 0.45, 1.55);

// LÍMITES
const puntosPiso=pisoShape.getPoints();
const puntosPisoAbajo=pisoAbajo.getPoints();
function estaDentroDelPiso(x,z){
const px=x-floor.position.x;
const pz=-z;
let dentro=false;
for(let i=0,j=puntosPiso.length-1;i<puntosPiso.length;j=i++){
const xi=puntosPiso[i].x;
const yi=puntosPiso[i].y;
const xj=puntosPiso[j].x;
const yj=puntosPiso[j].y;
const intersecta=((yi>pz)!==(yj>pz))&&(px<(xj-xi)*(pz-yi)/(yj-yi)+xi);
if(intersecta)dentro=!dentro;
}
return dentro;
}
// BARANDAS
const materialBaranda=new THREE.MeshPhongMaterial({color:0x808080,shininess:80});
const alturaBaranda=0.45;
const grosorBaranda=0.035;
const separacion=0.25;
// CREAR BARANDA
function crearBaranda(nombre,x1,z1,x2,z2,yBase){
const dx=x2-x1;
const dz=z2-z1;
const largo=Math.sqrt(dx*dx+dz*dz);
const angulo=Math.atan2(dz,dx);
const pasamanos=new THREE.Mesh(new THREE.BoxGeometry(largo,grosorBaranda,grosorBaranda),materialBaranda);
pasamanos.name=nombre+"_pasamanos";
pasamanos.position.set((x1+x2)/2,yBase+alturaBaranda,(z1+z2)/2);
pasamanos.rotation.y=-angulo;
scene.add(pasamanos);
const barraInferior=new THREE.Mesh(new THREE.BoxGeometry(largo,grosorBaranda,grosorBaranda),materialBaranda);
barraInferior.name=nombre+"_barraInferior";
barraInferior.position.set((x1+x2)/2,yBase+0.06,(z1+z2)/2);
barraInferior.rotation.y=-angulo;
scene.add(barraInferior);
const cantidad=Math.max(1,Math.ceil(largo/separacion));
for(let i=0;i<=cantidad;i++){
const t=i/cantidad;
const x=x1+dx*t;
const z=z1+dz*t;
const poste=new THREE.Mesh(new THREE.BoxGeometry(grosorBaranda,alturaBaranda,grosorBaranda),materialBaranda);
poste.name=nombre+"_poste_"+(i+1);
poste.position.set(x,yBase+alturaBaranda/2,z);
scene.add(poste);
}
}
// CONTORNO SIN PARTE DE ATRAS
crearBaranda("barandaNueva01",-2.7,-2.55,2.7,-2.55,-0.8);
// BARANDA 01
crearBaranda("barandaContorno01",2.7,-2.55,3.7,-1.45,-0.8);
// BARANDA 02
crearBaranda("barandaContorno02",3.7,-1.45,3.7,-0.6,-0.8);
// BARANDA 03
crearBaranda("barandaContorno03",3.7,-0.6,3.7,1.45,-0.8);
// BARANDA 04
crearBaranda("barandaContorno04",3.7,1.45,2.7,2.6,-0.8);
// BARANDA 05
crearBaranda("barandaContorno05",2.7,2.6,3.7,4.45,-0.8);
// BARANDA 06
crearBaranda("barandaContorno06",3.7,4.45,1.9,10.5,-0.8);
// BARANDA 08
crearBaranda("barandaContorno08",-1.88,10.5,-2.7,2.4,-0.8);
// BARANDA 09
crearBaranda("barandaContorno09",-2.7,2.4,-2.05,1.5,-0.8);
// BARANDA 10
crearBaranda("barandaContorno10",-2.05,1.5,-2.7,0.3,-0.8);
// BARANDA 11
crearBaranda("barandaContorno11",-2.7,0.3,-2.7,-1.45,-0.8);
// BARANDA 12
crearBaranda("barandaContorno12",-2.7,-1.45,-2.7,-2.55,-0.8);

// BARANDAS PISO ABAJO
// LADO IZQUIERDO
crearBaranda("barandaPisoAbajo01",-1.83,12.18,-1.45,18.00,-1.2);
// LADO DERECHO
crearBaranda("barandaPisoAbajo02",1.83,12.18,1.45,18.00,-1.2);
// FRENTE
crearBaranda("barandaPisoAbajo03",-1.45,18.00,1.45,18.00,-1.2);

// CAMINO
const caminoShape=new THREE.Shape();
caminoShape.moveTo(-0.3,-0.5);
caminoShape.lineTo(-0.5,-0.3);
caminoShape.lineTo(-0.5,0.5);
caminoShape.lineTo(-1.0,1.0);
caminoShape.lineTo(0.0,1.5);
caminoShape.lineTo(1.0,1.0);
caminoShape.lineTo(0.5,0.5);
caminoShape.lineTo(0.5,-0.3);
caminoShape.lineTo(0.3,-0.5);
caminoShape.lineTo(-0.3,-0.5);
const caminoGeometry=new THREE.ShapeGeometry(caminoShape);
const texturaPasto=textureLoader.load("./pasto.jpg");
texturaPasto.wrapS=THREE.RepeatWrapping;
texturaPasto.wrapT=THREE.RepeatWrapping;
texturaPasto.repeat.set(1,1);
texturaPasto.colorSpace=THREE.SRGBColorSpace;
const caminoMaterial=new THREE.MeshBasicMaterial({map:texturaPasto,side:THREE.DoubleSide});
const caminoVerde=new THREE.Mesh(caminoGeometry,caminoMaterial);
caminoVerde.rotation.x=-Math.PI/2;
caminoVerde.scale.set(1.4,1.4,1.4);
caminoVerde.position.set(-0.5,-0.7,2);
scene.add(caminoVerde);
// TEXTURAS JARDÍN
const loaderJardin=new THREE.TextureLoader();
const texPastoJardin=loaderJardin.load("./pasto.jpg");
const texPisoJardin=loaderJardin.load("./piso.jpg");
texPastoJardin.wrapS=THREE.ClampToEdgeWrapping;
texPastoJardin.wrapT=THREE.ClampToEdgeWrapping;
texPastoJardin.colorSpace=THREE.SRGBColorSpace;
texPisoJardin.wrapS=THREE.ClampToEdgeWrapping;
texPisoJardin.wrapT=THREE.ClampToEdgeWrapping;
texPisoJardin.colorSpace=THREE.SRGBColorSpace;
const alturaJardin=0.03;
// JARDÍN
const jardinShape=new THREE.Shape();
jardinShape.absellipse(0,0,1.25,1.25,0,Math.PI*2,false,0);
const hoyo=new THREE.Path();
hoyo.absellipse(0,0,0.45,0.45,0,Math.PI*2,false,0);
jardinShape.holes.push(hoyo);
const jardinGeometry=new THREE.ExtrudeGeometry(jardinShape,{depth:alturaJardin,bevelEnabled:false});
const jardinMaterial=new THREE.MeshBasicMaterial({map:texPastoJardin,side:THREE.DoubleSide});
const jardin=new THREE.Mesh(jardinGeometry,jardinMaterial);
jardin.rotation.x=-Math.PI/2;
jardin.position.set(2.3,-0.70,0.5);
jardin.scale.set(0.65,0.65,0.65);
scene.add(jardin);
// BORDE JARDÍN
const jardinBordeShape=new THREE.Shape();
jardinBordeShape.absellipse(0,0,1.34,1.34,0,Math.PI*2,false,0);
const jardinBordeHoyo=new THREE.Path();
jardinBordeHoyo.absellipse(0,0,0.49,0.49,0,Math.PI*2,false,0);
jardinBordeShape.holes.push(jardinBordeHoyo);
const jardinBordeGeometry=new THREE.ExtrudeGeometry(jardinBordeShape,{depth:alturaJardin,bevelEnabled:false});
const jardinBordeMaterial=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
const jardinBorde=new THREE.Mesh(jardinBordeGeometry,jardinBordeMaterial);
jardinBorde.rotation.x=-Math.PI/2;
jardinBorde.position.set(2.3,-0.705,0.5);
jardinBorde.scale.set(0.65,0.65,0.65);
scene.add(jardinBorde);
// HOJA SUPERIOR
const hojaSup=new THREE.Shape();
hojaSup.moveTo(0,0);
hojaSup.quadraticCurveTo(-0.45,0.15,-0.85,0.55);
hojaSup.quadraticCurveTo(-1.10,0.80,-1.15,1.05);
hojaSup.quadraticCurveTo(-0.75,1.00,-0.35,0.85);
hojaSup.quadraticCurveTo(0.15,0.65,0.55,0.30);
hojaSup.quadraticCurveTo(0.30,0.10,0,0);
hojaSup.closePath();
// BORDE HOJA
const hojaSupBordeGeometry=new THREE.ExtrudeGeometry(hojaSup,{depth:alturaJardin,bevelEnabled:false});
const hojaSupBordeMaterial=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
const hojaSupBordeMesh=new THREE.Mesh(hojaSupBordeGeometry,hojaSupBordeMaterial);
hojaSupBordeMesh.rotation.x=-Math.PI/2;
hojaSupBordeMesh.position.set(2.3,-0.705,2.25);
hojaSupBordeMesh.scale.set(0.93,0.93,0.93);
scene.add(hojaSupBordeMesh);
// HOJA VERDE
const hojaSupGeometry=new THREE.ExtrudeGeometry(hojaSup,{depth:alturaJardin,bevelEnabled:false});
const hojaSupMaterial=new THREE.MeshBasicMaterial({map:texPastoJardin,side:THREE.DoubleSide});
const hojaSupMesh=new THREE.Mesh(hojaSupGeometry,hojaSupMaterial);
hojaSupMesh.rotation.x=-Math.PI/2;
hojaSupMesh.position.set(2.3,-0.70,2.25);
hojaSupMesh.scale.set(0.85,0.85,0.85);
scene.add(hojaSupMesh);
// HOJA INFERIOR
const hojaInf=new THREE.Shape();
hojaInf.moveTo(0,0);
hojaInf.quadraticCurveTo(-0.45,-0.15,-0.85,-0.55);
hojaInf.quadraticCurveTo(-1.10,-0.80,-1.15,-1.05);
hojaInf.quadraticCurveTo(-0.75,-1.00,-0.35,-0.85);
hojaInf.quadraticCurveTo(0.15,-0.65,0.55,-0.30);
hojaInf.quadraticCurveTo(0.30,-0.10,0,0);
hojaInf.closePath();
// BORDE HOJA
const hojaInfBordeGeometry=new THREE.ExtrudeGeometry(hojaInf,{depth:alturaJardin,bevelEnabled:false});
const hojaInfBordeMaterial=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
const hojaInfBordeMesh=new THREE.Mesh(hojaInfBordeGeometry,hojaInfBordeMaterial);
hojaInfBordeMesh.rotation.x=-Math.PI/2;
hojaInfBordeMesh.position.set(2.3,-0.705,-1.25);
hojaInfBordeMesh.scale.set(0.93,0.93,0.93);
scene.add(hojaInfBordeMesh);
// HOJA VERDE
const hojaInfGeometry=new THREE.ExtrudeGeometry(hojaInf,{depth:alturaJardin,bevelEnabled:false});
const hojaInfMaterial=new THREE.MeshBasicMaterial({map:texPastoJardin,side:THREE.DoubleSide});
const hojaInfMesh=new THREE.Mesh(hojaInfGeometry,hojaInfMaterial);
hojaInfMesh.rotation.x=-Math.PI/2;
hojaInfMesh.position.set(2.3,-0.70,-1.25);
hojaInfMesh.scale.set(0.85,0.85,0.85);
scene.add(hojaInfMesh);
// ARO
const circuloBordeGeometry=new THREE.RingGeometry(0.45,0.55,64);
const circuloBordeMaterial=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
const circuloBorde=new THREE.Mesh(circuloBordeGeometry,circuloBordeMaterial);
circuloBorde.rotation.x=-Math.PI/2;
circuloBorde.position.set(2.3,-0.705,0.5);
scene.add(circuloBorde);
// CÍRCULO
const circuloGeometry=new THREE.CircleGeometry(0.45,64);
const circuloMaterial=new THREE.MeshBasicMaterial({map:texPisoJardin,side:THREE.DoubleSide});
const circulo=new THREE.Mesh(circuloGeometry,circuloMaterial);
circulo.rotation.x=-Math.PI/2;
circulo.position.set(2.3,-0.71,0.5);
scene.add(circulo);
// PERSONAJE
let personaje;
let mixerPersonaje;
const teclas={};
const velocidadPersonaje=0.025;
window.addEventListener("keydown",e=>{
teclas[e.key.toLowerCase()]=true;
});
window.addEventListener("keyup",e=>{
teclas[e.key.toLowerCase()]=false;
});
const loader=new GLTFLoader();
// VIRGEN
function cargarVirgen(nombre){
loader.load("./"+nombre,function(gltf){
const model=gltf.scene;
model.scale.set(3.2,3.2,3.2);
model.position.set(-0.5,1.5,0);
model.rotation.y=THREE.MathUtils.degToRad(-90);
model.traverse(function(obj){
if(obj.isMesh){
let textura=null;
if(obj.material&&!Array.isArray(obj.material))textura=obj.material.map||null;
obj.material=new THREE.MeshPhongMaterial({map:textura,color:0xffffff,shininess:200});
obj.castShadow=true;
obj.receiveShadow=true;
}
});
scene.add(model);
},undefined,function(){
if(nombre==="virgin.glb"){
cargarVirgen("virgen.glb");
}else{
console.error("No se encontró virgin.glb ni virgen.glb");
}
});
}
cargarVirgen("virgin.glb");
// HORMIGA
loader.load("./hormiga.glb",function(gltf){
personaje=gltf.scene;
personaje.scale.set(0.55,0.55,0.55);
personaje.position.set(-1.2,-0.8,1.2);
personaje.rotation.y=0;
personaje.traverse(function(obj){
if(obj.isMesh){
obj.castShadow=true;
obj.receiveShadow=true;
}
});
if(gltf.animations.length>0){
mixerPersonaje=new THREE.AnimationMixer(personaje);
const caminar=mixerPersonaje.clipAction(gltf.animations[0]);
caminar.play();
caminar.timeScale=0.5;
}
scene.add(personaje);
},undefined,function(error){
console.error("Error cargando hormiga:",error);
});
// MOVIMIENTO
const direccionCamara=new THREE.Vector3();
const direccionDerecha=new THREE.Vector3();
const movimiento=new THREE.Vector3();
function moverPersonaje(){
if(!personaje)return;
let adelante=0;
let derecha=0;
if(teclas["w"]||teclas["arrowup"])adelante=1;
if(teclas["s"]||teclas["arrowdown"])adelante=-1;
if(teclas["a"]||teclas["arrowleft"])derecha=-1;
if(teclas["d"]||teclas["arrowright"])derecha=1;
if(adelante===0&&derecha===0)return;
camera.getWorldDirection(direccionCamara);
direccionCamara.y=0;
direccionCamara.normalize();
direccionDerecha.set(direccionCamara.z,0,-direccionCamara.x);
direccionDerecha.normalize();
movimiento.set(0,0,0);
movimiento.addScaledVector(direccionCamara,adelante);
movimiento.addScaledVector(direccionDerecha,derecha);
if(movimiento.lengthSq()>0){
movimiento.normalize();
movimiento.multiplyScalar(velocidadPersonaje);
}
const nuevaX=personaje.position.x+movimiento.x;
const nuevaZ=personaje.position.z+movimiento.z;
if(estaDentroDelPiso(nuevaX,nuevaZ)){
personaje.position.x=nuevaX;
personaje.position.z=nuevaZ;
}
if(movimiento.lengthSq()>0){
personaje.rotation.y=Math.atan2(movimiento.x,movimiento.z);
}
}
// ANIMACIÓN
function animate(){
requestAnimationFrame(animate);
moverPersonaje();
if(mixerPersonaje)mixerPersonaje.update(0.008);
const t=Date.now()*0.001;
pointLight.position.x=Math.sin(t)*6;
pointLight.position.z=Math.cos(t)*6;
pointLight.position.y=4;
controls.update();
renderer.render(scene,camera);
}
animate();
// REDIMENSIONAR
window.addEventListener("resize",function(){
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});