import*as THREE from"three";
import{OrbitControls}from"three/addons/controls/OrbitControls.js";
import{GLTFLoader}from"three/addons/loaders/GLTFLoader.js";

// =================================================
// ESCENA
// =================================================

const scene=new THREE.Scene();

const textureLoader=new THREE.TextureLoader();

scene.background=
textureLoader.load("./fon.jpg");



// =================================================
// CÁMARA
// =================================================

const camera=
new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
1000
);

// Cámara más cerca desde el inicio
camera.position.set(
0,
1.20,
7
);

// =================================================
// RENDER
// =================================================

const renderer=
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
2
)
);

renderer.shadowMap.enabled=true;

renderer.shadowMap.type=
THREE.PCFSoftShadowMap;

document.body.appendChild(
renderer.domElement
);

// =================================================
// MANITO
// =================================================

renderer.domElement.style.cursor="grab";

renderer.domElement.addEventListener(
"pointerdown",
function(){

renderer.domElement.style.cursor=
"grabbing";

});

renderer.domElement.addEventListener(
"pointerup",
function(){

renderer.domElement.style.cursor=
"grab";

});

// =================================================
// CONTROLES DE CÁMARA
// =================================================

const controls=
new OrbitControls(
camera,
renderer.domElement
);

controls.enableDamping=true;

// Puedes girar la cámara
controls.enableRotate=true;

// Puedes hacer zoom
controls.enableZoom=true;

// No mover lateralmente
controls.enablePan=false;

// NO girar automáticamente
controls.autoRotate=false;

// Límites verticales
controls.minPolarAngle=0.35;

controls.maxPolarAngle=
Math.PI/2-0.05;

// Punto inicial
controls.target.set(
0,
0.3,
0.2
);

controls.update();

// =================================================
// LUCES
// =================================================

const ambientLight=
new THREE.AmbientLight(
0xffffff,
0.6
);

scene.add(ambientLight);

const directionalLight=
new THREE.DirectionalLight(
0xffffff,
3
);

directionalLight.position.set(
9,
18,
9
);

directionalLight.castShadow=true;

directionalLight.shadow.mapSize.width=
2048;

directionalLight.shadow.mapSize.height=
2048;

scene.add(directionalLight);

const frontLight=
new THREE.PointLight(
0xffffff,
800,
400
);

frontLight.position.set(
0,
8,
2
);

scene.add(frontLight);

const spotLight=
new THREE.SpotLight(
0xffffff,
800
);

spotLight.position.set(
0,
8,
3
);

spotLight.angle=
Math.PI/4;

spotLight.penumbra=1;

spotLight.castShadow=true;

scene.add(spotLight);

const pointLight=
new THREE.PointLight(
0x0000ff,
1800,
800
);

pointLight.position.set(
-0.5,
4,
6
);

pointLight.castShadow=true;

scene.add(pointLight);

// =================================================
// TEXTURA PISO
// =================================================

const texturaTierra=
textureLoader.load(
"./piso1.jpg"
);

texturaTierra.wrapS=
THREE.RepeatWrapping;

texturaTierra.wrapT=
THREE.RepeatWrapping;

texturaTierra.repeat.set(
7,
7
);

texturaTierra.colorSpace=
THREE.SRGBColorSpace;

// =================================================
// FORMA PISO
// =================================================

const pisoShape=
new THREE.Shape();

pisoShape.moveTo(
-3.2,
2.55
);

pisoShape.lineTo(
2.2,
2.55
);

pisoShape.lineTo(
3.2,
1.45
);

pisoShape.lineTo(
3.2,
0.60
);

pisoShape.lineTo(
3.2,
-1.45
);

pisoShape.lineTo(
2.20,
-2.60
);

pisoShape.lineTo(
3.2,
-4.45
);

pisoShape.lineTo(
1.40,
-10.50
);

pisoShape.lineTo(
-2.35,
-10.50
);

pisoShape.lineTo(
-3.20,
-2.40
);

pisoShape.lineTo(
-2.55,
-1.50
);

pisoShape.lineTo(
-3.20,
-0.30
);

pisoShape.lineTo(
-3.20,
1.45
);

pisoShape.lineTo(
-3.20,
2.55
);

// =================================================
// GEOMETRÍA PISO
// =================================================

const floorGeometry=
new THREE.ShapeGeometry(
pisoShape
);

const posiciones=
floorGeometry.attributes.position;

const uvs=
floorGeometry.attributes.uv;

for(
let i=0;
i<posiciones.count;
i++
){

const x=
posiciones.getX(i);

const y=
posiciones.getY(i);

const u=
((x+3.2)/6.4)*7;

const v=
((y+3.2)/13.0)*7;

uvs.setXY(
i,
u,
v
);

}

uvs.needsUpdate=true;

// =================================================
// MATERIAL PISO
// =================================================

const floorMaterial=
new THREE.MeshBasicMaterial({
map:texturaTierra,
side:THREE.DoubleSide
});

// =================================================
// PISO PRINCIPAL
// =================================================

const floor=
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x=
-Math.PI/2;

floor.position.set(
0.5,
-0.8,
0
);

floor.name=
"PISO_PRINCIPAL";

scene.add(floor);

// =================================================
// GRADAS
// =================================================

const materialGradas=
new THREE.MeshPhongMaterial({
color:0xe58a45,
shininess:30
});

const cantidadGradas=6;

const anchoGradas=2.2;

const profundidadGrada=0.28;

const alturaGrada=0.07;

const centroX=0;

const frentePiso=10.50;

for(
let i=0;
i<cantidadGradas;
i++
){

const alto=
alturaGrada*
(cantidadGradas-i);

const z=
frentePiso+
i*profundidadGrada+
profundidadGrada/2;

const geometriaGrada=
new THREE.BoxGeometry(
anchoGradas,
alto,
profundidadGrada
);

const grada=
new THREE.Mesh(
geometriaGrada,
materialGradas
);

grada.position.set(
centroX,
-1.2+alto/2,
z
);

grada.castShadow=true;

grada.receiveShadow=true;

grada.name=
"GRADA_"+i;

scene.add(grada);

}

// =================================================
// PISOS LATERALES
// =================================================

const materialLateral=
new THREE.MeshBasicMaterial({
map:texturaTierra,
side:THREE.DoubleSide
});

const anchoLateral=0.76;

