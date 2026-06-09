import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbjH9n2kd4JOsWiVbECXUhZxV9Ax9UWqA",
  authDomain: "legal-and-vakil-45a5b.firebaseapp.com",
  projectId: "legal-and-vakil-45a5b",
  storageBucket: "legal-and-vakil-45a5b.firebasestorage.app",
  messagingSenderId: "683462356095",
  appId: "1:683462356095:web:b31122014774194264234a",
  measurementId: "G-4B4FVX5DFV"
};

// Initialize Firebase if not already initialized
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

let db = null;
try {
    db = getFirestore(app);
} catch (e) {
    console.warn("Firebase Firestore failed to initialize, running on Local Database mode.", e);
}

// --- MOCK DATA FOR LOCAL FALLBACK ---
const mockLawyers = [
    {
        id: "rahul",
        name: "Adv. Rahul",
        specialty: "Corporate Law",
        title: "Corporate Law Specialist",
        rating: 4.8,
        reviewsCount: 128,
        popularity: "Top 5%",
        popularityText: "Most Popular Lawyer",
        expYears: 12,
        location: "Delhi, India",
        bio: "Expert in corporate law, contract drafting, business compliance and legal advisory for startups and enterprises.",
        tags: ["Corporate Law", "Contract Drafting", "Business Compliance"],
        education: ["LL.B. (Delhi University)", "LL.M. (ILS Law College)"],
        verified: true,
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
        bgImg: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: "priya",
        name: "Adv. Priya",
        specialty: "Family Law",
        title: "Family & Divorce Expert",
        rating: 4.7,
        reviewsCount: 96,
        popularity: "Top 10%",
        popularityText: "Highly Rated Expert",
        expYears: 10,
        location: "Mumbai, India",
        bio: "Specialist in family law, divorce, child custody and matrimonial disputes. Dedicated to amicable legal resolutions.",
        tags: ["Family Law", "Divorce", "Child Custody"],
        education: ["LL.B. (Mumbai University)", "LL.M. (Government Law College)"],
        verified: true,
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: "arjun",
        name: "Adv. Arjun",
        specialty: "Criminal Law",
        title: "Criminal Defense Advocate",
        rating: 4.6,
        reviewsCount: 84,
        popularity: "Top 8%",
        popularityText: "Top Litigator",
        expYears: 9,
        location: "Bengaluru, India",
        bio: "Experienced in criminal defense, bail matters, trials, appellate litigation, and court representations across districts.",
        tags: ["Criminal Law", "Bail Matters", "Court Litigation"],
        education: ["LL.B. (Bangalore University)", "LL.M. (NLSIU Bangalore)"],
        verified: true,
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: "neha",
        name: "Adv. Neha",
        specialty: "Property Law",
        title: "Property & Real Estate Specialist",
        rating: 4.6,
        reviewsCount: 112,
        popularity: "Top 15%",
        popularityText: "Property Law Expert",
        expYears: 9,
        location: "Pune, India",
        bio: "Focused on property law, real estate title verifications, documentation, RERA compliance, and agreement drafting.",
        tags: ["Property Law", "Real Estate", "Agreement Drafting"],
        education: ["LL.B. (Pune University)", "LL.M. (Symbiosis Law School)"],
        verified: true,
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: "rohan",
        name: "Adv. Rohan",
        specialty: "Consumer Court",
        title: "Consumer Rights Specialist",
        rating: 4.7,
        reviewsCount: 88,
        popularity: "Top 12%",
        popularityText: "Popular Advocate",
        expYears: 11,
        location: "Hyderabad, India",
        bio: "Handling consumer disputes, cheque bounces, recovery lawsuits, debt settlements, and compliance cases.",
        tags: ["Consumer Law", "Cheque Bounce", "Recovery"],
        education: ["LL.B. (Osmania University)"],
        verified: true,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
];

const mockServices = [
    { id: "business", title: "Business Compliance", desc: "Ensure your business stays compliant.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=300" },
    { id: "marriage", title: "Marriage Consultation", desc: "Get expert guidance on marriage matters.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=300" },
    { id: "dispute", title: "Online Dispute Resolution", desc: "Resolve disputes online quickly and efficiently.", img: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=80&w=300" },
    { id: "challan", title: "e Challan", desc: "Check & resolve your e-challan issues.", img: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=300" },
    { id: "verification", title: "Document Verification", desc: "Verify your documents quickly & securely.", img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300" },
    { id: "debt", title: "Debt Issue", desc: "Get help with debt recovery & settlement.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300" }
];

const defaultCases = [
    { id: "LAV-2024-1021", type: "Property Dispute", status: "In Progress", statusClass: "progress", nextHearing: "24 May 2024" },
    { id: "LAV-2024-0987", type: "Consumer Case", status: "In Progress", statusClass: "progress", nextHearing: "30 May 2024" },
    { id: "LAV-2024-0765", type: "Cheque Bounce", status: "Under Review", statusClass: "review", nextHearing: "05 Jun 2024" }
];

const mockReviews = {
    "rahul": [
        { name: "Amit Verma", rating: 5, date: "2 weeks ago", text: "Very professional and knowledgeable. Rahul sir understood my issue clearly and provided the best solution.", verified: true },
        { name: "Siddharth Sen", rating: 4, date: "1 month ago", text: "Great experience. He drafted our contract terms with extreme care and detail.", verified: true }
    ],
    "priya": [
        { name: "Ruchi Sharma", rating: 5, date: "3 weeks ago", text: "She was extremely empathetic and helped me through a very tough divorce procedure. Strongly recommended.", verified: true }
    ],
    "arjun": [
        { name: "Prateek Goel", rating: 5, date: "1 month ago", text: "Got bail for my brother in record time. Extremely grateful to Adv. Arjun.", verified: true }
    ],
    "neha": [
        { name: "Vikram Shah", rating: 4, date: "2 months ago", text: "Very thorough property checking. Made us feel secure about buying our new flat.", verified: true }
    ],
    "rohan": [
        { name: "Kunal Gupta", rating: 5, date: "1 month ago", text: "Rohan resolved our recovery matter within weeks. Super professional services.", verified: true }
    ]
};

// --- INITIALIZE LOCAL STORAGE ---
if (!localStorage.getItem("legal_cases")) {
    localStorage.setItem("legal_cases", JSON.stringify(defaultCases));
}
if (!localStorage.getItem("legal_reviews")) {
    localStorage.setItem("legal_reviews", JSON.stringify(mockReviews));
}
if (!localStorage.getItem("legal_bookings")) {
    localStorage.setItem("legal_bookings", JSON.stringify([]));
}

// --- FIREBASE HELPER METHODS ---

export async function fetchLawyers() {
    if (!db) return mockLawyers;
    try {
        const querySnapshot = await getDocs(collection(db, "lawyers"));
        if (querySnapshot.empty) {
            console.log("Firestore lawyers collection is empty, returning mock data");
            return mockLawyers;
        }
        const lawyers = [];
        querySnapshot.forEach((doc) => {
            lawyers.push({ id: doc.id, ...doc.data() });
        });
        return lawyers;
    } catch (e) {
        console.error("Error fetching lawyers from Firestore, falling back to mock:", e);
        return mockLawyers;
    }
}

export async function fetchServices() {
    if (!db) return mockServices;
    try {
        const querySnapshot = await getDocs(collection(db, "services"));
        if (querySnapshot.empty) return mockServices;
        const services = [];
        querySnapshot.forEach((doc) => {
            services.push({ id: doc.id, ...doc.data() });
        });
        return services;
    } catch (e) {
        console.error("Error fetching services from Firestore:", e);
        return mockServices;
    }
}

export async function fetchCases() {
    // We combine default local cases with user's newly created cases in localStorage
    const localCases = JSON.parse(localStorage.getItem("legal_cases")) || defaultCases;
    if (!db) return localCases;
    try {
        const querySnapshot = await getDocs(collection(db, "cases"));
        if (querySnapshot.empty) return localCases;
        const dbCases = [];
        querySnapshot.forEach((doc) => {
            dbCases.push({ id: doc.id, ...doc.data() });
        });
        // Combine them ensuring no duplicate IDs
        const combined = [...dbCases];
        localCases.forEach(lc => {
            if (!combined.some(c => c.id === lc.id)) combined.push(lc);
        });
        return combined;
    } catch (e) {
        console.error("Error fetching cases from Firestore:", e);
        return localCases;
    }
}

export async function addCase(newCase) {
    // Save locally
    const cases = JSON.parse(localStorage.getItem("legal_cases")) || [];
    cases.unshift(newCase);
    localStorage.setItem("legal_cases", JSON.stringify(cases));

    if (db) {
        try {
            await addDoc(collection(db, "cases"), newCase);
            console.log("Successfully wrote case to Firestore!");
        } catch (e) {
            console.error("Error adding case to Firestore:", e);
        }
    }
}

export async function saveBooking(bookingData) {
    // Save locally
    const bookings = JSON.parse(localStorage.getItem("legal_bookings")) || [];
    bookings.push(bookingData);
    localStorage.setItem("legal_bookings", JSON.stringify(bookings));

    // Also automatically create an Ongoing Case for this booking
    const randId = "LAV-2026-" + Math.floor(1000 + Math.random() * 9000);
    const newCase = {
        id: randId,
        type: bookingData.serviceName || bookingData.service || "Legal Consultation",
        status: "Under Review",
        statusClass: "review",
        nextHearing: "To Be Scheduled"
    };
    await addCase(newCase);

    if (db) {
        try {
            await addDoc(collection(db, "bookings"), bookingData);
            console.log("Booking saved to Firestore!");
        } catch (e) {
            console.error("Error saving booking to Firestore:", e);
        }
    }
    return newCase;
}

export async function fetchReviews(lawyerId) {
    const allLocalReviews = JSON.parse(localStorage.getItem("legal_reviews")) || mockReviews;
    const localLawyerReviews = allLocalReviews[lawyerId] || [];

    if (!db) return localLawyerReviews;

    try {
        const q = query(collection(db, "reviews"), where("lawyerId", "==", lawyerId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return localLawyerReviews;

        const dbReviews = [];
        querySnapshot.forEach((doc) => {
            dbReviews.push(doc.data());
        });

        // Merge keeping uniqueness
        const combined = [...dbReviews];
        localLawyerReviews.forEach(lr => {
            if (!combined.some(r => r.name === lr.name && r.text === lr.text)) combined.push(lr);
        });
        return combined;
    } catch (e) {
        console.error("Error loading reviews from Firestore:", e);
        return localLawyerReviews;
    }
}

export async function addReview(reviewData) {
    const allLocalReviews = JSON.parse(localStorage.getItem("legal_reviews")) || {};
    if (!allLocalReviews[reviewData.lawyerId]) {
        allLocalReviews[reviewData.lawyerId] = [];
    }
    allLocalReviews[reviewData.lawyerId].unshift(reviewData);
    localStorage.setItem("legal_reviews", JSON.stringify(allLocalReviews));

    if (db) {
        try {
            await addDoc(collection(db, "reviews"), reviewData);
            console.log("Review saved to Firestore!");
        } catch (e) {
            console.error("Error adding review to Firestore:", e);
        }
    }
}

// Expose helpers globally for non-module script consumption
window.dbHelper = {
    fetchLawyers,
    fetchServices,
    fetchCases,
    addCase,
    saveBooking,
    fetchReviews,
    addReview
};

console.log("Firebase DB Helper Initialized successfully.");
