
# Venure Frontend

Venure is a modern web platform for discovering, booking, and managing banquet halls, party palaces, and wedding venues. This frontend is built using **React**, styled with **Tailwind CSS**, and integrates with a **MERN stack** backend.

## 🧱 Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios, Formik
- **State Management**: React hooks, Context API
- **Routing**: React Router DOM
- **Image Uploads**: Multipart via Axios
- **Code Structure**: Modular and component-based
- **Design**: Fully responsive, minimal and modern

---

## 📂 Project Structure

```
src/
├── api/                   # Axios services for API communication
│   └── owner/venueApi.js  # Venue-related API methods
├── assets/                # Images, icons, static assets
├── components/            # Reusable UI components
│   ├── common/            # Inputs, buttons, modals
│   └── user/              # Cards, BookingSummary, etc.
├── hooks/                 # Custom React hooks (data fetching, mutations)
├── layouts/               # Shared layout components
├── pages/                 # Page-level components (user, admin views)
│   ├── admin/
│   ├── owner/
│   └── user/
├── routes/                # Centralized routing setup
├── styles/                # Tailwind config and global styles
└── utils/                 # Utility functions
```

---

## 🚀 Features

### 👤 User Features
- View venue listings with search and filter
- View venue details with images, amenities, and location
- Book venue via a multi-step form (date, time, guest, contact info, payment)
- Responsive layout optimized for all devices

### 🛠️ Admin Features
- Approve, reject, or set venue status
- View all registered venues and owners
- Perform CRUD operations on venues

### 🧾 Booking Flow
1. Select date and time slot
2. Provide guest count and contact details
3. Choose additional services (add-ons)
4. Confirm and proceed to payment
5. Booking summary displayed and data submitted to backend

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Backend server (refer to Venure Backend repo)

### Steps

```bash
# Clone the repo
git clone https://github.com/AaryanBasnet/venure-frontend.git
cd venure-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables
Create a `.env` file in root:

```env
VITE_API_URL=http://localhost:5050/api
```

---

## 📸 Screenshots



## 🧪 In Development


- Email confirmations after booking
- Google Maps API integration
- Reviews and ratings system

---



---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For inquiries, suggestions, or feedback:

**Author**: Aryan Basnet  
**Email**: basnetaryan1011@gmail.com  
**LinkedIn**: [Basnet Aryan](https://www.linkedin.com/in/basnet-aryan-4511a22a4/)