const largoLateral=1.75;

const grosorLateral=0.19;

const inclinacionLateral=0.20;

// IZQUIERDO

const geometriaLateralIzq=
new THREE.BoxGeometry(
anchoLateral,
grosorLateral,
largoLateral
);

const lateralIzq=
new THREE.Mesh(
geometriaLateralIzq,
materialLateral
);

lateralIzq.position.set(
-1.45,
-1.00,
11.35
);

lateralIzq.rotation.x=
inclinacionLateral;

lateralIzq.castShadow=true;

lateralIzq.receiveShadow=true;

scene.add(lateralIzq);

// DERECHO

const geometriaLateralDer=
new THREE.BoxGeometry(
anchoLateral,
grosorLateral,
largoLateral
);

const lateralDer=
new THREE.Mesh(
geometriaLateralDer,
materialLateral
);

lateralDer.position.set(
1.45,
-1.00,
11.35
);

lateralDer.rotation.x=
inclinacionLateral;

lateralDer.castShadow=true;

lateralDer.receiveShadow=true;

scene.add(lateralDer);

// =================================================
// BARANDAS LATERALES
// =================================================

const materialBarandaLateral=
new THREE.MeshPhongMaterial({
color:0x808080,
shininess:80
});

const alturaBarandaLateral=0.45;

const grosorBarandaLateral=0.035;

const separacionBaranda=0.25;

const inclinacionBaranda=0.20;

const baseBaranda=-1.00;

// IZQUIERDA

const xIzq=-1.83;

const largoBaranda=largoLateral;

const pasamanosIzq=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBarandaLateral,
grosorBarandaLateral,
largoBaranda
),
materialBarandaLateral
);

pasamanosIzq.position.set(
xIzq,
baseBaranda+
alturaBarandaLateral,
11.35
);

pasamanosIzq.rotation.x=
inclinacionBaranda;

scene.add(pasamanosIzq);

const barraInferiorIzq=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBarandaLateral,
grosorBarandaLateral,
largoBaranda
),
materialBarandaLateral
);

barraInferiorIzq.position.set(
xIzq,
baseBaranda+0.05,
11.35
);

barraInferiorIzq.rotation.x=
inclinacionBaranda;

scene.add(barraInferiorIzq);

const cantidadPostesIzq=
Math.ceil(
largoBaranda/
separacionBaranda
);

for(
let i=0;
i<=cantidadPostesIzq;
i++
){

const t=
i/cantidadPostesIzq;

const z=
11.35-
largoBaranda/2+
largoBaranda*t;

const y=
baseBaranda-
Math.sin(
inclinacionBaranda
)*
(z-11.35);

const posteIzq=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBarandaLateral,
alturaBarandaLateral,
grosorBarandaLateral
),
materialBarandaLateral
);

posteIzq.position.set(
xIzq,
y+
alturaBarandaLateral/2,
z
);

scene.add(posteIzq);

}

// DERECHA

const xDer=1.83;

const pasamanosDer=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBarandaLateral,
grosorBarandaLateral,
largoBaranda
),
materialBarandaLateral
);

pasamanosDer.position.set(
xDer,
baseBaranda+
alturaBarandaLateral,
11.35
);

pasamanosDer.rotation.x=
inclinacionBaranda;

scene.add(pasamanosDer);

const barraInferiorDer=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBarandaLateral,
grosorBarandaLateral,
largoBaranda
),
materialBarandaLateral
);

barraInferiorDer.position.set(
xDer,
baseBaranda+0.05,
11.35
);

barraInferiorDer.rotation.x=
inclinacionBaranda;

scene.add(barraInferiorDer);

const cantidadPostesDer=
Math.ceil(
largoBaranda/
separacionBaranda
);

for(
let i=0;
i<=cantidadPostesDer;
i++
){

const t=
i/cantidadPostesDer;

const z=
11.35-
largoBaranda/2+
largoBaranda*t;

const y=
baseBaranda-
Math.sin(
inclinacionBaranda
)*
(z-11.35);

const posteDer=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBarandaLateral,
alturaBarandaLateral,
grosorBarandaLateral
),
materialBarandaLateral
);

posteDer.position.set(
xDer,
y+
alturaBarandaLateral/2,
z
);

scene.add(posteDer);

}

// =================================================
// PISO ABAJO
// =================================================

const pisoAbajo=
new THREE.Shape();

pisoAbajo.moveTo(
-1.83,
-12.18
);

pisoAbajo.lineTo(
1.83,
-12.18
);

pisoAbajo.lineTo(
1.45,
-18.00
);

pisoAbajo.lineTo(
-1.45,
-18.00
);

pisoAbajo.closePath();

const pisoAbajoGeometry=
new THREE.ShapeGeometry(
pisoAbajo
);

const pisoAbajoMesh=
new THREE.Mesh(
pisoAbajoGeometry,
floorMaterial
);

pisoAbajoMesh.rotation.x=
-Math.PI/2;

pisoAbajoMesh.position.set(
0,
-1.20,
0
);

pisoAbajoMesh.name=
"PISO_ABAJO";

scene.add(pisoAbajoMesh);

// =================================================
// DISEÑO VERDE
// =================================================

const texturaDiseño=
textureLoader.load(
"./pasto.jpg"
);

texturaDiseño.wrapS=
THREE.RepeatWrapping;

texturaDiseño.wrapT=
THREE.RepeatWrapping;

texturaDiseño.repeat.set(
1,
1
);

texturaDiseño.colorSpace=
THREE.SRGBColorSpace;

const materialDiseño=
new THREE.MeshBasicMaterial({
map:texturaDiseño,
side:THREE.DoubleSide
});

// =================================================
// FIGURA VERDE
// =================================================

function crearFiguraVerde(
x,
z,
ancho,
largo
){

const forma=
new THREE.Shape();

const r=
ancho/2;

forma.moveTo(
x+r,
z-largo/2+r
);

forma.lineTo(
x+r,
z+largo/2-r
);

forma.absellipse(
x,
z+largo/2-r,
r,
r,
0,
Math.PI,
false,
0
);

forma.lineTo(
x-r,
z-largo/2+r
);

forma.absellipse(
x,
z-largo/2+r,
r,
r,
Math.PI,
Math.PI*2,
false,
0
);

const geometria=
new THREE.ShapeGeometry(
forma
);

const borde=
new THREE.Mesh(
new THREE.ShapeGeometry(
forma
),
new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide
})
);

