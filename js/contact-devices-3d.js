import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function readDataset(host) {
    return {
        email: (host.dataset.contactEmail || '').trim() || 'hello@example.com',
        phone: (host.dataset.contactPhone || '').trim() || '+48 000 000 000'
    };
}

function screenLinesFromData(data) {
    return data.email + '\n' + data.phone;
}

function makeScreenTexture(text, w, h, fontPxMax) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    var lines = String(text).split('\n');
    var fontPx = fontPxMax;
    var padX = 48;
    while (fontPx >= 28) {
        ctx.font = '600 ' + fontPx + "px Inter, system-ui, sans-serif";
        var fits = true;
        for (var t = 0; t < lines.length; t++) {
            if (ctx.measureText(lines[t]).width > w - padX) {
                fits = false;
                break;
            }
        }
        if (fits) break;
        fontPx -= 2;
    }

    var g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#1e1e26');
    g.addColorStop(1, '#14141a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    ctx.font = '600 ' + fontPx + "px Inter, system-ui, sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var lineGap = fontPx * 1.18;
    var mid = h / 2 - ((lines.length - 1) * lineGap) / 2;
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(2, Math.round(fontPx * 0.06));
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillStyle = '#fafafa';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var y = mid + i * lineGap;
        ctx.strokeText(line, w / 2, y);
        ctx.fillText(line, w / 2, y);
    }

    var tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.flipY = false;
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.x = -1;
    tex.offset.x = 1;
    tex.needsUpdate = true;
    return tex;
}

function createLaptop(screenTex) {
    var root = new THREE.Group();

    var metal = new THREE.MeshStandardMaterial({
        color: 0x71717a,
        metalness: 0.42,
        roughness: 0.38
    });
    var bw = 2.15;
    var bd = 1.42;
    var bh = 0.09;
    var base = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), metal);
    base.position.y = bh / 2;
    base.castShadow = false;
    base.receiveShadow = false;
    root.add(base);

    var hingeZ = -bd / 2 + 0.02;
    var pivot = new THREE.Group();
    pivot.position.set(0, bh, hingeZ);
    root.add(pivot);

    var lidDepth = bd - 0.06;
    var lidThick = 0.055;
    var lid = new THREE.Mesh(new THREE.BoxGeometry(bw - 0.06, lidThick, lidDepth), metal);
    lid.position.set(0, lidThick / 2, lidDepth / 2);
    lid.castShadow = false;
    pivot.add(lid);

    var sw = (bw - 0.06) * 0.96;
    var sh = lidDepth * 0.92;
    /*
     * Ekran był wewnątrz prostopadłościanu pokrywy — metal wygrywał w z-bufferze
     * i nie było widać ani gradientu ani tekstu. Wysuwamy płaszczyznę nad obudowę
     * i wyłączamy depth test, żeby zawsze rysowała się „nad” klapą.
     */
    var screenMat = new THREE.MeshBasicMaterial({
        map: screenTex,
        toneMapped: false,
        depthTest: false,
        depthWrite: false,
        transparent: false
    });
    screenMat.side = THREE.FrontSide;
    screenMat.polygonOffset = true;
    screenMat.polygonOffsetFactor = -2;
    screenMat.polygonOffsetUnits = -2;
    var screen = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), screenMat);
    /* flipY=false na teksturze + ten układ obrotów = czytelny tekst od wewnętrznej strony klapy */
    screen.rotation.set(-Math.PI / 2, Math.PI, 0);
    screen.position.set(0, -0.004, lidDepth / 2 - 0.01);
    screen.renderOrder = 20;
    pivot.add(screen);

    var hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false
    });
    var hit = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.35, 0.5, bd + 0.35), hitMat);
    hit.position.set(0, bh * 0.6, 0);
    hit.userData.leafHit = 'laptop';
    root.add(hit);

    return { root: root, pivot: pivot, screenMat: screenMat };
}

