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
  - Clean separation between client and server code
  - ESLint and Prettier configuration
  - GitHub Actions CI workflow
  - Vite for fast development
    **Styling** - UnoCSS with Wind preset (Tailwind-like utility classes), includes custom `General Sans` font.
    **I18n Support** - Built-in internationalization with English and Spanish translations
    **Development Tools**

## Getting Started

**Schema Validation with Zod**: Robust data validation using [Zod](https://zod.dev/) for type-safe data handling at runtime.

- [Bun](https://bun.sh/)

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