borde.rotation.x=
-Math.PI/2;

borde.position.y=
-1.19;

scene.add(borde);

const figura=
new THREE.Mesh(
geometria,
materialDiseño
);

figura.rotation.x=
-Math.PI/2;

figura.position.y=
-1.17;

scene.add(figura);

return figura;

}

// FIGURAS

crearFiguraVerde(
0,
-14.2,
0.45,
1.55
);

crearFiguraVerde(
0,
-16.1,
0.45,
1.55
);

// =================================================
// LÍMITES
// =================================================

const puntosPiso=
pisoShape.getPoints();

const puntosPisoAbajo=
pisoAbajo.getPoints();

// =================================================
// COMPROBAR PISO PRINCIPAL
// =================================================

function estaDentroDelPiso(
x,
z
){

const px=
x-floor.position.x;

const pz=
-z;

let dentro=false;

for(
let i=0,
j=puntosPiso.length-1;
i<puntosPiso.length;
j=i++
){

const xi=
puntosPiso[i].x;

const yi=
puntosPiso[i].y;

const xj=
puntosPiso[j].x;

const yj=
puntosPiso[j].y;

const intersecta=
((yi>pz)!==(yj>pz))&&
(px<
(xj-xi)*
(pz-yi)/
(yj-yi)+xi
);

if(intersecta){

dentro=!dentro;

}

}

return dentro;

}

// =================================================
// COMPROBAR PISO ABAJO
// =================================================

function estaDentroPisoAbajo(
x,
z
){

const px=x;

const pz=z;

return(
px>=-1.83&&
px<=1.83&&
pz>=12.18&&
pz<=18.00
);

}

// =================================================
// ZONA CAMINABLE
// =================================================

function estaEnZonaCaminable(
x,
z
){

// Piso de arriba

if(
estaDentroDelPiso(
x,
z
)
){

return true;

}

// Gradas

if(
x>=-1.1&&
x<=1.1&&
z>=10.40&&
z<=12.25
){

return true;

}

// Piso abajo

if(
estaDentroPisoAbajo(
x,
z
)
){

return true;

}

return false;

}

// =================================================
// BARANDAS
// =================================================

const materialBaranda=
new THREE.MeshPhongMaterial({
color:0x808080,
shininess:80
});

const alturaBaranda=0.45;

const grosorBaranda=0.035;

const separacion=0.25;

// =================================================
// CREAR BARANDA
// =================================================

function crearBaranda(
nombre,
x1,z1,
x2,z2,
yBase
){

const dx=
x2-x1;

const dz=
z2-z1;

const largo=
Math.sqrt(
dx*dx+
dz*dz
);

const angulo=
Math.atan2(
dz,
dx
);

const pasamanos=
new THREE.Mesh(
new THREE.BoxGeometry(
largo,
grosorBaranda,
grosorBaranda
),
materialBaranda
);

pasamanos.name=
nombre+"_pasamanos";

pasamanos.position.set(
(x1+x2)/2,
yBase+alturaBaranda,
(z1+z2)/2
);

pasamanos.rotation.y=
-angulo;

scene.add(
pasamanos
);

const barraInferior=
new THREE.Mesh(
new THREE.BoxGeometry(
largo,
grosorBaranda,
grosorBaranda
),
materialBaranda
);

barraInferior.name=
nombre+"_barraInferior";

barraInferior.position.set(
(x1+x2)/2,
yBase+0.06,
(z1+z2)/2
);

barraInferior.rotation.y=
-angulo;

scene.add(
barraInferior
);

const cantidad=
Math.max(
1,
Math.ceil(
largo/separacion
)
);

for(
let i=0;
i<=cantidad;
i++
){

const t=
i/cantidad;

const x=
x1+dx*t;

const z=
z1+dz*t;

const poste=
new THREE.Mesh(
new THREE.BoxGeometry(
grosorBaranda,
alturaBaranda,
grosorBaranda
),
materialBaranda
);

poste.name=
nombre+
"_poste_"+
(i+1);

poste.position.set(
x,
yBase+
alturaBaranda/2,
z
);

scene.add(
poste
);

}

}

// =================================================
// CONTORNO
// =================================================

crearBaranda(
"barandaNueva01",
-2.7,-2.55,
2.7,-2.55,
-0.8
);

crearBaranda(
"barandaContorno01",
2.7,-2.55,
3.7,-1.45,
-0.8
);

crearBaranda(
"barandaContorno02",
3.7,-1.45,
3.7,-0.6,
-0.8
);

crearBaranda(
"barandaContorno03",
3.7,-0.6,
3.7,1.45,
-0.8
);

crearBaranda(
"barandaContorno04",
3.7,1.45,
2.7,2.6,
-0.8
);

crearBaranda(
"barandaContorno05",
2.7,2.6,
3.7,4.45,
-0.8
);

crearBaranda(
"barandaContorno06",
3.7,4.45,
1.9,10.5,
-0.8
);

crearBaranda(
"barandaContorno08",
-1.88,10.5,
-2.7,2.4,
-0.8
);

crearBaranda(
"barandaContorno09",
-2.7,2.4,
-2.05,1.5,
-0.8
);

crearBaranda(
"barandaContorno10",
-2.05,1.5,
-2.7,0.3,
-0.8
);

crearBaranda(
"barandaContorno11",
-2.7,0.3,
-2.7,-1.45,
-0.8
);

crearBaranda(
"barandaContorno12",
-2.7,-1.45,
-2.7,-2.55,
-0.8
);

// =================================================
// BARANDAS PISO ABAJO
// =================================================

crearBaranda(
"barandaPisoAbajo01",
-1.83,12.18,
-1.45,18.00,
-1.2
);

crearBaranda(
"barandaPisoAbajo02",
1.83,12.18,
1.45,18.00,
-1.2
);

crearBaranda(
"barandaPisoAbajo03",
-1.45,18.00,
1.45,18.00,
-1.2
);

// =================================================
// CAMINO
// =================================================

const caminoShape=
new THREE.Shape();

caminoShape.moveTo(
-0.3,
-0.5
);

caminoShape.lineTo(
-0.5,
-0.3
);

caminoShape.lineTo(
-0.5,
0.5
);

