import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
function render() {
  // 获取时钟运行的总时长
  // let time = clock.getElapsedTime();
  let time;
  let deltaTame = clock.getDelta();
  console.log("时钟运行总时长:", time, "\n", "两次获取时间的间隔:", deltaTame);
  renderer.render(scene, camera);
  requestAnimationFrame(render); // 渲染下一帧时 调用render函数
}

// function render(time) {
//   cube.position.x += 0.01;
//   cube.rotation.y += 0.01;
//   // console.log(time);
//   let t = (time / 1000) % 5;
//   cube.position.x = t * 1;
//   // if (cube.position.x > 5) {
//   //   cube.position.x = 0;
//   // }
//   renderer.render(scene, camera);
//   requestAnimationFrame(render); // 渲染下一帧时 调用render函数
// }

render();
