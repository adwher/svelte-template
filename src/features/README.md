# Features

Business features and use cases that implement specific functionality for end users.

## What belongs here

- **Feature components** - UI components that implement specific business features
- **Business logic** - Feature-specific operations and workflows
- **API calls** - Data fetching and mutations for the feature
- **State management** - Feature-specific state and actions
- **Validation** - Feature-specific form validation and business rules

## Rules

- Each feature should be self-contained
- Can import from `entities` and `shared` layers
- Should not import from `pages` or `widgets`
- One feature per folder
- Feature names should be descriptive and business-focused
