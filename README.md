# 1st Grade Math Gap Finder

A web application designed to help parents identify and address learning gaps in 1st grade math concepts.

## Overview

The 1st Grade Math Gap Finder is an interactive web platform that helps parents and educators:

1. Assess a child's understanding of key 1st grade math concepts
2. Identify specific learning gaps
3. Access personalized learning resources and activities
4. Track progress over time

## Features

- **User Authentication**: Secure login and signup for parents
- **Child Profiles**: Create and manage multiple child profiles
- **Assessments**: Interactive math assessments covering core 1st grade concepts
- **Gap Analysis**: Visual representation of assessment results and identified learning gaps
- **Personalized Learning Path**: Customized learning activities based on assessment results
- **Resource Library**: Curated collection of educational resources organized by concept
- **Progress Tracking**: Monitor improvement over time

## Math Concepts Covered

- Number Recognition & Counting (0-100)
- Addition (within 20)
- Subtraction (within 20)
- Place Value (tens and ones)
- Measurement (length, weight, capacity)
- Time (to the hour and half-hour)
- Basic Fractions (halves and quarters)
- Geometry (2D and 3D shapes)
- Data & Graphs (simple graphs)

## Technical Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: TailwindCSS for responsive design
- **State Management**: React hooks
- **Storage**: LocalStorage (placeholder for database integration)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/1st-grade-math-gap-finder.git
cd 1st-grade-math-gap-finder
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── assessment/           # Assessment component and logic
│   ├── assessment-results/   # Results display and analysis
│   ├── create-profile/       # Child profile creation
│   ├── dashboard/            # Parent dashboard
│   ├── learning-path/        # Personalized learning activities
│   ├── login/                # Authentication pages
│   ├── resources/            # Educational resources library
│   ├── signup/               # User registration
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
├── styles/                   # Global styles
└── types/                    # TypeScript type definitions
```

## Development Roadmap

### Phase 1: Core Functionality (Current)
- User authentication
- Child profile management
- Basic assessment
- Results visualization
- Learning path generation

### Phase 2: Enhanced Features
- Backend integration with database
- More comprehensive assessments
- Expanded resource library
- Printable worksheets

### Phase 3: Advanced Features
- Progress analytics and reporting
- Teacher/educator accounts
- Classroom management
- Integration with learning standards

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Educational content informed by 1st grade math curriculum standards
- Design inspiration from modern educational platforms 