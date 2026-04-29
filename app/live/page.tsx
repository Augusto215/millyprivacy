"use client";

import { useState } from "react";
import LiveViewer from "@/components/LiveViewer";

export default function LivePage() {
  const [isViewerOpen, setIsViewerOpen] = useState(true);

  return isViewerOpen ? (
    <LiveViewer />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setIsViewerOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
      >
        Abrir Live
      </button>
    </div>
  );
}
