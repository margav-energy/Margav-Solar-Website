# Wix Velo Migration Guide - MarGav Solar Website

## Overview
This guide will help you migrate your React website to Wix using **Velo** (Wix's development platform). We'll start with the home page and then move to other pages.

---

## Prerequisites
1. **Wix Account**: Sign up at [wix.com](https://www.wix.com)
2. **Enable Velo**: 
   - Go to your site editor
   - Click **Dev Mode** (top right) or press `Ctrl+Shift+E`
   - Enable **Velo** in the Dev Tools panel
3. **Familiarity**: Basic understanding of JavaScript (Wix Velo uses JavaScript)

---

## Part 1: Home Page Migration

### Step 1: Set Up Your Wix Site Structure

1. **Create a new Wix site** or use an existing one
2. **Set up pages**:
   - Home (main landing page)
   - About
   - Work
   - Products
   - Request Quote
   - Schedule
   - Blog
   - Contact

3. **Set up Site Structure**:
   - Go to **Pages** menu
   - Create these pages or use existing ones
   - Set Home as your main page

---

### Step 2: Upload Assets (Images)

1. Go to **Media Manager** (left sidebar)
2. Upload all images from `src/assets/`:
   - `hero.png`
   - `logo.png`
   - `solar panel.png`
   - `battery.png`
   - `ev charger.png`
   - `Consultation.png`
   - `Property Assessment & Quotation.png`
   - `Energy Plan.png`
   - `gallery_1.png` through `gallery_7.png`
   - `solar field.png`
   - Any other images you're using

3. **Note the image URLs** - you'll need them in Velo code

---

### Step 3: Set Up Site Colors and Fonts

1. Go to **Design** → **Color Palette**
2. Add your brand colors:
   - **Blue**: `#3333cc`
   - **Black**: `#000000`
   - **White**: `#ffffff`
   - **Green**: `#66cc66` (for gradient)

3. Go to **Design** → **Text Styles**
4. Set up fonts:
   - **Primary Font**: Inter (or similar sans-serif)
   - Add custom font if needed via **Settings** → **Custom Fonts**

---

### Step 4: Hero Section

#### 4.1 Add Elements to Home Page

1. **Add a Strip** (full-width section):
   - Drag **Strip** from **Add Elements**
   - Set height to **100vh** (Viewport Height)
   - Set background to **Image**

2. **Add Background Image**:
   - Select the strip
   - Click **Change Image**
   - Upload/select `hero.png`
   - Set image fit to **Cover**

3. **Add Overlay**:
   - Add a **Box** element on top of the strip
   - Set background to **Gradient**
   - Colors: 
     - Start: `rgba(102, 204, 102, 0.1)`
     - Middle: `rgba(51, 51, 204, 0.1)`
     - End: `rgba(0, 0, 0, 0.25)`
   - Set opacity or blend mode as needed

4. **Add Text Elements**:
   - Add **Heading** (H1): "Powering a Greener Future for UK Homes"
   - Add **Text**: "Expert consultancy and installation of solar panels, and battery storage solutions for all types of UK properties."
   - Style them with your brand fonts and colors

5. **Add Buttons**:
   - Add **Button**: "Get Started →"
   - Add **Button**: "Learn More →"
   - Style buttons with your brand colors

#### 4.2 Add Velo Code for Hero Section

1. Go to **Dev Mode** (Ctrl+Shift+E)
2. Open **Page Code** (for Home page)
3. Add this code:

```javascript
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Hero section animations
    animateHeroElements();
});

function animateHeroElements() {
    // Fade in animations for hero elements
    const heroTitle = $w('#heroTitle');
    const heroDescription = $w('#heroDescription');
    const heroButtons = $w('#heroButtons');
    
    if (heroTitle) {
        heroTitle.hide();
        setTimeout(() => {
            heroTitle.show('fadeIn', { duration: 800 });
        }, 200);
    }
    
    if (heroDescription) {
        heroDescription.hide();
        setTimeout(() => {
            heroDescription.show('fadeIn', { duration: 800 });
        }, 400);
    }
    
    if (heroButtons) {
        heroButtons.hide();
        setTimeout(() => {
            heroButtons.show('fadeIn', { duration: 800 });
        }, 600);
    }
}

// Button click handlers
export function heroGetStarted_click(event) {
    wixWindow.to('/schedule');
}

export function heroLearnMore_click(event) {
    // Scroll to next section or navigate
    wixWindow.to('/about');
}
```

**Note**: Replace `#heroTitle`, `#heroDescription`, etc. with your actual element IDs. You can set IDs in the element settings.

---

### Step 5: Process Section (Our Process)

#### 5.1 Add Elements

1. **Add a Strip** for the process section
2. **Add a Container** (max-width: 1200px, centered)
3. **Add Header**:
   - Heading: "Our Process"
   - Subtitle: "A streamlined journey from consultation to installation"

4. **Add Sidebar** (left side):
   - Add a **Box** or **Container**
   - Inside, add 5 **Buttons** for steps:
     - "Consultation"
     - "Assessment"
     - "Energy Plan"
     - "Installation"
     - "Aftercare"

5. **Add Main Content Area** (right side):
   - Add a **Container** for the active step content
   - Add elements for:
     - Step number
     - Step title
     - Step description
     - Step image
     - Step button

#### 5.2 Add Velo Code for Process Section

```javascript
$w.onReady(function () {
    initializeProcessSection();
});

let activeStep = 0;

const processSteps = [
    {
        number: '1',
        title: 'Book Consultation',
        description: 'Schedule a free, no-obligation consultation to discuss your energy needs and property requirements.',
        buttonText: 'Schedule Now →',
        imageUrl: 'your-image-url-here' // Replace with actual Wix media URL
    },
    {
        number: '2',
        title: 'Property Assessment & Quotation',
        description: 'Our experts conduct a thorough assessment of your property and provide a detailed, personalized quotation.',
        buttonText: 'Learn More →',
        imageUrl: 'your-image-url-here'
    },
    {
        number: '3',
        title: 'Custom Energy Plan',
        description: 'We design a tailored energy solution that meets your specific needs while respecting your property\'s character and requirements.',
        buttonText: 'View Plans →',
        imageUrl: 'your-image-url-here'
    },
    {
        number: '4',
        title: 'Professional Installation',
        description: 'Our certified technicians carry out the installation with minimal disruption to your daily routine.',
        buttonText: 'Contact Us →',
        imageUrl: 'your-image-url-here'
    },
    {
        number: '5',
        title: 'Aftercare & Support',
        description: 'Ongoing maintenance and support to ensure your energy system performs optimally for years to come.',
        buttonText: 'Get Support →',
        imageUrl: 'your-image-url-here'
    }
];

function initializeProcessSection() {
    // Set up button click handlers
    for (let i = 0; i < 5; i++) {
        const buttonId = `#processButton${i + 1}`;
        const button = $w(buttonId);
        if (button) {
            button.onClick(() => showStep(i));
        }
    }
    
    // Show initial step
    showStep(0);
}

