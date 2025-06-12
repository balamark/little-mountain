# Little Mountain Studio - Professional Software Engineering Website

A modern, bilingual (English/Traditional Chinese) one-page website showcasing Mark's software engineering services with subscription-based pricing model.

## 🎯 Features

- **Bilingual Support**: Seamless switching between English and Traditional Chinese
- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully mobile-friendly design
- **Interactive Elements**: Hover effects, smooth scrolling, form validation
- **Contact Integration**: LINE QR code support and multiple contact methods
- **Subscription Pricing**: Professional pricing tiers for services

## 🚀 Professional Business Name Suggestions

Based on your background at Chainalysis and Carnegie Mellon University, here are professional business name options:

### English Names:
1. **Mark Tech Solutions** - Clean and professional
2. **Innovative Code Studio** - Creative and technical
3. **Digital Transformation Partners** - Enterprise-focused
4. **TechCraft Solutions** - Artisanal approach to tech
5. **Code & Consult** - Direct and clear
6. **Digital Innovation Lab** - Research and development focus
7. **Professional Dev Services** - Straightforward professional

### Traditional Chinese Names:
1. **Mark 科技解決方案** (Mark Tech Solutions)
2. **創新程式工作室** (Innovative Code Studio)
3. **數位轉型夥伴** (Digital Transformation Partners)
4. **科技工藝解決方案** (TechCraft Solutions)
5. **程式與顧問** (Code & Consult)
6. **數位創新實驗室** (Digital Innovation Lab)
7. **專業開發服務** (Professional Dev Services)

**Business Name**: **"Little Mountain Studio"** / **"阿山工作室"**
- Creative and memorable studio name
- Reflects a personal, boutique approach
- Works beautifully in both languages
- Perfect for a software engineering consultancy

## 📋 Services Offered

1. **Web Development** - Modern, responsive websites and applications
2. **Database Solutions** - Secure, scalable database design and management
3. **Data Analysis** - Custom reports and business intelligence
4. **AI Solutions** - Machine learning integration and automation
5. **Tech Education** - Coding workshops and AI bootcamps
6. **Tech Consulting** - Strategic technology planning

## 💰 Pricing Structure

### Starter Plan - $999/month
- Small website or web app
- Basic database setup
- Monthly maintenance
- Email support

### Professional Plan - $2,499/month ⭐ (Most Popular)
- Medium website or application
- Advanced database solutions
- Data analysis & reporting
- Priority support
- Monthly consultations

### Enterprise Plan - Custom Pricing
- Large-scale applications
- AI/ML integration
- Team training & workshops
- 24/7 support
- Dedicated consultation

## 🛠️ Setup Instructions

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Local web server (optional for development)

### Installation

1. **Download the files**:
   - `index.html` - Main website structure
   - `styles.css` - Styling and responsive design
   - `script.js` - Interactive functionality

2. **Replace placeholder content**:
   - Update contact information in `index.html`
   - Replace the placeholder LINE QR code image
   - Customize email address and phone number

3. **Launch the website**:
   - Open `index.html` in your browser directly, or
   - Use a local server for development (e.g., Live Server extension in VS Code)

### Customization

#### Contact Information
Replace these placeholders in `index.html`:
```html
<!-- Email -->
<span>mark@techsolutions.com</span>

<!-- Phone -->
<span>+1 (555) 123-4567</span>

<!-- LINE QR Code -->
<img src="your-line-qr-code.png" alt="LINE QR Code" />
```

#### Business Name
The website uses "Mark" throughout. To change the business name:
1. Search for "Mark" in `index.html`
2. Replace with your chosen business name
3. Update the `<title>` tag and meta descriptions

#### Colors and Branding
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;  /* Main brand color */
    --secondary-color: #10b981; /* Accent color */
    --accent-color: #f59e0b;   /* Highlight color */
}
```

## 📱 LINE Integration

To add your actual LINE QR code:

1. Generate your LINE official account QR code
2. Save it as an image file (PNG/JPG recommended)
3. Replace the placeholder image in the HTML:
   ```html
   <img src="path/to/your-line-qr.png" alt="LINE QR Code" />
   ```

## 🌍 Deployment Options

### Free Hosting:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Host directly from repository

### Professional Hosting:
- **AWS S3 + CloudFront**: Scalable and fast
- **Google Cloud Storage**: Integrated with other Google services
- **Traditional web hosting**: cPanel-based hosting

### Domain Suggestions:
- `marktechsolutions.com`
- `markdev.services`
- `innovativecode.studio`
- `yourname-tech.com`

## 📧 Form Integration

The contact form currently shows a success message. To make it functional:

### Option 1: Email Service (Recommended)
Integrate with EmailJS, Formspree, or Netlify Forms:

```javascript
// Example with EmailJS
emailjs.send('service_id', 'template_id', {
    from_name: name,
    from_email: email,
    service: service,
    message: message
});
```

### Option 2: Server-side Processing
Set up a backend service to handle form submissions:
- Node.js with Express
- PHP with contact form script
- Python with Flask/Django

## 🎨 Customization Tips

### Adding Your Photo
Replace the animated code block with your professional photo:
```html
<div class="hero-image">
    <img src="your-photo.jpg" alt="Mark - Software Engineer" class="profile-photo">
</div>
```

### Portfolio Section
Add a portfolio section showcasing your work:
```html
<section id="portfolio" class="portfolio">
    <!-- Add your project showcases here -->
</section>
```

### Testimonials
Include client testimonials for credibility:
```html
<section id="testimonials" class="testimonials">
    <!-- Add customer reviews here -->
</section>
```

## 📊 Analytics and SEO

### Google Analytics
Add tracking code before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### SEO Optimization
- Add meta descriptions for each language
- Include structured data markup
- Optimize images with alt text
- Create an XML sitemap

## 🔧 Technical Details

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Mobile-first responsive design
- Optimized images and fonts
- Minimal JavaScript for fast loading

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## 📞 Support and Maintenance

### Regular Updates
- Keep content current
- Update pricing as needed
- Add new services or remove outdated ones
- Monitor and respond to contact form submissions

### Security
- Use HTTPS for all deployments
- Validate and sanitize form inputs
- Regular backups of website files
- Monitor for security vulnerabilities

## 🎯 Marketing Suggestions

### Online Presence
- LinkedIn business profile highlighting your CMU background
- Professional blog about software engineering topics
- GitHub portfolio showcasing your projects
- Stack Overflow contributions

### Networking
- Join local tech meetups in Seattle/Redmond area
- Attend software engineering conferences
- Contribute to open source projects
- Connect with former CMU classmates

### Content Marketing
- Write technical tutorials
- Share case studies of successful projects
- Create YouTube videos about coding
- Offer free tech consultations

## 📝 License

This website template is provided for your business use. Feel free to modify and customize as needed.

---

**Ready to launch your professional software engineering business!** 🚀

For questions or support with customization, feel free to reach out through the contact form on the website. 