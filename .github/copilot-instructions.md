# Code Guidelines for Static Sites

## Required File Structure

## HTML Standards
- Use HTML5 doctype and specific language attribute
- Include charset (UTF-8) and responsive viewport meta tags
- Place scripts at bottom of body with appropriate defer/async attributs
- Use semantic elements with proper ARIA attributs where needed
- Ensure proper heading hierarchy (h1-h6)
- Include meta description for SEO

## CSS Organization
Group styles in this order:
1. Reset/Normalize
2. CSS Custom Properties (variables)
3. Base styles
4. Layout/Grid
5. Compionents
6. Utilities
7. Media queries
8. Print styles

## JavaScript Guidelines
- Adhere to JSDoc standards, similar to the below example
/**
 * @description Clear description of purpose and behaviour
 * @param {type} name - Description with valid/invalid values
 * @returns {type} Description of return value/state
 * @throws {ErrorType} Description of error conditions
 * @example
 * // Include multiple examples showing edge cases
 * functionName(validInput);
 */

## Code Quality Rules
- Use consistent naming:
 - camelCase: JavaScript variables/functions
 - PascalCase: Classes/Components
 - kebab-case: CSS classes, file names
 - SCREAMING_SNAKE_CASE: Constants
- Implement error boundaries and logging
- Clean up event listeners and subscriptions
- Maximum line length: 80 characters
- Document breaking changes