function showStep(index) {
    activeStep = index;
    const step = processSteps[index];
    
    // Update step content
    const stepNumber = $w('#processStepNumber');
    const stepTitle = $w('#processStepTitle');
    const stepDescription = $w('#processStepDescription');
    const stepImage = $w('#processStepImage');
    const stepButton = $w('#processStepButton');
    
    if (stepNumber) stepNumber.text = step.number;
    if (stepTitle) stepTitle.text = step.title;
    if (stepDescription) stepDescription.text = step.description;
    if (stepButton) stepButton.label = step.buttonText;
    
    // Update image
    if (stepImage) {
        stepImage.src = step.imageUrl;
    }
    
    // Update active button state
    updateProcessButtons();
    
    // Animate step change
    animateStepChange();
}

function updateProcessButtons() {
    for (let i = 0; i < 5; i++) {
        const button = $w(`#processButton${i + 1}`);
        if (button) {
            if (i === activeStep) {
                button.style.backgroundColor = 'rgba(102, 204, 102, 0.1)';
            } else {
                button.style.backgroundColor = 'transparent';
            }
        }
    }
}

function animateStepChange() {
    const stepContent = $w('#processStepContent');
    if (stepContent) {
        stepContent.hide();
        setTimeout(() => {
            stepContent.show('fadeIn', { duration: 500 });
        }, 100);
    }
}

export function processStepButton_click(event) {
    wixWindow.to('/schedule');
}
```

#### 5.3 Mobile Responsiveness

For mobile carousel functionality, add this code:

```javascript
import wixWindow from 'wix-window';

function checkMobile() {
    const windowWidth = wixWindow.viewport.width;
    return windowWidth <= 968;
}