caminoShape.lineTo(
-1.0,
1.0
);

caminoShape.lineTo(
0.0,
1.5
);

caminoShape.lineTo(
1.0,
1.0
);

caminoShape.lineTo(
0.5,
0.5
);

caminoShape.lineTo(
0.5,
-0.3
);

caminoShape.lineTo(
0.3,
-0.5
);

caminoShape.lineTo(
-0.3,
-0.5
);

const caminoGeometry=
new THREE.ShapeGeometry(
caminoShape
);

const texturaPasto=
textureLoader.load(
"./pasto.jpg"
);

texturaPasto.wrapS=
THREE.RepeatWrapping;

texturaPasto.wrapT=
THREE.RepeatWrapping;

texturaPasto.repeat.set(
1,
1
);

texturaPasto.colorSpace=
THREE.SRGBColorSpace;

const caminoMaterial=
new THREE.MeshBasicMaterial({
map:texturaPasto,
side:THREE.DoubleSide
});

const caminoVerde=
new THREE.Mesh(
caminoGeometry,
caminoMaterial
);

caminoVerde.rotation.x=
-Math.PI/2;

caminoVerde.scale.set(
1.4,
1.4,
1.4
);

caminoVerde.position.set(
-0.5,
-0.75,
2
);

caminoVerde.name=
"CAMINO";

scene.add(
caminoVerde
);

// =================================================
// TEXTURAS JARDÍN
// =================================================

const loaderJardin=
new THREE.TextureLoader();

const texPastoJardin=
loaderJardin.load(
"./pasto.jpg"
);

const texPisoJardin=
loaderJardin.load(
"./piso.jpg"
);

texPastoJardin.wrapS=
THREE.ClampToEdgeWrapping;

texPastoJardin.wrapT=
THREE.ClampToEdgeWrapping;

texPastoJardin.colorSpace=
THREE.SRGBColorSpace;

texPisoJardin.wrapS=
THREE.ClampToEdgeWrapping;

texPisoJardin.wrapT=
THREE.ClampToEdgeWrapping;

texPisoJardin.colorSpace=
THREE.SRGBColorSpace;

const alturaJardin=0.03;

// =================================================
// JARDÍN
// =================================================

const jardinShape=new THREE.Shape();

jardinShape.absellipse(
0,
0,
1.25,
1.25,
0,
Math.PI*2,
false,
0
);

const hoyo=new THREE.Path();

hoyo.absellipse(
0,
0,
0.45,
0.45,
0,
Math.PI*2,
false,
0
);

jardinShape.holes.push(hoyo);

const jardinGeometry=new THREE.ExtrudeGeometry(
jardinShape,
{
depth:alturaJardin,
bevelEnabled:false
}
);

const jardinMaterial=new THREE.MeshPhongMaterial({
map:texPastoJardin,
color:0x8fbe55,
side:THREE.DoubleSide,
shininess:10
});

const jardin=new THREE.Mesh(
jardinGeometry,
jardinMaterial
);

jardin.rotation.x=-Math.PI/2;

jardin.position.set(
2.3,
-0.80,
0.5
);

jardin.scale.set(
0.65,
0.65,
0.65
);

scene.add(jardin);


// =================================================
// BORDE BLANCO DEL JARDÍN
// =================================================

const jardinBordeShape=new THREE.Shape();

jardinBordeShape.absellipse(
0,
0,
1.34,
1.34,
0,
Math.PI*2,
false,
0
);

const jardinBordeHoyo=new THREE.Path();

jardinBordeHoyo.absellipse(
0,
0,
1.25,
1.25,
0,
Math.PI*2,
false,
0
);

jardinBordeShape.holes.push(jardinBordeHoyo);

const jardinBordeGeometry=new THREE.ExtrudeGeometry(
jardinBordeShape,
{
depth:alturaJardin,
bevelEnabled:false
}
);

const jardinBordeMaterial=new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide
});

const jardinBorde=new THREE.Mesh(
jardinBordeGeometry,
jardinBordeMaterial
);

jardinBorde.rotation.x=-Math.PI/2;

jardinBorde.position.set(
2.3,
-0.805,
0.5
);

jardinBorde.scale.set(
0.65,
0.65,
0.65
);

scene.add(jardinBorde);


// =================================================
// HOJA SUPERIOR
// =================================================

const hojaSup=new THREE.Shape();

hojaSup.moveTo(0,0);

hojaSup.quadraticCurveTo(
-0.45,
0.15,
-0.85,
0.55
);

hojaSup.quadraticCurveTo(
-1.10,
0.80,
-1.15,
1.05
);

hojaSup.quadraticCurveTo(
-0.75,
1.00,
-0.35,
0.85
);

hojaSup.quadraticCurveTo(
0.15,
0.65,
0.55,
0.30
);

hojaSup.quadraticCurveTo(
0.30,
0.10,
0,
0
);

hojaSup.closePath();


// =================================================
// BORDE HOJA SUPERIOR
// =================================================

const hojaSupBordeGeometry=new THREE.ExtrudeGeometry(
hojaSup,
{
depth:alturaJardin,
bevelEnabled:false
}
);

const hojaSupBordeMaterial=new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide
});

const hojaSupBordeMesh=new THREE.Mesh(
hojaSupBordeGeometry,
hojaSupBordeMaterial
);

hojaSupBordeMesh.rotation.x=-Math.PI/2;

hojaSupBordeMesh.position.set(
2.2,
-0.805,
2.20
);

hojaSupBordeMesh.scale.set(
0.78,
0.78,
0.78
);

scene.add(hojaSupBordeMesh);


// =================================================
// HOJA VERDE SUPERIOR
// =================================================

const hojaSupGeometry=new THREE.ExtrudeGeometry(
hojaSup,
{
depth:alturaJardin,
bevelEnabled:false
}
);

const hojaSupMaterial=new THREE.MeshPhongMaterial({
map:texPastoJardin,
color:0x6fa83f,
side:THREE.DoubleSide,
shininess:10
});

const hojaSupMesh=new THREE.Mesh(
hojaSupGeometry,
hojaSupMaterial
);

hojaSupMesh.rotation.x=-Math.PI/2;

hojaSupMesh.position.set(
2.2,
-0.80,
2.20
);

hojaSupMesh.scale.set(
0.70,
0.70,
0.70
);

