## Project index

### Overview
AI-powered plant identification app built with Next.js 14 (App Router), React 18, Tailwind CSS, and shadcn/ui. Users can upload an image or capture via camera; images are posted to an API route that proxies the Plant.id v3 API and results are rendered responsively for desktop/mobile.

### Quick start
- **dev**: `npm run dev`
- **build**: `npm run build`
- **start**: `npm run start`

### Routes (App Router)
- **/** (`app/page.tsx`): Marketing/landing with CTA to identify plants.
- **/identify** (`app/identify/page.tsx`): Main flow for upload or camera capture.
  - Query param: `mode=upload|camera`.
  - Uses hooks `use-camera` and `use-mobile-detection` and components from `components/camera`, `components/shared`, `components/plant`.
  - Loading UI: `app/identify/loading.tsx`.
- **/api/identify-plant** (`app/api/identify-plant/route.ts`): POST endpoint that forwards base64 image(s) to Plant.id v3.
- **/about** (`app/about/page.tsx`), **/contact** (`app/contact/page.tsx`), **/privacy** (`app/privacy/page.tsx`): Static content pages.

### Data flow (identify)
1. User selects an image (upload) or captures via camera.
2. Image is converted to base64 (data URL) and stripped to raw base64.
3. Client POSTs `{ images: [base64] }` to `/api/identify-plant`.
4. API route calls Plant.id v3 with details query and returns JSON.
5. UI renders results via `PlantResultDisplay` (desktop) or `PlantResultsMobile` (mobile) with optional drawer details.
6. Errors surface via `ApiError`; loading state via `LoadingSpinner`.

### Components
- **Camera (`components/camera`)**
  - `camera-status-overlay.tsx`: Status UI while camera initializes.
  - `camera-error-display.tsx`: Error UI with retry/switch.
  - `camera-capture-button.tsx`: Floating capture button.
  - `camera-ready-indicator.tsx`: Optional ready indicator.
  - `camera.module.scss`: Styles scoped to camera components.
- **Plant (`components/plant`)**
  - `plant-result-display.tsx`: Desktop results layout.
  - `plant-results-mobile.tsx`: Mobile-first results (drawer-centric).
  - `plant-details-drawer.tsx`: Drawer for detailed plant info.
  - `plant-results.module.scss`: Styles for result views.
- **Shared (`components/shared`)**
  - `animated-counter.tsx`, `api-error.tsx`, `footer.tsx`, `image-preview.tsx`, `loading-spinner.tsx`, `site-header.tsx`, `upload-zone.tsx`, `ui.module.scss`.
- **UI (`components/ui`)**
  - shadcn/ui primitives: `alert.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `separator.tsx`.

### Hooks
- **`hooks/use-camera.ts`**: Manages camera lifecycle (device selection, constraints, readiness, capture to canvas → data URL). Exposes refs and state: `videoRef`, `canvasRef`, `isVideoReady`, `cameraStatus`, `currentFacingMode`, `availableCameras`, `isMobile`; functions: `getAvailableCameras`, `startCamera`, `capturePhoto`, `cleanupCamera`.
- **`hooks/use-mobile-detection.ts`**: UA + viewport-based mobile detection (also flags small screens).

### Styling
- Global Tailwind via `app/globals.css` (configured in `components.json`).
- Local SCSS modules: `app/page.module.scss`, `components/*/*.module.scss`.

### Config
- **`next.config.mjs`**: Ignores type/lint errors during build; `images.unoptimized` enabled.
- **`tsconfig.json`**: Strict TS, path aliases (`@/*`), App Router settings.
- **`components.json`**: shadcn/ui schema and aliases (`components`, `ui`, `lib`, `hooks`, `utils`).
- **`lib/utils.ts`**: `cn` utility (clsx + tailwind-merge).

### API integration notes
- Plant.id v3 endpoint used with `details` query for rich metadata.
- Location fields (`latitude`, `longitude`) currently static.
- The API key is presently hardcoded in `app/api/identify-plant/route.ts` — move to an environment variable and read via `process.env`.

Example env (add to `.env.local`, then update the route to use it):
```env
PLANT_ID_API_KEY=your_plant_id_key
```

### Scripts and dependencies
- Scripts in `package.json`: `dev`, `build`, `start`, `lint`.
- Key deps: `next@14`, `react@18`, `lucide-react`, `vaul`, `class-variance-authority`, `tailwindcss@4`, `tailwind-merge`, `tailwindcss-animate`.

### Notable behaviors
- Camera constraints progressively fall back across several configurations; prefers environment/back camera on mobile when available.
- Mobile/desktop result rendering automatically switches via `use-mobile-detection`.

### Potential follow-ups
- Replace hardcoded API key with `process.env.PLANT_ID_API_KEY` and add validation.
- Consider image size/quality limits before POSTing to reduce payload size.
- Optional: surface Plant.id confidence and similar images in UI if available.


