import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import '@testing-library/jest-dom';

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

  it('should render the button with destructive variant', () => {
    // Arrange
    render(<Button variant="destructive">Delete</Button>);
    
    // Act
    const button = screen.getByRole('button', { name: 'Delete' });
    
    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-500');
  });

  it('should render the button with different sizes', () => {
    // Arrange
    render(<Button size="sm">Small Button</Button>);
    
    // Act
    const smallButton = screen.getByRole('button', { name: 'Small Button' });
    
    // Assert
    expect(smallButton).toBeInTheDocument();
    expect(smallButton).toHaveClass('h-8');
  });

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

  it('should apply additional className when provided', () => {
    // Arrange
    render(<Button className="custom-class">Custom Button</Button>);
    
    // Act
    const button = screen.getByRole('button', { name: 'Custom Button' });
    
    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is passed', () => {
    // Arrange
    render(<Button disabled>Disabled Button</Button>);
    
    // Act
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    
    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
}); 