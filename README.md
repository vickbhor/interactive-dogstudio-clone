# 🐕 Interactive Dogstudio Clone — Award-Winning 3D Web Experience

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

*A full-stack, visually immersive website clone inspired by the legendary Dogstudio creative agency, featuring an interactive 3D WebGL experience and a custom Node.js backend.*

[View Demo](#) · [Report Bug](https://github.com/vickbhor/interactive-dogstudio-clone/issues) · [Request Feature](https://github.com/vickbhor/interactive-dogstudio-clone/issues)

</div>

---

## 📌 About The Project

**Interactive Dogstudio Clone** is a full-stack creative web application designed to recreate the iconic visual storytelling, fluid page transitions, and interactive 3D elements of the original [Dogstudio](https://dogstudio.co/) agency website.

The project combines a high-performance **Vue.js + Vite** frontend with custom 3D model rendering (`DogScene.vue` using `.glb` DRC compressed models and custom Matcap shaders), smooth scrolling, and an **Express / Node.js** backend server.

---

## ✨ Key Features

- **🎨 Interactive 3D Dog Scene:** Realistic WebGL/Three.js rendering with compressed Draco `.glb` models (`dog.drc.glb`) and dynamic Matcap textures.
- **⚡ Vue.js + Vite Architecture:** Modular component structure (`HomeHero`, `HomeAbout`, `HomeCases`, `SiteHeader`, `SiteFooter`, `SiteLoader`) for lightning-fast rendering.
- **🌊 Fluid Navigation & Motion:** Integrated custom page transitions (`pageTransition.js`) and smooth scroll behavior (`smoothScroll.js`).
- **🖥️ Dedicated Backend API:** Lightweight Node.js & Express server (`backend/server.js`) for handling application services and API endpoints.
- **📱 Fully Responsive Design:** Optimized across desktop, tablet, and mobile viewports.

---

## 🛠️ Built With

### **Frontend**
- **[Vue.js 3]** — Progressive JavaScript Framework
- **[Vite]** — Next Generation Frontend Tooling
- **[Three.js / WebGL]** — 3D Canvas Rendering & Custom Shaders
- **[CSS3 / Custom Directives]** — Custom reveal animations and responsive styling

### **Backend**
- **[Node.js]** — JavaScript Runtime Environment
- **[Express.js]** — Backend Web Application Framework

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have **Node.js** (v16+ recommended) and **npm** installed:
```bash
node -v
npm -v
```

### 1. Clone the Repository
```bash
git clone [https://github.com/vickbhor/interactive-dogstudio-clone.git](https://github.com/vickbhor/interactive-dogstudio-clone.git)
cd interactive-dogstudio-clone
```

### 2. Setup & Run Frontend
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```
*The frontend will typically run at `http://localhost:5173`.*

### 3. Setup & Run Backend
```bash
# Open a new terminal and navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Start the Node.js server
npm start
# OR run server.js directly:
# node server.js
```
*The backend server will run on the port specified in your `.env` configuration (default: port 5000).*

---

## 📂 Project Structure

```text
interactive-dogstudio-clone/
├── backend/                  # Express API Server
│   ├── server.js             # Entry point for backend application
│   ├── package.json          # Backend dependencies & scripts
│   └── .gitignore            # Backend ignore rules
├── frontend/                 # Vue.js + Vite SPA
│   ├── public/
│   │   ├── models/           # Compressed 3D models (dog.drc.glb)
│   │   ├── matcap/           # Matcap shader textures
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/           # Global styles and media assets
│   │   ├── components/       # Reusable Vue components (DogScene, HomeHero, etc.)
│   │   ├── composables/      # Vue composables (useMenuState, useSiteReady)
│   │   ├── directives/       # Custom Vue directives (reveal.js)
│   │   ├── lib/              # Animation & scroll utilities (smoothScroll.js)
│   │   ├── router/           # Vue Router configuration
│   │   ├── views/            # Main page views (HomeView, StudioView, CasesView, etc.)
│   │   ├── App.vue           # Root component
│   │   └── main.js           # Frontend entry point
│   ├── index.html            # Main HTML template
│   ├── vite.config.js        # Vite bundler configuration
│   └── package.json          # Frontend dependencies & scripts
└── README.md                 # Project documentation
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/vickbhor/interactive-dogstudio-clone/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<div align="center">
  <b>Built with ❤️ and Creative Magic by <a href="https://github.com/vickbhor">vickbhor</a></b>
</div>
