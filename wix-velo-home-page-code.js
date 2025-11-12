// ============================================
// Wix Velo Code - Home Page
// MarGav Solar Website
// ============================================

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

// ============================================
// HERO SECTION
// ============================================

$w.onReady(function () {
    initializeHeroSection();
});

function initializeHeroSection() {
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
    wixLocation.to('/schedule');
}

export function heroLearnMore_click(event) {
    // Scroll to process section or navigate
    const processSection = $w('#processSection');
    if (processSection) {
        processSection.scrollIntoView();
    }
}

// ============================================
// PROCESS SECTION
// ============================================

let activeStep = 0;

const processSteps = [
    {
        number: '1',
        title: 'Book Consultation',
        description: 'Schedule a free, no-obligation consultation to discuss your energy needs and property requirements.',
        buttonText: 'Schedule Now →',
        imageUrl: 'wix:image://v1/your-consultation-image-id' // Replace with actual Wix image ID
    },
    {
        number: '2',
        title: 'Property Assessment & Quotation',
        description: 'Our experts conduct a thorough assessment of your property and provide a detailed, personalized quotation.',
        buttonText: 'Learn More →',
        imageUrl: 'wix:image://v1/your-assessment-image-id'
    },
    {
        number: '3',
        title: 'Custom Energy Plan',
        description: 'We design a tailored energy solution that meets your specific needs while respecting your property\'s character and requirements.',
        buttonText: 'View Plans →',
        imageUrl: 'wix:image://v1/your-energy-plan-image-id'
    },
    {
        number: '4',
        title: 'Professional Installation',
        description: 'Our certified technicians carry out the installation with minimal disruption to your daily routine.',
        buttonText: 'Contact Us →',
        imageUrl: 'wix:image://v1/your-installation-image-id'
    },
    {
        number: '5',
        title: 'Aftercare & Support',
        description: 'Ongoing maintenance and support to ensure your energy system performs optimally for years to come.',
        buttonText: 'Get Support →',
        imageUrl: 'wix:image://v1/your-aftercare-image-id'
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
    
    // Set up responsive layout
    updateProcessLayout();
    wixWindow.onViewportChange(() => {
        updateProcessLayout();
    });
}

function showStep(index) {
    activeStep = index;
    const step = processSteps[index];
    
    // Update step content elements
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
                button.style.fontWeight = '600';
            } else {
                button.style.backgroundColor = 'transparent';
                button.style.fontWeight = '400';
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

function updateProcessLayout() {
    const isMobile = checkMobile();
    const processList = $w('#processStepsList');
    
    if (isMobile && processList) {
        // Apply mobile carousel logic
        const scrollOffset = calculateScrollOffset();
        processList.style.transform = `translateX(-${scrollOffset}%)`;
    } else if (processList) {
        processList.style.transform = 'none';
    }
}

function checkMobile() {
    const windowWidth = wixWindow.viewport.width;
    return windowWidth <= 968;
}

function calculateScrollOffset() {
    // Calculate scroll offset for mobile carousel
    // This should match your React component logic
    const itemWidth = 100 / 3; // 3 items visible
    const gap = 2.67; // gap percentage
    
    if (activeStep === 0) return 0;
    if (activeStep === 1) return itemWidth + gap;
    if (activeStep === 2) return (itemWidth + gap) * 2;
    return (itemWidth + gap) * 3; // For steps 4 and 5
}

export function processStepButton_click(event) {
    wixLocation.to('/schedule');
}

// ============================================
// SERVICES SECTION
// ============================================

const servicesData = [
    {
        title: 'Solar Panels',
        subtitle: 'High-efficiency solar panel systems designed for all UK property types. Our installations preserve architectural integrity while maximizing energy generation and return on investment.',
        imageUrl: 'wix:image://v1/your-solar-panel-image-id',
        bullets: [
            'Custom mounting solutions',
            'All property types expertise',
            'Industry leading warranties'
        ]
    },
    {
        title: 'Battery Storage',
        subtitle: 'Smart battery storage systems that store excess solar energy for use during peak times, reducing reliance on the grid and maximizing savings for any property type.',
        imageUrl: 'wix:image://v1/your-battery-image-id',
        bullets: [
            'Lithium-ion technology',
            'Smart energy management',
            'Peak-time optimization'
        ]
    },
    {
        title: 'EV Chargers',
        subtitle: 'Professional electric vehicle charging point installations for residential and commercial properties, providing fast, safe, and reliable charging solutions for the future of transportation.',
        imageUrl: 'wix:image://v1/your-ev-charger-image-id',
        bullets: [
            'Fast charging capabilities',
            'Smart charging technology',
            'OZEV approved installations',
            'Home and commercial solutions'
        ]
    }
];

function setupServices() {
    // Service 1
    const service1Image = $w('#service1Image');
    const service1Title = $w('#service1Title');
    const service1Subtitle = $w('#service1Subtitle');
    const service1Button = $w('#service1Button');
    
    if (service1Image) service1Image.src = servicesData[0].imageUrl;
    if (service1Title) service1Title.text = servicesData[0].title;
    if (service1Subtitle) service1Subtitle.text = servicesData[0].subtitle;
    if (service1Button) {
        service1Button.onClick(() => wixLocation.to('/schedule'));
    }
    
    // Set up bullets for service 1
    setupServiceBullets(1, servicesData[0].bullets);
    
    // Service 2
    const service2Image = $w('#service2Image');
    const service2Title = $w('#service2Title');
    const service2Subtitle = $w('#service2Subtitle');
    const service2Button = $w('#service2Button');
    
    if (service2Image) service2Image.src = servicesData[1].imageUrl;
    if (service2Title) service2Title.text = servicesData[1].title;
    if (service2Subtitle) service2Subtitle.text = servicesData[1].subtitle;
    if (service2Button) {
        service2Button.onClick(() => wixLocation.to('/schedule'));
    }
    
    setupServiceBullets(2, servicesData[1].bullets);
    
    // Service 3
    const service3Image = $w('#service3Image');
    const service3Title = $w('#service3Title');
    const service3Subtitle = $w('#service3Subtitle');
    const service3Button = $w('#service3Button');
    
    if (service3Image) service3Image.src = servicesData[2].imageUrl;
    if (service3Title) service3Title.text = servicesData[2].title;
    if (service3Subtitle) service3Subtitle.text = servicesData[2].subtitle;
    if (service3Button) {
        service3Button.onClick(() => wixLocation.to('/schedule'));
    }
    
    setupServiceBullets(3, servicesData[2].bullets);
}

function setupServiceBullets(serviceNumber, bullets) {
    // If using a list element, you can set options
    const bulletsList = $w(`#service${serviceNumber}Bullets`);
    if (bulletsList) {
        // For text elements, you can create a formatted string
        let bulletsText = '';
        bullets.forEach(bullet => {
            bulletsText += `✓ ${bullet}\n`;
        });
        bulletsList.text = bulletsText.trim();
    }
    
    // Alternative: If using separate text elements
    bullets.forEach((bullet, index) => {
        const bulletElement = $w(`#service${serviceNumber}Bullet${index + 1}`);
        if (bulletElement) {
            bulletElement.text = `✓ ${bullet}`;
        }
    });
}

// ============================================
// SAVINGS CALCULATOR SECTION
// ============================================

const currentSpending = 150;
const savings = 120;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function initializeCalculator() {
    // Calculate data
    const spendingData = months.map((_, i) => currentSpending * (1 - i * 0.02));
    const savingsData = months.map((_, i) => savings * (1 + i * 0.03));
    
    // Update summary
    updateSummary(currentSpending, savings);
    
    // Setup benefits
    setupBenefits();
}

function updateSummary(current, savingsAmount) {
    const currentAnnual = $w('#currentAnnualCost');
    const withSolar = $w('#withSolarCost');
    const totalSavings = $w('#totalAnnualSavings');
    
    if (currentAnnual) currentAnnual.text = `£${Math.round(current * 12)}`;
    if (withSolar) withSolar.text = `£${Math.round((current - savingsAmount) * 12)}`;
    if (totalSavings) totalSavings.text = `£${Math.round(savingsAmount * 12)}`;
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
        const icon = $w(`#benefit${i + 1}Icon`);
        const title = $w(`#benefit${i + 1}Title`);
        const description = $w(`#benefit${i + 1}Description`);
        
        if (icon) icon.text = benefit.icon;
        if (title) title.text = benefit.title;
        if (description) description.text = benefit.description;
    }
}

export function quickscanButton_click(event) {
    wixLocation.to('/request-quote');
}

// ============================================
// INITIALIZE ALL SECTIONS ON PAGE LOAD
// ============================================

$w.onReady(function () {
    initializeHeroSection();
    initializeProcessSection();
    setupServices();
    initializeCalculator();
});

