# Med-Life 💊  

Med-Life is a healthcare-focused project developed during the **National Healthcare Hackathon '25 at JECRC University**.  
It is a **medicine reminder web application** built with the **MERN stack**, designed especially for **elderly patients**. The app ensures that patients never miss their medication by providing **in-app notifications, SMS reminders, and automatic voice call reminders**.  

Alongside reminders, **caretakers** can manage the patient’s profile to ensure better adherence and monitoring. The system is further enhanced with an **AI-powered chatbot** built using **Google Gemini API**, which helps answer health-related queries in real time.  

---

## 🚀 Features  

- 👤 **Patient & Caretaker Accounts** – Elderly patients can access their account, and caretakers can manage their medication schedules.  
- 🔔 **Smart Notifications** – In-app reminders for upcoming medicines.  
- 📱 **SMS Reminders** – Sends scheduled SMS reminders using **Twilio API**.  
- 📞 **Automatic Voice Calls** – Patients receive automated calls at the right time to take medicines.  
- 🤖 **AI Chatbot** – Integrated **Google Gemini AI chatbot** to answer queries and provide assistance.  
- 🔐 **Secure Authentication** – User authentication and profile management.  

---

## 🛠 Tech Stack  

- **Frontend:** React.js  
- **Backend:** Node.js & Express.js  
- **Database:** MongoDB  
- **Notifications & Calls:** Twilio API  
- **AI Chatbot:** Google Gemini API  

---

## 📦 Prerequisites  

Make sure you have installed:  

- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)  

---

## ⚙ Steps to Run the Project  

1. Clone the repository:  

```bash
git clone https://github.com/yuvii01/Med-Life.git
```

2. Navigate to the project folder and install dependencies:

```    
cd med-life
npm install
```

3. Create a .env file in the root directory and add the following keys:

```
MONGO_URI=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
GEMINI_API_KEY=
JWT_SECRET=
```

4. Start the development server:
```
npm run dev
```

Open your browser and go to:

http://localhost:3000

---

## Future Enhancements🌟 

📊 Medicine adherence analytics for caretakers.

📅 Calendar-based medicine schedule.

📱 React Native app for mobile accessibility.

🏥 Integration with nearby pharmacies for refill reminders.

