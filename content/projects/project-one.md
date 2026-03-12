---
title: "PIXEL QUEST ENGINE"
description: "A browser-based RPG engine built with React and Canvas API. Features tile maps, collision detection, NPC dialogue system, and procedural dungeon generation."
longDescription: "Full-featured 2D RPG game engine running entirely in the browser. Built with React for the UI layer and raw Canvas API for game rendering. Supports tile-based maps loaded from Tiled editor, a dialogue system with branching choices, inventory management, and a procedural dungeon generator using BSP trees."
tags: ["React", "TypeScript", "Canvas API", "WebGL"]
status: "COMPLETED"
difficulty: 5
featured: true
coverImage: "/projects/project-one.png"
demoUrl: "https://example.com/demo"
codeUrl: "https://github.com/example/pixel-quest"
---

## Overview

This project started as a weekend experiment and grew into a full-featured game engine. The core loop runs at 60fps using `requestAnimationFrame` with a fixed timestep physics simulation.

## Architecture

The engine is split into three layers:

1. **Render layer** — Canvas 2D API with dirty-rectangle optimization
2. **Logic layer** — ECS (Entity Component System) with TypeScript generics
3. **Asset layer** — Tiled JSON map loader with blob URL caching

## Key Features

- Tile-based collision system with AABB detection
- NPC dialogue with branching choices and state persistence
- Procedural BSP dungeon generation
- Sprite animation state machine
- Local save/load via IndexedDB
