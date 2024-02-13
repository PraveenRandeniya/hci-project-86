import { useState, useEffect, Suspense, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  TransformControls,
  Grid as DreiGrid,
} from "@react-three/drei";
import FurnitureModel from "../components/3d/FurnitureModel";
import { products } from "../data/products";
import {
  PlusIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SwatchIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import * as THREE from "three";
import { TextureLoader, RepeatWrapping } from "three";

// Predefined colors for furniture
const FURNITURE_COLORS = [
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
  { name: "Brown", value: "#8B4513" },
  { name: "Gray", value: "#808080" },
  { name: "Blue", value: "#4169E1" },
  { name: "Red", value: "#DC143C" },
  { name: "Green", value: "#228B22" },
  { name: "Yellow", value: "#FFD700" },
  { name: "Purple", value: "#800080" },
  { name: "Pink", value: "#FF69B4" },
];

// Room component with textures
function Room({ wallColor = "#ffffff", width = 5, length = 5, height = 3 }) {
  // Load wall textures with error handling
  const [
    brickColorMap,
    brickNormalMap,
    brickDisplacementMap,
    brickRoughnessMap,
    // Add floor textures
    floorColorMap,
    floorNormalMap,
    floorDisplacementMap,
    floorRoughnessMap,
  ] = useLoader(
    TextureLoader,
    [
      "/textures/wall/Plaster001_1K-JPG_Color.jpg",
      "/textures/wall/Plaster001_1K-JPG_NormalGL.jpg",
      "/textures/wall/Plaster001_1K-JPG_Displacement.jpg",
      "/textures/wall/Plaster001_1K-JPG_Roughness.jpg",
      // Floor textures updated to Tiles040
      "/textures/floor/Tiles040_1K-JPG_Color.jpg",
      "/textures/floor/Tiles040_1K-JPG_NormalGL.jpg",
      "/textures/floor/Tiles040_1K-JPG_Displacement.jpg",
      "/textures/floor/Tiles040_1K-JPG_Roughness.jpg",
    ],
    (loader) => {
      loader.setCrossOrigin("anonymous");
    }
  );

  // Configure wall textures with null checks
  [
    brickColorMap,
    brickNormalMap,
    brickDisplacementMap,
    brickRoughnessMap,
  ].forEach((texture) => {
    if (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(width / 2, height / 2);
    }
  });

  // Configure floor textures with null checks
  [
    floorColorMap,
    floorNormalMap,
    floorDisplacementMap,
    floorRoughnessMap,
  ].forEach((texture) => {
    if (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      // Increase the repeat for tiles to make them smaller
      texture.repeat.set(width * 2, length * 2);
    }
  });

  return (
    <group>
      {/* Floor with tiles texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          map={floorColorMap}
          normalMap={floorNormalMap}
          roughnessMap={floorRoughnessMap}
          displacementMap={floorDisplacementMap}
          displacementScale={0.02} // Reduced displacement for tiles
          normalScale={[0.5, 0.5]}
        />
      </mesh>

      {/* Walls with brick texture */}
      <group position={[0, height / 2, 0]}>
        {/* Back wall */}
        <mesh position={[0, 0, -length / 2]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial
            map={brickColorMap}
            normalMap={brickNormalMap}
            roughnessMap={brickRoughnessMap}
            displacementMap={brickDisplacementMap}
            displacementScale={0.05}
            normalScale={[0.5, 0.5]}
            color={wallColor}
          />
        </mesh>
        {/* Left wall */}
        <mesh
          position={[-width / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial
            map={brickColorMap}
            normalMap={brickNormalMap}
            roughnessMap={brickRoughnessMap}
            displacementMap={brickDisplacementMap}
            displacementScale={0.05}
            normalScale={[0.5, 0.5]}
            color={wallColor}
          />
        </mesh>
        {/* Right wall */}
        <mesh
          position={[width / 2, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial
            map={brickColorMap}
            normalMap={brickNormalMap}
            roughnessMap={brickRoughnessMap}
            displacementMap={brickDisplacementMap}
            displacementScale={0.05}
            normalScale={[0.5, 0.5]}
            color={wallColor}
          />
        </mesh>
      </group>
    </group>
  );
}

// Draggable furniture component
function DraggableFurniture({
  modelUrl,
  position,
  rotation,
  scale,
  color,
  isSelected,
  onSelect,
  onMouseDown,
}) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <FurnitureModel
        modelPath={modelUrl}
        scale={scale}
        color={color}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) {
            onSelect();
          }
        }}
      />
      {isSelected && (
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
      <mesh
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (onMouseDown) {
            onMouseDown(e, index);
          }
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="transparent" transparent />
      </mesh>
    </group>
  );
}

// Furniture catalog component
function FurnitureCatalog({ onAddFurniture }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-accent-600 text-white rounded-lg"
      >
        <PlusIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 backdrop-filter backdrop-blur-sm bg-white/20 rounded-lg shadow-xl p-4 z-50">
          <h3 className="font-medium text-lg mb-4">Available Furniture</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {products.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onAddFurniture(item);
                  setIsOpen(false);
                }}
                className="flex items-center w-full p-2 hover:bg-gray-50 rounded-lg text-left"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-primary-600">${item.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Controls Panel component
function ControlsPanel({
  wallHue,
  setWallHue,
  roomWidth,
  setRoomWidth,
  roomLength,
  setRoomLength,
  roomHeight,
  setRoomHeight,
  isOpen,
  onToggle,
}) {
  const dimensions = [
    { label: "Width", value: roomWidth, setter: setRoomWidth, min: 3, max: 10 },
    {
      label: "Length",
      value: roomLength,
      setter: setRoomLength,
      min: 3,
      max: 10,
    },
    {
      label: "Height",
      value: roomHeight,
      setter: setRoomHeight,
      min: 2,
      max: 4,
    },
  ];

  return (
    <>
      <div
        className={`absolute left-0 top-0 h-full bg-transparent shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <div className="p-6 backdrop-filter backdrop-blur-sm bg-white/20">
          <h2 className="text-xl font-montserrat font-bold text-primary-900 text-center mb-6">
            My room settings
          </h2>

          <div className="space-y-4 mb-6">
            {dimensions.map(({ label, value, setter, min, max }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm font-medium">{label} (m)</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setter((v) => Math.max(min, +(v - 0.1).toFixed(1)))
                    }
                    className="px-2 py-1 bg-primary-100 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    step="0.1"
                    value={value}
                    onChange={(e) => setter(Number(e.target.value))}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    onClick={() =>
                      setter((v) => Math.min(max, +(v + 0.1).toFixed(1)))
                    }
                    className="px-2 py-1 bg-primary-100 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-montserrat font-medium mb-2">
              Wall color
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="360"
                value={wallHue}
                onChange={(e) => setWallHue(Number(e.target.value))}
                className="flex-1 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(0, 100%, 50%), 
                    hsl(60, 100%, 50%), 
                    hsl(120, 100%, 50%), 
                    hsl(180, 100%, 50%), 
                    hsl(240, 100%, 50%), 
                    hsl(300, 100%, 50%), 
                    hsl(360, 100%, 50%))`,
                }}
              />
              <div
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: `hsl(${wallHue}, 100%, 50%)` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button
        onClick={onToggle}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-r-lg shadow-lg z-50 ${
          isOpen ? "left-80" : "left-0"
        }`}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-6 w-6 text-primary-900" />
        ) : (
          <ChevronRightIcon className="h-6 w-6 text-primary-900" />
        )}
      </button>
    </>
  );
}

export default function RoomDesigner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product: initialProduct } = location.state || {};
  const [roomFurniture, setRoomFurniture] = useState(
    initialProduct
      ? [
          {
            ...initialProduct,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: initialProduct.customizations?.scale || 1,
            color: initialProduct.customizations?.color,
          },
        ]
      : []
  );

  // Room dimensions state (in meters)
  const [roomWidth, setRoomWidth] = useState(5);
  const [roomLength, setRoomLength] = useState(5);
  const [roomHeight, setRoomHeight] = useState(3);
  const [wallHue, setWallHue] = useState(50);
  const [selectedFurnitureIndex, setSelectedFurnitureIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotationSpeed] = useState(Math.PI / 4); // 45 degrees
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(0.4); // ambient light intensity
  const [directionalLightIntensity, setDirectionalLightIntensity] =
    useState(0.8);
  const canvasContainerRef = useRef(null);

  const wallColor = `hsl(${wallHue}, 100%, 50%)`;

  const handleFurnitureSelect = (index) => {
    setSelectedFurnitureIndex(index);
  };

  const handleAddFurniture = (item) => {
    setRoomFurniture((prev) => [
      ...prev,
      {
        ...item,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1,
      },
    ]);
  };

  const handleMouseDown = (e, index) => {
    setIsDragging(true);
    setSelectedFurnitureIndex(index);
    setDragStart({
      x: e.clientX - roomFurniture[index].position[0],
      y: e.clientY - roomFurniture[index].position[2],
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedFurnitureIndex !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Calculate new position within room bounds with some padding
      const padding = 0.5; // 0.5m padding from walls
      const newX = Math.max(
        -roomWidth / 2 + padding,
        Math.min(roomWidth / 2 - padding, x * roomWidth)
      );
      const newZ = Math.max(
        -roomLength / 2 + padding,
        Math.min(roomLength / 2 - padding, y * roomLength)
      );

      setRoomFurniture((prev) => {
        const newFurniture = [...prev];
        newFurniture[selectedFurnitureIndex] = {
          ...newFurniture[selectedFurnitureIndex],
          position: [newX, 0, newZ],
        };
        return newFurniture;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle keyboard controls
  const handleKeyDown = (e) => {
    if (selectedFurnitureIndex === null) return;

    switch (e.key) {
      case "r":
      case "R":
        // Rotate right
        setRoomFurniture((prev) => {
          const newFurniture = [...prev];
          const currentRotation = newFurniture[selectedFurnitureIndex].rotation;
          newFurniture[selectedFurnitureIndex] = {
            ...newFurniture[selectedFurnitureIndex],
            rotation: [
              currentRotation[0],
              currentRotation[1] + rotationSpeed,
              currentRotation[2],
            ],
          };
          return newFurniture;
        });
        break;
      case "e":
      case "E":
        // Rotate left
        setRoomFurniture((prev) => {
          const newFurniture = [...prev];
          const currentRotation = newFurniture[selectedFurnitureIndex].rotation;
          newFurniture[selectedFurnitureIndex] = {
            ...newFurniture[selectedFurnitureIndex],
            rotation: [
              currentRotation[0],
              currentRotation[1] - rotationSpeed,
              currentRotation[2],
            ],
          };
          return newFurniture;
        });
        break;
      case "Delete":
        // Delete selected item
        setRoomFurniture((prev) =>
          prev.filter((_, index) => index !== selectedFurnitureIndex)
        );
        setSelectedFurnitureIndex(null);
        break;
      case "Escape":
        // Deselect item
        setSelectedFurnitureIndex(null);
        break;
      case "ArrowLeft":
        // Move left
        setRoomFurniture((prev) => {
          const newFurniture = [...prev];
          const currentPosition = newFurniture[selectedFurnitureIndex].position;
          const padding = 0.5;
          const newX = Math.max(
            -roomWidth / 2 + padding,
            Math.min(roomWidth / 2 - padding, currentPosition[0] - 0.1)
          );
          newFurniture[selectedFurnitureIndex] = {
            ...newFurniture[selectedFurnitureIndex],
            position: [newX, currentPosition[1], currentPosition[2]],
          };
          return newFurniture;
        });
        break;
      case "ArrowRight":
        // Move right
        setRoomFurniture((prev) => {
          const newFurniture = [...prev];
          const currentPosition = newFurniture[selectedFurnitureIndex].position;
          const padding = 0.5;
          const newX = Math.max(
            -roomWidth / 2 + padding,
            Math.min(roomWidth / 2 - padding, currentPosition[0] + 0.1)
          );
          newFurniture[selectedFurnitureIndex] = {
            ...newFurniture[selectedFurnitureIndex],
            position: [newX, currentPosition[1], currentPosition[2]],
          };
          return newFurniture;
        });
        break;
      case "ArrowUp":
        // Move forward
        setRoomFurniture((prev) => {
          const newFurniture = [...prev];
          const currentPosition = newFurniture[selectedFurnitureIndex].position;
          const padding = 0.5;
          const newZ = Math.max(
            -roomLength / 2 + padding,
            Math.min(roomLength / 2 - padding, currentPosition[2] - 0.1)
          );
          newFurniture[selectedFurnitureIndex] = {
            ...newFurniture[selectedFurnitureIndex],
            position: [currentPosition[0], currentPosition[1], newZ],
          };
          return newFurniture;
        });
        break;
      case "ArrowDown":
        // Move backward
        setRoomFurniture((prev) => {
          const newFurniture = [...prev];
          const currentPosition = newFurniture[selectedFurnitureIndex].position;
          const padding = 0.5;
          const newZ = Math.max(
            -roomLength / 2 + padding,
            Math.min(roomLength / 2 - padding, currentPosition[2] + 0.1)
          );
          newFurniture[selectedFurnitureIndex] = {
            ...newFurniture[selectedFurnitureIndex],
            position: [currentPosition[0], currentPosition[1], newZ],
          };
          return newFurniture;
        });
        break;
      default:
        break;
    }
  };

  // Handle furniture color change
  const handleFurnitureColorChange = (color) => {
    if (selectedFurnitureIndex !== null) {
      setRoomFurniture((prev) => {
        const newFurniture = [...prev];
        newFurniture[selectedFurnitureIndex] = {
          ...newFurniture[selectedFurnitureIndex],
          color: color,
        };
        return newFurniture;
      });
    }
  };

  useEffect(() => {
    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    // Add mouse event listeners when dragging
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, selectedFurnitureIndex]);

  // Update Instructions component
  const Instructions = () =>
    selectedFurnitureIndex !== null && (
      <div className="absolute top-4 left-4 bg-white/80 p-4 rounded-lg shadow-lg z-10">
        <h3 className="font-medium mb-2 text-primary-900">Controls:</h3>
        <ul className="text-sm space-y-1 text-primary-800">
          <li>• Drag with mouse to move</li>
          <li>• Arrow keys to move item</li>
          <li>• Press R to rotate right</li>
          <li>• Press E to rotate left</li>
          <li>• Press Delete to remove item</li>
          <li>• Press ESC to deselect</li>
        </ul>
      </div>
    );

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Update fullscreen state when exiting via Esc key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-montserrat font-bold mb-6">
          Room Preview
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Preview with fullscreen container */}
          <div
            ref={canvasContainerRef}
            className={`lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden relative ${
              isFullscreen ? "fixed inset-0 z-50" : ""
            }`}
            style={{ height: isFullscreen ? "100vh" : "700px" }}
          >
            {/* Floating controls for fullscreen and lighting */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-4 bg-white/80 p-4 rounded-lg shadow-lg">
              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <ArrowsPointingInIcon className="h-5 w-5" />
                ) : (
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                )}
              </button>

              {/* Lighting controls */}
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-primary-700 flex items-center gap-1">
                    <SunIcon className="h-4 w-4" />
                    Ambient Light
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(Number(e.target.value))}
                    className="w-32"
                    title="Ambient Light Intensity"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-primary-700 flex items-center gap-1">
                    <SunIcon className="h-4 w-4" />
                    Direct Light
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={directionalLightIntensity}
                    onChange={(e) =>
                      setDirectionalLightIntensity(Number(e.target.value))
                    }
                    className="w-32"
                    title="Directional Light Intensity"
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <Instructions />

            <Canvas
              shadows
              camera={{
                position: [8, 8, 8],
                fov: 50,
              }}
            >
              <Suspense fallback={null}>
                <Room
                  wallColor={wallColor}
                  width={roomWidth}
                  length={roomLength}
                  height={roomHeight}
                />
                {roomFurniture.map((item, index) => (
                  <DraggableFurniture
                    key={index}
                    modelUrl={item.modelUrl}
                    position={item.position}
                    rotation={item.rotation}
                    scale={item.scale}
                    color={item.color}
                    isSelected={selectedFurnitureIndex === index}
                    onSelect={() => handleFurnitureSelect(index)}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                  />
                ))}
                <ambientLight intensity={lightIntensity} />
                <directionalLight
                  position={[5, 5, 5]}
                  intensity={directionalLightIntensity}
                  castShadow
                />
                <OrbitControls
                  enabled={!isDragging}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={2}
                  maxDistance={20}
                />
                <Environment preset="apartment" />
                <gridHelper args={[10, 10]} />
              </Suspense>
            </Canvas>
          </div>

          {/* Controls Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-montserrat font-semibold mb-6">
              Room Settings
            </h2>

            {/* Room Dimensions */}
            <div className="mb-6">
              <h3 className="text-sm font-montserrat font-medium mb-3">
                Room Dimensions (m)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Width</label>
                  <input
                    type="number"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(Number(e.target.value))}
                    className="w-full border rounded p-2"
                    min="1"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Length</label>
                  <input
                    type="number"
                    value={roomLength}
                    onChange={(e) => setRoomLength(Number(e.target.value))}
                    className="w-full border rounded p-2"
                    min="1"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Height</label>
                  <input
                    type="number"
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(Number(e.target.value))}
                    className="w-full border rounded p-2"
                    min="1"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Wall Color */}
            <div className="mb-6">
              <h3 className="text-sm font-montserrat font-medium mb-2">
                Wall color
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={wallHue}
                  onChange={(e) => setWallHue(Number(e.target.value))}
                  className="flex-1 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(0, 100%, 50%), 
                      hsl(60, 100%, 50%), 
                      hsl(120, 100%, 50%), 
                      hsl(180, 100%, 50%), 
                      hsl(240, 100%, 50%), 
                      hsl(300, 100%, 50%), 
                      hsl(360, 100%, 50%))`,
                  }}
                />
                <div
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: `hsl(${wallHue}, 100%, 50%)` }}
                />
              </div>
            </div>

            {/* Add Furniture */}
            <div className="mb-6">
              <h3 className="text-sm font-montserrat font-medium mb-2">
                Add Furniture
              </h3>
              <select
                className="w-full border rounded p-2"
                onChange={(e) => {
                  const selectedProduct = products.find(
                    (p) => p.id === Number(e.target.value)
                  );
                  if (selectedProduct) handleAddFurniture(selectedProduct);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Furniture
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedFurnitureIndex !== null && (
              <div className="mb-6">
                <h3 className="text-sm font-montserrat font-medium mb-2">
                  Furniture Color
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {FURNITURE_COLORS.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      onClick={() =>
                        handleFurnitureColorChange(colorOption.value)
                      }
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        roomFurniture[selectedFurnitureIndex]?.color ===
                        colorOption.value
                          ? "border-primary-500 scale-110"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: colorOption.value }}
                      title={colorOption.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
