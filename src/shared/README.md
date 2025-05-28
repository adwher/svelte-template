# Shared

Reusable utilities, components, and configurations used across the entire application.

## What belongs here

- **UI components** - Reusable interface elements (buttons, inputs, modals)
- **Utilities** - Helper functions and common logic
- **Constants** - Application-wide constants and configurations
- **Hooks** - Reusable Svelte stores and composables
- **Types** - Shared TypeScript definitions
- **Styles** - Global styles and design system

## Structure

```
shared/
├── ui/
│   ├── button.svelte
│   ├── input.svelte
│   └── modal.svelte
├── hooks/
│   ├── use-local-storage.svelte
│   └── use-api.svelte
├── constants/
│   ├── api
│   └── routes
├── utils/
│   ├── format
│   └── validation
└── README.md
```

## Rules

- Should be framework-agnostic when possible
- No business logic or domain-specific code
- Can be imported by any other layer
- Components should be highly reusable
- Keep dependencies minimal