scene.add(hojaSupMesh);


// =================================================
// HOJA INFERIOR
// =================================================

const hojaInf=new THREE.Shape();

hojaInf.moveTo(0,0);

hojaInf.quadraticCurveTo(
-0.45,
-0.15,
-0.85,
-0.55
);

hojaInf.quadraticCurveTo(
-1.10,
-0.80,
-1.15,
-1.05
);

hojaInf.quadraticCurveTo(
-0.75,
-1.00,
-0.35,
-0.85
);

hojaInf.quadraticCurveTo(
0.15,
-0.65,
0.55,
-0.30
);

hojaInf.quadraticCurveTo(
0.30,
-0.10,
0,
0
);

hojaInf.closePath();


// =================================================
// BORDE HOJA INFERIOR
// =================================================

const hojaInfBordeGeometry=new THREE.ExtrudeGeometry(
hojaInf,
{
depth:alturaJardin,
bevelEnabled:false
}
);

const hojaInfBordeMaterial=new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide
});

const hojaInfBordeMesh=new THREE.Mesh(
hojaInfBordeGeometry,
hojaInfBordeMaterial
);

hojaInfBordeMesh.rotation.x=-Math.PI/2;

hojaInfBordeMesh.position.set(
2.2,
-0.805,
-1.20
);

hojaInfBordeMesh.scale.set(
0.78,
0.78,
0.78
);

scene.add(hojaInfBordeMesh);


// =================================================
// HOJA VERDE INFERIOR
// =================================================

const hojaInfGeometry=new THREE.ExtrudeGeometry(
hojaInf,
{
depth:alturaJardin,
bevelEnabled:false
}
);

const hojaInfMaterial=new THREE.MeshPhongMaterial({
map:texPastoJardin,
color:0x6fa83f,
side:THREE.DoubleSide,
shininess:10
});

const hojaInfMesh=new THREE.Mesh(
hojaInfGeometry,
hojaInfMaterial
);

hojaInfMesh.rotation.x=-Math.PI/2;

hojaInfMesh.position.set(
2.2,
-0.80,
-1.20
);

hojaInfMesh.scale.set(
0.70,
0.70,
0.70
);

scene.add(hojaInfMesh);


// =================================================
// FAROLES PEQUEÑOS
// =================================================

function crearFarol(x,y,z){

const farol=new THREE.Group();

const negro=new THREE.MeshPhongMaterial({
color:0x111111,
shininess:80
});

// Poste
const poste=new THREE.Mesh(
new THREE.CylinderGeometry(
0.018,
0.032,
1.15,
12
),
negro
);

poste.position.y=0.575;
poste.castShadow=true;
farol.add(poste);

// Base
const base=new THREE.Mesh(
new THREE.CylinderGeometry(
0.06,
0.08,
0.06,
12
),
negro
);

base.position.y=0.03;
base.castShadow=true;
farol.add(base);

// Soporte
const soporte=new THREE.Mesh(
new THREE.CylinderGeometry(
0.018,
0.018,
0.10,
12
),
negro
);

soporte.position.y=1.18;
farol.add(soporte);

// Techo
const techo=new THREE.Mesh(
new THREE.CylinderGeometry(
0.13,
0.09,
0.045,
24
),
negro
);

techo.position.y=1.25;
farol.add(techo);

// Tapa curva
const tapa=new THREE.Mesh(
new THREE.SphereGeometry(
0.095,
20,
10,
0,
Math.PI*2,
0,
Math.PI/2
),
negro
);

tapa.position.y=1.26;
farol.add(tapa);

// Posición
farol.position.set(
x,
y,
z
);

scene.add(farol);

return farol;
}


// =================================================
// 4 FAROLES ALREDEDOR
// =================================================

// FAROL 1
crearFarol(
1.25,
-0.80,
1.35
);

// FAROL 2
crearFarol(
3.35,
-0.80,
1.35
);

// FAROL 3
crearFarol(
1.25,
-0.80,
-0.35
);

// FAROL 4
crearFarol(
3.35,
-0.80,
-0.35
);

// =================================================
// PERSONAJE
// =================================================

let personaje;
let baseVirgen=null;
let mixerPersonaje;

// POSICIÓN DEL BOTÓN SOBRE LA BASE
const posicionBotonMuseo =
new THREE.Vector3(
    -0.5,
    0.20,
    0.45
);

const puntoPantallaBoton =
new THREE.Vector3();

const teclas={};

// VELOCIDADES

const velocidadJugador=0.035;

const velocidadHormiga=0.035;

// JUGADOR INVISIBLE

const jugador=
new THREE.Vector3(
-1.2,
-0.6,
1.2
);

// DESTINO

const destinoHormiga=
new THREE.Vector3(
-1.2,
-0.6,
1.2
);

let tieneDestino=false;

// =================================================
// VARIABLES DE CÁMARA
// =================================================

// Última posición de la hormiga
const ultimaPosicionHormiga=
new THREE.Vector3(
-1.2,
-0.65,
1.2
);

// =================================================
// RAYCASTER
// =================================================

const raycaster=
new THREE.Raycaster();

const mouse=
new THREE.Vector2();

// =================================================
// DIRECCIONES
// =================================================

const direccionCamara=
new THREE.Vector3();

const direccionDerecha=
new THREE.Vector3();

const movimientoJugador=
new THREE.Vector3();

const direccionHormiga=
new THREE.Vector3();

// =================================================
// LOADER
// =================================================

const loader=
new GLTFLoader();

// =================================================
// VIRGEN
// =================================================

function cargarVirgen(
nombre
){

loader.load(
"./"+nombre,
function(gltf){

const model=
gltf.scene;

model.scale.set(
3.2,
3.2,
3.2
);

model.position.set(
-0.5,
1.5,
0
);

model.rotation.y=
THREE.MathUtils.degToRad(
-90
);

model.traverse(
function(obj){

if(obj.isMesh){

let textura=null;

if(
obj.material&&
!Array.isArray(
obj.material
)
){

textura=
obj.material.map||
null;

}

obj.material=
new THREE.MeshPhongMaterial({
map:textura,
color:0xffffff,
shininess:200
});

obj.castShadow=true;

obj.receiveShadow=true;

}

}
);

scene.add(
model
);

// Zona grande para tocar la base
baseVirgen=new THREE.Mesh(
  new THREE.CylinderGeometry(1.8,1.8,1.2,48),
  new THREE.MeshBasicMaterial({transparent:true,opacity:0})
);
baseVirgen.position.set(-0.5,0.45,0);
scene.add(baseVirgen);

},
undefined,
function(){

if(
nombre==="virgin.glb"
){

cargarVirgen(
"virgen.glb"
);

}else{

console.error(
"No se encontró virgin.glb ni virgen.glb"
);

}

}
);

}

