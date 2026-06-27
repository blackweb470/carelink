# KAYZ CareLink — Technical Specification

## Project Overview

KAYZ CareLink is a clinical dashboard / healthcare SaaS single-page application built for General Practitioners and care home staff to monitor remote patients via cellular gateway hubs and wearable sensors. The app features a login/setup wizard, clinical dashboard with real-time alerts and patient directory, individual patient biometric trend charts with threshold configuration, and a hardware provisioning panel for device management.

---

## Development Environment

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| TypeScript | ~5.6 | Type safety |
| Vite | ~6 | Build tool / dev server |
| Tailwind CSS | 3 | Utility-first styling |
| shadcn/ui | latest | Component primitives (CLI-installed) |

---

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | Core UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `react-router-dom` | ^7.1.0 | Client-side routing (Dashboard, Patient, Hardware pages) |
| `recharts` | ^2.15.0 | Biometric trend charts (line charts with thresholds, tooltips, crosshair) |
| `lucide-react` | ^0.469.0 | Icon library (all functional icons: Dashboard, Users, Activity, Cpu, Bell, Search, etc.) |
| `clsx` | ^2.1.0 | Conditional class name composition |
| `tailwind-merge` | ^2.6.0 | Tailwind class conflict resolution |
| `class-variance-authority` | ^0.7.0 | Component variant management (used by shadcn Button, Badge) |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ~5.6.0 | TypeScript compiler |
| `vite` | ^6.0.0 | Build tool |
| `@vitejs/plugin-react` | ^4.3.0 | React support for Vite |
| `tailwindcss` | ^3.4.0 | CSS framework |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | Vendor prefix automation |
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | React DOM type definitions |

### Fonts (loaded via Google Fonts CDN in index.html)

| Font | Weights | Usage |
|------|---------|-------|
| DM Sans | 400 | All headings (H1, H2, H3, metric values) — always weight 400 |
| Inter | 400, 500 | Body text, UI elements, table data, badges, form inputs |

---

## Component Inventory

### shadcn/ui Components (built-in, install via CLI)

These are used as-is or with minor style overrides to match the design system:

| Component | Source | Usage |
|-----------|--------|-------|
| `button` | shadcn built-in | All buttons (Primary, Secondary/Outline, Ghost, Danger variants). Override: border-radius 4px, font Inter 400, custom color tokens |
| `badge` | shadcn built-in | Status badges (Critical, Warning, Success, Resolved, Info). Override: pill shape (border-radius 12px), font Inter 400 1.1rem, custom color variants |
| `input` | shadcn built-in | All text/number/email inputs. Override: border-radius 4px, padding 12px 16px, focus ring with #0E61FE |
| `select` | shadcn built-in | Dropdown selectors (role, care setting, device type, patient selection). Override: same border/focus styling as inputs |
| `dialog` | shadcn built-in | Confirmation modals (dismiss alert, delete device, reset thresholds). Override: overlay rgba(0,0,0,0.4), panel max-width 480px, scale-in animation |
| `checkbox` | shadcn built-in | Table row selection, batch actions. Override: 16px square, #D4D4D4 border default |
| `label` | shadcn built-in | Form field labels. Override: font Inter 1.4rem #262626 |
| `tabs` | shadcn built-in | Biometric chart type switching (BP/Glucose/HR/SpO2). Override: bottom border indicator style |
| `dropdown-menu` | shadcn built-in | Table row action menus (View Profile, Edit, Unlink Device). Override: shadow and border styling |
| `table` | shadcn built-in | Patient Directory and Device Inventory tables. Override: custom row hover, active row styling, sort indicators |
| `tooltip` | shadcn built-in | Chart hover tooltips, info icon tooltips. Override: white bg, 8px radius, shadow |
| `sonner` | shadcn built-in | Toast notification system (success/error/info/warning). Override: colored left border, slide-in animation, 4s auto-dismiss |
| `separator` | shadcn built-in | Section dividers, table row borders, sidebar/user divider |
| `avatar` | shadcn built-in | Patient avatars (initials or photo), user profile area. Override: 80px patient, smaller for user |
| `scroll-area` | shadcn built-in | Alert feed scrollable list, dropdown scroll. Override: 6px scrollbar width |
| `card` | shadcn built-in | All card containers. Override: border-radius 8px, border #D4D4D4, padding 24px |
| `skeleton` | shadcn built-in | Loading placeholders for cards, charts, table rows. Override: #F5F5F5 base color |

