export type Locale = "en" | "ar";

export const translations = {
  en: {
    // Navbar
    brand: "ANTIGRAVITY",
    searchPlaceholder: "Search AI news...",
    navNews: "News",
    navTrending: "Trending",
    navNewsletter: "Newsletter",
    joinNow: "Join Now",

    // Hero
    heroHeadline1: "The Future of",
    heroHeadlineHighlight: "Intelligence",
    heroHeadline2: ", Curated.",
    heroSubtext:
      "Daily insights into the AI revolution. Stay ahead with the latest news, research, and breakthroughs delivered to your screen.",
    heroCtaPrimary: "Explore Latest News",
    heroCtaSecondary: "Learn More",

    // News section
    sectionTitle: "Latest AI Intelligence",
    categories: ["All", "LLM", "Research", "Business", "Robotics", "Healthcare", "Security", "Ethics", "Policy", "Energy", "Search", "Gaming", "Creative"],
    noResults: "No results found for your search.",

    // Drawer
    drawerReadMore: "Read Full Article",
    drawerBodyFiller:
      "This is a curated summary from our editorial team. For the complete in-depth analysis, breaking details, and expert commentary on this development in artificial intelligence, please visit the original source.",

    // Footer
    footerTagline:
      "Your daily dose of AI intelligence. We curate the most important news, research, and tools to keep you ahead of the curve.",
    newsletterTitle: "Subscribe to our newsletter",
    newsletterSubtext: "Join 10,000+ AI enthusiasts receiving weekly insights.",
    newsletterPlaceholder: "Email address",
    footerCopyright: "© 2026 Antigravity AI News. All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerTwitter: "Twitter",
  },
  ar: {
    // Navbar
    brand: "أنتي غرافيتي",
    searchPlaceholder: "ابحث في أخبار الذكاء الاصطناعي...",
    navNews: "الأخبار",
    navTrending: "الأكثر تداولاً",
    navNewsletter: "النشرة البريدية",
    joinNow: "انضم الآن",

    // Hero
    heroHeadline1: "مستقبل",
    heroHeadlineHighlight: "الذكاء",
    heroHeadline2: "، منقّح بعناية.",
    heroSubtext:
      "رؤى يومية حول ثورة الذكاء الاصطناعي. ابقَ في الطليعة مع أحدث الأخبار والأبحاث والاكتشافات التي تصل إلى شاشتك.",
    heroCtaPrimary: "استكشف آخر الأخبار",
    heroCtaSecondary: "اعرف المزيد",

    // News section
    sectionTitle: "أحدث أخبار الذكاء الاصطناعي",
    categories: ["الكل", "نماذج اللغة", "الأبحاث", "الأعمال", "الروبوتات", "الرعاية الصحية", "الأمن", "الأخلاقيات", "السياسات", "الطاقة", "البحث", "الألعاب", "الإبداع"],
    noResults: "لا توجد نتائج تطابق بحثك.",

    // Drawer
    drawerReadMore: "اقرأ المقال كاملاً",
    drawerBodyFiller:
      "هذا ملخص منقّح من فريقنا التحريري. للاطلاع على التحليل المعمّق الكامل، والتفاصيل العاجلة، وتعليقات الخبراء حول هذا التطور في مجال الذكاء الاصطناعي، يرجى زيارة المصدر الأصلي.",

    // Footer
    footerTagline:
      "جرعتك اليومية من معلومات الذكاء الاصطناعي. نختار لك أهم الأخبار والأبحاث والأدوات لتبقى دائماً في الصدارة.",
    newsletterTitle: "اشترك في نشرتنا البريدية",
    newsletterSubtext: "انضم إلى أكثر من 10,000 مهتم بالذكاء الاصطناعي يتلقّون رؤية أسبوعية.",
    newsletterPlaceholder: "البريد الإلكتروني",
    footerCopyright: "© 2026 أنتي غرافيتي لأخبار الذكاء الاصطناعي. جميع الحقوق محفوظة.",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الخدمة",
    footerTwitter: "تويتر",
  },
} as const;

export type TranslationKeys = keyof typeof translations.en;
