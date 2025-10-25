# Little Mountain Studio - Codebase Guide

## Project Overview

Little Mountain Studio is a **bilingual (English/Traditional Chinese) professional business website** showcasing Mark's software engineering and tech education services. It's a modern single-page application (SPA) built with vanilla HTML, CSS, and JavaScript - no build tools, frameworks, or dependencies required.

**Business Focus:**
- Tech education (AI bootcamps, school workshops, parent-child coding)
- Web development (one-page websites with LINE integration)
- Database solutions, data analysis, AI/ML consulting
- Serves both Taiwanese/Hong Kong markets and English-speaking clients

**Repository:** https://github.com/balamark/little-mountain

---

## Quick Start

### Common Commands

**Local Development:**
```bash
# Use any local web server to view the site
python3 -m http.server 8000
# or
npx http-server
# or
# Open index.html directly in browser (basic functionality works)
```

**Git Workflow:**
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

**Deployment:**
- **Recommended:** Netlify (drag-and-drop deployment, auto HTTPS, form handling)
  - Simple: Drag project folder to netlify.com
  - Advanced: Connect GitHub repo for auto-deploy on push
- **Alternative:** Vercel, GitHub Pages, Firebase Hosting (see DEPLOYMENT.md)

---

## Architecture & File Organization

### Core Files (3 files, ~3200 lines total)

```
/Users/tw/Myself/
├── index.html        (585 lines) - Complete SPA structure
├── styles.css        (1,669 lines) - All styling, animations, responsive design
├── script.js         (947 lines) - All functionality and interactivity
└── DEPLOYMENT.md     - Deployment instructions
```

**Why this structure?**
- Zero build complexity - works as-is
- Perfect for a professional portfolio/business site
- Easy for clients to understand
- Lightweight and fast

### Assets
- `mark.JPG` - Profile image
- `moreway-coffee.JPG`, `lisalee.jpg`, `jameswang.jpg` - Testimonial photos
- `LittleMountainLineQR.PNG` - LINE contact QR code
- `ai-workshop.html`, `ai-workshop.md` - Additional documentation
- Various supporting images (background photos, etc.)

---

## High-Level Architecture

### Language & Internationalization System

The site implements a **data-attribute-based bilingual system** (no translation library):

```html
<!-- Elements store both languages in data attributes -->
<h1 data-en="Learn Tech Skills" data-zh="學習科技技能">
  學習科技技能 <!-- Currently displays Chinese -->
</h1>
```

**Key Components:**
- `currentLanguage` variable: tracks 'en' or 'zh'
- `switchLanguage(lang)` function: updates all elements with `[data-en][data-zh]` attributes
- Default language: Traditional Chinese ('zh-TW')
- Language toggle button: switches between 'EN' and '中文'

**Internationalization Scope:**
- All UI text (buttons, labels, nav, modals)
- Form labels and select options
- Service descriptions and testimonials
- Error messages and notifications
- Professional tips and advice content

### Single-Page App (SPA) Behavior

The site implements smooth SPA navigation without page reloads:

```javascript
// Smooth scrolling with history updates
window.scrollTo({ top: offsetTop, behavior: 'smooth' });
history.pushState(null, null, targetId); // Updates URL
```

**Navigation Features:**
- Fixed navbar with blur effect
- Active state tracking via Intersection Observer
- Smooth scroll to sections (70px offset for navbar)
- Mobile hamburger menu with click-outside dismissal
- URL updates without page reload

### Service Modal System

Six service types with detailed bilingual content:
- `education` (Tech Education Programs)
- `webdev` (Web Development)
- `database` (Customer Databases)
- `analysis` (Data Analysis)
- `ai` (AI Solutions)
- `consulting` (Tech Consulting)

**Modal Architecture:**
```javascript
// Service content stored in nested objects
const serviceContent = {
  education: {
    title: { en: "...", zh: "..." },
    content: { en: "HTML string", zh: "HTML string" }
  },
  // ... 5 more services
}

// openServiceModal() and closeServiceModal() manage display
// Modal closes with: Escape key, clicking outside, clicking close button
```

### Form & Validation System

Contact form with client-side validation:

```javascript
// handleFormSubmit() validates:
- Name: length >= 2
- Email: regex pattern
- Service: dropdown selection
- Message: length >= 10

// Notifications system:
- Success message (green, auto-dismiss after 5s)
- Error messages with specific feedback
- Loading state with disabled button
```

---

## Code Patterns & Conventions

### CSS Variables & Design System

```css
:root {
  --primary-color: #2563eb;      /* Blue - main brand */
  --secondary-color: #10b981;    /* Green - accent */
  --accent-color: #f59e0b;       /* Amber - highlights */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --shadow-md/lg/xl: ...         /* Elevation levels */
  --gradient-primary: linear-gradient(135deg, ...)
}
```

**Responsive Design:**
- Mobile-first approach
- Hamburger menu for screens < 768px
- Flexible grid layouts (CSS Grid for services, Flexbox for layouts)
- Optimized font sizing across devices
- 70px navbar offset in calculations

### Animation & Interaction Patterns

1. **Intersection Observer for scroll animations:**
   - Service cards fade in on scroll (opacity, translateY)
   - Dashboard animations trigger when visible
   - Counter animations on hero stats

2. **Language transition animations:**
   - 150ms delay with fade effect
   - Smooth UX when switching languages

3. **Navbar scroll effects:**
   - Background opacity changes at 50px scroll
   - Box shadow enhancement on scroll
   - Blur effect maintained

