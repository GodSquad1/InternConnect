// ============================================
// INTERNHUB - COMPLETE VANILLA JS APPLICATION
// ============================================

// State Management
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
    skills: ["Coding", "Problem Solving", "Algorithms"],
    challenges: 15,
  },
  {
    id: "design",
    title: "Product Designer",
    icon: "🎨",
    difficulty: "Easy",
    skills: ["UI/UX", "Prototyping", "User Research"],
    challenges: 12,
  },
  {
    id: "data",
    title: "Data Scientist",
    icon: "📊",
    difficulty: "Hard",
    skills: ["Statistics", "Python", "ML"],
    challenges: 18,
  },
  {
    id: "marketing",
    title: "Marketing Intern",
    icon: "📱",
    difficulty: "Easy",
    skills: ["Content", "Analytics", "Social Media"],
    challenges: 10,
  },
  {
    id: "business",
    title: "Business Analyst",
    icon: "📈",
    difficulty: "Medium",
    skills: ["Excel", "Reporting", "Strategy"],
    challenges: 14,
  },
  {
    id: "pm",
    title: "Product Manager",
    icon: "🚀",
    difficulty: "Hard",
    skills: ["Strategy", "Leadership", "Analysis"],
    challenges: 16,
  },
]

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
          <span class="logo-text">InternHub</span>
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
          <button class="btn btn-ghost">Sign In</button>
          <button class="btn btn-primary">Get Started</button>
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
                  <span class="score-number">${state.resumeAnalysis.score}</span>
                  <span class="score-label">/100</span>
                </div>
              </div>
              <p class="score-description">${state.resumeAnalysis.message}</p>
            </div>

            <div class="analysis-sections">
              <div class="analysis-section">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Strengths
                </h3>
                <ul class="analysis-list">
                  ${state.resumeAnalysis.strengths.map((s) => `<li class="strength-item">${s}</li>`).join("")}
                </ul>
              </div>

              <div class="analysis-section">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" x2="12" y1="8" y2="12"/>
                    <line x1="12" x2="12.01" y1="16" y2="16"/>
                  </svg>
                  Areas to Improve
                </h3>
                <ul class="analysis-list">
                  ${state.resumeAnalysis.improvements.map((i) => `<li class="improvement-item">${i}</li>`).join("")}
                </ul>
              </div>

              <div class="analysis-section">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  Recommended Skills to Learn
                </h3>
                <div class="skills-grid">
                  ${state.resumeAnalysis.skills.map((skill) => `<span class="skill-badge">${skill}</span>`).join("")}
                </div>
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
              { sector: "Tech", growth: 24 },
              { sector: "Finance", growth: 18 },
              { sector: "Healthcare", growth: 16 },
              { sector: "E-commerce", growth: 22 },
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
  let filteredReviews = [...REVIEWS]

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
                  <span class="warning-badge">⚠️ ${warning}</span>
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
              <span class="logo-text">InternHub</span>
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
          <p>&copy; 2026 InternHub. Built with ❤️ for students.</p>
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

function analyzeResume() {
  // Simulate AI analysis
  setTimeout(() => {
    state.resumeAnalysis = {
      score: 78,
      message: "Good foundation! Focus on adding more quantifiable achievements.",
      strengths: [
        "Strong technical skills section",
        "Clear work experience descriptions",
        "Well-formatted and easy to read",
        "Good use of action verbs",
      ],
      improvements: [
        "Add more quantifiable metrics (numbers, percentages)",
        "Include specific project outcomes",
        "Expand on leadership experiences",
        "Add relevant coursework or certifications",
      ],
      skills: ["Docker", "Kubernetes", "System Design", "GraphQL", "TypeScript"],
    }
    render()
  }, 1500)
}

function applyToInternship(id) {
  alert(`Application started for internship #${id}! (This would redirect to the application page)`)
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

function submitReview(event) {
  event.preventDefault()

  // Get form values
  const company = document.getElementById("reviewCompany").value
  const role = document.getElementById("reviewRole").value
  const author = document.getElementById("reviewAuthor").value
  const rating = Number.parseInt(document.getElementById("reviewRating").value)
  const text = document.getElementById("reviewText").value

  // Get selected warnings
  const warningCheckboxes = document.querySelectorAll('input[name="warnings"]:checked')
  const warnings = Array.from(warningCheckboxes).map((cb) => cb.value)

  // Create review object - this will be sent to backend
  const newReview = {
    id: REVIEWS.length + 1,
    company,
    role,
    author,
    rating,
    text,
    warnings,
    verified: false, // Backend will verify
    helpful: 0,
    date: "Just now",
  }

  // Add to reviews (in real app, this would be an API call)
  REVIEWS.unshift(newReview)

  // Show success message
  alert("Thank you for your review! It will be verified and published soon.")

  // Close form and refresh
  state.showReviewForm = false
  render()
}

// ============================================
// MAIN RENDER FUNCTION
// ============================================

function render() {
  const app = document.getElementById("app")

  let content = ""
  switch (state.currentPage) {
    case "home":
      content = HomePage()
      break
    case "explore":
      content = ExplorePage()
      break
    case "practice":
      content = PracticePage()
      break
    case "resume":
      content = ResumePage()
      break
    case "trends":
      content = TrendsPage()
      break
    case "community":
      content = CommunityPage()
      break
    default:
      content = HomePage()
  }

  app.innerHTML = Navigation() + content + Footer()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize navbar scroll effect
  initNavbarScroll()
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

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  render()
})
