/**
 * GLB Model Viewer
 *
 * Three.js GLB viewer with orbit controls, auto-rotate, product
 * lighting, and SPA-safe cleanup. Falls back to poster image
 * when WebGL is unavailable or reduced motion is preferred.
 *
 * Three.js is loaded dynamically via import map. The viewer handles
 * full lifecycle: init, render loop, resize, and cleanup.
 *
 * @example
 * ```ts
 * import { createGlbViewer } from '@kooshapari/phenotype-3d-viewers/glb-viewer';
 *
 * const viewer = await createGlbViewer({
 *   containerId: 'product-viewer',
 *   glbPath: '/models/product.glb',
 *   poster: { src: '/images/poster.webp', alt: 'Product render' },
 *   background: 0x0F1012,
 *   autoRotate: true,
 * });
 *
 * // SPA navigation cleanup
 * viewer.destroy();
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Poster image shown during loading or when WebGL is unavailable. */
export interface PosterConfig { src: string; alt: string; }

/** Camera position as [x, y, z]. */
export type CameraPosition = [number, number, number];

export interface GlbViewerConfig {
  containerId: string;
  glbPath: string;
  poster?: PosterConfig;
  background?: number;
  cameraPosition?: CameraPosition;
  cameraTarget?: CameraPosition;
  autoRotate?: boolean;
  rotateSpeed?: number;
  orbit?: boolean;
  damping?: boolean;
  exposure?: number;
  loadingText?: string;
}

export interface GlbViewerHandle {
  getScene(): unknown;
  getRenderer(): unknown;
  resize(): void;
  destroy(): void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function webglSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function isCoarsePointer(): boolean {
  return window.matchMedia?.('(pointer: coarse)').matches ?? false;
}

/* ------------------------------------------------------------------ */
/*  Poster fallback                                                   */
/* ------------------------------------------------------------------ */

function showPoster(container: HTMLElement, poster: PosterConfig): void {
  container.innerHTML = '';
  const img = document.createElement('img');
  img.src = poster.src;
  img.alt = poster.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;aspect-ratio:16/9;';
  container.appendChild(img);
}

function createHint(container: HTMLElement): HTMLElement {
  const el = document.createElement('div');
  el.className = 'phenotype-viewer-hint';
  el.textContent = isCoarsePointer()
    ? 'Pinch to zoom \u00b7 Drag to rotate'
    : 'Drag to rotate \u00b7 Scroll to zoom';
  container.appendChild(el);
  return el;
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/** Create a GLB model viewer. Falls back to poster on WebGL failure or reduced motion. */
export async function createGlbViewer(
  config: GlbViewerConfig,
): Promise<GlbViewerHandle> {
  const {
    containerId,
    glbPath,
    poster,
    background = 0x0f1012,
    cameraPosition: camPos = [2, 1.5, 3],
    cameraTarget = [0, 0.3, 0],
    autoRotate = true,
    rotateSpeed = 2.0,
    orbit = true,
    damping = true,
    exposure = 1.1,
    loadingText = 'Loading 3D model\u2026',
  } = config;

  const container = document.getElementById(containerId);
  if (!container) {
    return { getScene: () => null, getRenderer: () => null, resize() {}, destroy() {} };
  }

  // Guard: WebGL + motion
  if (!webglSupported() || prefersReducedMotion()) {
    if (poster) showPoster(container, poster);
    return { getScene: () => null, getRenderer: () => null, resize() {}, destroy() {} };
  }

  const loadingEl = document.createElement('div');
  loadingEl.className = 'phenotype-viewer-loading';
  loadingEl.textContent = loadingText;
  container.appendChild(loadingEl);
  let destroyed = false;

  try {
    const [THREE, { OrbitControls }, { GLTFLoader }] = await Promise.all([
      import('three'),
      import('three/addons/controls/OrbitControls.js'),
      import('three/addons/loaders/GLTFLoader.js'),
    ]);
    if (destroyed) return { getScene: () => null, getRenderer: () => null, resize() {}, destroy() {} };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = exposure;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    container.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(35, rect.width / rect.height, 0.1, 100);
    camera.position.set(...camPos);
    camera.lookAt(new THREE.Vector3(...cameraTarget));

    // Controls
    let controls: ReturnType<typeof OrbitControls> | null = null;
    if (orbit) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = damping;
      controls.dampingFactor = 0.05;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = rotateSpeed;
      controls.target.set(...cameraTarget);
      controls.enablePan = false;
      controls.minDistance = 1;
      controls.maxDistance = 10;
    }

    // Basic lighting (use lighting-presets for advanced setups)
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    // Load model
    const loader = new GLTFLoader();
    const gltf = await new Promise<unknown>((resolve, reject) => {
      loader.load(glbPath, resolve, undefined, reject);
    });
    if (destroyed) {
      renderer.dispose();
      return { getScene: () => null, getRenderer: () => null, resize() {}, destroy() {} };
    }
    scene.add((gltf as { scene: THREE.Group }).scene);
    loadingEl.remove();

    // Interaction hint
    const hintEl = createHint(container);
    let hintFaded = false;
    function fadeHint(): void {
      if (hintFaded) return;
      hintFaded = true;
      hintEl.classList.add('phenotype-viewer-hint--hidden');
      setTimeout(() => hintEl.remove(), 600);
    }
    renderer.domElement.addEventListener('pointerdown', fadeHint, { once: true });

    // Render loop + resize
    let animationId: number;
    function animate(): void {
      if (destroyed) return;
      animationId = requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    }
    animate();
    const resizeObserver = new ResizeObserver(() => {
      if (destroyed) return;
      const r = container.getBoundingClientRect();
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
      renderer.setSize(r.width, r.height);
    });
    resizeObserver.observe(container);

    return {
      getScene: () => scene,
      getRenderer: () => renderer,
      resize() {
        const r = container.getBoundingClientRect();
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
        renderer.setSize(r.width, r.height);
      },
      destroy() {
        destroyed = true;
        cancelAnimationFrame(animationId);
        controls?.dispose();
        resizeObserver.disconnect();
        renderer.dispose();
        renderer.forceContextLoss?.();
        renderer.domElement?.remove();
      },
    };
  } catch {
    loadingEl.remove();
    if (poster) showPoster(container, poster);
    return { getScene: () => null, getRenderer: () => null, resize() {}, destroy() {} };
  }
}