cargarVirgen(
"virgin.glb"
);

// =================================================
// HORMIGA
// =================================================

loader.load(
"./hormiga.glb",
function(gltf){

personaje=
gltf.scene;

personaje.scale.set(
0.55,
0.55,
0.55
);

personaje.position.set(
    -2.0,
    -0.55,
    1.9
);

personaje.rotation.y=0;

personaje.traverse(
function(obj){

if(obj.isMesh){

obj.castShadow=true;

obj.receiveShadow=true;

}

}
);

if(
gltf.animations.length>0
){

mixerPersonaje=
new THREE.AnimationMixer(
personaje
);

const caminar=
mixerPersonaje.clipAction(
gltf.animations[0]
);

caminar.play();

caminar.timeScale=0.8;

}

scene.add(
personaje
);

// Guardar posición inicial
ultimaPosicionHormiga.copy(
personaje.position
);

},
undefined,
function(error){

console.error(
"Error cargando hormiga:",
error
);

}
);

// =================================================
// RUTA DE LA HORMIGA
// =================================================

const rutaHormiga=[

// GRADA 1
new THREE.Vector3(
0.0,
-0.68,
10.64
),

// GRADA 2
new THREE.Vector3(
0.0,
-0.75,
10.92
),

// GRADA 3
new THREE.Vector3(
0.0,
-0.82,
11.20
),

// GRADA 4
new THREE.Vector3(
0.0,
-0.89,
11.48
),

// GRADA 5
new THREE.Vector3(
0.0,
-0.96,
11.76
),

// ÚLTIMA GRADA
new THREE.Vector3(
0.0,
-1.03,
12.04
),

// FINAL GRADAS
new THREE.Vector3(
0.0,
-1.08,
12.18
),

// PISO ABAJO
new THREE.Vector3(
0.0,
-1.18,
12.8
),

new THREE.Vector3(
1.0,
-1.18,
13.5
),

new THREE.Vector3(
1.4,
-1.18,
14.5
),

new THREE.Vector3(
1.0,
-1.18,
15.5
),

new THREE.Vector3(
0.0,
-1.18,
16.5
),

new THREE.Vector3(
-1.0,
-1.18,
17.3
),

new THREE.Vector3(
-1.4,
-1.18,
16.0
),

new THREE.Vector3(
-1.0,
-1.18,
14.5
),

new THREE.Vector3(
0.0,
-1.18,
13.5
),

new THREE.Vector3(
1.2,
-1.18,
12.8
)
];

// =================================================
// CONTROL DE RUTA
// =================================================

let puntoRutaActual=0;

let recorriendoRuta=false;

// Esperar 5 segundos

//setTimeout(
//function(){
//recorriendoRuta=true;
//},
//5000
//);

// =================================================
// MOVER JUGADOR
// =================================================

function moverJugador(){

let adelante=0;

let derecha=0;

if(
teclas["w"]||
teclas["arrowup"]
){

adelante=1;

}

if(
teclas["s"]||
teclas["arrowdown"]
){

adelante=-1;

}

if(
teclas["a"]||
teclas["arrowleft"]
){

derecha=-1;

}

if(
teclas["d"]||
teclas["arrowright"]
){

derecha=1;

}

if(
adelante===0&&
derecha===0
){

return;

}

// Detener ruta
recorriendoRuta=false;

tieneDestino=false;

camera.getWorldDirection(
direccionCamara
);

direccionCamara.y=0;

direccionCamara.normalize();

direccionDerecha.set(
direccionCamara.z,
0,
-direccionCamara.x
);

direccionDerecha.normalize();

movimientoJugador.set(
0,
0,
0
);

movimientoJugador.addScaledVector(
direccionCamara,
adelante
);

movimientoJugador.addScaledVector(
direccionDerecha,
derecha
);

if(
movimientoJugador.lengthSq()>0
){

movimientoJugador.normalize();

movimientoJugador.multiplyScalar(
velocidadJugador
);

}

const nuevaX=
jugador.x+
movimientoJugador.x;

const nuevaZ=
jugador.z+
movimientoJugador.z;

if(
estaEnZonaCaminable(
nuevaX,
nuevaZ
)
){

jugador.x=
nuevaX;

jugador.z=
nuevaZ;

destinoHormiga.set(
jugador.x,
jugador.y,
jugador.z
);

tieneDestino=true;

}

}

// =================================================
// HORMIGA SIGUE DESTINO
// =================================================

function moverHormiga(){

if(!personaje)return;

direccionHormiga.set(
destinoHormiga.x-
personaje.position.x,
0,
destinoHormiga.z-
personaje.position.z
);

const distancia=
direccionHormiga.length();

if(
distancia>0.12
){

direccionHormiga.normalize();
// LA HORMIGA MIRA DE FRENTE
personaje.rotation.y =
    Math.atan2(
        -direccionHormiga.z,
        direccionHormiga.x
    );

const velocidad=
Math.min(
velocidadHormiga,
distancia
);

direccionHormiga.multiplyScalar(
velocidad
);

const nuevaX=
personaje.position.x+
direccionHormiga.x;

const nuevaZ=
personaje.position.z+
direccionHormiga.z;

if(
estaEnZonaCaminable(
nuevaX,
nuevaZ
)
){

personaje.position.x=
nuevaX;

personaje.position.z=
nuevaZ;

}


}

}

// =================================================
// CAMINAR POR RUTA
// =================================================

