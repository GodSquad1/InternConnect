// ============================================
// INTERNCONNECT
// ============================================

// State Management

// Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD5bbdw9K7hx738oYGxWCDKlYBs4CZJnpo",
  authDomain: "internconnect-ec09e.firebaseapp.com",
  projectId: "internconnect-ec09e",
  storageBucket: "internconnect-ec09e.firebasestorage.app",
  messagingSenderId: "617689931580",
  appId: "1:617689931580:web:a5f6e6437cedae296d8839",
  measurementId: "G-QHKGHHM7KP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



const state = {
  currentPage: "home",
  internships: [],
  filters: {
    search: "",
    location: "all",
    type: "all",
    experience: "all",
  },
  practiceMode: {
    selectedRole: null,
    score: 0,
    level: 1,
  },
  communityFilters: {
    sort: "recent",
    company: "",
    rating: "all",
    verified: false,
    warnings: false,
  },
  resumeAnalysis: null,
  selectedRole: null,
  showReviewForm: false,
  searchQuery: "",
}

// Mock Data
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$8,000/mo",
    verified: true,
    rating: 4.8,
    tags: ["React", "Python", "Cloud"],
    description: "Build scalable web applications with cutting-edge technology.",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$7,500/mo",
    verified: true,
    rating: 4.7,
    tags: ["React", "JavaScript", "UI/UX"],
    description: "Create beautiful and intuitive user interfaces.",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$7,000/mo",
    verified: true,
    rating: 4.6,
    tags: ["Python", "ML", "SQL"],
    description: "Analyze large datasets and build predictive models.",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Product Design Intern",
    company: "Figma",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$6,500/mo",
    verified: true,
    rating: 4.9,
    tags: ["Figma", "UI/UX", "Design"],
    description: "Design next-generation collaboration tools.",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Backend Engineer Intern",
    company: "Stripe",
    location: "Remote",
    type: "Remote",
    experience: "Entry Level",
    salary: "$8,500/mo",
    verified: true,
    rating: 4.8,
    tags: ["Node.js", "Go", "APIs"],
    description: "Build robust payment infrastructure.",
    posted: "1 day ago",
  },
  {
    id: 6,
    title: "Mobile Developer Intern",
    company: "Spotify",
    location: "New York, NY",
    type: "Hybrid",
    experience: "Entry Level",
    salary: "$7,200/mo",
    verified: true,
    rating: 4.7,
    tags: ["React Native", "iOS", "Android"],
    description: "Develop features for millions of music lovers.",
    posted: "4 days ago",
  },
]