4. **Form feedback:**
   - Notifications slide in from right, auto-dismiss
   - Button loading state
   - Real-time validation

### Component Patterns

**Cards & Containers:**
- Service cards: featured (large) vs small variants
- Pricing cards: basic, professional (featured), enterprise
- Testimonial cards: consistent author info structure
- Stat cards: icon + number + trend indicator

**Modals:**
- Service modal: header with close button, body content, footer CTA
- Click-outside detection
- Escape key handling
- Body scroll prevention when open

---

## Key JavaScript Functions

### Core Functions

```javascript
toggleLanguage()              // Switch between EN and ZH
switchLanguage(lang)          // Apply language change to DOM
toggleMobileMenu()            // Show/hide mobile nav
openServiceModal(serviceType) // Display service details
closeServiceModal()           // Hide modal
handleFormSubmit(e)           // Validate & process contact form
```

### Utilities

```javascript
showNotification(msg, type)   // Toast notifications (success/error/info)
validateForm(formData)        // Multi-field validation with errors array
getTranslatedText(en, zh)    // Get text in current language
copyToClipboard(text)        // Copy contact info to clipboard
animateCounters()            // Animate hero dashboard stats
initDashboardAnimations()    // Trigger when dashboard scrolls into view
```

### Event Listeners

- DOMContentLoaded: Initialize language, setup observers, attach handlers
- scroll: Navbar effects, parallax dashboard, dashboard animations
- click: Nav links (smooth scroll + mobile menu close), modals
- keydown: Escape to close modals
- 'click outside': Close mobile menu and modals

---

## Testing & Validation

### Manual Testing Checklist

**Bilingual Content:**
- [ ] All text toggles between English and Chinese
- [ ] Language persists through navigation
- [ ] Form labels and options translate
- [ ] Service modal content translates
- [ ] Notifications in correct language

**Responsive Design:**
- [ ] Mobile (< 768px): Hamburger menu works
- [ ] Tablet (768-1024px): Layout adjusts
- [ ] Desktop (> 1024px): Full layout displays
- [ ] Profile image loads correctly
- [ ] Testimonial images load correctly

**Navigation & Interaction:**
- [ ] Smooth scrolling to sections
- [ ] Navigation links update active state
- [ ] Service modals open/close correctly
- [ ] Form validation works (try invalid email, empty fields)
- [ ] Notifications appear and disappear

**Performance:**
- [ ] Dashboard counters animate on scroll
- [ ] No layout shift or jank during scroll
- [ ] Images load without breaking layout
- [ ] Fonts load from Google Fonts

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## Common Customization Tasks

### Update Contact Information
```javascript
// In index.html, find these sections:
<span>julianshanshan@gmail.com</span>
<span>0979-156-714 / 650-937-9502</span>
<a href="https://www.linkedin.com/in/ting-an-w-39352934/">
```

### Change Profile Image
```html
<!-- In index.html, About section -->
<img src="mark.JPG" alt="Mark - Software Engineer" />
<!-- Replace mark.JPG with your image filename -->
```

### Update Pricing
```html
<!-- In index.html, Pricing section -->
<span class="amount">3,600</span>  <!-- Professional plan price -->
<!-- Update NT$ amounts as needed -->
```

### Add/Remove Service Type
```javascript
// In script.js, add new service in serviceContent object:
servicename: {
  title: { en: "...", zh: "..." },
  content: { en: "<h3>...</h3>...", zh: "..." }
}

// In index.html, add service card:
<div class="service-card" onclick="openServiceModal('servicename')">
```

### Update Social Media Links
```html
<!-- In index.html, Contact section -->
<a href="https://www.instagram.com/mountain_studio_shan/" ...>
<!-- Update href attributes for your social media profiles -->
```

---

## Important Conventions

1. **All UI text must have bilingual data attributes:**
   ```html
   <element data-en="English" data-zh="中文">Default content</element>
   ```

2. **Service modals use innerHTML for rich HTML content:**
   - Changes to service descriptions require updating string literals in `serviceContent` object
   - Use template literals (backticks) for multi-line HTML

3. **Form validation is client-side only:**
   - No backend integration in current implementation
   - Contact form shows success notification (2s delay)
   - To integrate real email service: use EmailJS, Formspree, or Netlify Forms

4. **Images must exist in root directory:**
   - Profile photo, testimonial photos, QR code
   - Fallback placeholder for missing profile image

5. **Responsive breakpoints:**
   - Mobile: max-width 768px (hamburger menu triggers)
   - Tablet: 768px - 1024px
   - Desktop: 1024px+ (full layout)

---

## Recent Changes

**Latest commits:**
- cf5807c: Update profile image and margin bottom after social icon
- e4e190b: Replace profile and add social media icons
- ed48a37: Update English and Moreway profile
- 10cceee: Merge testimonial PR from Moreway Cafe

**Active branches:**
- main (production)

---

## Deployment Notes

- **No build step required** - files deploy as-is
- **No dependencies** - pure HTML/CSS/JavaScript
- All styling and functionality works offline
- Static file deployment (no server required)

For deployment instructions, see DEPLOYMENT.md (Netlify recommended).

---

## Future Enhancements

Potential improvements (not yet implemented):
- Backend form submission (EmailJS integration)
- Analytics integration (Google Analytics)
- Blog section for tech articles
- Portfolio section with project showcases
- Client login dashboard
- Email newsletter signup
- Advanced SEO optimization (schema markup)
- Service booking system
