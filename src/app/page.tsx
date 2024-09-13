"use client";

import React from "react";
import { Sidebar } from "../components/sidebar";

function MainContent() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome to the Lab</h1>
      <p className="mb-4">
        This is the main page of our UI component laboratory.
      </p>
      <p>
        Select an example from the sidebar to explore different UI components
        and experiments.
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <MainContent />
      </main>
    </div>
  );
}
