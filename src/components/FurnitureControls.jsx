import React from "react";
import {
  ArrowsUpDownIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

export default function FurnitureControls({
  selectedFurniture,
  onDelete,
  onOpenColorPicker,
  availableColors,
}) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center space-x-6">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 mb-2">Move</div>
          <div className="flex items-center justify-center space-x-2">
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">WASD / Arrows</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 mb-2">Height</div>
          <div className="flex items-center justify-center space-x-2">
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">Q / E</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 mb-2">Rotate</div>
          <div className="flex items-center justify-center space-x-2">
            <ArrowsRightLeftIcon className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">R / F</span>
          </div>
        </div>

        {availableColors && (
          <button
            onClick={onOpenColorPicker}
            className="flex flex-col items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SwatchIcon className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-sm text-gray-600">Color</span>
          </button>
        )}

        <button
          onClick={onDelete}
          className="flex flex-col items-center justify-center px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
        >
          <TrashIcon className="h-5 w-5 text-red-600 mb-1" />
          <span className="text-sm text-red-600">Delete</span>
        </button>
      </div>
    </div>
  );
}
