import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";

// console.log(THREE);

// 初始化场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// 相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10); // 相机位置
scene.add(camera);

// 物体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material); // 根据几何体和材质创建物体

// 修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 3;
//缩放
// cube.scale.set(3, 2, 1);
// console.log(cube);
// cube.scale.x = 2;
//旋转
// cube.rotation.x = 1;
// cube.rotation.set(Math.PI / 4, 0, 0, "XZY");

scene.add(cube); // 几何物体添加到场景
// console.log(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas添加body
document.body.appendChild(renderer.domElement);

// 使用渲染器通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画
gsap.to(cube.position, { x: 5, duration: 5 });
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 });

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render); // 渲染下一帧时 调用render函数
}

render();