function updateProcessLayout() {
    const isMobile = checkMobile();
    const processList = $w('#processStepsList');
    
    if (isMobile && processList) {
        // Apply mobile carousel logic
        const scrollOffset = calculateScrollOffset();
        processList.style.transform = `translateX(-${scrollOffset}%)`;
    }
}

function calculateScrollOffset() {
    // Similar logic to your React component
    const itemWidth = 100 / 3; // 3 items visible
    const gap = 2.67; // gap percentage
    
    if (activeStep === 0) return 0;
    if (activeStep === 1) return itemWidth + gap;
    if (activeStep === 2) return (itemWidth + gap) * 2;
    return (itemWidth + gap) * 3; // For steps 4 and 5
}
```

---

### Step 6: Services Section

#### 6.1 Add Elements

1. **Add a Strip** for services
2. **Add Header**:
   - Label: "OUR SERVICES"
   - Heading: "Comprehensive energy solutions tailored for all UK properties"

3. **Add a Repeater** (for 3 service cards):
   - Go to **Add Elements** → **Repeater**
   - Add elements inside repeater:
     - Image
     - Heading (service title)
     - Text (description)
     - List (bullets)
     - Button ("Learn More")

#### 6.2 Add Velo Code for Services

```javascript
import wixData from 'wix-data';

$w.onReady(function () {
    setupServicesRepeater();
});

const servicesData = [
    {
        title: 'Solar Panels',
        subtitle: 'High-efficiency solar panel systems designed for all UK property types. Our installations preserve architectural integrity while maximizing energy generation and return on investment.',
        imageUrl: 'your-solar-panel-image-url',
        bullets: [
            'Custom mounting solutions',
            'All property types expertise',
            'Industry leading warranties'
        ]
    },
    {
        title: 'Battery Storage',
        subtitle: 'Smart battery storage systems that store excess solar energy for use during peak times, reducing reliance on the grid and maximizing savings for any property type.',
        imageUrl: 'your-battery-image-url',
        bullets: [
            'Lithium-ion technology',
            'Smart energy management',
            'Peak-time optimization'
        ]
    },
    {
        title: 'EV Chargers',
        subtitle: 'Professional electric vehicle charging point installations for residential and commercial properties, providing fast, safe, and reliable charging solutions for the future of transportation.',
        imageUrl: 'your-ev-charger-image-url',
        bullets: [
            'Fast charging capabilities',
            'Smart charging technology',
            'OZEV approved installations',
            'Home and commercial solutions'
        ]
    }
];

function setupServicesRepeater() {
    const servicesRepeater = $w('#servicesRepeater');
    
    if (servicesRepeater) {
        servicesRepeater.onItemReady(($item, itemData) => {
            // Set up each item
            const service = servicesData[itemData.index];
            
            if (service) {
                $item('#serviceImage').src = service.imageUrl;
                $item('#serviceTitle').text = service.title;
                $item('#serviceSubtitle').text = service.subtitle;
                
                // Set up bullets
                const bulletsList = $item('#serviceBullets');
                if (bulletsList) {
                    bulletsList.options = service.bullets;
                }
                
                // Button click handler
                $item('#serviceButton').onClick(() => {
                    wixWindow.to('/schedule');
                });
            }
        });
        
        // Set data
        servicesRepeater.data = servicesData;
    }
}
```

**Alternative**: Instead of using a Repeater, you can manually add 3 service cards and use this simpler code:

```javascript
$w.onReady(function () {
    setupServices();
});

function setupServices() {
    // Service 1
    $w('#service1Image').src = servicesData[0].imageUrl;
    $w('#service1Title').text = servicesData[0].title;
    $w('#service1Subtitle').text = servicesData[0].subtitle;
    $w('#service1Button').onClick(() => wixWindow.to('/schedule'));
    
    // Service 2
    $w('#service2Image').src = servicesData[1].imageUrl;
    $w('#service2Title').text = servicesData[1].title;
    $w('#service2Subtitle').text = servicesData[1].subtitle;
    $w('#service2Button').onClick(() => wixWindow.to('/schedule'));
    
    // Service 3
    $w('#service3Image').src = servicesData[2].imageUrl;
    $w('#service3Title').text = servicesData[2].title;
    $w('#service3Subtitle').text = servicesData[2].subtitle;
    $w('#service3Button').onClick(() => wixWindow.to('/schedule'));
}
```

---

### Step 7: Savings Calculator Section

#### 7.1 Add Elements

1. **Add a Strip** for calculator section
2. **Add Header**:
   - Heading: "How Much Money Can You Save With Solar?"
   - Subtitle: "Discover your potential savings with our quick energy assessment tool"

3. **Left Side** (Benefits):
   - Add 4 **Boxes** for benefit cards
   - Each with: icon, title, description

4. **Right Side** (Graph):
   - Add a **Box** for the graph container
   - Add **SVG** element or use **Chart** component
   - Add summary text elements

5. **Add Button**: "Do the quickscan →"

#### 7.2 Add Velo Code for Calculator

```javascript
import wixWindow from 'wix-window';

