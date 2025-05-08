import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ControlsPanel({
  wallColor,
  setWallColor,
  roomWidth,
  setRoomWidth,
  roomLength,
  setRoomLength,
  roomHeight,
  setRoomHeight,
  isOpen,
  onToggle,
}) {
  return (
    <div
      className={`absolute top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "320px" }}
    >
      <button
        onClick={onToggle}
        className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white p-2 rounded-l-lg shadow-lg"
      >
        {isOpen ? (
          <ChevronRightIcon className="h-4 w-4" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4" />
        )}
      </button>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Room Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Width (meters)
              </label>
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={roomWidth}
                onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{roomWidth}m</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Length (meters)
              </label>
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={roomLength}
                onChange={(e) => setRoomLength(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{roomLength}m</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Height (meters)
              </label>
              <input
                type="range"
                min="2"
                max="5"
                step="0.1"
                value={roomHeight}
                onChange={(e) => setRoomHeight(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{roomHeight}m</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wall Color
              </label>
              <input
                type="color"
                value={wallColor}
                onChange={(e) => setWallColor(e.target.value)}
                className="w-full h-10 p-1 rounded border border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Tips</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Use the mouse to orbit around the room</li>
            <li>• Scroll to zoom in/out</li>
            <li>• Click and drag furniture to move it</li>
            <li>• Use the controls when a furniture item is selected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
