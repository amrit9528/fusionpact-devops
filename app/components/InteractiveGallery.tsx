"use client";

import React from "react";
import GLBModelViewer from "./GLBModelViewer";

const InteractiveGallery: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // You can have multiple models and switch between them
  const models = [{ path: "/walk_anim.glb", name: "Your 3D Model" }];

  return (
    <div className="flex flex-col items-center">
      <GLBModelViewer
        modelPath={models[0].path}
        width={800}
        height={500}
        autoRotate={false}
      />

      <div className="mt-4 text-center max-w-md">
        <p>Drag to rotate the model • Use scroll wheel to zoom</p>
      </div>
    </div>
  );
};

export default InteractiveGallery;
