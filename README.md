<div align="center">

# QA Intelligence Platform
### *AI-Powered Test Execution & Automated Bug Reporting Engine*

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_3.8-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Transform unstructured Acceptance Criteria into comprehensive Test Cases & actionable Bug Reports instantly.</b>
</p>

</div>

---

## Executive Overview

**QA Intelligence Platform** is an ultra-fast, serverless AI application designed for QA Engineers, Software Developers, and Product Managers. It bridges the gap between software requirements and quality assurance execution by automatically generating structured, multi-scenario Test Execution Matrices directly from raw **Acceptance Criteria (AC)**.

Built on top of **Cloudflare Workers** and powered by **Google Gemini 3.8 Flash**, the platform delivers real-time scenario analysis, dynamic DOM manipulation for test outcome updates, and zero-latency Bug Report generation upon test failure.

---

## Key Features

- **Automated Scenario Generation:** Analyzes User Stories & Acceptance Criteria to generate Positive, Negative, and Edge-Case Test Scenarios.
- **Dynamic Execution Matrix:** Interactive, editable table allowing real-time modification of **Actual Results** and status toggles (`Untested`, `Passed`, `Failed`).
- **Instant Bug Report Engine:** Automatically detects `Failed` test conditions and builds structured, reproducible Bug Reports in real-time.
- **Zero-Serverless Overhead:** Powered by `workerd` Edge runtime for blazing-fast response times globally.
- **Minimalist UI/UX:** Clean, distraction-free interface built with modern Tailwind CSS.

---

## System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│     (HTML5 / Tailwind CSS / Vanilla JS Reactive DOM)   │
└───────────────────────────┬────────────────────────────┘
                            │  HTTP POST /api/chat
                            ▼
┌────────────────────────────────────────────────────────┐
│             Cloudflare Edge Worker Runtime             │
│            (Serverless Request Processing)             │
└───────────────────────────┬────────────────────────────┘
                            │  REST API (JSON Payload)
                            ▼
┌────────────────────────────────────────────────────────┐
│          Google Gemini 3.8 Flash REST API              │
│       (Structured QA Test Case Prompt Engine)          │
└────────────────────────────────────────────────────────┘
