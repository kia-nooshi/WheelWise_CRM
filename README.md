# 🤖 WheelWise CRM 2.0.0 Release Notes

# WheelWise CRM 2.0

## Overview

WheelWise CRM 2.0 ushers in a new era of car shopping, transforming traditional challenges into a streamlined, customer-centric experience. By integrating cutting-edge AI technology, WheelWise CRM 2.0 simplifies the interaction between consumers and the car buying process, overcoming the hurdles of inconvenience and high-pressure sales tactics. This platform allows consumers to effortlessly submit inquiries and receive responses in real-time or at a scheduled time, thereby significantly reducing dealers' workloads by consolidating all online marketplaces into one convenient portal. Moreover, it enhances user engagement by retaining consumer preferences for future visits. WheelWise CRM 2.0 adeptly combines automated processes with the option for personalized dealer interactions, ensuring a harmonious balance between efficiency and the human touch, and redefining the car shopping experience.

## Installation and Running the App

Before you begin, ensure you have Node.js and npm installed on your system. If not, visit [Node.js website](https://nodejs.org/) to download and install them.

1. **Install Dependencies**

   Open your terminal and run the following command to install the necessary dependencies:

   ```
   npm install
   ```

2. **Run the App in Development Mode**

   To start the application in development mode, execute:

   ```
   npm run dev
   ```

   This will start the server and you should be able to access the app on `http://localhost:3000` (or another port if specified).

3. **Build the App for Deployment**

   To build the application for production deployment, run:

   ```
   npm run build
   ```

   This command prepares the app for deployment by optimizing and bundling the files.

## Troubleshooting

- **Clock Skew Detected**: To correct system time discrepancies, execute the following command:
  ```
  sudo apt install ntpdate && sudo ntpdate pool.ntp.org
  ```

## Project Management

To see the list of all issues and the progress we've made in the app, check out our Kanban board:

[Kanban Board - WheelWise CRM 2.0 Development](https://github.com/orgs/UCR-Senior-Design/projects/20)

This board is continuously updated with the latest tasks, bugs, and features being worked on by our development team.

# ⚙️ Tools and Libraries

### Next.js

- **Version**: 14.1.0
- **Description**: A robust React framework designed for server-side rendering and generating static websites efficiently.
- **Installation**: `npx create-next-app@latest`
- **Running the App**: `npm run dev`
- **Documentation**: [Explore Next.js Documentation](https://nextjs.org/docs)

### React and React DOM

- **Version**: 18
- **Description**: Premier library for constructing dynamic UIs with reusable, stateful components.
- **Installation**: `npm install react@18 react-dom@18`
- **Documentation**: [Dive into React Docs](https://reactjs.org/docs)

### Clerk

- **Version**: 4.29.7
- **Description**: Provides secure and easy-to-implement authentication services specifically tailored for Next.js applications.
- **Installation**: `npm install @clerk/nextjs@4.29.7`
- **Documentation**: [Clerk Documentation](https://docs.clerk.dev)

### Radix UI

- **Version**: 2.0.3
- **Description**: Offers foundational UI components for crafting high-quality design systems and web applications.
- **Installation**: `npm install @radix-ui/themes@2.0.3`
- **Documentation**: [Radix UI Docs](https://www.radix-ui.com)

### Prisma

- **Version**: 5.9.1
- **Description**: Next-generation ORM for Node.js and TypeScript, making database access easy with an auto-generated and type-safe query builder.
- **Installation**: `npm install @prisma/client`
- **Documentation**: [Prisma Docs](https://www.prisma.io/docs/)

### Delay

- **Version**: 6.0.0
- **Description**: A promise-based delay function for JavaScript, useful for simulating network or processing delays in your applications.
- **Installation**: `npm install delay`
- **Documentation**: [NPM Package Page](https://www.npmjs.com/package/delay)

### React Icons

- **Version**: 5.0.1
- **Description**: Provides access to popular icons from various libraries (FontAwesome, Material Design, etc.) in React components.
- **Installation**: `npm install react-icons`
- **Documentation**: [React Icons](https://react-icons.github.io/react-icons/)

### Zod

- **Version**: 3.22.4
- **Description**: A TypeScript-first schema declaration and validation library that ensures type safety at runtime.
- **Installation**: `npm install zod`
- **Documentation**: [Zod GitHub Repository](https://github.com/colinhacks/zod)

# ⚙️ Developed By

### @types/node

- **Version**: 20
- **Description**: Provides TypeScript type definitions for Node.js, facilitating development by adding type safety.
- **Installation**: `npm install @types/node`
- **Documentation**: [DefinitelyTyped GitHub Repository](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)

### @types/react and @types/react-dom

- **Version**: 18
- **Description**: Type definitions for React and ReactDOM which support TypeScript development by providing types for React APIs.
- **Installation**: `npm install @types/react @types/react-dom`
- **Documentation**: [DefinitelyTyped GitHub Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)

### Autoprefixer

- **Version**: 10.0.1
- **Description**: A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
- **Installation**: `npm install autoprefixer`
- **Documentation**: [Autoprefixer GitHub Repository](https://github.com/postcss/autoprefixer)

### ESLint

- **Version**: 8
- **Description**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **Installation**: `npm install eslint`
- **Documentation**: [ESLint Official Website](https://eslint.org/)

### eslint-config-next

- **Version**: 14.1.0
- **Description**: Provides ESLint rules that are specifically tailored for Next.js projects, ensuring code quality and consistency.
- **Installation**: `npm install eslint-config-next`
- **Documentation**: [Next.js GitHub Repository](https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next)

### PostCSS

- **Version**: 8
- **Description**: A tool for transforming CSS with JavaScript, enabling customizations and optimizations.
- **Installation**: `npm install postcss`
- **Documentation**: [PostCSS GitHub Repository](https://github.com/postcss/postcss)

### Prisma

- **Version**: 5.9.1
- **Description**: Next-generation ORM for Node.js & TypeScript, simplifying database access and schema management.
- **Installation**: `npm install prisma`
- **Documentation**: [Prisma Docs](https://www.prisma.io/docs/)

### Tailwind Merge

- **Version**: 2.2.1
- **Description**: A utility function to efficiently merge Tailwind CSS classes without duplicates, useful in dynamic class scenarios.
- **Installation**: `npm install tailwind-merge`
- **Documentation**: [Tailwind Merge GitHub Repository](https://github.com/dcastil/tailwind-merge)

### Tailwind CSS

- **Version**: 3.3.0
- **Description**: A utility-first CSS framework for creating custom designs without having to leave your HTML.
- **Installation**: `npm install tailwindcss@3.3.0 postcss autoprefixer`
- **Setup**: [Tailwind CSS Setup Guide](https://tailwindcss.com/docs/installation)
- **Documentation**: [Tailwind CSS Docs](https://tailwindcss.com/docs)

### TypeScript

- **Version**: 5
- **Description**: A language for application-scale JavaScript development, providing types to ensure code reliability.
- **Installation**: `npm install typescript`
- **Documentation**: [TypeScript Official Website](https://www.typescriptlang.org/)

We are committed to continuous improvement and eagerly anticipate your feedback on WheelWise CRM 2.0.0.

# 🧪 Test Cases

## Test Group 1: Clerk Functionality Testing

This test group focuses on verifying the functionality of the Clerk service within the application. Specifically, it assesses the ability to retrieve a Clerk ID efficiently and accurately.

- **TEST #1 - Clerk Functionality**
  - **Function Tested**: `Clerk.getClerkId`
  - **Description**: Tests whether the application can successfully retrieve a Clerk ID.
  - **Execution Method**: The function is timed for performance analysis.

## Test Group 2: Organ Functionality Testing

The second test group aims at evaluating the functionality related to organs within the database, encompassing the creation, retrieval, and deletion of organ entries.

- **TEST #2 - Organ Functionality**
  - **Functions Tested**:
    - `Organ.pushOrgan` for adding new organ entries.
    - `Organ.getOrgans` for retrieving a list of all organ entries.
    - `Organ.popOrgan` for removing a specific organ entry.
    - `Organ.popOrgans` for removing all organ entries.
  - **Description**: This series of tests checks the application's ability to manage organ data within the database, including adding new entries, retrieving existing ones, and deleting entries both individually and in bulk.

## Test Group 3: Lead Functionality Testing

Test group three assesses the application's lead management capabilities, including adding new leads, retrieving specific leads or all leads, and deleting leads.

- **TEST #3 - Lead Functionality**
  - **Functions Tested**:
    - `Lead.pushLead` for adding new lead entries.
    - `Lead.getLead` for retrieving details of a specific lead.
    - `Lead.getLeads` for fetching all leads associated with an organ.
    - `Lead.popLead` for removing a specific lead entry.
    - `Lead.popLeads` for removing all leads associated with an organ.
  - **Description**: This test verifies the application's functionality related to lead management, ensuring leads can be added, retrieved, and deleted as expected.

## Test Group 4: Delete onCascade Testing

The fourth test group is designed to verify the cascading delete functionality, ensuring that deleting an organ also removes all associated leads.

- **TEST #4 - Delete onCascade**
  - **Functions Tested**:
    - `Organ.pushOrgan` and `Lead.pushLead` to set up the initial data state.
    - `Organ.popOrgan` to trigger the cascading delete.
    - `Lead.getLeads` to verify the result of the cascading delete.
  - **Description**: This test checks if deleting an organ entry correctly triggers the deletion of all associated lead entries, testing the integrity of the cascading delete functionality within the database.

Each test group is designed to validate specific functionalities within the application, ensuring robustness and reliability of the system's data management capabilities.

# 📃 Functions Library Documentation

This documentation outlines the structure and functionality of the custom functions library used in the application. The library is divided into three main segments: `Util`, `Helper`, and `Do`. Each segment targets different aspects of the application, from utility functions to specialized helpers and direct action methods.

## Util

The `Util` segment is designed to provide utility functions that simplify common operations, such as database interactions and data manipulation.

### Other

- **`twJoin` and `twMerge`**: Utility functions from `tailwind-merge` for handling Tailwind CSS class mergers and conditionals.
- **`returnHandle`**: A higher-order function designed to streamline asynchronous operations, handling both the success and error paths with custom messages.

### Clerk

- **`getClerkId`**: Retrieves the Clerk user ID, ensuring the user is authenticated.

### DataBase

Provides a set of functions to interact with the database entities like `Organ`, `User`, `Lead`, `Chat`, and `Message`.

#### Organ

- **`pushOrgan`**: Creates a new organ entry in the database.
- **`popOrgan`**: Deletes a specified organ entry by its ID.
- **`getOrgan`**: Retrieves a specific organ entry by its ID.
- **`popOrgans`**: Deletes all organ entries.
- **`getOrgans`**: Fetches all organ entries.

#### User

- **`pushUser`**: Adds a new user to the database, linking it to an organ.
- **`getUser`**: Retrieves a user by their Clerk ID.

#### Lead

- **`pushLead`**: Adds a new lead, optionally linking it to an organ and including contact information.
- **`popLead`**: Removes a specified lead by ID.
- **`getLead`**: Fetches a specific lead by ID.
- **`getLeads`**: Retrieves all leads linked to a specified organ.
- **`popLeads`**: Deletes all leads associated with a specific organ.

#### Chat

- **`pushChat`**: Creates a new chat session linked to a lead.
- **`pushThreadId`**: Associates a chat with a thread ID.
- **`popChat`**: Deletes a specific chat by ID.
- **`getChat`**: Retrieves chat details by lead ID, including messages.

#### Message

- **`pushMessage`**: Adds a new message to a chat.
- **`popMessage`**: Deletes a specific message by ID.

## Helper

The `Helper` segment is focused on providing support functions that integrate external services or complex logic not directly related to database operations.

### Chat

- **`getAiResponse`**: Interacts with an AI service to get responses based on a lead's message. It handles thread creation and message logging within the chat.

## Do

`Do` includes functions that perform specific actions or business logic, often combining multiple utility functions to achieve a task.

### User

- **`Onboarding`**: Handles the onboarding process for new users, ensuring they are registered and linked to a new organ if necessary.

### Lead

- **`getLead`**: Retrieves details for a specific lead.
- **`getLeads`**: Fetches all leads associated with the user's organ.
- **`pushLeadsApi`**: A comprehensive function that manages the creation of a lead, initializes a chat, logs a message, and fetches an AI response.

### Chat

- **`getChat`**: Retrieves chat details, focusing on interaction with a specific lead.

This library centralizes and abstracts many of the repetitive tasks involved in managing database entities and interacting with external services, promoting cleaner and more maintainable code throughout the application.