function init(host) {
    var data = readDataset(host);
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var FLOAT_Y = 1.18;
    var ORBIT_TARGET_Y_OFFSET = 0.5;

    var w = host.clientWidth || 640;
    var h = Math.max(300, Math.min(460, Math.round(w * 0.58)));

    var scene = new THREE.Scene();
    scene.background = null;

    var camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 80);
    /* Start: trochę bliżej + delikatnie z góry */
    camera.position.set(1.16, 1.78, 2.92);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    host.appendChild(renderer.domElement);

    var amb = new THREE.AmbientLight(0xf4f4f5, 0.58);
    scene.add(amb);
    var key = new THREE.DirectionalLight(0xffffff, 1.45);
    key.position.set(2.4, 5.2, 4.8);
    key.castShadow = false;
    scene.add(key);
    var fill = new THREE.DirectionalLight(0xd1fae5, 0.42);
    fill.position.set(-3.8, 3.2, -1.2);
    scene.add(fill);
    var rim = new THREE.DirectionalLight(0xe4e4e7, 0.38);
    rim.position.set(0, -0.2, -4.2);
    scene.add(rim);

    var screenTex = makeScreenTexture(screenLinesFromData(data), 1024, 640, 66);

    var laptop = createLaptop(screenTex);
    laptop.root.position.set(0, FLOAT_Y, 0);
    laptop.root.rotation.y = THREE.MathUtils.degToRad(45);
    scene.add(laptop.root);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 2.2;
    controls.maxDistance = 6.5;
    controls.minPolarAngle = 0.12;
    controls.maxPolarAngle = Math.PI - 0.15;
    controls.target.set(0, FLOAT_Y + ORBIT_TARGET_Y_OFFSET, 0);
    controls.update();

    var laptopOpen = true;

    var LID_CLOSED_X = -0.04;
    var LID_OPEN_X = -2.08;

    function laptopTargetAngle() {
        return laptopOpen ? LID_OPEN_X : LID_CLOSED_X;
    }

    laptop.pivot.rotation.x = laptopTargetAngle();

    var BOB_AMP = reducedMotion ? 0 : 0.055;
    var BOB_SPEED = 0.00105;

    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();
    var dragStart = { x: 0, y: 0 };
    var dragging = false;

    function onPointerDown(e) {
        dragging = false;
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;
    }

    function onPointerMove(e) {
        if (Math.abs(e.clientX - dragStart.x) > 6 || Math.abs(e.clientY - dragStart.y) > 6) dragging = true;
    }

    function onPointerUp(e) {
        var dx = e.clientX - dragStart.x;
        var dy = e.clientY - dragStart.y;
        if (dragging || dx * dx + dy * dy > 64) return;

        var rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        var hits = raycaster.intersectObjects(scene.children, true);
        for (var i = 0; i < hits.length; i++) {
            if (hits[i].object.userData.leafHit === 'laptop') {
                laptopOpen = !laptopOpen;
                return;
            }
        }
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    var ro = new ResizeObserver(function () {
        var nw = host.clientWidth;
        if (nw < 40) return;
        var nh = Math.max(280, Math.min(460, Math.round(nw * 0.58)));
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    });
    ro.observe(host);

    var clock = new THREE.Clock();
    var raf = 0;

    var textures = { screen: screenTex };

    function tick() {
        var dt = Math.min(clock.getDelta(), 0.05);
        var k = reducedMotion ? 18 : 10;
        var lt = laptopTargetAngle();
        laptop.pivot.rotation.x += (lt - laptop.pivot.rotation.x) * Math.min(1, dt * k);

        var bob = BOB_AMP * Math.sin(performance.now() * BOB_SPEED);
        laptop.root.position.set(0, FLOAT_Y + bob, 0);
        controls.target.set(0, FLOAT_Y + bob + ORBIT_TARGET_Y_OFFSET, 0);

        controls.update();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function dispose() {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.domElement.removeEventListener('pointerdown', onPointerDown);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('pointerup', onPointerUp);
        controls.dispose();
        if (textures.screen) textures.screen.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    }

    function refreshTextures() {
        var d = readDataset(host);
        var nt = makeScreenTexture(screenLinesFromData(d), 1024, 640, 66);
        if (textures.screen) textures.screen.dispose();
        textures.screen = nt;
        laptop.screenMat.map = nt;
        laptop.screenMat.needsUpdate = true;
    }

    window.LEAF_CONTACT_3D = { dispose: dispose, refreshTextures: refreshTextures };
}

var host = document.getElementById('contactDevicesHost');
if (host) {
    try {
        init(host);
    } catch (e) {
        console.warn('contact-devices-3d:', e);
        host.classList.add('contact-devices-fallback');
    }
}
