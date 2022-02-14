var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -50), scene);

    // Add a lights to the scene
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(1, 1, 0), scene);

    //create a material
    const material = new BABYLON.StandardMaterial('material', scene)
    material.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7)

    return scene;
};

const positionMatrix = [new BABYLON.Vector3(-3, 0, 0), new BABYLON.Vector3(3, 0, 0), new BABYLON.Vector3(-3, -6, 0), new BABYLON.Vector3(-3, 6, 0),
new BABYLON.Vector3(3, -6, 0), new BABYLON.Vector3(3, 6, 0)]
let positioCounter = 0;
let color = false;


const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const del_button = document.querySelector('#delete')
const add_button = document.querySelector('#add')

// Add your code here matching the playground format

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});


document.querySelector('#change_color').addEventListener("click", (e) => {
    const material = scene.getMaterialByName("material");
    material.diffuseColor = (color)? new BABYLON.Color3(0.7, 0.7, 0.7): new BABYLON.Color3(1, 0, 0);
    color = !color;
})



del_button.addEventListener("click", (e) => {
    add_button.disabled = false

    const shape = scene.getMeshByName(`shape${positioCounter-1}`);
    shape.dispose();
    positioCounter--
    if (positioCounter <= 0)
        e.target.disabled = true;

})

add_button.addEventListener("click", (e) => {
    const random = Math.floor(Math.random() * (3 - 1)) + 1;//Math.floor(Math.random() * (max - min)) + min;
    let shape

    if (random == 1) {
        //create a sphere
        shape = BABYLON.MeshBuilder.CreateSphere(`shape${positioCounter}`, { diameter: 3 }, scene);
    }
    else {
        //create a box
        shape = BABYLON.MeshBuilder.CreateBox(`shape${positioCounter}`, { size: 3 }, scene);
    }

    shape.position = positionMatrix[positioCounter];
    shape.rotation.x = Math.floor(Math.random() * (4 - 1)) + 1;
    shape.rotation.y = Math.floor(Math.random() * (4 - 1)) + 1;
    shape.rotation.z = Math.floor(Math.random() * (4 - 1)) + 1;
    const material = scene.getMaterialByName("material");
    shape.material = material

    del_button.disabled = false;
    positioCounter++;
    if (positioCounter >= positionMatrix.length) {
        e.target.disabled = true;
    }
})

// change camera position
document.querySelector('#rangeZ').addEventListener("input", (e) => {
    const camera = scene.getCameraByName("camera");
    camera.position.z = e.target.value - 100;
})
document.querySelector('#rangeX').addEventListener("input", (e) => {
    const camera = scene.getCameraByName("camera");
    camera.position.x = e.target.value - 50;
})
document.querySelector('#rangeY').addEventListener("input", (e) => {
    const camera = scene.getCameraByName("camera");
    camera.position.y = e.target.value - 50;
})





