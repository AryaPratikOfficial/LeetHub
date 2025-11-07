LIVE --> https://gorgeous-tapioca-31ab06.netlify.app


# 🧠 LeetHub

A collaborative **LeetCode leaderboard portal** built with **React (Vite)** — designed for ACM Club members of **VNIT Nagpur**.  
This project tracks members' coding progress and displays rankings using the **LeetCode public API**.

---

## ⚙️ Features

- 🏆 **Leaderboard Page**
  - Shows all club members with their total solved questions  
  - Sorting *(coming soon)*  
  - Daily & weekly stats *(coming soon)*  
  - LeetCode rating  

- 🔍 **Search Page**
  - Search any LeetCode username  
  - Debounced input for smooth typing  
  - Weekly stats (by calculating)
  - Session-based caching for faster repeated lookups  

- 👤 **Signup (One-Time)**
  - On first visit, users enter **Name** and **LeetCode username**  
  - Stored securely in **sessionStorage** (only for the current tab/session)  

- 🔒 **Smart Logout**
  - Clears user session and cache data  
  - Keeps leaderboard and search cache intact  
  - Optionally asks for re-login if user data is missing or invalid  

- 🤖 **Future Plan**
  - `/account` page with AI-based next-problem suggestions (Gemini API)  
  - Sorting, daily & weekly rank tracking  
  - Badging 🎖️ feature 

---

## 🧩 Tech Stack

- ⚛️ **React.js (Vite)** – Fast frontend framework  
- 🧭 **React Router** – Navigation and route protection  
- 💾 **Session Storage** – Temporary user data & caching  
- 📊 **LeetCode Stats API** – Fetch problem-solving data  
- 🤖 *(Planned)* Gemini AI API – Personalized recommendations  

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/AryaPratikOfficial/LeetHub.git

# Install dependencies
npm install

# Start the development server
npm run dev