import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const readDataset = (host) => ({
    email: (host.dataset.contactEmail || '').trim() || 'hello@example.com',
    phone: (host.dataset.contactPhone || '').trim() || '+48 000 000 000',
});

const screenLinesFromData = (data) => `${data.email}\n${data.phone}`;

const makeScreenTexture = (text, w, h, fontPxMax) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const lines = String(text).split('\n');
    let fontPx = fontPxMax;
    const padX = 48;
    while (fontPx >= 28) {
        ctx.font = `600 ${fontPx}px Inter, system-ui, sans-serif`;
        const fits = lines.every((line) => ctx.measureText(line).width <= w - padX);
        if (fits) break;
        fontPx -= 2;
    }

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#1e1e26');
    g.addColorStop(1, '#14141a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const accentRgb = window.LEAF_COLORS?.accentRgb || '16, 185, 129';
    ctx.strokeStyle = `rgba(${accentRgb}, 0.45)`;
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    ctx.font = `600 ${fontPx}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lineGap = fontPx * 1.18;
    const mid = h / 2 - ((lines.length - 1) * lineGap) / 2;
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(2, Math.round(fontPx * 0.06));
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillStyle = '#fafafa';
    lines.forEach((line, i) => {
        const y = mid + i * lineGap;
        ctx.strokeText(line, w / 2, y);
        ctx.fillText(line, w / 2, y);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.flipY = false;
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.x = -1;
    tex.offset.x = 1;
    tex.needsUpdate = true;
    return tex;
};

const createLaptop = (screenTex) => {
    const root = new THREE.Group();

    const metal = new THREE.MeshStandardMaterial({
        color: 0x71717a,
        metalness: 0.42,
        roughness: 0.38,
    });
    const bw = 2.15;
    const bd = 1.42;
    const bh = 0.09;
    const base = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), metal);
    base.position.y = bh / 2;
    base.castShadow = false;
    base.receiveShadow = false;
    root.add(base);

    const hingeZ = -bd / 2 + 0.02;
    const pivot = new THREE.Group();
    pivot.position.set(0, bh, hingeZ);
    root.add(pivot);

    const lidDepth = bd - 0.06;
    const lidThick = 0.055;
    const lid = new THREE.Mesh(new THREE.BoxGeometry(bw - 0.06, lidThick, lidDepth), metal);
    lid.position.set(0, lidThick / 2, lidDepth / 2);
    lid.castShadow = false;
    pivot.add(lid);

    const sw = (bw - 0.06) * 0.96;
    const sh = lidDepth * 0.92;

    const screenMat = new THREE.MeshBasicMaterial({
        map: screenTex,
        toneMapped: false,
        depthTest: false,
        depthWrite: false,
        transparent: false,
    });
    screenMat.side = THREE.FrontSide;
    screenMat.polygonOffset = true;
    screenMat.polygonOffsetFactor = -2;
    screenMat.polygonOffsetUnits = -2;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), screenMat);
    screen.rotation.set(-Math.PI / 2, Math.PI, 0);
    screen.position.set(0, -0.004, lidDepth / 2 - 0.01);
    screen.renderOrder = 20;
    pivot.add(screen);

    const hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
    });
    const hit = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.35, 0.5, bd + 0.35), hitMat);
    hit.position.set(0, bh * 0.6, 0);
    hit.userData.leafHit = 'laptop';
    root.add(hit);

    return { root, pivot, screenMat };
};

const init = (host) => {
    const data = readDataset(host);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const FLOAT_Y = 1.18;
    const ORBIT_TARGET_Y_OFFSET = 0.5;

    const w = host.clientWidth || 640;
    const h = Math.max(300, Math.min(460, Math.round(w * 0.58)));

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 80);
    camera.position.set(1.16, 1.78, 2.92);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    host.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xf4f4f5, 0.58);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 1.45);
    key.position.set(2.4, 5.2, 4.8);
    key.castShadow = false;
    scene.add(key);
    const accentHex = Number.parseInt((window.LEAF_COLORS?.accent || '#10b981').slice(1), 16);
    const fill = new THREE.DirectionalLight(accentHex, 0.28);
    fill.position.set(-3.8, 3.2, -1.2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xe4e4e7, 0.38);
    rim.position.set(0, -0.2, -4.2);
    scene.add(rim);

    const screenTex = makeScreenTexture(screenLinesFromData(data), 1024, 640, 66);

    const laptop = createLaptop(screenTex);
    laptop.root.position.set(0, FLOAT_Y, 0);
    laptop.root.rotation.y = THREE.MathUtils.degToRad(45);
    scene.add(laptop.root);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 2.2;
    controls.maxDistance = 6.5;
    controls.minPolarAngle = 0.12;
    controls.maxPolarAngle = Math.PI - 0.15;
    controls.target.set(0, FLOAT_Y + ORBIT_TARGET_Y_OFFSET, 0);
    controls.update();

    let laptopOpen = true;

    const LID_CLOSED_X = -0.04;
    const LID_OPEN_X = -2.08;

    const laptopTargetAngle = () => (laptopOpen ? LID_OPEN_X : LID_CLOSED_X);

    laptop.pivot.rotation.x = laptopTargetAngle();

    const BOB_AMP = reducedMotion ? 0 : 0.055;
    const BOB_SPEED = 0.00105;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragStart = { x: 0, y: 0 };
    let dragging = false;

    const onPointerDown = (e) => {
        dragging = false;
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;
    };

    const onPointerMove = (e) => {
        if (Math.abs(e.clientX - dragStart.x) > 6 || Math.abs(e.clientY - dragStart.y) > 6) {
            dragging = true;
        }
    };

    const onPointerUp = (e) => {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (dragging || dx * dx + dy * dy > 64) return;

        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(scene.children, true);
        for (const hit of hits) {
            if (hit.object.userData.leafHit === 'laptop') {
                laptopOpen = !laptopOpen;
                return;
            }
        }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const ro = new ResizeObserver(() => {
        const nw = host.clientWidth;
        if (nw < 40) return;
        const nh = Math.max(280, Math.min(460, Math.round(nw * 0.58)));
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    });
    ro.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;

    const textures = { screen: screenTex };

    const tick = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        const k = reducedMotion ? 18 : 10;
        const lt = laptopTargetAngle();
        laptop.pivot.rotation.x += (lt - laptop.pivot.rotation.x) * Math.min(1, dt * k);

        const bob = BOB_AMP * Math.sin(performance.now() * BOB_SPEED);
        laptop.root.position.set(0, FLOAT_Y + bob, 0);
        controls.target.set(0, FLOAT_Y + bob + ORBIT_TARGET_Y_OFFSET, 0);

        controls.update();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const dispose = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.domElement.removeEventListener('pointerdown', onPointerDown);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('pointerup', onPointerUp);
        controls.dispose();
        if (textures.screen) textures.screen.dispose();
        renderer.dispose();
        renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };

    const refreshTextures = () => {
        const d = readDataset(host);
        const nt = makeScreenTexture(screenLinesFromData(d), 1024, 640, 66);
        if (textures.screen) textures.screen.dispose();
        textures.screen = nt;
        laptop.screenMat.map = nt;
        laptop.screenMat.needsUpdate = true;
    };

    window.LEAF_CONTACT_3D = { dispose, refreshTextures };
};

const host = document.getElementById('contactDevicesHost');
if (host) {
    try {
        init(host);
    } catch (e) {
        console.warn('contact-devices-3d:', e);
        host.classList.add('contact-devices-fallback');
    }
}
