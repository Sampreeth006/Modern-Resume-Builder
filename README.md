# 🚀 Modern-Resume-Builder
A sleek, interactive, and fully customizable Resume Builder built with HTML, JavaScript, Bootstrap 5, and modern CSS. This project allows users to design, live preview, multiple templates with customizable themes and download professional resumes in real-time — all from within the browser.

![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🎨 **5 Professional Templates**
- **Modern** - Two-column layout with colored sidebar and skill progress bars
- **Classic** - Traditional single-column with serif font
- **Minimal** - Ultra-clean, text-focused design
- **Creative** - Bold gradient header with modern styling
- **Professional** - Corporate formal with Times New Roman

### 🌈 **Customizable Colors**
- Custom color picker for resume themes
- 8 preset colors (Blue, Green, Orange, Red, Purple, Pink, Cyan, Teal)
- Color applies to resume headers, borders, and accents
- Real-time preview updates

### 🌓 **Light/Dark Mode**
- Toggle between light and dark themes
- Theme preference saved in browser
- Smooth transitions

### 📝 **Dynamic Form Sections**
- **Personal Information** - Name, title, email, phone, location, photo
- **Social Links** - LinkedIn, GitHub, Portfolio, Twitter
- **Professional Summary** - Brief career overview
- **Work Experience** - Add multiple positions with month/year pickers
  - "Currently working here" checkbox
  - Date range selector
- **Education** - Multiple degrees with year picker (1950-2050)
- **Skills** - Skill name with proficiency levels (Expert, Advanced, Intermediate, Beginner)
- **Certifications** - Add multiple certifications

### 🔄 **Real-Time Live Preview**
- See changes instantly as you type
- Preview stays visible while scrolling (sticky positioning)
- Auto-scroll to relevant sections
- Debounced updates for smooth performance

### 💾 **Export Options**
- **Print/Save as PDF** - Direct print functionality
- **Download as HTML** - Standalone file with embedded styles
- **Edit Anytime** - Return to form and make changes

## 📁 File Structure

```
resume-builder/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and themes
├── script.js           # All JavaScript functionality
└── README.md          # This file
```

## 🚀 Quick Start

### Installation

1. **Download all files** to the same folder:
   - `index.html`
   - `style.css`
   - `script.js`

2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge)

3. **Start building your resume!**

### No Installation Required
- No dependencies to install
- No build process needed
- No server required
- Works completely offline

## 💻 Usage Guide

### Step 1: Choose Template & Color
1. Select a template from 5 options at the top
2. Pick a color using the color picker or preset colors
3. Toggle light/dark mode if desired

### Step 2: Fill Personal Information
- Enter your name, professional title, contact details
- Upload a profile photo (optional)
- Add social media links

### Step 3: Add Content
- Write a professional summary
- Add work experiences (use + button for multiple entries)
- Add education background
- List your skills with proficiency levels
- Include certifications

### Step 4: Preview & Export
- Watch live preview update in real-time on the right
- Click "Finalize Resume" when ready
- Print/Save as PDF or Download as HTML

## 🎯 Key Features Explained

### Live Preview
The preview panel on the right shows your resume in real-time. It:
- Updates as you type (with 500ms debounce)
- Stays visible while scrolling (sticky positioning)
- Scrolls to relevant sections when you focus on form fields
- Can be minimized/maximized using the collapse button

### Template System
Each template uses your selected color for:
- Headers and titles
- Borders and dividers
- Accent elements
- Links and highlights

### Date Pickers
- **Work Experience**: Month/Year pickers for start and end dates
- **Current Job**: Check "Currently working here" to auto-set end date to "Present"
- **Education**: Year input with validation (1950-2050)

### Dynamic Fields
- Click "+ Add" buttons to add more entries
- Click "×" button to remove unwanted entries
- All fields support real-time preview updates

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Minimum Requirements:**
- Modern browser with ES6 support
- JavaScript enabled
- LocalStorage support (for theme persistence)

## 📱 Responsive Design

- **Desktop** (1400px+): Full layout with side-by-side preview
- **Laptop** (992px - 1399px): Optimized spacing
- **Tablet** (768px - 991px): Preview hidden, full-width form
- **Mobile** (<768px): Single column, touch-optimized

## 🐛 Troubleshooting

### Preview Not Showing
- Ensure all three files (HTML, CSS, JS) are in the same folder
- Check browser console (F12) for errors
- Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Photo Not Uploading
- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: Limited by browser memory
- Photo is converted to Base64 for portability

### Template Not Switching
- Check that script.js is loaded properly
- Verify no JavaScript errors in console
- Try refreshing the page

### Print Issues
- Use "Print to PDF" option in browser
- Ensure margins are set correctly
- Check that scale is set to 100%

## 📋 Features Checklist

- [x] 5 Professional templates
- [x] Custom color picker with 8 presets
- [x] Light/Dark mode toggle
- [x] Real-time live preview
- [x] Sticky preview panel
- [x] Photo upload support
- [x] Month/Year date pickers
- [x] Dynamic add/remove fields
- [x] Print to PDF
- [x] Download as HTML
- [x] Fully responsive
- [x] No dependencies
- [x] Offline capable
- [x] Theme persistence
- [x] Auto-scroll preview

## 🔮 Future Enhancements

- [ ] More templates (6-10 templates)
- [ ] Export to Word/DOCX
- [ ] Import from LinkedIn
- [ ] Cloud save/load
- [ ] Multiple language support
- [ ] AI-powered content suggestions
- [ ] ATS (Applicant Tracking System) optimization
- [ ] Analytics dashboard
- [ ] Collaboration features
- [ ] Version history

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 👨‍💻 Credits

**Created by:** Sampreeth M P  
**Year:** 2025  
**Original Version:** 2022 (Enhanced in 2025)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute
1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Review browser console for errors
3. Ensure all files are properly saved
4. Try in a different browser

## 🌟 Acknowledgments

- Bootstrap 5 for responsive framework
- Font Awesome for icons
- Google Fonts for typography options

## 📊 Version History

### Version 2.0 (2025) - Current
- Added 5 new templates (Creative, Professional, Minimal, Modern, Classic)
- Custom color picker with presets
- Light/Dark mode toggle
- Month/Year date pickers
- Live preview with sticky positioning
- Improved responsive design
- Enhanced UI/UX

### Version 1.0 (2022)
- Basic resume builder
- Single template
- Basic form fields
- Simple preview

---

**Made with ❤️ for job seekers worldwide**

**⭐ If you find this useful, please star the project!**
