# GISMAT MANDI - Premium Arabic Restaurant Website

A production-ready, Next.js restaurant website for GISMAT MANDI, designed with a luxury Arabic aesthetic.

## 🌟 Features

- **Modern Tech Stack**: Next.js 14+ (App Router), React, Framer Motion.
- **Premium Design**: Dark luxury theme with gold accents, utilizing `Amiri` (headings) and `Cairo` (body) fonts.
- **Responsive & Interactive**: Fully responsive layouts with smooth animations and transitions.
- **SEO Optimized**: Metadata configured for all major pages.
- **Component-Based**: Reusable components for Navbar, Footer, Cards, Buttons, etc.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/gismat-mandi.git
    cd gismat-mandi
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
app/
 ├── layout.js          # Root layout with fonts & metadata
 ├── page.js            # Home page
 ├── menu/              # Menu page
 ├── about/             # About page
 ├── reservations/      # Reservations page
 ├── gallery/           # Gallery page
 ├── contact/           # Contact page
 ├── globals.css        # Global styles & variables
components/
 ├── Navbar.js          # Responsive navigation
 ├── Footer.js          # Site footer
 ├── Button.js          # Custom button component
 ├── MenuCard.js        # Dish display card
 ├── ReservationForm.js # Booking form
 ├── GalleryGrid.js     # Image gallery
 ├── PageHeader.js      # Page top banner
 ├── SectionWrapper.js  # Layout wrapper
public/
 ├── images/            # Static assets
```

## 🎨 Design System

- **Primary Color (Gold)**: `#C9A24D`
- **Secondary Color (Dark Navy)**: `#1C1F2A`
- **Background**: `#12141C`
- **Fonts**: Amiri (Headings), Cairo (Body)

## 🔧 Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```
