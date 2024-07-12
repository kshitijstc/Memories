
# Memories
- This project was build so that users can preserve their memories and enlist their experiences from different phases of their lifes. Users can interact with others' memories, providing likes and learning from their stories.<br>
- Explore the Memories platform: https://memories-seven-pi.vercel.app <br>
## Motivation
- The inspiration behind building this project was to have a personal space where I could track my progress, document my best and worst experiences, and reflect on my learning journey.
-  Additionally, it served as a comprehensive project to understand the intricacies of full-stack application development, including front-end, back-end, and database interactions.

## Key Features

- **Create and Share Memories**: Users can create, edit, and delete their own memories.
- **Interact with Others**: Like and comment on memories shared by other users.
- **Track Personal Growth**: Reflect on past experiences and track personal progress over time.
- **User Authentication**: Secure login with email and Google authentication for fast access.
- **Responsive Design**: Optimized for both desktop and mobile use.


## Screenshots

### 1. Landing Page
This is the landing page where you can see all the memories created by users.

<img src="https://github.com/user-attachments/assets/448aa869-9557-4a7f-9c27-7d3c6035e96a" alt="Screenshot" style="width: 600px; height: auto;">

### 2. Upload and Manage Memories
After signing in, you can upload your own memories, edit or delete them, and like other users' memories.

<img src="https://github.com/user-attachments/assets/959bb968-8b97-47ff-ac5a-fcde28f8e83a" alt="Screenshot" style="width: 600px; height: auto;">

### 3. Memory Details and Comments
Click on any memory to see its details and view comments from other users.

<img src="https://github.com/user-attachments/assets/ce801126-79ee-4c18-acfd-ebda225302cf" alt="Screenshot" style="width: 600px; height: auto;">

### 4. User Authentication
This is the user authentication page with Google authentication for fast and seamless authorization.

<img src="https://github.com/user-attachments/assets/f617643c-6726-4a1c-93c3-4e4f2de805ae" alt="Screenshot" style="width: 600px; height: auto;">

## Technologies Used

- **Front-End**: React, Redux, Material-UI
- **Back-End**: Node.js, Express
- **Database**: MongoDB, Cloudinary
- **Authentication**: JWT, Google OAuth
- **Hosting**: Vercel for frontend and Render for backend 

## Installation and Setup

To run this project locally, follow these steps:

### Clone the Repository
Make sure to replace <b>'your-github-username'</b> with your actual GitHub username or the username of the repository owner.
```sh
git clone https://github.com/<your-github-username>/memories.git
cd memories
```

### Install Dependencies
#### Server-side Dependencies
```sh
npm install
```
#### Client-side Dependencies
```sh
cd client
npm install
cd ..
```

### Environment Variables
Create a <b>`.env`</b> file in the /memories/server directory and add the necessary environment variables:
```sh
PORT = "PORT"
CONNECTION_URL = "MONGO URL STRING"
CLOUDINARY_CLOUD_NAME = "YOUR_CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY = "YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"
```
### Run the Application
```sh
npm run dev
```
