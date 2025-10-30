
# 🧳 BookIt — Experiences & Slot Booking Platform

### 🎯 Objective
**BookIt** is a full-stack web application where users can explore travel experiences, view available slots, and complete bookings.  
This project was built as part of a **Fullstack Intern Assignment** to demonstrate end-to-end development, including frontend UI, backend API integration, and database management.

---

## 🌐 Live Demo  
🔗 **Deployed URL:** [https://book-it-five-eta.vercel.app/](https://book-it-five-eta.vercel.app/)  

💻 **GitHub Repository:** [https://github.com/kuruvapavani/BookIt.git](https://github.com/kuruvapavani/BookIt.git)

---

## 🛠️ Tech Stack

### **Frontend**
-  **Next.js (TypeScript)**
-  **Tailwind CSS** for styling
-  **Sonner** for toast notifications  
-  **Next Router & App Directory**
-  Fully **responsive design** across devices

### **Backend**
-  **Next.js API Routes**
-  **MongoDB + Mongoose** for data persistence

---

## 🧩 Features
- Browse available **experiences** with images, descriptions, and prices  
- View available **slots** (date & time) with real-time availability  
- Adjust **quantity** dynamically (limited by available slots)  
- Apply **promo codes** with flat or percentage discounts  
- Confirm booking and view a **success page with booking ID**  
- **Toasts (Sonner)** for interactive user feedback  
- Prevents **double booking** for the same slot  
- Updates slot availability automatically  

---

## Testing Promo Codes

You can test the **promo code functionality** using these codes on the checkout page:

| Code      | Type       | Description             |
|------------|------------|-------------------------|
| `FLAT100`  | Flat ₹100  | Gives ₹100 off instantly |
| `SAVE10`   | Percentage | Gives 10% off the subtotal |

 Try entering these promo codes at checkout to see discount calculations and Sonner toasts in action.

---

## ⚙️ Installation & Setup

Follow these simple steps to run the project locally 👇

### 1️⃣ Clone the repository
```bash
git clone https://github.com/kuruvapavani/BookIt.git
cd BookIt
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Your app should now be running on
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 Deployment

The project is deployed on **Vercel**.
Simply connect the GitHub repo to Vercel — it auto-detects Next.js and deploys instantly.

---

## 📚 Assignment Reference

This project was developed for the **Fullstack Intern Assignment**.

* 🎨 **Figma Design:** [Figma UI Mockup](https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=0-1&p=f&t=wchOeHodHO0YlE4K-0)

---

## ⚠️ Note

This project is developed **solely for assignment and learning purposes**.
All assets used (images, icons) are **royalty-free** from Unsplash/Pexels.

---

## ✨ Author

👩‍💻 **Kuruva Pavani**
💬 *MERN Stack Developer | Fullstack Intern Candidate*
