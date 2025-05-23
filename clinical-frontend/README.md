## 🧬 Clinical Trial Similarity Viewer

A full-stack web app that helps researchers analyze, compare, and visualize clinical trial data using similarity scores and eligibility metrics.

---

## 🚀 Live Demo

* **Frontend:** [https://clinical-frontend.onrender.com](https://clinical-frontend.onrender.com)
* **Backend API:** [https://clinical-backend-5gb4.onrender.com](https://clinical-backend-5gb4.onrender.com)

---

## 🛠 Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | React.js, Redux Toolkit, Material-UI |
| Backend  | Node.js, Express.js                  |
| Charts   | Recharts                             |
| State    | Redux + localStorage                 |
| Hosting  | Render (Frontend & Backend)          |

---

## 🧩 Features

* 🔍 **List View:** Paginated clinical trials with selection
* 📊 **Dashboard View:** Interactive bar and pie charts for eligibility distribution
* 🧠 **Score View:** Similarity scores between selected trials with visual indicators
* 🧾 **Trial Detail Page:** Full metadata and chart per trial
* 💾 **Persistent Selection:** Maintains selected trials across views and reloads

---

## 📦 Installation (Local Development)

### 1. Clone the Repositories

```bash
git clone https://github.com/Kishortam/clinical-trial/tree/main/clinical-backend
git clone https://github.com/Kishortam/clinical-trial/tree/main/clinical-frontend
```

---

### 2. Run the Backend

```bash
cd clinical-backend
npm install
npm start
```

* App runs on `http://localhost:5000`
* Sample data is served from `sample-data.json`

---

### 3. Run the Frontend

```bash
cd clinical-frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Then run:

```bash
npm start
```

---

## 🌐 Deployment on Render

### 🔁 Backend (Node + Express)

1. Push backend repo to GitHub
2. Go to [https://render.com](https://render.com)
3. Create a new Web Service
4. Set:

   * Build Command: `npm install`
   * Start Command: `npm start`
5. Get the live API URL (e.g. `https://clinical-backend.onrender.com`)

---

### 🎨 Frontend (React)

1. Push frontend repo to GitHub
2. Go to Render → New → Static Site
3. Set:

   * Build Command: `npm run build`
   * Publish Directory: `build`
4. Add environment variable:

```env
REACT_APP_API_BASE_URL=https://clinical-backend.onrender.com/api
```

---

## 📁 Folder Structure Highlights

```bash
clinical-frontend/
├── src/
│   ├── views/           # ListView, DashboardView,  ScoreView, TrialDetailView
│   ├── features/        # Redux slices and logic
│   ├── components/      # Reusable UI elements
│   └── App.js           # Routes and layout

clinical-backend/
├── src/
│   ├── routes/          # Express routes
│   ├── controllers/     # Controller logic
│   ├── sample_data.json # Static trial dataset
│   └── index.js         # Entry point
```

---

## ✍️ Author

**Kishor Sunil Tambe**
Frontend & Full-Stack Developer
Email: \[[kishortam@gmail.com](mailto:kishortam@gmail.com)]
GitHub: [https://github.com/Kishortam](https://github.com/Kishortam)

---
**Commands to Run Project Locally**
Run backend using command => npm run dev
(Server will start at Port https://localhost:5000)

Run frontend using command => npm start
(Server will start at Port https://localhost:3000)









<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
