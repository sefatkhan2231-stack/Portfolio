# Sefat Khan | Space-Themed Developer Portfolio

A responsive, animated portfolio website with a space theme: a live starfield, floating planets, shooting stars and smooth scroll animations. It showcases my skills and projects across full-stack web development, data analytics and machine learning.

**Live site:** [portfolio-ttu7.vercel.app](https://portfolio-ttu7.vercel.app/)

<!-- Add a screenshot after deploying:
![Portfolio preview](./public/assets/preview.png)
-->

## Features

- **Animated space background:** a canvas starfield with twinkling stars, floating planets, mouse and touch parallax, and shooting stars.
- **Fully responsive:** layouts adapt from small phones to large desktops, with a hamburger menu below 1024px.
- **Smart header:** hides on scroll down, reappears on scroll up, and has an animated mobile menu.
- **Animated sections:** entrance and scroll-reveal animations built with Framer Motion.
- **Project showcase:** cards with screenshots, tech tags, live demo and GitHub links.
- **Skills section:** animated progress bars.
- **Contact section:** email and phone links plus a styled contact form.
- **Performance-minded canvas:** device-pixel-ratio capped, star count scaled to screen size, and lighter effects on mobile.

## Tech Stack

| Area      | Tools                      |
| --------- | -------------------------- |
| Framework | React, Vite                |
| Styling   | Tailwind CSS               |
| Animation | Framer Motion, HTML Canvas |
| Icons     | Lucide React               |
| Hosting   | Vercel                     |

## Project Structure

```
space_portfolio/
├── public/
│   └── assets/
│       ├── planets/          # Planet images used by the canvas
│       ├── tech/             # Technology logos
│       ├── icons/
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── sefat_khan.png    # Hero photo
│       └── *.png             # Project screenshots
├── src/
│   ├── components/
│   │   ├── background/       # SpaceCanvas, ShootingStars
│   │   ├── cursor/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

> **Note:** Vite serves everything in `public/` from the site root, so a file at `public/assets/home.png` is referenced in code as `/assets/home.png`. Do not include `public` in the path.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git

# 2. Move into the project folder
cd space_portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Available Scripts

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload    |
| `npm run build`   | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally            |
| `npm run lint`    | Run ESLint                                      |

## Customization

### Update the projects

Edit the `projectData` array at the top of `src/components/Projects.jsx`:

```jsx
{
  title: "Project Name",
  image: "/assets/project-image.png",   // file in public/assets/
  desc: "Short description of the project.",
  tags: ["React", "FastAPI"],
  link: "https://live-demo-url.com",    // optional: button is hidden if omitted
  github: "https://github.com/user/repo",
}
```

### Update skills

Edit the `skills` array at the top of `src/components/Skills.jsx` (name, percentage and gradient colors).

### Replace personal details

- **Name, role, intro text and photo:** `src/components/Hero.jsx`
- **CV:** put your PDF in `public/assets/` and update the `href` in `Hero.jsx`. File names are case-sensitive on Vercel.
- **Email, phone and social links:** `Contact.jsx`, `Hero.jsx` and `Footer.jsx`
- **Page title and favicon:** `index.html`

### Tune the space background

In `src/components/background/SpaceCanvas.jsx` you can change the planet list, planet sizes, star colors, star density and parallax strength.

## Deployment

The site is deployed on [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings (build command `npm run build`, output directory `dist`).
4. Every push to the main branch redeploys automatically.

If an image works locally but not on Vercel, check that the file is committed to git and that its name matches exactly, including capital letters.

## Known Limitations

- The contact form is front-end only and does not send messages yet. To make it work, connect it to a service such as [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/), or to your own backend.

## Contact

**Sefat Khan**, Full Stack Developer based in Dhaka, Bangladesh

- Email: [sefatkhan2231@gmail.com](mailto:sefatkhan2231@gmail.com)
- LinkedIn: [sefat-khan](https://www.linkedin.com/in/sefat-khan-44296b2b8)
- GitHub: [Sefat-Khan](https://github.com/sefatkhan2231-stack)

## License

This project is open source and available under the [MIT License](LICENSE). Add a `LICENSE` file to your repository, or remove this section if you prefer not to license it.
