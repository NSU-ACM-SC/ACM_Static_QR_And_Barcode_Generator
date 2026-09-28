# Neo-Brutalist QR & Barcode Generator

A stunning, ultra-premium Neo-Brutalist styled QR Code and Barcode generator built with Next.js and TailwindCSS. Features extremely high-resolution 4K canvas downloads and dynamic logo framing.

## Features
- **QR Code Generation**: Generate QR codes with customizable colors, dynamic values, and an adjustable error correction level (currently set to "L"). *Note: Using a large center logo with low error correction may impact scannability.*
- **Barcode Generation**: Support for standard barcodes with dynamically expanding canvas export.
- **Neo-Brutalist Design**: Aggressive shadows, bold typography, and a polka-dot background.
- **Color Customization**: Direct hex-code input fields for precise background and foreground color selection, synced with visual color pickers.
- **Dynamic Logo Framing**: An integrated diamond frame beautifully houses logos inside the QR code and a brutalist drop-shadow logo hovers over the barcode.
- **4K High-Resolution Export**: Custom canvas drawing engine downloads the generated code upscaled by 16x (up to 4K resolution) for pristine print-ready images, maintaining aspect ratios for non-square logos.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to view it in the browser.

## Technologies Used
- Next.js (React)
- TailwindCSS
- qrcode.react
- react-barcode
