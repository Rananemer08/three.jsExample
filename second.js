var renderer, scene, camera, cube;

var ww = window.innerWidth,
    wh = window.innerHeight;

function init() {
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('scene')});
    renderer.setSize(ww / 2, wh / 2); // Adjust the size to fit next to the text

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, (ww / 2) / (wh / 2), 0.1, 10000);
    camera.position.set(0, 0, 500);
    scene.add(camera);

    // Add a light in the scene
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 0, 350);
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(directionalLight);

    // Add a cube in the scene and apply a different animation
    createCube();

    // Render the scene and start request animation frame
    render();
}

var createCube = function () {
    // Create a new cube with simple geometry & material
    var geometry = new THREE.BoxGeometry(150, 150, 150);
    var texture = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true});
    cube = new THREE.Mesh(geometry, texture);

    // Create a new timeline with different animations
    cube.tl = new TimelineMax({repeat: -1, repeatDelay: 1});
    // Cube spins in the opposite direction
    cube.tl.to(cube.rotation, 2, {y: Math.PI * 2, x: Math.PI * 2, ease: Back.easeInOut});
    // Cube moves to the right and fades out
    cube.tl.to(cube.position, 1, {x: 200, ease: Power3.easeOut});
    cube.tl.to(cube.material, 1, {opacity: 0, ease: Power3.easeOut}, "-=1");
    // Cube moves to a new position without transition
    cube.tl.set(cube.position, {x: -150, y: -150});
    // Cube fades back in
    cube.tl.to(cube.material, 1, {opacity: 1, ease: Power3.easeOut});
    // Cube returns to its original position
    cube.tl.to(cube.position, 3, {x: 0, y: 0, ease: Back.easeInOut.config(2)});
    cube.tl.to(cube.rotation, 3, {x: 0, y: 0, ease: Back.easeInOut.config(2)}, "-=3");

    // Add the cube in the scene
    scene.add(cube);
};

var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

init();