$w.onReady(function () {
    initializeCalculator();
});

const currentSpending = 150;
const savings = 120;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function initializeCalculator() {
    // Calculate data
    const spendingData = months.map((_, i) => currentSpending * (1 - i * 0.02));
    const savingsData = months.map((_, i) => savings * (1 + i * 0.03));
    
    // Update summary
    updateSummary(currentSpending, savings);
    
    // Draw graph (if using SVG)
    drawGraph(spendingData, savingsData);
}

function updateSummary(current, savingsAmount) {
    const currentAnnual = $w('#currentAnnualCost');
    const withSolar = $w('#withSolarCost');
    const totalSavings = $w('#totalAnnualSavings');
    
    if (currentAnnual) currentAnnual.text = `£${Math.round(current * 12)}`;
    if (withSolar) withSolar.text = `£${Math.round((current - savingsAmount) * 12)}`;
    if (totalSavings) totalSavings.text = `£${Math.round(savingsAmount * 12)}`;
}

function drawGraph(spendingData, savingsData) {
    // This would require SVG manipulation or using a chart library
    // For simplicity, you can use Wix's built-in Chart component
    // Or use a third-party library like Chart.js
    
    const chart = $w('#savingsChart');
    if (chart) {
        // Configure chart based on Wix Chart component API
        // This is a simplified example
    }
}

const benefits = [
    {
        icon: '💰',
        title: 'Accurate Estimates',
        description: 'Get precise calculations based on your actual energy usage and property details.'
    },
    {
        icon: '⚡',
        title: 'Instant Results',
        description: 'See your potential savings and payback period in seconds, no waiting required.'
    },
    {
        icon: '📊',
        title: 'Customized Report',
        description: 'Receive a detailed breakdown tailored to your specific home and energy needs.'
    },
    {
        icon: '✅',
        title: 'No Obligation',
        description: 'Free to use with no commitment - explore your options risk-free.'
    }
];

function setupBenefits() {
    for (let i = 0; i < 4; i++) {
        const benefit = benefits[i];
        $w(`#benefit${i + 1}Icon`).text = benefit.icon;
        $w(`#benefit${i + 1}Title`).text = benefit.title;
        $w(`#benefit${i + 1}Description`).text = benefit.description;
    }
}

export function quickscanButton_click(event) {
    wixWindow.to('/request-quote');
}
```

**Note**: For the graph, you can:
- Use Wix's **Chart** component (simpler)
- Use **SVG** element with custom Velo code
- Use a third-party library like **Chart.js** via Wix's External Dependencies

---

## Important Notes

### Element IDs
- **Set unique IDs** for all elements you reference in Velo code
- Go to element settings → **ID** field
- Use descriptive names like `heroTitle`, `processButton1`, etc.

### Navigation
- Use `wixWindow.to('/page-name')` for navigation
- Use `wixWindow.scrollTo()` for smooth scrolling

### Styling
- Most styling can be done in the **Design** panel
- Use Velo for dynamic styling: `$w('#elementId').style.property = 'value'`

### Responsive Design
- Use Wix's **Responsive View** (mobile/tablet/desktop)
- Adjust element positioning per breakpoint
- Use Velo to detect screen size: `wixWindow.viewport.width`

---

## Next Steps

Once the home page is complete:
1. Test all functionality
2. Ensure mobile responsiveness
3. Move to other pages (About, Request Quote, etc.)
4. Set up Header and Footer as site-wide elements

---

## Resources

- [Wix Velo Documentation](https://www.wix.com/velo/reference)
- [Wix Velo API Reference](https://www.wix.com/velo/reference/wix-window)
- [Wix Velo Forum](https://www.wix.com/velo/forum)

---

## Support

If you encounter issues:
1. Check Wix Velo documentation
2. Use browser console (F12) for debugging
3. Check element IDs match your code
4. Verify all images are uploaded to Media Manager


