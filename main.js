var renderer, scene, camera, cube;

var ww = window.innerWidth,
    wh = window.innerHeight;

function init() {
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('scene')});
    renderer.setSize(ww, wh);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
    camera.position.set(0, 0, 500);
    scene.add(camera);

    
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 0, 350);
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(directionalLight);

    createCube();

    render();
}

var createCube = function () {
    
    var geometry = new THREE.BoxGeometry(150, 150, 150);
    var texture = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent: true});
    cube = new THREE.Mesh(geometry, texture);

    cube.tl = new TimelineMax({repeat: -1, repeatDelay: 1});
    cube.tl.to(cube.rotation, 3, {y: -Math.PI * 3.25, x: -Math.PI * 1.25, ease: Back.easeInOut});


    cube.tl.to(cube.position, 1, {x: -150, ease: Power3.easeOut});
    cube.tl.to(cube.material, 1, {opacity: 0, ease: Power3.easeOut}, "-=1");

   
    cube.tl.set(cube.position, {x: 100, y: -100});

    // Fade In the cube
    cube.tl.to(cube.material, 1, {opacity: 1, ease: Power3.easeOut});
    cube.tl.to(cube.position, 3, {x: 0, y: 0, ease: Back.easeInOut.config(2)});
    cube.tl.to(cube.rotation, 3, {x: 0, y: 0, ease: Back.easeInOut.config(2)}, "-=3");
    scene.add(cube);
};

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

init();
