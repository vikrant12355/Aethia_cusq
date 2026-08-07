"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, RefreshCw } from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  type: "COMMITTEE" | "SPECIALIST" | "ASSET";
  weight: string;
  status: string;
  pos: [number, number, number];
  color: number;
}

const NODES: NodeData[] = [
  // Central Hub
  { id: "hub", label: "AETHIA CONSENSUS MATRIX", type: "COMMITTEE", weight: "100%", status: "94.2% Agreement", pos: [0, 0, 0], color: 0x8b4513 },
  
  // LLM Committee Nodes
  { id: "gpt4", label: "GPT-4o Committee Chair", type: "COMMITTEE", weight: "45%", status: "Tactical Alpha", pos: [-3, 2, 1], color: 0x09090b },
  { id: "claude", label: "Claude 3.5 Sonnet", type: "COMMITTEE", weight: "35%", status: "Risk Parity", pos: [3, 2, -1], color: 0x27272a },
  { id: "gemini", label: "Gemini 1.5 Pro", type: "COMMITTEE", weight: "20%", status: "Yield Tilt", pos: [0, 3.2, -2.5], color: 0x3f3f46 },

  // Specialist AI Models
  { id: "lstm", label: "LSTM Deep Forecast", type: "SPECIALIST", weight: "+12.4% Est", status: "91% Conf", pos: [-4, -1.5, -2], color: 0x059669 },
  { id: "finbert", label: "FinBERT Sentiment", type: "SPECIALIST", weight: "0.78 Score", status: "88% Conf", pos: [4, -1.5, 2], color: 0x059669 },
  { id: "xgboost", label: "XGBoost Behavior", type: "SPECIALIST", weight: "Risk Matrix", status: "96% Conf", pos: [-1.5, -3, 2], color: 0x8b4513 },
  { id: "isoforest", label: "IsoForest Anomaly Guard", type: "SPECIALIST", weight: "0.12 Score", status: "Verified", pos: [1.5, -3, -2], color: 0x8b4513 },

  // Asset Target Allocation Nodes
  { id: "equities", label: "US Equities Target", type: "ASSET", weight: "48.0%", status: "Overweight", pos: [-5, 0.5, 3], color: 0x09090b },
  { id: "bonds", label: "US Treasuries Target", type: "ASSET", weight: "15.0%", status: "Neutral", pos: [5, 0.5, -3], color: 0x52525b },
  { id: "comm", label: "Real Assets / Commodities", type: "ASSET", weight: "10.0%", status: "Hedge", pos: [0, -4, 0], color: 0x8b4513 },
];

export default function ThreeConsensusMap() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(NODES[0]);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Grid Helper (Light Theme Grid)
    const grid = new THREE.GridHelper(20, 20, 0xd4d4d8, 0xe4e4e7);
    grid.position.y = -4.5;
    scene.add(grid);

    // Group for Orbiting
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Node Spheres & Rings
    const nodeMeshes: THREE.Mesh[] = [];

    NODES.forEach((node) => {
      const radius = node.type === "COMMITTEE" ? (node.id === "hub" ? 0.7 : 0.45) : 0.35;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...node.pos);
      mesh.userData = node;
      graphGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Add Chestnut Outer Ring to Central Hub & Verified Nodes
      if (node.color === 0x8b4513 || node.id === "hub") {
        const ringGeo = new THREE.RingGeometry(radius + 0.12, radius + 0.18, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x8b4513,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(...node.pos);
        graphGroup.add(ringMesh);
      }
    });

    // Connector Line Edges
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa1a1aa,
      transparent: true,
      opacity: 0.6,
    });

    // Connect all outer nodes to Central Hub
    NODES.forEach((node) => {
      if (node.id !== "hub") {
        const points = [
          new THREE.Vector3(...NODES[0].pos),
          new THREE.Vector3(...node.pos),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        graphGroup.add(line);
      }
    });

    // Raycasting for Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const node = intersects[0].object.userData as NodeData;
        setSelectedNode(node);
        container.style.cursor = "pointer";
      } else {
        container.style.cursor = "default";
      }
    };

    renderer.domElement.addEventListener("mousemove", handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating) {
        angle += 0.003;
        graphGroup.rotation.y = angle;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometryDispose(scene);
    };
  }, [isRotating]);

  function geometryDispose(scene: THREE.Scene) {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }

  return (
    <div className="relative w-full h-[400px] bg-white border border-[#e4e4e7] rounded-lg overflow-hidden flex flex-col justify-between shadow-sm">
      {/* 3D Map Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e4e4e7] px-3 py-1.5 rounded text-xs font-mono text-[#09090b] pointer-events-auto shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-[#8b4513]" />
          <span className="font-semibold tracking-wide">3D CONSENSUS MAP</span>
          <span className="text-[#71717a] border-l border-[#e4e4e7] pl-2 text-[10px]">11 NODES ACTIVE</span>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className="flex items-center gap-1.5 bg-white/90 border border-[#e4e4e7] hover:border-[#8b4513] px-2.5 py-1.5 rounded text-[11px] font-mono text-[#71717a] hover:text-[#09090b] transition-colors pointer-events-auto shadow-sm"
        >
          <RefreshCw className={`w-3 h-3 ${isRotating ? "animate-spin" : ""}`} />
          <span>{isRotating ? "AUTO-ORBIT" : "PAUSED"}</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Selected Node Details Bar */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 border border-[#e4e4e7] p-3 rounded flex items-center justify-between font-mono text-xs shadow-md">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full border border-black/10"
              style={{ backgroundColor: `#${selectedNode.color.toString(16).padStart(6, "0")}` }}
            />
            <div>
              <div className="font-semibold text-[#09090b] tracking-wide">{selectedNode.label}</div>
              <div className="text-[10px] text-[#71717a]">{selectedNode.type} // NODE ID: {selectedNode.id.toUpperCase()}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-[10px] text-[#71717a]">WEIGHT / PREDICT</div>
              <div className="font-bold text-[#8b4513]">{selectedNode.weight}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#71717a]">STATUS</div>
              <div className="font-semibold text-emerald-600">{selectedNode.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
