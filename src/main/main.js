import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";

// console.log(THREE);

// 初始化场景
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

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

scene.add(cube); // 几何物体添加到场景
// console.log(cube);
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((value) => {
    console.log("修改值:", value);
  })
  .onFinishChange((value) => {
    console.log("停下时", value);
  });
// 修改物体颜色
const params = {
  color: "#ffff00",
  fn: () => {
    // 让立方体运动起来
    gsap.to(cube.position, {
      x: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });
  },
};
gui.addColor(params, "color").onChange((value) => {
  console.log("修改值:", value);
  cube.material.color.set(value);
});
// 设置选项框
gui.add(cube, "visible").name("是否显示");
// 设置触发按钮 某个事件
// gui.add(params, "fn").name("物体运动");

// 折叠
var folder = gui.addFolder("设置物体");
folder.add(cube.material, "wireframe").name("线框");
folder.add(params, "fn").name("物体运动");

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
//设置控制器阻尼  动画循环必须调用.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画
// var animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   // 设置重复次数 无限-1
//   repeat: -1,
//   // 往返运动
//   yoyo: true,
//   // 延迟
//   delay: 2,
//   onComplete: () => {
//     console.log("over");
//   },
//   onStart: () => {
//     console.log("start");
//   },
// });
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

// window.addEventListener("dblclick", () => {
//   if (animate1.isActive()) {
//     animate1.pause();
//   } else {
//     animate1.resume();
//   }
// });

window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  // 双击控制屏幕 进入与退出全屏
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render); // 渲染下一帧时 调用render函数
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  console.log("change");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
