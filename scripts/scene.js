// ═══════════════════════════════════════════════════════════
// 3D DESK SCENE - Computer, Coffee, Portfolio on Screen
// Simon Mutunga Portfolio
// ═══════════════════════════════════════════════════════════

const container = document.getElementById('scene-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0f0f);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// ═══════════════════════════════════════════════════════════
// LIGHTING
// ═══════════════════════════════════════════════════════════

const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 0.6);
mainLight.position.set(5, 10, 5);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;
scene.add(mainLight);

const screenGlow = new THREE.PointLight(0x2dd4bf, 1, 8);
screenGlow.position.set(0, 2.5, 0);
scene.add(screenGlow);

const coffeeGlow = new THREE.PointLight(0xffaa44, 0.4, 4);
coffeeGlow.position.set(3.5, 1.8, 1.2);
scene.add(coffeeGlow);

const backLight = new THREE.PointLight(0x1a3a5c, 0.3, 15);
backLight.position.set(-5, 5, -5);
scene.add(backLight);

// ═══════════════════════════════════════════════════════════
// MATERIALS
// ═══════════════════════════════════════════════════════════

const deskMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, roughness: 0.3, metalness: 0.1
});

const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2d2418, roughness: 0.7, metalness: 0
});

const monitorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0a0a0a, roughness: 0.1, metalness: 0.9
});

const keyboardMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, roughness: 0.4, metalness: 0.3
});

const mugMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, roughness: 0.2, metalness: 0.8
});

const coffeeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3d2517, roughness: 0.1
});

const accentMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2dd4bf, roughness: 0.3, metalness: 0.5
});

// ═══════════════════════════════════════════════════════════
// DESK
// ═══════════════════════════════════════════════════════════

const deskGroup = new THREE.Group();

// Desk top
const deskTop = new THREE.Mesh(new THREE.BoxGeometry(12, 0.15, 6), woodMaterial);
deskTop.position.y = 0;
deskTop.receiveShadow = true;
deskTop.castShadow = true;
deskGroup.add(deskTop);

// Desk frame
const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
const frameGeom = new THREE.BoxGeometry(12, 0.08, 6);
const frame = new THREE.Mesh(frameGeom, frameMaterial);
frame.position.y = -0.1;
deskGroup.add(frame);

// Desk legs (modern metal legs)
const legGeometry = new THREE.BoxGeometry(0.1, 3.5, 0.1);
const legPositions = [[-5.5, -1.75, -2.5], [5.5, -1.75, -2.5], [-5.5, -1.75, 2.5], [5.5, -1.75, 2.5]];
legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, frameMaterial);
    leg.position.set(...pos);
    leg.castShadow = true;
    deskGroup.add(leg);
});

// Cross bars
const barGeom = new THREE.BoxGeometry(11, 0.05, 0.05);
const bar1 = new THREE.Mesh(barGeom, frameMaterial);
bar1.position.set(0, -1, -2.5);
deskGroup.add(bar1);
const bar2 = new THREE.Mesh(barGeom, frameMaterial);
bar2.position.set(0, -1, 2.5);
deskGroup.add(bar2);

scene.add(deskGroup);

// ═══════════════════════════════════════════════════════════
// MONITOR
// ═══════════════════════════════════════════════════════════

const monitorGroup = new THREE.Group();

// Monitor bezel
const bezelGeom = new THREE.BoxGeometry(6, 3.5, 0.15);
const bezel = new THREE.Mesh(bezelGeom, monitorMaterial);
bezel.position.set(0, 2, -2);
bezel.castShadow = true;
monitorGroup.add(bezel);

// Screen border accent
const borderGeom = new THREE.BoxGeometry(5.8, 3.3, 0.01);
const border = new THREE.Mesh(borderGeom, new THREE.MeshBasicMaterial({ color: 0x1a2a2a }));
border.position.set(0, 2, -1.9);
monitorGroup.add(border);