### Custom Components (build from scratch)

| Component | File | Description |
|-----------|------|-------------|
| `Sidebar` | `components/Sidebar.tsx` | Persistent sidebar nav (256px desktop, 64px collapsed tablet, hidden mobile). Handles active state, icon-only collapse, hover expand. Contains nav items + user profile footer |
| `MobileNav` | `components/MobileNav.tsx` | Bottom tab bar for <768px. 56px fixed bottom, 3-4 tabs with icon+label |
| `HeaderBar` | `components/HeaderBar.tsx` | Sticky header (56px). Page title left, date + refresh button right. Border-bottom #D4D4D4 |
| `MetricCard` | `components/MetricCard.tsx` | Dashboard stat cards with icon circle, value, label, trend indicator. 4 variants on dashboard. Supports entrance animation |
| `AlertCard` | `components/AlertCard.tsx` | Critical/Warning alert cards with left accent border, patient info, description, action buttons (Acknowledge, View Patient, Dismiss). Color variants with hover tints |
| `AlertFeed` | `components/AlertFeed.tsx` | Scrollable container for AlertCard list with filter tabs (All/Critical/Warning/Resolved). Max-height 400px, custom scrollbar |
| `PatientTable` | `components/PatientTable.tsx` | Full-featured table with search (debounced), sorting, pagination, row selection, status badges, action dropdown. Toolbar with filters + Add Patient button |
| `DeviceInventoryTable` | `components/DeviceInventoryTable.tsx` | Hardware inventory table with search, filter tabs, battery level display, status badges, edit/delete actions |
| `BiometricChart` | `components/BiometricChart.tsx` | Recharts-based line chart wrapper. Accepts data series config (color, label), threshold lines, time range. Custom tooltip, crosshair hover, SVG line-draw animation |
| `ThresholdForm` | `components/ThresholdForm.tsx` | Clinical threshold configuration panel. 5 numeric inputs with current reading indicators. Save/Reset actions with validation |
| `RegisterGatewayForm` | `components/RegisterGatewayForm.tsx` | Hub registration form (serial, location, nickname). Duplicate validation, info box, submit flow |
| `AssignSensorForm` | `components/AssignSensorForm.tsx` | Sensor pairing form (patient dropdown with search, MAC address, device type, hub assignment). Patient data integration |
| `FilterButtonGroup` | `components/FilterButtonGroup.tsx` | Horizontal segmented filter buttons (active/inactive states). Used for alert filters, time ranges, device filters |
| `StatusDot` | `components/StatusDot.tsx` | 8px colored circle indicator (green/yellow/red) with optional label. Used in tables, metric cards |
| `LoadingScreen` | `components/LoadingScreen.tsx` | Full-viewport loading overlay with brandmark, CareLink text, pulsing dots. Blurred background image + white overlay |
| `SetupWizard` | `components/SetupWizard.tsx` | 3-step setup flow (Profile, Practice, Hardware). Step indicator, form panels, slide transitions between steps |
| `BackButton` | `components/BackButton.tsx` | ChevronLeft + "Back to Dashboard" link for Patient Detail page |
| `PatientSummary` | `components/PatientSummary.tsx` | Patient header card with avatar, name, NHS number, clinician, room, 4-column mini-stats grid |
| `EmptyState` | `components/EmptyState.tsx` | Centered placeholder for empty tables/lists with icon + message + optional action |

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useToast` | `hooks/use-toast.ts` | Toast notification trigger (wraps shadcn sonner). Add/dismiss toasts with variants |
| `useDebounce` | `hooks/useDebounce.ts` | Debounce search input values (300ms). Used in PatientTable and DeviceInventoryTable |
| `useMediaQuery` | `hooks/useMediaQuery.ts` | Responsive breakpoint detection (desktop/tablet/mobile) for conditional rendering |
| `useAutoRefresh` | `hooks/useAutoRefresh.ts` | 30-second interval data refresh for dashboard. Returns refresh function + lastUpdated timestamp |
| `useFormState` | `hooks/useFormState.ts` | Generic form state management with validation, submit/loading/success/error states |

---

## Animation Implementation Plan

### Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Loading sequence** (brandmark fade, text slide, dots pulse) | Framer Motion | `motion.div` with initial/animate/transition. Brandmark: opacity 0→1 0.5s. Text: translateY(10px)→0 + opacity 0.5s delay. Dots: staggered scale pulse with `repeat: Infinity` | Medium |
| **Loading screen exit** | Framer Motion | `AnimatePresence` with exit prop: opacity 1→0 0.4s ease-in. On exit complete, render setup wizard | Low |
| **Setup wizard step transitions** | Framer Motion | `AnimatePresence` with `mode="wait"`. Current step: translateX(0→-20px), opacity(1→0) 0.2s. New step: translateX(20px→0), opacity(0→1) 0.25s 0.1s delay | Medium |
| **Step indicator checkmark** | Framer Motion | `motion.div` scale(0→1) with spring bounce transition on step completion | Low |
| **Page route transitions** | Framer Motion | `AnimatePresence` wrapping route outlet. Exit: opacity 1→0 0.15s. Enter: opacity 0→1 0.2s 0.1s delay | Medium |
| **Metric cards staggered entrance** | Framer Motion | Parent `motion.div` with `staggerChildren: 0.08`. Each card: `variants` with y:10→0, opacity:0→1, 0.3s ease-out | Low |
| **Alert card slide-in (new alert)** | Framer Motion | `motion.div` initial: translateY(-20px), opacity:0. Animate: translateY(0), opacity:1, 0.3s ease-out | Low |
| **Alert card slide-out (dismiss)** | Framer Motion | `AnimatePresence` exit: translateX(0→100%), opacity(1→0), 0.3s ease-in. onExitComplete removes from state | Medium |
| **Tab indicator slide** | CSS Transition | Absolute-positioned bottom border element. `transition: transform 0.2s ease-out, width 0.2s ease-out`. JS calculates target position on active tab change | Low |
| **Chart tab cross-fade** | Framer Motion | `AnimatePresence mode="wait"`. Exit: opacity 0.15s. Enter: opacity 0.2s 0.1s delay | Low |
| **Chart line draw animation** | Recharts + CSS | Recharts `<Line>` with `animationDuration={800}` and `animationEasing="ease-out"`. Built-in Recharts line animation handles stroke-dashoffset | Low |
| **Chart data points fade-in** | Recharts | Recharts `dot` with custom `animationBegin` staggered by index * 20ms | Low |
| **Chart threshold line animation** | Framer Motion | `motion.line` with animated y1/y2 properties. When thresholds update, spring animation to new position 0.5s | Medium |
| **Chart hover crosshair + tooltip** | Recharts | Recharts `<Tooltip>` + custom cursor component (vertical line). Built-in Recharts hover behavior with custom tooltip styling | Low |
| **Threshold save button state** | Framer Motion | `AnimatePresence` for button content swap: spinner → "Saved!" + checkmark → default text. Each state cross-fades | Low |
| **Modal overlay + panel** | Framer Motion | Overlay: `motion.div` opacity 0→1 0.2s. Panel: scale(0.95→1) + opacity(0→1) 0.25s ease-out. `AnimatePresence` for exit | Medium |
| **Toast slide-in/out** | shadcn sonner | Sonner handles entry/exit. Override CSS for: slide-from-right entry (translateX 100%→0, 0.3s), slide-right exit, 4s auto-dismiss with progress bar | Low |
| **Sidebar collapse/expand (tablet)** | CSS Transition | `transition: width 0.3s ease-in-out`. Width 64px↔256px. Labels opacity transition 0.2s | Low |
| **Button hover states** | CSS Transition | `transition: background-color 0.2s ease, box-shadow 0.2s ease` on all button variants | Low |
| **Card hover shadow** | CSS Transition | `transition: box-shadow 0.2s ease`. Default: none. Hover: `0 2px 8px rgba(0,0,0,0.04)` | Low |
| **Table row hover** | CSS Transition | `transition: background-color 0.15s ease`. White→#F5F5F5 | Low |
| **Refresh button spin** | CSS Animation | `@keyframes spin { to { transform: rotate(360deg) } }`. Applied on click for 0.5s, `animation: spin 0.5s linear` | Low |
| **Skeleton pulse** | CSS Animation | `@keyframes pulse { 0%,100% { opacity:0.5 } 50% { opacity:1 } }`. `animation: pulse 1.5s ease-in-out infinite` | Low |
| **Metric value flash on update** | CSS Animation | Brief background highlight: `@keyframes flash { 0% { background: #EBF2FF } 100% { background: transparent } }`. 0.5s animation on data change | Low |
| **Inventory table row slide-in** | Framer Motion | `motion.tr` initial: translateY(-10px), opacity:0. Animate: translateY(0), opacity:1, 0.3s | Low |
| **Inventory row slide-out (delete)** | Framer Motion | `AnimatePresence` exit: translateX(0→100%), opacity(1→0), 0.3s | Low |
| **Form button loading spinner** | CSS Animation | `@keyframes spin` continuous rotation 0.8s linear infinite on spinner icon inside button | Low |

### Animation Library Selection Rationale

**Framer Motion** (primary): Chosen for all component-level animations (entrance/exit, layout transitions, AnimatePresence) because:
- Declarative API fits React component model
- `AnimatePresence` handles mount/unmount animations (critical for alert dismissal, page transitions, step wizard)
- Layout animations for sidebar expand/collapse and tab indicator sliding
- Built-in spring physics for bounce effects (checkmarks)
- Exit animations (alerts sliding out, modals closing)

**Recharts built-in animations**: Used for chart-specific animations (line draw, data point fade) because:
- Recharts has native animationDuration/animationEasing props on Line/Area components
- No need to hand-code SVG path animations
- Tooltip and crosshair are built-in Recharts features with customization hooks

**CSS Transitions/Animations**: Used for simple hover states, micro-interactions because:
- No JS overhead for simple color/shadow/transform changes
- Declarative in Tailwind via `transition-*` utilities
- Better performance for high-frequency hover states

### Reduced Motion Support

All animations respect `prefers-reduced-motion`:
- Wrap Framer Motion `motion` components with `useReducedMotion()` hook
- When reduced motion: set all transition durations to 0, disable spring animations
- CSS: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

---

## State & Logic Plan

### State Management Architecture

React Context + useReducer for global state. No external state library needed — the app is a dashboard with primarily read-heavy data and localized form states.

#### Global Contexts

| Context | State | Consumers |
|---------|-------|-----------|
| `AppContext` | currentRoute, userProfile, sidebarCollapsed | App, Sidebar, HeaderBar, MobileNav |
| `PatientContext` | patients[], selectedPatientId, loading | Dashboard, PatientDetail, PatientTable, AssignSensorForm |
| `AlertContext` | alerts[], filter, loading | Dashboard, AlertFeed, MetricCard |
| `HardwareContext` | hubs[], sensors[], loading | Hardware, DeviceInventoryTable, RegisterGatewayForm, AssignSensorForm |
| `ThresholdContext` | thresholdsByPatientId, saving | PatientDetail, ThresholdForm, BiometricChart |
| `ToastContext` | toasts[] | All components (via useToast hook) |

#### Data Flow

```
App (contexts wrapper)
├── Sidebar / MobileNav (reads: route, user)
├── HeaderBar (reads: route, user; writes: refresh)
└── Routes
    ├── LoadingScreen + SetupWizard (writes: userProfile, patients)
    ├── Dashboard (reads: alerts, patients; writes: alert status)
    │   ├── MetricCards (reads: aggregated data)
    │   ├── AlertFeed (reads/writes: alerts)
    │   └── PatientTable (reads: patients)
    ├── PatientDetail (reads: patient, thresholds; writes: thresholds)
    │   ├── PatientSummary (reads: patient)
    │   ├── BiometricChart (reads: patient readings + thresholds)
    │   ├── ThresholdForm (reads/writes: thresholds)
    │   └── RecentReadingsTable (reads: patient readings)
    └── Hardware (reads/writes: hubs, sensors)
        ├── RegisterGatewayForm (writes: hubs)
        ├── AssignSensorForm (reads: patients, hubs; writes: sensors)
        └── DeviceInventoryTable (reads: hubs, sensors)
```

### Mock Data Structure

All data is mock data arrays managed in context. No API integration.

**Patient**:
```typescript
interface Patient {
  id: string;
  name: string;
  nhsNumber: string;
  age: number;
  room: string;
  primaryClinician: string;
  primaryDevice: string;
  lastReading: { type: string; value: string; timestamp: string; severity: 'critical' | 'warning' | 'stable' };
  status: 'critical' | 'warning' | 'stable';
  initials: string;
  readings: BiometricReading[];
}
```

**Alert**:
```typescript
interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  severity: 'critical' | 'warning';
  description: string;
  timestamp: string;
  status: 'unresolved' | 'acknowledged' | 'dismissed';
}
```

**BiometricReading**:
```typescript
interface BiometricReading {
  id: string;
  patientId: string;
  timestamp: string;
  deviceType: string;
  readingType: 'bloodPressure' | 'bloodGlucose' | 'heartRate' | 'oxygenSaturation';
  value: number | { systolic: number; diastolic: number };
  unit: string;
  status: 'critical' | 'warning' | 'stable';
}
```

**Hub**:
```typescript
interface Hub {
  id: string;
  serialNumber: string;
  location: string;
  nickname?: string;
  status: 'online' | 'offline';
  lastSeen: string;
}
```

**Sensor**:
```typescript
interface Sensor {
  id: string;
  macAddress: string;
  deviceType: 'Wristband Monitor' | 'Blood Pressure Cuff' | 'Glucose Meter' | 'Pulse Oximeter';
  patientId?: string;
  patientName?: string;
  hubId: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  battery?: number;
}
```

**Thresholds**:
```typescript
interface ThresholdConfig {
  patientId: string;
  maxSystolic: number;
  maxDiastolic: number;
  maxBloodGlucose: number;
  minSpO2: number;
  maxHeartRate: number;
}
```

### Business Logic

| Logic Module | Location | Description |
|-------------|----------|-------------|
| Alert filtering | `AlertFeed` component | Filter alerts by severity tab (All/Critical/Warning/Resolved). Computed from alerts[] + activeFilter |
| Alert acknowledgment | `AlertContext` reducer | On acknowledge: update alert.status→'acknowledged', trigger toast, remove from unresolved count |
| Patient search | `PatientTable` component | Debounced search across name, room, NHS number. Filters patients[] reactively |
| Patient sorting | `PatientTable` component | Column sort (name, room, age, lastReading). Toggle asc/desc/unset. Single-column sort only |
| Table pagination | `PatientTable` component | Slice patients[] by currentPage + pageSize. Boundary checks for prev/next |
| Device search/filter | `DeviceInventoryTable` | Search across ID/location/patient. Filter tabs: All/Hubs/Sensors/Online/Offline |
| Threshold validation | `ThresholdForm` component | Numeric validation (0-999), required fields. Enable save only when all valid and changed from saved |
| Duplicate checking | `RegisterGatewayForm` + `AssignSensorForm` | Check serial/MAC against existing hubs/sensors before submission |
| Chart data aggregation | `BiometricChart` component | Filter readings[] by time range (24H/7D/30D/90D) and readingType. Format for Recharts |
| Auto-refresh | `useAutoRefresh` hook | 30s interval triggers data refresh callback. Exposes refresh() + lastUpdated timestamp |
| Responsive layout | `useMediaQuery` hook | Tracks breakpoints: desktop (>1024px), tablet (768-1024px), mobile (<768px) |

### Routing Structure

```
/                    → LoadingScreen → SetupWizard (first visit) OR /dashboard (returning)
/dashboard           → Dashboard page (metrics, alerts, patient table)
/patients/:id        → PatientDetail page (summary, charts, thresholds, readings)
/hardware            → Hardware page (forms, inventory table)
```

React Router v7 with `BrowserRouter`. Route transitions managed via Framer Motion `AnimatePresence` on the outlet.

---

## Project File Structure

```
├── public/
│   └── assets/
│       ├── loading-screen-bg.jpg       # Blurred medical background for loading screen
│       ├── setup-illustration.jpg      # Care home illustration for setup left panel
│       ├── gateway-hub.png             # Gateway hub product render (transparent bg)
│       └── wearable-sensor.png         # Wearable sensor product render (transparent bg)
│
├── src/
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components (auto-installed via CLI)
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── label.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── card.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── Sidebar.tsx                 # Persistent sidebar navigation
│   │   ├── MobileNav.tsx               # Bottom tab bar for mobile
│   │   ├── HeaderBar.tsx               # Sticky page header
│   │   ├── MetricCard.tsx              # Dashboard stat cards
│   │   ├── AlertCard.tsx               # Critical/Warning alert cards
│   │   ├── AlertFeed.tsx               # Scrollable alert list with filters
│   │   ├── PatientTable.tsx            # Patient directory table (search, sort, paginate)
│   │   ├── DeviceInventoryTable.tsx    # Hardware inventory table
│   │   ├── BiometricChart.tsx          # Recharts line chart with thresholds
│   │   ├── ThresholdForm.tsx           # Clinical threshold configuration
│   │   ├── RegisterGatewayForm.tsx     # Hub registration form
│   │   ├── AssignSensorForm.tsx        # Sensor pairing form
│   │   ├── FilterButtonGroup.tsx       # Segmented filter buttons
│   │   ├── StatusDot.tsx               # Colored status indicator
│   │   ├── LoadingScreen.tsx           # Initial loading overlay
│   │   ├── SetupWizard.tsx             # 3-step setup flow
│   │   ├── BackButton.tsx              # Back navigation link
│   │   ├── PatientSummary.tsx          # Patient header card
│   │   └── EmptyState.tsx              # Empty state placeholder
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx               # Main clinical dashboard
│   │   ├── PatientDetail.tsx           # Individual patient profile
│   │   └── Hardware.tsx                # Device provisioning page
│   │
│   ├── context/
│   │   ├── AppContext.tsx              # Route, user profile, sidebar state
│   │   ├── PatientContext.tsx           # Patient data, selection
│   │   ├── AlertContext.tsx             # Alert data, filtering
│   │   ├── HardwareContext.tsx          # Hub and sensor registry
│   │   └── ThresholdContext.tsx         # Per-patient threshold configs
│   │
│   ├── hooks/
│   │   ├── use-toast.ts                # Toast notification trigger
│   │   ├── useDebounce.ts              # Debounce hook for search
│   │   ├── useMediaQuery.ts            # Responsive breakpoint detection
│   │   ├── useAutoRefresh.ts           # 30s auto-refresh interval
│   │   └── useFormState.ts             # Generic form state + validation
│   │
│   ├── data/
│   │   ├── mockPatients.ts             # Patient seed data (~20 patients)
│   │   ├── mockAlerts.ts               # Alert seed data (~15 alerts)
│   │   ├── mockReadings.ts             # Biometric readings time-series data
│   │   ├── mockHubs.ts                 # Gateway hub seed data (~10 hubs)
│   │   ├── mockSensors.ts              # Sensor seed data (~15 sensors)
│   │   └── mockThresholds.ts           # Default threshold configurations
│   │
│   ├── types/
│   │   └── index.ts                    # All TypeScript interfaces and types
│   │
│   ├── lib/
│   │   └── utils.ts                    # cn() helper (clsx + tailwind-merge), formatting utils
│   │
│   ├── App.tsx                         # Root: contexts, router, layout shell
│   ├── main.tsx                        # Entry point: ReactDOM.createRoot
│   └── index.css                       # Tailwind directives, custom CSS, font imports, animation keyframes
│
├── components.json                     # shadcn/ui configuration
├── tailwind.config.js                  # Custom colors, fonts, spacing tokens
├── postcss.config.js                   # PostCSS with Tailwind + Autoprefixer
├── vite.config.ts                      # Vite + React plugin
├── tsconfig.json                       # TypeScript configuration
└── package.json
```

---

## Tailwind Configuration Plan

### Custom Theme Extensions

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0E61FE', hover: '#0043DB' },
        neutral: { 900: '#262626', 600: '#525252', 300: '#D4D4D4', 100: '#F5F5F5' },
        alert: { red: '#FA4D56', 'red-light': '#FFF1F1', yellow: '#F1C21B', 'yellow-light': '#FFFBD6' },
        success: { DEFAULT: '#24A148', light: '#DEFBE6' },
        resolved: { DEFAULT: '#84A98C', light: '#EDF5EE' },
        chart: {
          blue: '#0E61FE', cyan: '#33B1FF', purple: '#8A3FFC',
          teal: '#009D9A', orange: '#FF832B', red: '#FA4D56',
          grid: '#E5E5E5'
        }
      },
      fontFamily: {
        heading: ['DM Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      spacing: {
        'sidebar': '256px',
        'sidebar-collapsed': '64px',
        'header': '56px',
        'mobile-nav': '56px'
      },
      zIndex: {
        'modal': '1000',
        'header': '100',
        'sidebar': '50'
      },
      borderRadius: {
        'pill': '12px'
      }
    }
  }
}
```

### Custom CSS (index.css)

- Tailwind `@layer base` for root font-size (10px), body styles
- `@layer components` for reusable animation keyframes (spin, pulse, flash)
- `@layer utilities` for reduced-motion media query override
- Custom scrollbar styling for alert feed (6px width)
- Font imports via `@import` from Google Fonts CDN

---

## Key Implementation Notes

### Chart Implementation Strategy

Biometric charts use **Recharts** with the following structure per chart:
- `<ResponsiveContainer>` wrapping `<LineChart>`
- `<XAxis>` with date formatting, `<YAxis>` with domain set per metric type
- `<CartesianGrid>` horizontal only, stroke #E5E5E5
- `<Tooltip>` with custom content renderer (white card, shadow, formatted values)
- `<ReferenceLine>` for threshold values (dashed, colored)
- Multiple `<Line>` components for multi-series charts (BP systolic/diastolic)
- Custom `dot` prop for data point styling (4px circles, scale on hover)
- `animationDuration` and `animationEasing` for line draw effect

Time range filtering (24H/7D/30D/90D) filters the readings array before passing to Recharts. The chart re-renders with new data — Recharts handles the transition animation.

### Form Submission Simulation

All forms simulate API calls with `setTimeout` (800-1500ms random delay) to demonstrate the full 5-state lifecycle (idle → valid → submitting → success → reset). No actual API calls are made — mock data is updated directly in context state.

### Responsive Strategy

- **Desktop (>1024px)**: Full sidebar (256px) + content area. Multi-column layouts.
- **Tablet (768-1024px)**: Collapsible sidebar (64px icon-only, hover to expand). 2-column layouts.
- **Mobile (<768px)**: Hidden sidebar, bottom tab nav (56px). Single column. Tables become card lists or horizontal-scroll.

The `useMediaQuery` hook drives conditional rendering. Layout changes are instant (no transition animation) except sidebar width which CSS-transitions.

### Accessibility Implementation

- All form inputs have `<Label>` associations
- Icon-only buttons have `aria-label` attributes
- Table uses proper `<thead>`, `<th scope="col">`, `<caption>`
- Charts have `role="img"` with `aria-label` describing data
- Toast container uses `aria-live="polite"`
- Focus trapping in modals via shadcn Dialog (built-in)
- `prefers-reduced-motion` respected globally (see Animation Plan)
- High contrast: all text meets WCAG AA (4.5:1 ratio minimum). Neutral-900 on white = 15.8:1.
