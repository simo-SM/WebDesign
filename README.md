# Creative Design Portfolio

A static multi-page portfolio website for showcasing design work, creative services, and contact information.

## Overview

This project is built with plain HTML, CSS, and JavaScript. The pages use CDN-hosted libraries for styling, icons, animations, charts, and interactive UI elements. There is no build step or package manager setup in the repository.

## Pages

- `index.html` - landing page with portfolio highlights and animated sections
- `about.html` - background, skills, and timeline content
- `projects.html` - project gallery with filtering, search, and modal details
- `contact.html` - contact form, FAQ interactions, and UI feedback

## Project Structure

```text
ProjectwebDesign/
|-- about.html
|-- contact.html
|-- index.html
|-- projects.html
|-- resources/
|   |-- about-portrait.jpg
|   |-- hero-design.jpg
|   |-- project-branding.jpg
|   |-- project-mobile.jpg
|   `-- project-web.jpg
`-- src/
    `-- js/
        |-- about.js
        |-- contact.js
        |-- main.js
        `-- projects.js
```

## Features

- Multi-page portfolio layout
- Responsive sections styled with Tailwind CSS via CDN
- Animated hero text and motion effects
- Scroll-triggered reveal animations
- Project filtering and live search
- Contact form validation and success feedback

## External Libraries

The HTML pages load these libraries from CDNs:

- Tailwind CSS
- Font Awesome
- Anime.js
- Typed.js
- Splide
- ECharts

## How to Run

Because this is a static site, you can open `index.html` directly in a browser.

For a better local development workflow, serve the project with a simple local server. Example:

```powershell
cd C:\Users\Administrator\Desktop\ProjectwebDesign
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- Image assets are stored in `resources/`.
- Page-specific behavior is stored in `src/js/`.
- Some interactions are demo-style UI behavior and do not submit data to a backend service.

