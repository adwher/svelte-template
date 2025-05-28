# Svelte Template

A modern SvelteKit starter template with comprehensive features for building robust web applications.

## Features

- **SvelteKit v2+** - Built with the latest Svelte/SvelteKit using runes for state management
- **UI Component Library** - Pre-built accessible components including:
  - Buttons, Inputs, Fields
  - Menus, Dropdowns
  - Dialogs, Alerts
  - Toasts
- **State Management** - Custom state handling classes for:
  - Forms and mutations
  - Dialogs and modals
  - Floating elements (menus, tooltips)
  - Toast notifications
- **Backend Integration**
  - Supabase integration for authentication and database
  - ORPC for type-safe client-server communication
  - Clean separation between client and server code
- **Styling** - UnoCSS with Wind preset (Tailwind-like utility classes), includes custom `General Sans` font.
- **I18n Support** - Built-in internationalization with English and Spanish translations
- **Development Tools**
  - ESLint and Prettier configuration
  - GitHub Actions CI workflow
  - Vite for fast development
- **Schema Validation with Valibot**: Robust data validation using [Valibot](https://valibot.dev/) for type-safe data handling at runtime.
- **Error Handling**: Centralized error entity (`src/lib/entities/error.ts`) and i18n-ready error messages.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [Supabase](https://supabase.io/) account (optional, for backend features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/svelte-template.git
cd svelte-template

# Install dependencies
bun install
```

### Development

````bash
# Start the development server
bun dev

### Building for Production

```bash
# Build the application
bun build
````

## Project Structure

```
src/
├── app.html            # SvelteKit app template
├── hooks.server.ts     # Server hooks
├── lib/                # Library code
│   ├── components/     # Reusable UI components
│   ├── entities/       # Domain entities
│   ├── hooks/          # Custom Svelte hooks
│   ├── i18n/           # Internationalization
│   ├── server/         # Server-side code
│   ├── shared/         # Shared between client and server
│   ├── states/         # State management
│   └── styles/         # Global styles
└── routes/             # SvelteKit routes
    └── remote/         # API endpoints
```

## UI Components

The template includes a comprehensive set of UI components:

- **Text Elements**: Title, Subtitle, Heading, Caption
- **Form Controls**: Input, Input Email, Input Password, Field
- **Interactive Elements**: Button, Menu, Menu Button, Dropdown
- **Feedback**: Dialog, Alert, Toaster

## State Management

Custom state management classes are provided for:

- `FloatingState` - For positioning elements like tooltips, menus
- `DialogState` - For modal and dialog management
- `ToasterState` - For toast notifications
- `FormMutationState` - For handling form submissions and mutations

## Backend Integration

### Supabase

The template is pre-configured for Supabase, providing:

- Authentication flows
- Database access
- Storage integration

### ORPC

Type-safe client-server communication with:

- Defined procedure schemas
- Client/server procedure handlers
- Error handling

## Internationalization

The template includes a built-in i18n system with:

- Translation management
- Language detection
- Message formatting

## Contributing

Please read [COMMITGUIDELINES.md](COMMITGUIDELINES.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [SvelteKit](https://kit.svelte.dev/)
- [UnoCSS](https://github.com/unocss/unocss)
- [Supabase](https://supabase.io/)
- [ORPC](https://orpc.unnoq.com)