// Monitor stand neck
const neckGeom = new THREE.BoxGeometry(0.4, 1.5, 0.4);
const neck = new THREE.Mesh(neckGeom, monitorMaterial);
neck.position.set(0, 0.6, -2);
monitorGroup.add(neck);

// Monitor stand base
const standBase = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.2, 0.12, 32), monitorMaterial);
standBase.position.set(0, 0.1, -2);
standBase.castShadow = true;
monitorGroup.add(standBase);

// Power LED
const led = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshBasicMaterial({ color: 0x2dd4bf }));
led.position.set(0, 0.35, -1.92);
monitorGroup.add(led);

// ═══════════════════════════════════════════════════════════
// SCREEN WITH ANIMATED PORTFOLIO
// ═══════════════════════════════════════════════════════════

const screenCanvas = document.createElement('canvas');
screenCanvas.width = 580;
screenCanvas.height = 330;
const ctx = screenCanvas.getContext('2d');

function drawScreen() {
    const time = Date.now() * 0.001;
    
    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 330);
    bgGrad.addColorStop(0, '#0a0f0f');
    bgGrad.addColorStop(1, '#0d1414');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 580, 330);
    
    // Grid
    ctx.strokeStyle = '#1a2a2a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 580; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 330);
        ctx.stroke();
    }
    for (let i = 0; i < 330; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(580, i);
        ctx.stroke();
    }
    
    // Globe
    const gx = 290, gy = 150, gr = 70;
    
    // Glow
    const glow = ctx.createRadialGradient(gx, gy, gr * 0.3, gx, gy, gr * 1.8);
    glow.addColorStop(0, 'rgba(45, 212, 191, 0.25)');
    glow.addColorStop(1, 'rgba(45, 212, 191, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(gx, gy, gr * 1.8, 0, Math.PI * 2);
    ctx.fill();
    
    // Globe outline
    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.stroke();
    
    // Longitude lines
    ctx.strokeStyle = '#1a8a7a';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI + time * 0.3;
        ctx.beginPath();
        ctx.ellipse(gx, gy, Math.abs(Math.cos(angle)) * gr, gr, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Latitude lines
    for (let i = -2; i <= 2; i++) {
        if (i === 0) continue;
        const yOff = i * (gr / 3);
        const r = Math.sqrt(gr * gr - yOff * yOff);
        ctx.beginPath();
        ctx.ellipse(gx, gy + yOff, r, r * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Equator
    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(gx, gy, gr, gr * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Dots
    ctx.fillStyle = '#2dd4bf';
    for (let i = 0; i < 60; i++) {
        const phi = Math.acos(-1 + (2 * i) / 60);
        const theta = Math.sqrt(60 * Math.PI) * phi + time * 0.5;
        const x = gx + gr * 0.85 * Math.cos(theta) * Math.sin(phi);
        const y = gy + gr * 0.85 * Math.cos(phi);
        if (Math.sin(theta + time * 0.5) > -0.2) {
            ctx.globalAlpha = 0.3 + Math.sin(theta + time * 0.5) * 0.7;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
    
    // Nairobi marker
    const nLon = time * 0.3;
    if (Math.cos(nLon) > -0.3) {
        const nx = gx + gr * 0.85 * Math.sin(nLon);
        const ny = gy - gr * 0.05;
        
        // Pulse rings
        for (let p = 0; p < 3; p++) {
            const pulse = ((time * 2 + p * 0.7) % 2) * 12;
            ctx.strokeStyle = '#2dd4bf';
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = Math.max(0, 1 - pulse / 24);
            ctx.beginPath();
            ctx.arc(nx, ny, 4 + pulse, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        
        // Marker dot
        ctx.fillStyle = '#2dd4bf';
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner dot
        ctx.fillStyle = '#0a0f0f';
        ctx.beginPath();
        ctx.arc(nx, ny, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Text
    ctx.fillStyle = '#2dd4bf';
    ctx.font = '11px monospace';
    ctx.fillText('-1.2921° S, 36.8219° E', 15, 25);
    ctx.fillText('NAIROBI', 15, 42);
    
    // Name
    ctx.fillStyle = '#e8f0f0';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Simon Mutunga', 290, 280);
    
    ctx.fillStyle = '#7a9999';
    ctx.font = '14px sans-serif';
    ctx.fillText('Geospatial Engineer', 290, 305);
    
    ctx.textAlign = 'left';
    
    // Status indicator
    ctx.fillStyle = '#2dd4bf';
    ctx.beginPath();
    ctx.arc(520, 25, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7a9999';
    ctx.font = '10px sans-serif';
    ctx.fillText('ONLINE', 532, 29);
}

drawScreen();
const screenTexture = new THREE.CanvasTexture(screenCanvas);
const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 3.1),
    new THREE.MeshBasicMaterial({ map: screenTexture })
);
screenMesh.position.set(0, 2, -1.88);
monitorGroup.add(screenMesh);

scene.add(monitorGroup);

// ═══════════════════════════════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════════════════════════════

const kbGroup = new THREE.Group();

// Keyboard base
const kbBase = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.12, 1.2), keyboardMaterial);
kbBase.position.set(0, 0.15, 0.8);
kbBase.castShadow = true;
kbGroup.add(kbBase);

// Keys
const keyGeom = new THREE.BoxGeometry(0.2, 0.06, 0.2);
const keyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.5 });
for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 14; col++) {
        const key = new THREE.Mesh(keyGeom, keyMat);
        key.position.set(-1.5 + col * 0.23, 0.24, 0.35 + row * 0.22);
        kbGroup.add(key);
    }
}

// Accent keys (WASD area glow)
const accentKeyMat = new THREE.MeshStandardMaterial({ color: 0x1a4a4a, roughness: 0.4, emissive: 0x0a2020 });
[[1, 1], [0, 2], [1, 2], [2, 2]].forEach(([c, r]) => {
    const k = new THREE.Mesh(keyGeom, accentKeyMat);
    k.position.set(-1.5 + c * 0.23, 0.24, 0.35 + r * 0.22);
    kbGroup.add(k);
});

scene.add(kbGroup);

// ═══════════════════════════════════════════════════════════
// MOUSE
// ═══════════════════════════════════════════════════════════

const mouseGroup = new THREE.Group();
const mouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.18, 0.8),
    keyboardMaterial
);
mouseBody.position.set(2.8, 0.15, 0.8);
mouseBody.castShadow = true;
mouseGroup.add(mouseBody);

// Mouse wheel
const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.15, 16),
    accentMaterial
);
wheel.rotation.z = Math.PI / 2;
wheel.position.set(2.8, 0.26, 0.6);
mouseGroup.add(wheel);

