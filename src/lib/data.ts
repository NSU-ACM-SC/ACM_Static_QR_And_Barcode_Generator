export type SocialLinks = {
  YouTube: string;
  Facebook: string;
  LinkedIn: string;
  GitHub: string;
};

export type ChapterAddress = {
  line1: string;
  line2: string;
  line3: string;
  mapUrl: string;
};

export const chapterSocialLinks: SocialLinks = {
  YouTube: "https://www.youtube.com/@nsuacmstudentchapter4819",
  Facebook: "https://www.facebook.com/nsuacmsc/",
  LinkedIn: "https://www.linkedin.com/company/nsuacmsc/",
  GitHub: "https://github.com/NSU-ACM-SC",
};

export const chapterAddress: ChapterAddress = {
  line1: "South Academic Building (10th Floor)",
  line2: "North South University",
  line3: "Bashundhara R/A, Dhaka-1229",
  mapUrl: "https://maps.google.com/?q=North+South+University,+Bashundhara,+Dhaka",
};

export const quickLinks = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "#" },
  { name: "Events", url: "#" },
  { name: "Contact", url: "#" },
];

export const footerData = {
  brand: {
    logoSrc: (process.env.NODE_ENV === "production" ? "/ACM_Static_QR_And_Barcode_Generator" : "") + "/acm-logo.webp",
    title: "NSU ACM",
    subtitle: "Student Chapter",
    description: "Department of Electrical & Computer Engineering, North South University.",
  },
  quickLinks,
  socialLinks: chapterSocialLinks,
  address: chapterAddress,
  copyright: "© 2026 NSU ACM Student Chapter. All rights reserved.",
  credits: "Developed by Web Group, NSU ACM Student Chapter.",
};
