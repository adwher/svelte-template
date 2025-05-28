# Pages

Page-level components that compose features and widgets into complete user interfaces.

## What belongs here

- **Page components** - Complete page layouts and compositions
- **Route-specific logic** - Page-level state and data fetching
- **Layout composition** - How features and widgets are arranged
- **Navigation logic** - Page-specific routing and navigation

## Rules

- Pages compose features and widgets
- Can import from `entities`, `features`, `shared`, and `widgets`
- Should not contain business logic (delegate to features)
- One page per folder
- Page names should match route structure