function caminarPorRuta(){

if(!personaje)return;

if(!recorriendoRuta)return;

if(
puntoRutaActual>=
rutaHormiga.length
){

puntoRutaActual=0;

}

const punto=
rutaHormiga[
puntoRutaActual
];

direccionHormiga.set(
punto.x-
personaje.position.x,
punto.y-
personaje.position.y,
punto.z-
personaje.position.z
);

const distancia=
direccionHormiga.length();

if(
distancia<0.08
){

puntoRutaActual++;

return;

}

direccionHormiga.normalize();

direccionHormiga.multiplyScalar(
Math.min(
velocidadHormiga,
distancia
)
);

const nuevaX=
personaje.position.x+
direccionHormiga.x;

const nuevaY=
personaje.position.y+
direccionHormiga.y;

const nuevaZ=
personaje.position.z+
direccionHormiga.z;

if(
estaEnZonaCaminable(
nuevaX,
nuevaZ
)
){

personaje.position.x=
nuevaX;

personaje.position.y=
nuevaY;

personaje.position.z=
nuevaZ;

}

// Girar hormiga
if(
distancia>0.01
){
    personaje.rotation.y =
        Math.atan2(
            -direccionHormiga.z,
            direccionHormiga.x
        );

}

}

// =================================================
// ⭐ CÁMARA SIGUE A LA HORMIGA
// =================================================

// Esta función NO obliga a mirar
// siempre detrás de la hormiga.
// Solo mueve la cámara junto con ella.
// Así puedes girar con el mouse.

function seguirHormiga(){

if(!personaje)return;

// Posición actual
const posicionActual=
personaje.position;

// Diferencia desde el último frame
const desplazamiento=
new THREE.Vector3();

desplazamiento.subVectors(
posicionActual,
ultimaPosicionHormiga
);

// Si la hormiga se movió
if(
desplazamiento.lengthSq()>0
){

// Mover cámara junto a la hormiga
camera.position.add(
desplazamiento
);

// Mover también el objetivo
controls.target.add(
desplazamiento
);

// Guardar posición nueva
ultimaPosicionHormiga.copy(
posicionActual
);

}

}

// =================================================
// CLIC SOBRE EL PISO
// =================================================

renderer.domElement.addEventListener(
"pointermove",
function(event){

const rect=
renderer.domElement.getBoundingClientRect();

mouse.x=
((event.clientX-
rect.left)/
rect.width)*2-1;

mouse.y=
-((event.clientY-
rect.top)/
rect.height)*2+1;

raycaster.setFromCamera(
mouse,
camera
);



const objetos=[
floor,
caminoVerde,
pisoAbajoMesh
];

const intersecciones=
raycaster.intersectObjects(
objetos,
false
);



if(
intersecciones.length>0
){

renderer.domElement.style.cursor=
"pointer";

}else{

renderer.domElement.style.cursor=
"grab";

}

}
);

// =================================================
// CLIC PARA MANDAR HORMIGA
// =================================================

renderer.domElement.addEventListener(
"pointerdown",
function(event){

if(
event.button!==0
)return;

const rect=
renderer.domElement.getBoundingClientRect();

mouse.x=
((event.clientX-
rect.left)/
rect.width)*2-1;

mouse.y=
-((event.clientY-
rect.top)/
rect.height)*2+1;

raycaster.setFromCamera(
mouse,
camera
);

const objetos=[
floor,
caminoVerde,
pisoAbajoMesh
];

const intersecciones=
raycaster.intersectObjects(
objetos,
false
);

if(
intersecciones.length>0
){

const punto=
intersecciones[0].point;

const x=
punto.x;

const z=
punto.z;

if(
estaEnZonaCaminable(
x,
z
)
){

destinoHormiga.set(
x,
-0.6,
z
);

// GIRAR LA HORMIGA HACIA EL LUGAR DEL CLIC
const dx=x-personaje.position.x;
const dz=z-personaje.position.z;

personaje.rotation.y=
Math.atan2(dx,dz);


jugador.set(
x,
-0.6,
z
);

tieneDestino=true;

recorriendoRuta=false;

renderer.domElement.style.cursor=
"pointer";

}

}

}
);

// =================================================
// DOBLE CLIC
// =================================================

renderer.domElement.addEventListener(
"dblclick",
function(){

recorriendoRuta=true;

puntoRutaActual=0;

}
);

// =================================================
// TECLADO
// =================================================

window.addEventListener(
"keydown",
function(e){

teclas[
e.key.toLowerCase()
]=true;

}
);


window.addEventListener(
"keyup",
function(e){

teclas[
e.key.toLowerCase()
]=false;

}
);

// =================================================
// BOTÓN HTML - ENTRAR AL MUSEO
// =================================================

const btnMuseo =
document.getElementById("btnMuseo");

// =================================================
// BOTÓN DÍA / NOCHE
// =================================================

const btnNoche =
document.getElementById("btnNoche");

let esNoche=false;

btnNoche.addEventListener(
    "click",
    function(){

        if(!esNoche){

            // =========================
            // NOCHE
            // =========================

            scene.background =
            textureLoader.load("./fonNoche.jpg");

            // ENCENDER TODAS LAS BOLITAS
            lucesBolita.forEach(
                function(luz){

                    luz.intensity=120;

                }
            );

            btnNoche.textContent="☀️ DÍA";

            esNoche=true;

        }else{

            // =========================
            // DÍA
            // =========================

            scene.background =
            textureLoader.load("./fon.jpg");

            // APAGAR TODAS LAS BOLITAS
            lucesBolita.forEach(
                function(luz){

                    luz.intensity=0;

                }
            );

            btnNoche.textContent="🌙 NOCHE";

            esNoche=false;

        }

    }
);

// OCULTAR BOTÓN AL INICIO
btnMuseo.style.display = "none";

btnMuseo.addEventListener(
    "click",
    function(){

        window.location.href =
        "https://ariananina.github.io/museo/";

    }
);


// =================================================
// DOBLE CLIC
// =================================================

