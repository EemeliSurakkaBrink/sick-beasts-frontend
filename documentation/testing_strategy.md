# Testing Strategy for Sick Beasts Frontend

This document outlines the testing strategy for the Sick Beasts e-commerce frontend application. It serves as a reference for developers to maintain consistency in testing practices across the codebase.

## Testing Philosophy

Our testing strategy focuses on:

1. **Component-level testing**: Testing UI components in isolation
2. **Accessibility-first**: Writing tests that encourage accessible components
3. **Maintainability**: Creating tests that are easy to understand and maintain
4. **Reliability**: Tests should be deterministic and avoid flakiness

## Testing Tools

- **Jest**: Main test runner and assertion library
- **Testing Library**: Used for rendering components and selecting elements
- **Jest DOM**: Extended DOM matching assertions

## Test Structure Patterns

### AAA Pattern (Arrange-Act-Assert)

All tests should follow the AAA pattern to create clear, readable tests:

```typescript
it('should do something', () => {
  // Arrange - Set up the test environment
  render(<Component />);
  
  // Act - Perform the actions to test
  const element = screen.getByText('Element');
  
  // Assert - Verify the expected outcomes
  expect(element).toBeInTheDocument();
});
```

### Component Testing Example

Here's an example of how we test components:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('should render the button with default variant', () => {
    // Arrange
    render(<Button>Click me</Button>);
    
    // Act
    const button = screen.getByRole('button', { name: 'Click me' });
    
    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });
});
```

## Element Selection Strategies

### Prefer Accessibility Queries

To promote accessibility and create more robust tests, prefer querying by accessibility roles and text content over test IDs or CSS selectors:

1. **Best**: `getByRole` - Queries elements by their ARIA role
   ```typescript
   const button = screen.getByRole('button', { name: 'Submit' });
   ```

2. **Good**: `getByText` - Finds elements by their text content
   ```typescript
   const element = screen.getByText('Hello World');
   ```

3. **Good**: `getByLabelText` - Queries form elements by their label
   ```typescript
   const input = screen.getByLabelText('Email address');
   ```

4. **Avoid when possible**: `getByTestId` - Finds elements by test-specific attributes

### Testing Variants and Props

When testing components with multiple variants or props:

1. Create separate test cases for each significant variant
2. Test that props correctly modify the component's appearance or behavior
3. Verify that className props properly extend the component's styling

Example:
```typescript
it('should render the button with destructive variant', () => {
  // Arrange
  render(<Button variant="destructive">Delete</Button>);
  
  // Act
  const button = screen.getByRole('button', { name: 'Delete' });
  
  // Assert
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('bg-red-500');
});
```

## Test Naming Conventions

Use descriptive test names that clearly indicate what's being tested:

1. Test descriptions should start with "should"
2. Describe the expected behavior, not the implementation
3. Be specific about what's being tested

Examples:
- "should render the button with default variant"
- "should be disabled when disabled prop is passed"
- "should render as a child element when asChild is true"

## Testing Composition

When testing compound components:

1. Test composition scenarios using the `asChild` prop when applicable
2. Verify that styles and behaviors are correctly applied to custom elements
3. Use semantic elements with appropriate ARIA roles in test cases

Example:
```typescript
it('should render as a child element when asChild is true', () => {
  // Arrange
  render(
    <Button asChild>
      <span role="heading" aria-level={1}>Heading Element</span>
    </Button>
  );
  
  // Act
  const headingElement = screen.getByRole('heading', { name: 'Heading Element' });
  
  // Assert
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveClass('bg-primary');
});
```

## Testing Interactions

For interactive components:

1. Use `userEvent` from Testing Library to simulate user interactions
2. Test both the initial and final states after interaction
3. Verify that callbacks are called with the expected arguments

Example:
```typescript
it('should call onClick when clicked', async () => {
  // Arrange
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  // Act
  const button = screen.getByRole('button', { name: 'Click me' });
  await userEvent.click(button);
  
  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Additional Best Practices

1. **Test in isolation**: Components should be tested independently of their context
2. **Focus on behavior**: Test what the component does, not how it's implemented
3. **Keep tests simple**: Each test should verify a single aspect of the component
4. **Be thorough**: Test edge cases and error states when applicable
5. **Avoid implementation details**: Tests should not depend on internal implementation details

By following these guidelines, we can ensure that our tests are consistent, maintainable, and effective at catching regressions. 