// Mouse pad
const padGeom = new THREE.BoxGeometry(2, 0.02, 1.5);
const padMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 });
const pad = new THREE.Mesh(padGeom, padMat);
pad.position.set(2.8, 0.05, 0.8);
mouseGroup.add(pad);

// Accent line on mousepad
const lineGeom = new THREE.BoxGeometry(1.8, 0.025, 0.02);
const line = new THREE.Mesh(lineGeom, accentMaterial);
line.position.set(2.8, 0.065, 0.1);
mouseGroup.add(line);

scene.add(mouseGroup);

// ═══════════════════════════════════════════════════════════
// COFFEE MUG WITH STEAM
// ═══════════════════════════════════════════════════════════

const mugGroup = new THREE.Group();

// Mug body
const mugPoints = [];
for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const r = 0.4 + Math.sin(t * Math.PI * 0.3) * 0.05;
    mugPoints.push(new THREE.Vector2(r, t * 1.4));
}
const mugGeom = new THREE.LatheGeometry(mugPoints, 32);
const mug = new THREE.Mesh(mugGeom, mugMaterial);
mug.position.set(-3.5, 0.1, 1);
mug.castShadow = true;
mugGroup.add(mug);

// Handle
const handleShape = new THREE.Shape();
handleShape.moveTo(0, 0);
handleShape.bezierCurveTo(0.4, 0, 0.4, 0.8, 0, 0.8);
const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.4, 0.4, 0),
    new THREE.Vector3(0.65, 0.6, 0),
    new THREE.Vector3(0.65, 1.1, 0),
    new THREE.Vector3(0.4, 1.3, 0)
]);
const handleGeom = new THREE.TubeGeometry(handlePath, 20, 0.07, 8, false);
const handle = new THREE.Mesh(handleGeom, mugMaterial);
handle.position.set(-3.5, 0.1, 1);
mugGroup.add(handle);

