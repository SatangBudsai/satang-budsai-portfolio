---
title: "RETRO DASHBOARD"
description: "Real-time analytics dashboard with pixel-art aesthetic. WebSocket-powered live charts, draggable widget grid, and dark/light theme support."
longDescription: "A production-grade analytics dashboard that transforms dry data into a visually engaging retro-game experience. Live data streams in via WebSocket and renders through custom Recharts components styled with pixel-art CSS. The draggable widget grid uses dnd-kit under the hood."
tags: ["Next.js", "Recharts", "WebSocket", "Redux"]
status: "IN-PROGRESS"
difficulty: 4
featured: true
coverImage: "/projects/project-two.png"
demoUrl: "https://example.com/dashboard"
codeUrl: "https://github.com/example/retro-dashboard"
---

## Overview

Real-time dashboard for monitoring server metrics, user events, and business KPIs — with a pixel-art twist that makes data actually enjoyable to watch.

## Tech Stack

- **Frontend**: Next.js 16 App Router + TypeScript
- **Charts**: Recharts with custom pixel-style renderers
- **State**: Redux Toolkit + RTK Query
- **Real-time**: Socket.io client with exponential backoff reconnect

## Highlights

- Sub-100ms render latency for incoming WebSocket events
- Drag-and-drop widget grid with persistent layout via localStorage
- 40+ chart types all rendered in pixel aesthetic
- Export dashboard as PNG with pixel-perfect canvas capture
