# Wix Velo Migration - Quick Start Checklist

## ✅ Pre-Migration Setup

- [ ] Create Wix account at [wix.com](https://www.wix.com)
- [ ] Create new site or use existing one
- [ ] Enable Velo: **Dev Mode** (Ctrl+Shift+E) → Enable **Velo**
- [ ] Upload all images to **Media Manager**
- [ ] Set up brand colors in **Design** → **Color Palette**
- [ ] Set up fonts in **Design** → **Text Styles**

---

## 🏠 Home Page Migration Steps

### Step 1: Hero Section
- [ ] Add **Strip** (full-width, 100vh height)
- [ ] Set background image (`hero.png`)
- [ ] Add overlay **Box** with gradient
- [ ] Add **Heading** (H1): "Powering a Greener Future for UK Homes"
- [ ] Add **Text**: "Expert consultancy and installation..."
- [ ] Add **Button**: "Get Started →" (ID: `heroGetStarted`)
- [ ] Add **Button**: "Learn More →" (ID: `heroLearnMore`)
- [ ] Set element IDs:
  - `heroTitle`
  - `heroDescription`
  - `heroButtons`
- [ ] Copy Velo code from `wix-velo-home-page-code.js` (Hero section)

### Step 2: Process Section
- [ ] Add **Strip** for process section
- [ ] Add **Container** (max-width: 1200px, centered)
- [ ] Add header:
  - **Heading**: "Our Process" (ID: `processHeader`)
  - **Text**: "A streamlined journey..." (ID: `processSubtitle`)
- [ ] Add sidebar (left):
  - **Box** or **Container** (ID: `processSidebar`)
  - 5 **Buttons** (IDs: `processButton1` through `processButton5`)
    - "Consultation"
    - "Assessment"
    - "Energy Plan"
    - "Installation"
    - "Aftercare"
- [ ] Add main content (right):
  - **Container** (ID: `processStepContent`)
  - **Text** for step number (ID: `processStepNumber`)
  - **Heading** for step title (ID: `processStepTitle`)
  - **Text** for step description (ID: `processStepDescription`)
  - **Image** (ID: `processStepImage`)
  - **Button** (ID: `processStepButton`)
- [ ] Copy Velo code from `wix-velo-home-page-code.js` (Process section)
- [ ] Update image URLs in `processSteps` array

### Step 3: Services Section
- [ ] Add **Strip** for services
- [ ] Add header:
  - **Text** (small): "OUR SERVICES" (ID: `servicesLabel`)
  - **Heading**: "Comprehensive energy solutions..." (ID: `servicesTitle`)
- [ ] Add 3 service cards (or use **Repeater**):
  - **Service 1**:
    - **Image** (ID: `service1Image`)
    - **Heading** (ID: `service1Title`)
    - **Text** (ID: `service1Subtitle`)
    - **Text** for bullets (ID: `service1Bullets`) or individual elements
    - **Button** (ID: `service1Button`)
  - **Service 2**: Same structure (IDs: `service2...`)
  - **Service 3**: Same structure (IDs: `service3...`)
- [ ] Copy Velo code from `wix-velo-home-page-code.js` (Services section)
- [ ] Update image URLs in `servicesData` array

### Step 4: Savings Calculator Section
- [ ] Add **Strip** for calculator
- [ ] Add header:
  - **Heading**: "How Much Money Can You Save With Solar?" (ID: `savingsTitle`)
  - **Text**: "Discover your potential savings..." (ID: `savingsSubtitle`)
- [ ] Add left side (Benefits):
  - 4 **Boxes** for benefit cards:
    - **Text** for icon (ID: `benefit1Icon`, `benefit2Icon`, etc.)
    - **Heading** (ID: `benefit1Title`, etc.)
    - **Text** (ID: `benefit1Description`, etc.)
- [ ] Add right side (Graph):
  - **Box** for graph container (ID: `savingsGraphCard`)
  - **Text** elements for summary:
    - "Current Annual Cost:" (ID: `currentAnnualCost`)
    - "With Solar:" (ID: `withSolarCost`)
    - "Total Annual Savings:" (ID: `totalAnnualSavings`)
  - **Chart** component or **SVG** element (ID: `savingsChart`)
- [ ] Add **Button**: "Do the quickscan →" (ID: `quickscanButton`)
- [ ] Copy Velo code from `wix-velo-home-page-code.js` (Calculator section)

---

## 🔧 Important Notes

### Element IDs
- **Every element** referenced in Velo code must have a unique ID
- Set IDs in element settings: Click element → **Settings** → **ID** field
- Use descriptive names: `heroTitle`, `processButton1`, `service1Image`, etc.

### Image URLs in Velo
- After uploading images to Media Manager, get the image URL:
  1. Right-click image in Media Manager
  2. Copy image URL
  3. Use format: `wix:image://v1/your-image-id`
- Or use the image picker in element settings

### Navigation
- Use `wixLocation.to('/page-name')` for page navigation
- Use `element.scrollIntoView()` for smooth scrolling

### Testing
- Test in **Preview** mode (Ctrl+P)
- Test on mobile/tablet/desktop views
- Check browser console (F12) for errors

---

## 📝 Next Steps After Home Page

1. ✅ Test all functionality on home page
2. ✅ Ensure mobile responsiveness
3. ✅ Move to **About** page
4. ✅ Set up **Header** and **Footer** as site-wide elements
5. ✅ Migrate **Request Quote** page
6. ✅ Migrate **Schedule** page
7. ✅ Migrate remaining pages

---

## 🆘 Troubleshooting

### Elements not found
- **Check element IDs** match exactly (case-sensitive)
- **Verify element exists** on the page
- **Check element is visible** (not hidden)

### Images not loading
- **Verify image URLs** are correct
- **Check image format** (JPG, PNG, etc.)
- **Ensure images are uploaded** to Media Manager

### Code not running
- **Check browser console** (F12) for errors
- **Verify Velo is enabled** (Dev Mode → Velo)
- **Check syntax errors** in code editor

### Navigation not working
- **Verify page names** match exactly (case-sensitive)
- **Check page exists** in Pages menu
- **Use correct format**: `wixLocation.to('/page-name')`

---

## 📚 Resources

- [Wix Velo Documentation](https://www.wix.com/velo/reference)
- [Wix Velo API Reference](https://www.wix.com/velo/reference/wix-window)
- [Wix Velo Forum](https://www.wix.com/velo/forum)

---

## 💡 Tips

1. **Start simple**: Get basic layout working first, then add interactivity
2. **Use Wix elements**: Don't reinvent the wheel - use Wix's built-in components
3. **Test frequently**: Test after each section
4. **Save often**: Wix auto-saves, but you can manually save
5. **Use preview mode**: Always test in preview before publishing


