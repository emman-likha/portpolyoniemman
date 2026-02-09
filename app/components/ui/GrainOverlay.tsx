"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = /* glsl */ `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;

    // High-quality hash for grain
    float hash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
    }

    void main() {
        vec2 pixelCoord = vUv * uResolution;

        // Slow grain — updates ~1.5 times per second
        float t = floor(uTime * 1.5);
        float grain = hash(pixelCoord + t * 137.0);

        // Subtle centered noise
        grain = 0.5 + (grain - 0.5) * 0.4;

        gl_FragColor = vec4(vec3(grain), 1.0);
    }
`;

export default function GrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new Renderer({
            canvas,
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: "low-power",
        });
        const gl = renderer.gl;

        const geometry = new Triangle(gl);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [canvas.width, canvas.height] },
            },
            transparent: true,
            depthTest: false,
            depthWrite: false,
        });

        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            const dpr = Math.min(window.devicePixelRatio, 1.5);
            renderer.setSize(window.innerWidth, window.innerHeight);
            gl.canvas.width = window.innerWidth * dpr;
            gl.canvas.height = window.innerHeight * dpr;
            program.uniforms.uResolution.value = [
                gl.canvas.width,
                gl.canvas.height,
            ];
        }

        resize();
        window.addEventListener("resize", resize);

        let raf: number;
        let startTime = performance.now();

        function animate() {
            raf = requestAnimationFrame(animate);
            program.uniforms.uTime.value =
                (performance.now() - startTime) * 0.001;
            renderer.render({ scene: mesh });
        }

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(raf);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{ mixBlendMode: "soft-light", opacity: 0.2 }}
        />
    );
}
