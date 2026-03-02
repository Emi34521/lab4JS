# lab4JS
# Disci-App

A gamification web application built with vanilla HTML, CSS, and JavaScript. The app turns daily habits into missions with an XP-based reward system, encouraging discipline through game design mechanics.

---

## Description

Disci-App is a habit-tracking tool inspired by gamification principles. Users can create missions (habits) with a name, description, and difficulty level. Completing missions awards XP, which accumulates toward a global rank that progresses through 12 tiers — from Mortal to Transcendent.

The project was built as a laboratory exercise using only the tools native to the browser, with no external libraries or dependencies of any kind.

---

## Features

- Create missions with a name, description, and difficulty level (Easy, Normal, Hard)
- Each difficulty awards a different amount of XP: Easy = 10, Normal = 25, Hard = 50
- Mark missions as SUCCESSFUL once completed
- Global XP counter that updates in real time
- 12 rank tiers based on accumulated XP
- Console log validation for every mission created

---

## Installation

No installation or build step is required. The project runs entirely in the browser.

1. Clone or download the repository:

```bash
git clone https://github.com/your-username/disci-app.git
```

2. Open the project folder and make sure the three files are in the same directory:

```
disci-app/
├── html
    ── index.html
├── styles
    ── Styles.css
├── scrpt
    ── app.js
└── README.md
```

3. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

No server, no terminal commands, no dependencies.

---

## Screenshots

**Main view**

![Main view](/images/mainPage.png)

**Creating a mission**

![Creating a mision](/images/crateMision.png)

**Completed mission and XP update**

![Completed mision](/images/completeMision.png)

---

## Rank System

| XP Range | Rank |
|---|---|
| 0 | Novice |
| 1 - 30 | Adept |
| 31 - 60 | Disciple |
| 61 - 100 | Warden |
| 101 - 150 | Sentinel |
| 151 - 210 | Vanguard |
| 211 - 280 | Invoker |
| 281 - 360 | Mystic |
| 361 - 450 | Warlock |
| 451 - 550 | Sorcerer |
| 551 - 700 | Champion |
| 700+ | Overseer |

---

## Project Structure

```
disci-app/
├── html
    ── index.html
├── styles
    ── Styles.css
├── scrpt
    ── app.js
└── README.md
```

---

## Built With

- HTML5
- CSS3
- JavaScript

---

## Deployment with Nginx

To serve the app through a local Nginx server:

1. Copy the project files to the Nginx web root:

```bash
sudo cp index.html styles.css app.js /var/www/html/disci-app/
```

2. Create a configuration file for the site:

```bash
sudo nano /etc/nginx/sites-available/disci-app
```

3. Paste the following configuration:

```nginx
server {
    listen 80;
    server_name localhost;

    root /var/www/html/disci-app;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

4. Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/disci-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. Open your browser and go to `http://localhost`.