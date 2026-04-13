# Sehlvet - Men's Clothing E-commerce Store

A modern, responsive e-commerce website for men's clothing featuring elegant design, smooth animations, and an intuitive user interface.

## 🌟 Features

- **Modern Design**: Clean and elegant UI with a warm color palette
- **Responsive Layout**: Optimized for desktop viewing (1440px width)
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Product Showcase**: Multiple collection sections (Trending, Summer, Winter)
- **Customer Testimonials**: Dedicated section for customer reviews
- **Interactive Elements**: Hover effects and smooth scrolling
- **Custom Typography**: Combination of Playfair Display and custom Wilkysta fonts

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with modern layout techniques
- **JavaScript**: Interactive functionality and animations
- **GSAP (GreenSock)**: Professional-grade animations and scroll triggers
- **Custom Fonts**: Wilkysta and Google Fonts (Playfair Display)

## 📁 Project Structure

```
Shelvet-E-com-Store/
├── css/
│   └── main.css          # Main stylesheet
├── fonts/
│   └── wilkysta.ttf      # Custom font file
├── imgs/
│   ├── Elegent-Man.png   # Hero section image
│   ├── scp1.png          # Summer collection images
│   ├── scp2.png
│   ├── scp3.png
│   ├── tcp1.png          # Trending collection images
│   ├── tcp2.png
│   ├── tcp3.png
│   ├── wcp1.png          # Winter collection images
│   ├── wcp2.png
│   └── wocsp1.png        # Customer testimonial image
├── js/
│   └── app.js            # JavaScript functionality
└── index.html            # Main HTML file
```

## 🎨 Design Highlights

### Color Scheme

- **Background**: Warm beige (#f0eadc)
- **Primary Text**: Dark gray (#2f2f2f)
- **Accent**: Brown (#754F23, #a57033)
- **Secondary**: Light gray (#DDD9D6)

### Sections

1. **Header**: Sticky navigation with logo and menu items
2. **Hero**: Eye-catching banner with call-to-action
3. **Trending Collections**: Featured products with pricing
4. **Summer Collections**: Seasonal showcase with imagery
5. **Winter Collections**: Cold weather clothing display
6. **Customer Testimonials**: Social proof section
7. **Footer**: Contact information and social links

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for best performance)

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Or serve** using a local web server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (http-server)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎯 Key Features Breakdown

### Animations

- **Scroll-triggered animations** using GSAP ScrollTrigger
- **Smooth transitions** for page elements
- **Header transformation** on scroll
- **Staggered card animations** in product sections

### Interactive Elements

- **Sticky header** with scroll-based styling changes
- **Hover effects** on buttons and cards
- **Smooth scrolling** between sections
- **Responsive navigation** menu

### Product Showcase

- **Trending Collections**: 3 featured items with prices
- **Seasonal Collections**: Summer and Winter themed sections
- **Product Cards**: Image, title, price, and action buttons
- **Call-to-action buttons** throughout the site

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `css/main.css`:

```css
:root {
  --primary-bg: #f0eadc;
  --text-color: #2f2f2f;
  --accent-color: #754f23;
}
```

### Adding Products

1. Add product images to the `imgs/` folder
2. Update the HTML structure in `index.html`
3. Adjust animations in `js/app.js` if needed

### Modifying Animations

Customize GSAP animations in `js/app.js`:

```javascript
gsap.from(".element", {
  y: "100%",
  duration: 1,
  scrollTrigger: {
    trigger: ".trigger-element",
    start: "top 80%",
  },
});
```

## 👨‍💻 Developer

Created by **Hamas Munawar** - [hamas-munawar.com](https://hamas-munawar.com)

## 📄 License

© 2023 Hamas Munawar. All Rights Reserved.

---

**Note**: This is a demo/portfolio project showcasing modern web development techniques for e-commerce websites. The product images and content are for demonstration purposes only.