// Coffee surface
const coffee = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.36, 0.05, 32),
    coffeeMaterial
);
coffee.position.set(-3.5, 1.4, 1);
mugGroup.add(coffee);

scene.add(mugGroup);

// Steam particles
const steamCount = 80;
const steamPositions = new Float32Array(steamCount * 3);
const steamData = [];

for (let i = 0; i < steamCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 0.25;
    steamPositions[i * 3] = -3.5 + Math.cos(angle) * radius;
    steamPositions[i * 3 + 1] = 1.5 + Math.random() * 1.5;
    steamPositions[i * 3 + 2] = 1 + Math.sin(angle) * radius;
    steamData.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: 0.008 + Math.random() * 0.012,
        vz: (Math.random() - 0.5) * 0.003,
        life: Math.random()
    });
}

const steamGeom = new THREE.BufferGeometry();
steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

const steamMat = new THREE.PointsMaterial({
    color: 0x888888,
    size: 0.08,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true
});

const steam = new THREE.Points(steamGeom, steamMat);
scene.add(steam);

// ═══════════════════════════════════════════════════════════
// DESK ACCESSORIES
// ═══════════════════════════════════════════════════════════

// Notebook
const notebook = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.08, 2),
    new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.8 })
);
notebook.position.set(-4.5, 0.12, 0.5);
notebook.rotation.y = 0.15;
notebook.castShadow = true;
scene.add(notebook);

// Notebook accent
const nbAccent = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.085, 2),
    accentMaterial
);
nbAccent.position.set(-5.2, 0.12, 0.5);
nbAccent.rotation.y = 0.15;
scene.add(nbAccent);

// Pen
const penGeom = new THREE.CylinderGeometry(0.025, 0.025, 1.2, 8);
const pen = new THREE.Mesh(penGeom, new THREE.MeshStandardMaterial({ color: 0x2dd4bf, roughness: 0.3, metalness: 0.5 }));
pen.position.set(-4.2, 0.18, 0.8);
pen.rotation.z = Math.PI / 2;
pen.rotation.y = -0.3;
scene.add(pen);

// Small plant pot
const potGroup = new THREE.Group();
const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.28, 0.5, 16),
    new THREE.MeshStandardMaterial({ color: 0x3d3d3d, roughness: 0.8 })
);
pot.position.set(4.5, 0.35, -0.5);
pot.castShadow = true;
potGroup.add(pot);

// Soil
const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.08, 16),
    new THREE.MeshStandardMaterial({ color: 0x2d1f1a, roughness: 1 })
);
soil.position.set(4.5, 0.58, -0.5);
potGroup.add(soil);

// Simple plant leaves
const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d5a3d, roughness: 0.7 });
for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), leafMat);
    leaf.scale.set(0.8, 1.5, 0.4);
    leaf.position.set(
        4.5 + Math.cos(angle) * 0.15,
        0.8 + i * 0.12,
        -0.5 + Math.sin(angle) * 0.15
    );
    leaf.rotation.z = (Math.random() - 0.5) * 0.5;
    potGroup.add(leaf);
}