const PRACTICE_ROLES = [
  {
    id: "software",
    title: "Software Engineer",
    icon: "💻",
    difficulty: "Medium",
    skills: ["Coding", "Algorithms", "Problem Solving"],
    curriculum: [
      {
        id: "module1",
        title: "Algorithms Basics",
        description: "Learn sorting, searching, and basic array manipulations",
        challenges: [
          { id: "c1", title: "Implement Bubble Sort", points: 10, code: "" },
          { id: "c2", title: "Binary Search Implementation", points: 10, code: "" },
          { id: "c3", title: "Array Manipulations Exercises", points: 10, code: "" },
        ],
      },
      {
        id: "module2",
        title: "Data Structures",
        description: "Learn stacks, queues, and linked lists",
        challenges: [
          { id: "c4", title: "Stack with JS Array", points: 10, code: "" },
          { id: "c5", title: "Queue using Linked List", points: 10, code: "" },
        ],
      },
      {
        id: "module3",
        title: "Mini Project",
        description: "Apply algorithms and data structures in a project",
        challenges: [
          { id: "c6", title: "Todo App with Sorting", points: 20, code: "" },
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Data Scientist",
    icon: "📊",
    difficulty: "Hard",
    skills: ["Python", "ML", "Statistics"],
    curriculum: [
      {
        id: "module1",
        title: "Python for Data Science",
        description: "NumPy, Pandas, and basic data manipulation",
        challenges: [
          { id: "c1", title: "Data Cleaning with Pandas", points: 10, code: "" },
          { id: "c2", title: "NumPy Array Operations", points: 10, code: "" },
        ],
      },
      {
        id: "module2",
        title: "Machine Learning Intro",
        description: "Learn regression, classification, and evaluation metrics",
        challenges: [
          { id: "c3", title: "Linear Regression on Sample Dataset", points: 15, code: "" },
          { id: "c4", title: "Classification with KNN", points: 15, code: "" },
        ],
      },
    ],
  },
];


const TRENDING_SKILLS = [
  { name: "React", demand: 92, growth: "+15%" },
  { name: "Python", demand: 88, growth: "+22%" },
  { name: "TypeScript", demand: 85, growth: "+18%" },
  { name: "AWS", demand: 82, growth: "+12%" },
  { name: "Node.js", demand: 78, growth: "+10%" },
  { name: "Docker", demand: 75, growth: "+25%" },
  { name: "Figma", demand: 72, growth: "+30%" },
  { name: "SQL", demand: 70, growth: "+8%" },
]

const REVIEWS = [
  {
    id: 1,
    company: "Google",
    rating: 5,
    author: "Sarah K.",
    role: "SWE Intern",
    verified: true,
    text: "Amazing mentorship and learning opportunities. The team was incredibly supportive.",
    warnings: [],
    helpful: 142,
    date: "2 weeks ago",
  },
  {
    id: 2,
    company: "Meta",
    rating: 4,
    author: "John D.",
    role: "Product Intern",
    verified: true,
    text: "Great experience overall. Work-life balance could be better during peak seasons.",
    warnings: ["Long Hours"],
    helpful: 98,
    date: "1 month ago",
  },
  {
    id: 3,
    company: "Startup XYZ",
    rating: 2,
    author: "Mike T.",
    role: "Dev Intern",
    verified: true,
    text: "Unpaid overtime expected. No clear mentorship structure. Would not recommend.",
    warnings: ["Unpaid OT", "Poor Management", "No Mentorship"],
    helpful: 234,
    date: "3 weeks ago",
  },
]

// ============================================
// ROUTING
// ============================================

function navigate(page) {
  state.currentPage = page
  render()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// ============================================
// COMPONENTS
// ============================================

function Navigation() {
  const user = auth.currentUser;
  const pages = [
    {
      id: "home",
      label: "Home",
      icon: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    },
    {
      id: "explore",
      label: "Explore",
      icon: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    },
    {
      id: "practice",
      label: "Practice",
      icon: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    },
    {
      id: "resume",
      label: "Resume AI",
      icon: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>',
    },
    {
      id: "trends",
      label: "Trends",
      icon: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    },
    {
      id: "community",
      label: "Community",
      icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    },
  ]

  return `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a href="#" onclick="navigate('home'); return false;" class="logo">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <span class="logo-text">InternConnect</span>
        </a>

        <div class="nav-links">
          ${pages
            .map(
              (page) => `
            <a href="#" 
               onclick="navigate('${page.id}'); return false;" 
               class="nav-link ${state.currentPage === page.id ? "active" : ""}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${page.icon}
              </svg>
              ${page.label}
            </a>
          `,
            )
            .join("")}
        </div>

        <div class="nav-actions">
            ${
            user
              ? `<span class="welcome-text">Welcome, ${user.email}</span>
                 <button class="btn btn-ghost" onclick="signOutUser()">Sign Out</button>`
              : `<button class="btn btn-ghost" onclick="navigate('signIn'); return false;">Sign In</button>
                 <button class="btn btn-primary" onclick="navigate('getStarted'); return false;">Get Started</button>`
            }
        </div>

        </div>
      </div>
    </nav>
  `
}

function HomePage() {
  return `
    <section class="hero">
      <div class="hero-bg">
        <div class="grid-overlay"></div>
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title animate-slide-up">
          Break the
          <span class="gradient-text">Gatekeeping</span>
          <br/>
          Find Real Opportunities
        </h1>
        <p class="hero-subtitle animate-slide-up">
          The internship aggregator built by students, for students. No more fake listings, hidden requirements, or endless scrolling.
        </p>
        
        <div class="search-box animate-slide-up">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input type="text" 
                 id="heroSearch" 
                 placeholder="Search internships, companies, roles..." 
                 class="search-input"
                 value="${state.searchQuery}">
          <button class="btn btn-primary" onclick="searchFromHero()">Search</button>
        </div>

        <div class="hero-badges animate-slide-up">
          <span class="badge">✓ Verified Listings Only</span>
          <span class="badge">✓ AI-Powered Matching</span>
          <span class="badge">✓ Real Reviews</span>
        </div>
      </div>
    </section>

    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value gradient-text">10K+</div>
            <div class="stat-label">Internships</div>
          </div>
          <div class="stat-card">
            <div class="stat-value gradient-text">500+</div>
            <div class="stat-label">Companies</div>
          </div>
          <div class="stat-card">
            <div class="stat-value gradient-text">95%</div>
            <div class="stat-label">Success Rate</div>
          </div>
          <div class="stat-card">
            <div class="stat-value gradient-text">24/7</div>
            <div class="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-preview">
      <div class="container">
        <h2 class="section-title">Everything You Need to Land Your Dream Internship</h2>
        
        <div class="features-grid">
          ${[
            {
              page: "explore",
              icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
              title: "Smart Search",
              desc: "Advanced filtering with AI-powered recommendations",
            },
            {
              page: "practice",
              icon: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
              title: "Practice Mode",
              desc: "Gamified simulations to build real skills",
            },
            {
              page: "resume",
              icon: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>',
              title: "Resume AI",
              desc: "Get instant feedback and skill gap analysis",
            },
            {
              page: "trends",
              icon: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>',
              title: "Market Trends",
              desc: "Stay ahead with real-time industry insights",
            },
            {
              page: "community",
              icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
              title: "Real Reviews",
              desc: "Community-verified company experiences",
            },
          ]
            .map(
              (feature) => `
            <a href="#" onclick="navigate('${feature.page}'); return false;" class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${feature.icon}
                </svg>
              </div>
              <h3>${feature.title}</h3>
              <p>${feature.desc}</p>
            </a>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `
}

function SignInPage() {
  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Sign In</h1>
        <p class="page-subtitle">Access your InternConnect account</p>
      </div>

      <form class="auth-form" onsubmit="signIn(event)">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="signInEmail" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="signInPassword" required>
        </div>
        <button type="submit" class="btn btn-primary btn-full">Sign In</button>
        <p class="form-footer">
          Don't have an account? 
          <a href="#" onclick="navigate('getStarted'); return false;">Get Started</a>
        </p>
      </form>
    </div>
  `;
}

function GetStartedPage() {
  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Get Started</h1>
        <p class="page-subtitle">Create your InternConnect account</p>
      </div>

      <form class="auth-form" onsubmit="signUp(event)">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="signUpEmail" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="signUpPassword" required>
        </div>
        <button type="submit" class="btn btn-primary btn-full">Create Account</button>
        <p class="form-footer">
          Already have an account? 
          <a href="#" onclick="navigate('signIn'); return false;">Sign In</a>
        </p>
      </form>
    </div>
  `;
}


function signIn(event) {
  event.preventDefault();
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Welcome back, ${user.email}`);
      state.currentPage = "home";
      render(); // <-- ensures navbar updates
    })
    .catch((error) => {
      alert(error.message);
    });
}


function signUp(event) {
  event.preventDefault();
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Account created! Welcome, ${email}`);
      navigate("home");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signOutUser() {
  auth.signOut()
    .then(() => {
      alert("You have signed out successfully.");
      state.currentPage = "home";
      render(); // Re-render the app to update navbar
    })
    .catch((error) => {
      alert("Error signing out: " + error.message);
    });
}




function handleSignIn() {
  const email = document.getElementById("signInEmail").value
  const password = document.getElementById("signInPassword").value

  // Temporary: simple mock authentication
  if (email && password) {
    alert(`Welcome back, ${email}! (This would log you in)`)
    navigate("home")
  } else {
    alert("Please enter your email and password.")
  }
}






function ExplorePage() {
  const filteredInternships = MOCK_INTERNSHIPS.filter((internship) => {
    const matchesSearch =
      !state.filters.search ||
      internship.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
      internship.company.toLowerCase().includes(state.filters.search.toLowerCase()) ||
      internship.tags.some((tag) => tag.toLowerCase().includes(state.filters.search.toLowerCase()))

    const matchesLocation = state.filters.location === "all" || internship.location.includes(state.filters.location)
    const matchesType = state.filters.type === "all" || internship.type === state.filters.type

    return matchesSearch && matchesLocation && matchesType
  })

  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Explore Internships</h1>
        <p class="page-subtitle">Discover verified opportunities from top companies</p>
      </div>

      <div class="filters-bar">
        <div class="search-filter">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input type="text" 
                 placeholder="Search by role, company, or skill..." 
                 class="filter-input"
                 value="${state.filters.search}"
                 onkeyup="updateFilter('search', this.value)">
        </div>
        
        <select class="filter-select" onchange="updateFilter('location', this.value)">
          <option value="all">All Locations</option>
          <option value="CA">California</option>
          <option value="NY">New York</option>
          <option value="Remote">Remote</option>
          <option value="TX">Texas</option>
          <option value="WA">Washington</option>
        </select>
        
        <select class="filter-select" onchange="updateFilter('type', this.value)">
          <option value="all">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select class="filter-select" onchange="sortInternships(this.value)">
          <option value="recent">Most Recent</option>
          <option value="salary-high">Highest Salary</option>
          <option value="salary-low">Lowest Salary</option>
          <option value="rating">Top Rated</option>
          <option value="company">Company A-Z</option>
        </select>
      </div>

      <div class="results-summary">
        <span>${filteredInternships.length} opportunities found</span>
      </div>

      <div class="internships-grid">
        ${filteredInternships
          .map(
            (internship) => `
          <div class="internship-card">
            <div class="card-header">
              <div>
                <h3 class="internship-title">${internship.title}</h3>
                <div class="company-info">
                  <span class="company-name">${internship.company}</span>
                  ${internship.verified ? '<span class="verified-badge">✓ Verified</span>' : ""}
                </div>
              </div>
              <div class="rating">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                ${internship.rating}
              </div>
            </div>

            <p class="internship-description">${internship.description}</p>

            <div class="internship-details">
              <span class="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                ${internship.location}
              </span>
              <span class="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" x2="16" y1="2" y2="6"/>
                  <line x1="8" x2="8" y1="2" y2="6"/>
                </svg>
                ${internship.type}
              </span>
              <span class="detail-item salary">
                ${internship.salary}
              </span>
            </div>

            <div class="tags">
              ${internship.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>

            <div class="card-footer">
              <span class="posted-time">${internship.posted}</span>
              <button class="btn btn-primary btn-sm" onclick="applyToInternship(${internship.id})">Apply Now</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `
}

function PracticePage() {
  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Practice Simulations</h1>
        <p class="page-subtitle">Build real skills through gamified challenges</p>
      </div>

      <div class="practice-stats">
        <div class="practice-stat">
          <span class="stat-label">Current Level</span>
          <span class="stat-value gradient-text">${state.practiceMode.level}</span>
        </div>
        <div class="practice-stat">
          <span class="stat-label">Total Score</span>
          <span class="stat-value gradient-text">${state.practiceMode.score}</span>
        </div>
        <div class="practice-stat">
          <span class="stat-label">Challenges Completed</span>
          <span class="stat-value gradient-text">0</span>
        </div>
      </div>

      <h2 class="section-subtitle">Choose Your Path</h2>
      
      <div class="roles-grid">
        ${PRACTICE_ROLES.map(
          (role) => `
          <div class="role-card ${state.practiceMode.selectedRole === role.id ? "selected" : ""}" 
               onclick="selectPracticeRole('${role.id}')">
            <div class="role-icon">${role.icon}</div>
            <h3 class="role-title">${role.title}</h3>
            <div class="role-difficulty difficulty-${role.difficulty.toLowerCase()}">
              ${role.difficulty}
            </div>
            <div class="role-skills">
              ${role.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
            <div class="role-challenges">
              ${role.challenges} Challenges
            </div>
            <button class="btn ${state.practiceMode.selectedRole === role.id ? "btn-primary" : "btn-ghost"} btn-full">
              ${state.practiceMode.selectedRole === role.id ? "Continue" : "Start"}
            </button>
          </div>
        `,
        ).join("")}
      </div>
    </div>
  `
}

function ResumePage() {
  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">AI Resume Analyzer</h1>
        <p class="page-subtitle">Upload your resume and coding projects for AI-powered skill gap analysis</p>
      </div>

      <div class="resume-upload-section">
        <div class="dual-upload-container">
          <div class="upload-card">
            <div class="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" x2="8" y1="13" y2="13"/>
                <line x1="16" x2="8" y1="17" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Upload Resume</h3>
            <p>PDF or DOCX format</p>
            <input type="file" id="resumeInput" accept=".pdf,.docx" onchange="handleResumeUpload(this)" style="display: none;">
            <button class="btn btn-primary" onclick="document.getElementById('resumeInput').click()">
              Choose Resume
            </button>
            <div id="resumeFileName" class="file-name"></div>
          </div>

          <div class="upload-card">
            <div class="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
            </div>
            <h3>Upload Coding Files</h3>
            <p>ZIP file with your projects</p>
            <input type="file" id="codingFilesInput" accept=".zip" onchange="handleCodingUpload(this)" style="display: none;">
            <button class="btn btn-secondary" onclick="document.getElementById('codingFilesInput').click()">
              Choose ZIP File
            </button>
            <div id="codingFileName" class="file-name"></div>
          </div>
        </div>

        <button class="btn btn-gradient btn-analyze" onclick="analyzeResume()" id="analyzeBtn" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Analyze with Gemini AI
        </button>

        ${
          state.resumeAnalysis
            ? `
          <div class="analysis-results">
            <h2 class="results-title">AI Analysis Results</h2>
            
            <div class="score-card">
              <div class="score-circle">
                <svg width="120" height="120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#2a2a35" stroke-width="10"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#gradient)" stroke-width="10" 
                          stroke-dasharray="${state.resumeAnalysis.score * 3.14}" 
                          stroke-dashoffset="0" 
                          transform="rotate(-90 60 60)"/>
                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stop-color="#6366f1"/>
                      <stop offset="100%" stop-color="#06b6d4"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div class="score-text">
                  <span class="score-number">${state.resumeAnalysis.overallScore ?? 0}</span>
                  <span class="score-label">/100</span>
                </div>
              </div>
              <p class="score-description">${state.resumeAnalysis.message}</p>
            </div>
<div class="analysis-sections">
  <div class="analysis-section">
    <h3>Strengths</h3>
    <ul class="analysis-list">
      ${(state.resumeAnalysis?.strengths || []).map(s => `<li class="strength-item">${s}</li>`).join("")}
    </ul>
  </div>

  <div class="analysis-section">
    <h3>Areas to Improve</h3>
    <ul class="analysis-list">
      ${(state.resumeAnalysis?.improvements || []).map(i => `<li class="improvement-item">${i}</li>`).join("")}
    </ul>
  </div>

  <div class="analysis-section">
    <h3>Recommended Skills to Learn</h3>
    <div class="skills-grid">
      ${(state.resumeAnalysis?.recommendedSkills || []).map(skill => `<span class="skill-badge">${skill.name}</span>`).join("")}
    </div>
  </div>
</div>

        `
            : ""
        }
      </div>
    </div>
  `
}

function TrendsPage() {
  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Market Trends</h1>
        <p class="page-subtitle">Stay ahead with real-time industry insights</p>
      </div>

      <div class="trends-grid">
        <div class="trend-card highlight-card">
          <h3>Most In-Demand Skills</h3>
          <div class="skills-chart">
            ${TRENDING_SKILLS.map(
              (skill, index) => `
              <div class="skill-bar" style="animation-delay: ${index * 0.1}s">
                <div class="skill-info">
                  <span class="skill-name">${skill.name}</span>
                  <span class="skill-growth ${skill.growth.startsWith("+") ? "positive" : "negative"}">${skill.growth}</span>
                </div>
                <div class="skill-progress">
                  <div class="skill-fill" style="width: ${skill.demand}%"></div>
                </div>
                <span class="skill-demand">${skill.demand}% demand</span>
              </div>
            `,
            ).join("")}
          </div>
        </div>

        <div class="trend-card">
          <h3>Top Hiring Companies</h3>
          <div class="companies-list">
            ${["Google", "Meta", "Amazon", "Microsoft", "Apple"]
              .map(
                (company, index) => `
              <div class="company-item" style="animation-delay: ${index * 0.1}s">
                <span class="company-rank">#${index + 1}</span>
                <span class="company-name">${company}</span>
                <span class="openings">${Math.floor(Math.random() * 50 + 20)} openings</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="trend-card">
          <h3>Average Salaries</h3>
          <div class="salary-chart">
            ${[
              { role: "Software Engineer", salary: 95000 },
              { role: "Data Scientist", salary: 88000 },
              { role: "Product Manager", salary: 82000 },
              { role: "UX Designer", salary: 72000 },
              { role: "Marketing", salary: 65000 },
            ]
              .map(
                (item, index) => `
              <div class="salary-item" style="animation-delay: ${index * 0.1}s">
                <span class="role-name">${item.role}</span>
                <div class="salary-bar">
                  <div class="salary-fill" style="width: ${(item.salary / 100000) * 100}%"></div>
                </div>
                <span class="salary-amount">$${(item.salary / 1000).toFixed(0)}K</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="trend-card">
          <h3>Industry Growth</h3>
          <div class="growth-stats">
            ${[
              { sector: "Tech", growth: 5.2 },
              { sector: "Finance", growth: 16.2 },
              { sector: "Healthcare", growth: 17.2 },
              { sector: "E-commerce", growth: 18.7 },
            ]
              .map(
                (item, index) => `
              <div class="growth-item" style="animation-delay: ${index * 0.1}s">
                <div class="growth-header">
                  <span>${item.sector}</span>
                  <span class="growth-percent">+${item.growth}%</span>
                </div>
                <div class="growth-bar">
                  <div class="growth-fill" style="width: ${item.growth * 3}%"></div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `
}

function CommunityPage() {
  const filteredReviews = state.reviews ? [...state.reviews] : [];


  // Apply filters
  if (state.communityFilters.company) {
    filteredReviews = filteredReviews.filter((r) =>
      r.company.toLowerCase().includes(state.communityFilters.company.toLowerCase()),
    )
  }
  if (state.communityFilters.rating !== "all") {
    filteredReviews = filteredReviews.filter((r) => r.rating >= Number.parseInt(state.communityFilters.rating))
  }
  if (state.communityFilters.verified) {
    filteredReviews = filteredReviews.filter((r) => r.verified)
  }
  if (state.communityFilters.warnings) {
    filteredReviews = filteredReviews.filter((r) => r.warnings.length > 0)
  }

  // Apply sorting
  if (state.communityFilters.sort === "rating-high") {
    filteredReviews.sort((a, b) => b.rating - a.rating)
  } else if (state.communityFilters.sort === "rating-low") {
    filteredReviews.sort((a, b) => a.rating - b.rating)
  } else if (state.communityFilters.sort === "helpful") {
    filteredReviews.sort((a, b) => b.helpful - a.helpful)
  }

  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Community Reviews</h1>
        <p class="page-subtitle">Real experiences from real interns</p>
      </div>

      <div class="community-controls">
        <div class="filters-bar">
          <div class="search-filter">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input type="text" 
                   placeholder="Search by company..." 
                   class="filter-input"
                   value="${state.communityFilters.company}"
                   onkeyup="updateCommunityFilter('company', this.value)">
          </div>

          <select class="filter-select" onchange="updateCommunityFilter('rating', this.value)">
            <option value="all">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>

          <select class="filter-select" onchange="updateCommunityFilter('sort', this.value)">
            <option value="recent">Most Recent</option>
            <option value="rating-high">Highest Rated</option>
            <option value="rating-low">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>

          <label class="filter-checkbox">
            <input type="checkbox" onchange="updateCommunityFilter('verified', this.checked)">
            <span>Verified Only</span>
          </label>

          <label class="filter-checkbox">
            <input type="checkbox" onchange="updateCommunityFilter('warnings', this.checked)">
            <span>With Warnings</span>
          </label>
        </div>

        <button class="btn btn-gradient" onclick="toggleReviewForm()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
          Write a Review
        </button>
      </div>

      <div class="results-summary">
        <span>${filteredReviews.length} reviews found</span>
      </div>

      ${
        state.showReviewForm
          ? `
        <div class="review-form-container">
          <div class="review-form">
            <h2>Share Your Internship Experience</h2>
            <p class="form-subtitle">Help future interns make informed decisions</p>
            
            <form onsubmit="submitReview(event)">
              <div class="form-group">
                <label>Company Name *</label>
                <input type="text" id="reviewCompany" placeholder="e.g., Google, Meta, Amazon" required>
              </div>

              <div class="form-group">
                <label>Your Role *</label>
                <input type="text" id="reviewRole" placeholder="e.g., Software Engineering Intern" required>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Your Name *</label>
                  <input type="text" id="reviewAuthor" placeholder="e.g., John D." required>
                </div>

                <div class="form-group">
                  <label>Rating *</label>
                  <select id="reviewRating" required>
                    <option value="">Select rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="2">⭐⭐ Below Average</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Your Experience *</label>
                <textarea id="reviewText" rows="5" placeholder="Share your honest experience about the internship, mentorship, work culture, learning opportunities, etc." required></textarea>
              </div>

              <div class="form-group">
                <label>Pros (Optional)</label>
                <input type="text" id="reviewPros" placeholder="What did you like? (comma separated)">
              </div>

              <div class="form-group">
                <label>Cons (Optional)</label>
                <input type="text" id="reviewCons" placeholder="What could be improved? (comma separated)">
              </div>

              <div class="form-group">
                <label>Warning Flags (Select if applicable)</label>
                <div class="warning-checkboxes">
                  <label><input type="checkbox" name="warnings" value="Unpaid OT"> Unpaid Overtime</label>
                  <label><input type="checkbox" name="warnings" value="Poor Management"> Poor Management</label>
                  <label><input type="checkbox" name="warnings" value="No Mentorship"> No Mentorship</label>
                  <label><input type="checkbox" name="warnings" value="Long Hours"> Long Hours</label>
                  <label><input type="checkbox" name="warnings" value="Toxic Culture"> Toxic Culture</label>
                  <label><input type="checkbox" name="warnings" value="Unpaid"> Unpaid Position</label>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="toggleReviewForm()">Cancel</button>
                <button type="submit" class="btn btn-gradient">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      `
          : ""
      }

      <div class="reviews-list">
        ${filteredReviews
          .map(
            (review, index) => `
          <div class="review-card" style="animation-delay: ${index * 0.1}s">
            <div class="review-header">
              <div class="reviewer-info">
                <div class="reviewer-avatar">${review.author[0]}</div>
                <div>
                  <div class="reviewer-name">
                    ${review.author}
                    ${review.verified ? '<span class="verified-badge">✓ Verified</span>' : ""}
                  </div>
                  <div class="reviewer-role">${review.role} at ${review.company}</div>
                </div>
              </div>
              <div class="review-rating">
                ${Array(5)
                  .fill(0)
                  .map(
                    (_, i) => `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${i < review.rating ? "currentColor" : "none"}" stroke="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                `,
                  )
                  .join("")}
              </div>
            </div>

            ${
              review.warnings.length > 0
                ? `
              <div class="review-warnings">
                ${review.warnings
                  .map(
                    (warning) => `
                  <span class="warning-badge"> ${warning}</span>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }

            <p class="review-text">${review.text}</p>

            <div class="review-footer">
              <span class="review-date">${review.date}</span>
              <button class="helpful-btn" onclick="markHelpful(${review.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 10v12"/>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
                </svg>
                Helpful (${review.helpful})
              </button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `
}

function Footer() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">
              <div class="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <span class="logo-text">InternConnect</span>
            </div>
            <p class="footer-tagline">Breaking gatekeeping, one internship at a time.</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-column">
              <h4>Product</h4>
              <a href="#" onclick="navigate('explore'); return false;">Explore</a>
              <a href="#" onclick="navigate('practice'); return false;">Practice</a>
              <a href="#" onclick="navigate('resume'); return false;">Resume AI</a>
            </div>
            <div class="footer-column">
              <h4>Resources</h4>
              <a href="#" onclick="navigate('trends'); return false;">Trends</a>
              <a href="#" onclick="navigate('community'); return false;">Community</a>
              <a href="#">Blog</a>
            </div>
            <div class="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2026 InternConnect. Built for students, by students</p>
        </div>
      </div>
    </footer>
  `
}

// ============================================
// EVENT HANDLERS



function handleResumeUpload(input) {
  if (input.files && input.files[0]) {
    document.getElementById("resumeFileName").textContent = `✓ ${input.files[0].name}`
    checkAnalyzeButton()
  }
}

function handleCodingUpload(input) {
  if (input.files && input.files[0]) {
    document.getElementById("codingFileName").textContent = `✓ ${input.files[0].name}`
    checkAnalyzeButton()
  }
}

function checkAnalyzeButton() {
  const resumeFile = document.getElementById("resumeInput").files[0]
  const codingFile = document.getElementById("codingFilesInput").files[0]
  const analyzeBtn = document.getElementById("analyzeBtn")

  if (resumeFile && codingFile && analyzeBtn) {
    analyzeBtn.disabled = false
  }
}

function searchFromHero() {
  const input = document.getElementById("heroSearch")
  if (input && input.value.trim()) {
    state.filters.search = input.value.trim()
    state.searchQuery = input.value.trim()
    navigate("explore")
  }
}

function updateFilter(key, value) {
  state.filters[key] = value
  render()
}

function selectPracticeRole(roleId) {
  state.practiceMode.selectedRole = roleId
  render()
}
async function analyzeResume() {
  const resumeFile = document.getElementById('resumeInput').files[0];
  const codeFile = document.getElementById('codingFilesInput').files[0];
  const analyzeBtn = document.getElementById('analyzeBtn');

  if (!resumeFile || !codeFile) {
    alert('Please select both a resume (PDF/DOCX) and a code ZIP file.');
    return;
  }

  // Disable button while analyzing
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing...';

  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('code', codeFile);

  try {
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!result.success || !result.analysis) {
      alert(result.error || 'Analysis failed. Check console for details.');
      console.error(result);
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = 'Analyze with Gemini AI';
      return;
    }

    // Save analysis to state
    state.resumeAnalysis = result.analysis;

    // Re-render the Resume page to show results under upload section
    render();

    // Re-enable button
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze with Gemini AI';
  } catch (err) {
    console.error('Error analyzing resume:', err);
    alert('Error analyzing resume. Check console.');
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze with Gemini AI';
  }
}




function applyToInternship(id) {
  alert(`Application started for internship #${id}! (This would redirect to the application page)`)
}



const ELEVEN_LABS_API_KEY = "45eefb5fd2a8aed8170a5f586745841786a723ba147e15ce76942998e6a65d08";
const ELEVEN_LABS_VOICE_ID = "gJx1vCzNCD1EQHT212Ls";

async function speakWithAssistant(promptText) {
  try {
    // ElevenLabs TTS
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVEN_LABS_API_KEY,
      },
      body: JSON.stringify({ text: promptText, voice_settings: { stability: 0.5, similarity_boost: 0.7 } }),
    });

    if (!response.ok) throw new Error("Failed to generate speech.");
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Assistant error:", error);
  }
}

async function getAssistantResponse(userQuery) {
  try {
    const systemPrompt = `
      You are the InternConnect AI Assistant. Please be extremely nice to all users.
      InternConnect is an internship aggregator that helps students find verified internships, practice skills, and get AI resume analysis.

      ${
        state.resumeAnalysis
          ? `Current resume analysis data:
- Overall Score: ${state.resumeAnalysis.overallScore}/100
- Strengths: ${(state.resumeAnalysis.strengths || []).join(', ') || 'None'}
- Improvements: ${(state.resumeAnalysis.improvements || []).join(', ') || 'None'}
- Recommended Skills: ${(state.resumeAnalysis.recommendedSkills || []).map(s => s.name).join(', ') || 'None'}
- Detected Skills: ${(state.resumeAnalysis.detectedSkills?.technical || []).map(s => s.name).join(', ') || 'None'}
Use this information to answer questions about the user's resume and code.`
          : ''
      }
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer `
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuery }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("Assistant error:", err);
    return "Sorry, I couldn't process that. Try again!";
  }
}



function markHelpful(reviewId) {
  const review = REVIEWS.find((r) => r.id === reviewId)
  if (review) {
    review.helpful++
    render()
  }
}

function sortInternships(sortBy) {
  // This will be handled by backend - for now just re-render
  render()
}

function updateCommunityFilter(key, value) {
  state.communityFilters[key] = value
  render()
}

function toggleReviewForm() {
  state.showReviewForm = !state.showReviewForm
  render()
  if (state.showReviewForm) {
    setTimeout(() => {
      document.querySelector(".review-form-container").scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }
}

// Use emulator if running locally
if (location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}

function submitReview(event) {
  event.preventDefault();
  const company = document.getElementById("reviewCompany").value;
  const role = document.getElementById("reviewRole").value;
  const author = document.getElementById("reviewAuthor").value;
  const rating = Number(document.getElementById("reviewRating").value);
  const text = document.getElementById("reviewText").value;
  const warningCheckboxes = document.querySelectorAll('input[name="warnings"]:checked');
  const warnings = Array.from(warningCheckboxes).map(cb => cb.value);

  db.collection("reviews").add({
    company,
    role,
    author,
    rating,
    text,
    warnings,
    verified: false,
    helpful: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Review submitted! It will appear once verified.");
    navigate("community");
  })
  .catch(err => {
    console.error(err);
    alert("Error submitting review.");
  });
}

async function fetchReviews() {
  return db.collection("reviews")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}



// ============================================
// MAIN RENDER FUNCTION
// ============================================

async function render() {
  const app = document.getElementById("app")
  let content = ""

  if (state.currentPage === "community") {
    const reviews = await fetchReviews(); // fetch reviews from Firestore
  }

  switch (state.currentPage) {
    case "home": content = HomePage(); break
    case "explore": content = ExplorePage(); break
    case "practice": content = PracticePage(); break
    case "resume": content = ResumePage(); break
    case "trends": content = TrendsPage(); break
    case "community": content = CommunityPage(); break
    case "signIn": content = SignInPage(); break
    case "getStarted": content = GetStartedPage(); break
    default: content = HomePage()
  }

  app.innerHTML = Navigation() + content + Footer()
  initScrollAnimations()
  initNavbarScroll()
}


function markHelpful(reviewId) {
  const reviewRef = db.collection("reviews").doc(reviewId);

  // Atomically increment the helpful counter
  reviewRef.update({
    helpful: firebase.firestore.FieldValue.increment(1)
  })
  .then(() => render())
  .catch(err => console.error("Error updating helpful count:", err));
}

function PracticeSessionPage() {
  const role = PRACTICE_ROLES.find(
    r => r.id === state.practiceMode.selectedRole
  );

  return `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">${role.title} Simulation</h1>
        <p class="page-subtitle">
          Difficulty: ${role.difficulty}
        </p>
      </div>

      <div class="practice-session">
        <p>This is where challenges will go.</p>

        <button class="btn btn-secondary" onclick="navigate('practice')">
          Back to Practice
        </button>
      </div>
    </div>
  `;
}
function startPracticeSession() {
  state.currentPage = "practiceSession";
  render();
}


function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  document
    .querySelectorAll(".stat-card, .feature-card, .internship-card, .role-card, .trend-card, .review-card")
    .forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = "all 0.6s ease-out"
      observer.observe(el)
    })
}

function initNavbarScroll() {
  let lastScroll = 0 // Declare lastScroll here
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset // Declare currentScroll here

    if (currentScroll > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  })
}

async function render() {
  const app = document.getElementById("app")
  let content = ""

  if (state.currentPage === "community") {
    state.reviews = await fetchReviews();
  }

  switch (state.currentPage) {
    case "home": content = HomePage(); break
    case "explore": content = ExplorePage(); break
    case "practice": content = PracticePage(); break
    case "practiceSession": content = PracticeSessionPage(); break
    case "resume": content = ResumePage(); break
    case "trends": content = TrendsPage(); break
    case "community": content = CommunityPage(); break
    case "signIn": content = SignInPage(); break
    case "getStarted": content = GetStartedPage(); break
    default: content = HomePage()
  }

  app.innerHTML = Navigation() + content + Footer()
  initScrollAnimations()
  initNavbarScroll()
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  render();

  // Assistant button
  const assistantBtn = document.getElementById("assistant-btn");
  const assistantChat = document.getElementById("assistant-chat");
  const assistantSend = document.getElementById("assistant-send");
  const assistantInput = document.getElementById("assistant-input");

  if (assistantBtn) {
    assistantBtn.addEventListener("click", () => {
      if (!assistantChat) return;
      assistantChat.style.display = assistantChat.style.display === "none" ? "block" : "none";
      speakWithAssistant("Hello! I am your InternConnect AI assistant. I can guide you through the app, explain features, and suggest skills to improve on your resume.");
    });
  }

  if (assistantSend) {
    assistantSend.addEventListener("click", async () => {
      if (!assistantInput || !assistantChat) return;
      const userQuery = assistantInput.value.trim();
      if (!userQuery) return;

      // Display user question
      const userMessage = document.createElement("div");
      userMessage.className = "assistant-message user-message";
      userMessage.textContent = userQuery;
      assistantChat.appendChild(userMessage);

      // Clear input
      assistantInput.value = "";

      // Get assistant response
      const assistantResponse = await getAssistantResponse(userQuery);


      // Speak the response
      speakWithAssistant(assistantResponse);

      // Scroll to bottom
      assistantChat.scrollTop = assistantChat.scrollHeight;
    });
  }
});
