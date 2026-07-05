# Lalasia — E-Commerce Furniture Website

A modern web application for browsing, filtering, and purchasing furniture. The project is a full-featured SPA (Single Page Application) built with React and Vite, integrated with a Django backend for content and user management.

## 🚀 Key Features

- **Authentication & Authorization**: Full user registration and login flow powered by secure JWT tokens.
- **Client-Side Routing**: Smooth, seamless page navigation handled by React Router.
- **Product Catalog with Filtering**: Dynamic search and filtering of furniture items by category.
- **Pagination**: Optimized rendering of large product lists, dividing items across multiple pages.
- **Interactive Shopping Cart**: Implemented via a modal window featuring item addition, removal, and real-time total price calculation.
- **User Profile**: A modal window allowing users to update their personal information or log out.
- **Content Management & Media**: Image uploading and database administration managed seamlessly through Django Admin and Pillow.

## 🛠 Tech Stack

**Frontend:**
- React.js
- Vite (Modern and fast frontend build tool)
- React Router (Declarative routing for React)
- JavaScript (ES6+)
- HTML5 / CSS3 (Component-based styling)

**Backend:**
- Django (REST Framework & Django Admin)
- JWT Authentication (`djangorestframework_simplejwt`)
- Image Processing (`pillow`)

## 📁 Project Structure

The project directory is structured into standalone frontend and backend environments:

```text
├── furniture-backend/     # Django backend application & API
│   ├── core/              # Main project configuration
│   ├── media/             # Uploaded product images
│   ├── products/          # Products application logic
│   └── requirements.txt   # Backend dependencies
└── furniture-web/         # React + Vite frontend application
    ├── src/
    │   ├── assets/        # Static assets (images, icons, fonts)
    │   ├── components/    # Reusable UI components (modals, buttons, cards)
    │   └── pages/         # Main application pages and section layouts
    └── package.json
```

## 🔧 Local Setup & Installation

> **Note:** To experience the full functionality, you need to run both the backend and frontend servers simultaneously.

### 1. Backend Setup (Django)

```bash
# Navigate to the backend directory
cd furniture-backend

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install all dependencies from requirements.txt
pip install -r requirements.txt

# Apply database migrations and start the server
python manage.py migrate
python manage.py runserver
```
### 2. Frontend Setup (React + Vite)

```bash
# Navigate to the frontend directory
cd furniture-web

# Install dependencies
npm install

# Start the local development server with Vite
npm run dev

