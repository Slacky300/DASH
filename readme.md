# Necleo Dashboard

Effortlessly manage and visualize data with the Necleo Dashboard. This MERN stack application seamlessly integrates a sleek dashboard design with powerful CRUD operations, ensuring a delightful user experience. Explore the potential of the Lorem Picsum API to dynamically populate your dashboard with stunning random images.

## Table of Contents

- [Dashboard Implementation](#dashboard-implementation)
- [API Integration](#api-integration)
- [CRUD Operations](#crud-operations)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Backend Setup](#backend-setup-optional)
- [Deployment Instructions](#deployment-instructions)


## Dashboard Implementation

The project implements a dashboard based on the design provided in Figma. It is responsive for various screen sizes and populates at least 6 cards with random images obtained from the Lorem Picsum API.

## API Integration

The project uses the Lorem Picsum API to fetch random images for populating the cards. The API endpoint is [here](https://picsum.photos/v2/list?page=1&limit=6). Errors from the API are handled gracefully.

## CRUD Operations

### Create Operation

- Users can add new cards to the dashboard through a form or modal.
- Input information is validated before adding the new card.

### Read Operation

- Users can view details of each card by clicking on it.
- Additional information is displayed on a separate modal or panel.

### Update Operation

- Users can edit the content of existing cards using a form or inline editing.

### Delete Operation

- Users can delete a card from the dashboard with a confirmation dialogue.

## Deployment

### Frontend Deployment

The frontend is deployed on [Vercel](https://vercel.com/) and is accessible [here](https://dash-amber.vercel.app).

### Backend Deployment 

The backend, including authentication and email verification, is deployed on [Cyclic.sh](https://cyclic.sh/)

## Demo

Include a gif or screenshots showcasing the functionality of your application.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install` in the frontend and backend directories.
3. Follow the deployment instructions for both frontend and backend.

## Technologies Used

- MongoDB (Database)
- Express.js (Backend framework)
- React.js (Frontend library)
- Node.js (JavaScript runtime)
- HTML5/CSS3 (Markup and styling)


## Frontend Setup

**NOTE**: Please update the .env file before starting to work on the backend the environment variable names are mentioned in the .env.example file


```bash
    > cd client
    > npm i
    > npm run dev
```


## Backend Setup 

**NOTE**: Please update the .env file before starting to work on the backend the environment variable names are mentioned in the .env.example file

```bash
    > cd server
    > npm i
    > npm run dev
```

**Feel free to customize further or let me know if you have any specific changes in mind!**