scene.add(potGroup);

// ═══════════════════════════════════════════════════════════
// FLOOR & ENVIRONMENT
// ═══════════════════════════════════════════════════════════

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x080a0a, roughness: 0.95 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3.5;
floor.receiveShadow = true;
scene.add(floor);

// Back wall hint
const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 20),
    new THREE.MeshStandardMaterial({ color: 0x0a0c0c, roughness: 0.95 })
);
wall.position.set(0, 5, -10);
scene.add(wall);

// ═══════════════════════════════════════════════════════════
// CAMERA & CONTROLS
// ═══════════════════════════════════════════════════════════

camera.position.set(6, 5, 8);
camera.lookAt(0, 1, 0);

let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let camAngle = { x: 0.7, y: 0.4 };
let camDist = 12;
let targetDist = 12;

container.addEventListener('mousedown', e => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    camAngle.x += dx * 0.005;
    camAngle.y = Math.max(-0.3, Math.min(1.2, camAngle.y + dy * 0.005));
    prevMouse = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mouseup', () => isDragging = false);
container.addEventListener('mouseleave', () => isDragging = false);

// Touch
container.addEventListener('touchstart', e => {
    isDragging = true;
    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

container.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - prevMouse.x;
    const dy = e.touches[0].clientY - prevMouse.y;
    camAngle.x += dx * 0.005;
    camAngle.y = Math.max(-0.3, Math.min(1.2, camAngle.y + dy * 0.005));
    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

container.addEventListener('touchend', () => isDragging = false);

// Zoom
container.addEventListener('wheel', e => {
    e.preventDefault();
    targetDist = Math.max(6, Math.min(25, targetDist + e.deltaY * 0.015));
}, { passive: false });

document.getElementById('zoomIn').addEventListener('click', () => {
    targetDist = Math.max(6, targetDist - 2);
});

document.getElementById('zoomOut').addEventListener('click', () => {
    targetDist = Math.min(25, targetDist + 2);
});

// ═══════════════════════════════════════════════════════════
// ANIMATION LOOP
// ═══════════════════════════════════════════════════════════

function animate() {
    requestAnimationFrame(animate);
    
    // Camera
    camDist += (targetDist - camDist) * 0.08;
    camera.position.x = Math.sin(camAngle.x) * camDist;
    camera.position.y = 2 + camAngle.y * 6;
    camera.position.z = Math.cos(camAngle.x) * camDist;
    camera.lookAt(0, 1, 0);
    
    // Update screen
    drawScreen();
    screenTexture.needsUpdate = true;
    
    // Animate steam
    const pos = steam.geometry.attributes.position.array;
    for (let i = 0; i < steamCount; i++) {
        const d = steamData[i];
        pos[i * 3] += d.vx + Math.sin(Date.now() * 0.002 + i) * 0.002;
        pos[i * 3 + 1] += d.vy;
        pos[i * 3 + 2] += d.vz + Math.cos(Date.now() * 0.002 + i) * 0.002;
        
        if (pos[i * 3 + 1] > 4) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.25;
            pos[i * 3] = -3.5 + Math.cos(angle) * radius;
            pos[i * 3 + 1] = 1.5;
            pos[i * 3 + 2] = 1 + Math.sin(angle) * radius;
        }
    }
    steam.geometry.attributes.position.needsUpdate = true;
    
    // Screen glow pulse
    screenGlow.intensity = 0.8 + Math.sin(Date.now() * 0.002) * 0.2;
    
    // LED blink
    led.material.opacity = 0.7 + Math.sin(Date.now() * 0.003) * 0.3;
    
    renderer.render(scene, camera);
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2500);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Nav state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (scrollY >= s.offsetTop - 300) current = s.getAttribute('id');
    });
    navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
    });
    document.getElementById('nav').classList.toggle('scrolled', scrollY > 100);
});

animate();