renderer.domElement.addEventListener(
    "dblclick",
    function(){

        recorriendoRuta=true;

        puntoRutaActual=0;

    }
);
// =================================================
// FAROL CON ESFERA PARA BARANDA
// =================================================
const lucesBolita=[];
function crearFarolBaranda(x,y,z){

const farolBaranda=new THREE.Group();

// Material negro
const negroBaranda=new THREE.MeshPhongMaterial({
color:0x111111,
shininess:80
});

// Material blanco
const blancoBaranda=new THREE.MeshPhongMaterial({
    color:0x666666,
    emissive:0x000000,
    emissiveIntensity:0,
    shininess:10
});

// Poste
const posteBaranda=new THREE.Mesh(
new THREE.CylinderGeometry(
0.018,
0.032,
1.15,
12
),
negroBaranda
);

posteBaranda.position.y=0.575;
posteBaranda.castShadow=true;
farolBaranda.add(posteBaranda);

// Base
const baseBaranda=new THREE.Mesh(
new THREE.CylinderGeometry(
0.055,
0.075,
0.06,
12
),
negroBaranda
);

baseBaranda.position.y=0.03;
baseBaranda.castShadow=true;
farolBaranda.add(baseBaranda);

// Soporte
const soporteBaranda=new THREE.Mesh(
new THREE.CylinderGeometry(
0.018,
0.018,
0.08,
12
),
negroBaranda
);

soporteBaranda.position.y=1.18;
farolBaranda.add(soporteBaranda);

// Esfera blanca
const esferaBaranda=new THREE.Mesh(
new THREE.SphereGeometry(
0.10,
20,
20
),
blancoBaranda
);

esferaBaranda.position.y=1.25;
farolBaranda.add(esferaBaranda);

// Luz de la bolita
const luzBaranda=new THREE.PointLight(
    0xffeecc,
    4,
    4
);

luzBaranda.position.y=1.25;

farolBaranda.add(luzBaranda);

lucesBolita.push(luzBaranda);

// Posición
farolBaranda.position.set(
x,
y,
z
);

scene.add(farolBaranda);

return farolBaranda;
}

// =================================================
// FAROLES POR TODA LA BARANDA
// =================================================

// ===== PISO PRINCIPAL =====

// FRENTE
crearFarolBaranda(-2.50,-0.80,-2.35);
crearFarolBaranda(-0.85,-0.80,-2.35);
crearFarolBaranda(0.85,-0.80,-2.35);
crearFarolBaranda(2.50,-0.80,-2.35);

// LADO DERECHO
crearFarolBaranda(3.50,-0.80,-1.90);
crearFarolBaranda(3.65,-0.80,0.20);
crearFarolBaranda(2.75,-0.80,2.80);
crearFarolBaranda(3.50,-0.80,4.20);

// PARTE DERECHA HACIA EL FONDO
crearFarolBaranda(3.05,-0.80,6.70);
crearFarolBaranda(2.65,-0.80,8.10);
crearFarolBaranda(2.20,-0.80,9.45);

// LADO IZQUIERDO

crearFarolBaranda(-2.65,-0.80,0.30);
crearFarolBaranda(-2.55,-0.80,2.80);
crearFarolBaranda(-2.48,-0.80,4.20);

// PARTE IZQUIERDA HACIA EL FONDO
crearFarolBaranda(-2.30,-0.80,5.70);
crearFarolBaranda(-2.15,-0.80,7.20);
crearFarolBaranda(-2.00,-0.80,8.80);


// =================================================
// FAROLES A LOS COSTADOS DE LAS ESCALERAS
// =================================================

// COSTADO IZQUIERDO
crearFarolBaranda(-1.82,-0.80,10.00);
crearFarolBaranda(-1.75,-0.80,10.80);
crearFarolBaranda(-1.80,-0.96,11.60);

// COSTADO DERECHO
crearFarolBaranda(1.76,-0.80,10.80);
crearFarolBaranda(1.80,-0.96,11.60);

// =================================================
// PISO DE ABAJO - BORDE DE LA BARANDA
// =================================================

// PARTE DELANTERA
crearFarolBaranda(-1.59,-1.18,12.80);
crearFarolBaranda(1.59,-1.18,12.80);

// LADO DERECHO
crearFarolBaranda(1.59,-1.18,14.20);
crearFarolBaranda(1.54,-1.18,15.70);
crearFarolBaranda(1.48,-1.18,17.20);

// PARTE DEL FONDO
crearFarolBaranda(0.90,-1.18,17.80);
crearFarolBaranda(-0.90,-1.18,17.80);

// LADO IZQUIERDO
crearFarolBaranda(-1.47,-1.18,17.20);
crearFarolBaranda(-1.54,-1.18,15.70);
crearFarolBaranda(-1.59,-1.18,14.20);

function colocarBotonMuseo(){

    if(!btnMuseo || !personaje){
        return;
    }

    // ==========================================
    // DISTANCIA ENTRE HORMIGA Y VIRGEN
    // ==========================================

    const distancia =
        personaje.position.distanceTo(
            posicionBotonMuseo
        );

    // ==========================================
    // SI LA HORMIGA ESTA CERCA
    // ==========================================

    if(distancia < 1.5){

        // MOSTRAR BOTON
        btnMuseo.style.display = "block";

        // POSICION DEL BOTON
        puntoPantallaBoton.set(
            -0.5,
            -0.65,
            0.45
        );

        // CONVERTIR 3D A PANTALLA
        puntoPantallaBoton.project(camera);

        const x =
            (puntoPantallaBoton.x * 0.5 + 0.5)
            * window.innerWidth;

        const y =
            (-puntoPantallaBoton.y * 0.5 + 0.5)
            * window.innerHeight;

        btnMuseo.style.left =
            x + "px";

        btnMuseo.style.top =
            y + "px";

        // TAMAÑO FIJO
        btnMuseo.style.width = "200px";
        btnMuseo.style.height = "50px";

        btnMuseo.style.transform =
            "translate(-50%, -50%)";

        btnMuseo.style.scale = "1";

    }else{

        // HORMIGA LEJOS
        // OCULTAR BOTON

        btnMuseo.style.display = "none";
    }
}

// =================================================
// ANIMACIÓN
// =================================================

function animate(){
requestAnimationFrame(
animate
);

moverJugador();

// Movimiento hormiga

if(
recorriendoRuta
){

caminarPorRuta();

}else{

moverHormiga();

}

// ⭐ CÁMARA SIGUE A LA HORMIGA
seguirHormiga();

if(
mixerPersonaje
){

mixerPersonaje.update(
0.012
);

}

// Luz animada

const t=
Date.now()*0.001;

pointLight.position.x=
Math.sin(t)*6;

pointLight.position.z=
Math.cos(t)*6;

pointLight.position.y=4;

// Controles
controls.update();

// BOTÓN SIGUE LA BASE DE LA VIRGEN
colocarBotonMuseo();

// Render
renderer.render(
scene,
camera
);

}

animate();

// =================================================
// REDIMENSIONAR
// =================================================

window.addEventListener(
"resize",
function(){

camera.aspect=
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);
