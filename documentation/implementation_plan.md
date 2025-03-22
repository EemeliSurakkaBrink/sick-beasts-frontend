# Implementation plan

## Phase 1: Environment Setup

1.  Initialize a new Git repository named `e-commerce-skate-store` in your working directory. *(Source: Project Overview)*
2.  Create two main directories: one for the frontend (`/frontend`) and one for the backend (`/backend`). *(Source: Project Overview)*
3.  Ensure Node.js is installed on your machine; if not, install an LTS version (e.g., Node.js v20.2.1). *(Source: Tech Stack: Core Tools)*
4.  Set up a Sanity CMS project to manage your backend data infrastructure instead of Laravel. *(Updated Requirement)*
5.  **Validation**: Run `git status`, `node -v`, and confirm that the Sanity Studio is set up correctly using its dashboard.

## Phase 2: Frontend Development

1.  Create a new Next.js project in the `/frontend` folder using Next.js 14 (note: although the requirements mention Next.js 15, install Next.js 14 as it is better suited with current AI coding tools). *(Source: Tech Stack: Frontend)

    *   Command: `npx create-next-app@14 .`

2.  Set up Tailwind CSS for styling by installing it and creating a `tailwind.config.js` file in `/frontend`. *(Source: Tech Stack: Tailwind CSS)*

3.  Configure the global CSS file (`/frontend/styles/globals.css`) to include Tailwind directives. *(Source: Tech Stack: Tailwind CSS)*

4.  Install and configure shadcn for UI elements by adding its package to the project. *(Source: Tech Stack: shadcn)*

5.  Create a carousel component at `/frontend/src/components/Carousel.js` that utilizes Swiper.js to showcase the latest t-shirt designs and customer reviews. *(Source: Key Features: Cool Carousel UI)

6.  Install Swiper.js package in the frontend using npm. *(Source: Key Features: Cool Carousel UI)*

7.  Create the shopping basket UI component at `/frontend/src/components/ShoppingBasket.js` with functionality to add t-shirts and view basket contents. *(Source: Key Features: Shopping Basket & Checkout)*

8.  Develop a checkout page at `/frontend/src/pages/checkout.js` that supports both guest checkouts and logged-in user orders. *(Source: Key Features: Shopping Basket & Checkout)*

9.  Apply design preferences: use a dark color scheme (primarily black with strong accents) and incorporate punk-inspired fonts (e.g., Punk Kid font from 1001fonts.com) within your CSS and component styles. *(Source: Design Preferences)*

10. **Validation**: Run `npm run dev` from the `/frontend` directory and visually verify that the homepage displays the carousel and shopping basket correctly.

## Phase 3: Backend Development

1.  Use Sanity CMS in the `/backend` directory to manage products, orders, and customer data through its studio UI. *(Updated Requirement)*
2.  Setup custom schemas for products, orders, and user information in Sanity. *(Updated Requirement)*
3.  Ensure Sanity’s API is configured to manage operations securely, replacing routes initially planned for Laravel API. *(Updated Requirement)*
4.  Develop a service class in Sanity and connect it through a serverless function if needed to integrate with the Gelato print-on-demand API for t-shirt printing and fulfillment. *(Source: Integrations: Gelato)*
5.  Manage payment processing logic within a backend function that can handle interactions with Stripe or PayPal. *(Updated Requirement)*
6.  Configuring Sanity to send marketing emails through triggers and external services available in its ecosystem.
7.  **Validation**: Use Sanity Studio to verify that data models meet expectations and the API properly supports CRUD operations.

## Phase 4: Integration

1.  Connect the frontend shopping basket and checkout pages to the backend API endpoints provided by Sanity by creating a service file at `/frontend/src/services/api.js` that uses axios to send requests. *(Source: App Flow: E-commerce Functionality)*
2.  Integrate user authentication logic in Next.js which allows guest checkouts and registered accounts while interfacing with Sanity’s authentication setups. *(Updated Requirement)*
3.  Integrate the marketing email system on the backend using Sanity’s third-party integrations by configuring necessary webhook and API settings.
4.  Add an Instagram integration by embedding Instagram’s widget script in a new component at `/frontend/src/components/InstagramWidget.js`. *(Source: Integrations: Instagram)*
5.  **Validation**: Simulate a complete user flow by adding an item to the basket, proceeding through checkout, and processing a payment using dummy data to verify proper communication between frontend and backend.

## Phase 5: Deployment

1.  Set up environment configuration files for production in `/frontend/.env.production` and ensure Sanity studio settings reflect production-ready configurations. *(Source: Project Overview)*
2.  Configure a CI/CD pipeline within the Cursor IDE to automate builds and deployments. *(Source: Tools: Cursor)*
3.  Deploy the Sanity CMS to a supported platform, such as Vercel or Netlify, for static content serving and API access. *(Updated Requirement)*
4.  Deploy the Next.js frontend to Vercel ensuring build settings respect the Next.js 14 setup. *(Source: Tech Stack: Deployment)*
5.  Securely integrate the payment gateway credentials and ensure proper SSL configuration on both platforms. *(Source: E-commerce Functionality & Policies)*
6.  **Validation**: Run end-to-end tests using an automated testing tool (e.g., Cypress) against the production URL to verify that both the storefront and admin interface work as intended.

# Final Note

These steps ensure the sustainable e-commerce skate clothing store is built with a focus on scalability, integration with print-on-demand services, a rich UI experience, and robust backend management using Sanity CMS. Each step cites the relevant part of the provided project documents ensuring strict adherence to all given requirements.