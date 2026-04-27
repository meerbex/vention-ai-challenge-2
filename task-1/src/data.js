// Avatar URLs from randomuser.me — AI-generated/stock portraits, no real identities
const m = (n) => `https://randomuser.me/api/portraits/men/${n}.jpg`;
const f = (n) => `https://randomuser.me/api/portraits/women/${n}.jpg`;

export const employees = [
  {
    id: 1, name: "Alex Kowalski", title: "Senior Software Engineer", code: "EU.U1.D1.G1",
    avatar: m(32), color: "#4CAF93",
    score: 536, monitors: 17, courses: 0,
    activities: [
      { name: "[EDU] React Advanced Workshop (18.12.25)", category: "Public Speaking", date: "17-Dec-2025", points: 64 },
      { name: "[EDU] PowerPoint Karaoke #3: Holiday Edition", category: "Public Speaking", date: "16-Dec-2025", points: 8 },
      { name: "[EDU] AI Digest #15 16.12.2025", category: "Public Speaking", date: "15-Dec-2025", points: 16 },
      { name: "[EDU] AI Digest #13 18.11.2025", category: "Public Speaking", date: "18-Nov-2025", points: 16 },
      { name: "[EDU] Building a Web for Humans 12.11.2025", category: "Public Speaking", date: "12-Nov-2025", points: 32 },
      { name: "[EDU] AI Digest #11 21.10.25", category: "Public Speaking", date: "26-Oct-2025", points: 16 },
      { name: "[EDU] AI Digest #10 – First Global Edition", category: "Public Speaking", date: "06-Oct-2025", points: 32 },
    ]
  },
  {
    id: 2, name: "Dmitri Volkov", title: "Group Manager", code: "EU.U1.G3",
    avatar: m(44), color: "#7B68EE",
    score: 328, monitors: 10, courses: 0,
    activities: [
      { name: "[EDU] Leadership Workshop Q4 2025", category: "Public Speaking", date: "10-Dec-2025", points: 64 },
      { name: "[EDU] Team Dynamics Session", category: "Public Speaking", date: "05-Nov-2025", points: 32 },
      { name: "[EDU] Management Digest #8", category: "Public Speaking", date: "20-Oct-2025", points: 16 },
      { name: "[EDU] Agile Practices Talk", category: "Public Speaking", date: "15-Sep-2025", points: 32 },
    ]
  },
  {
    id: 3, name: "Natalia Kovalenko", title: "Lead QA Engineer", code: "EU.U1.D1.G1.T1",
    avatar: f(12), color: "#26C6DA",
    score: 320, monitors: 1, courses: 7,
    activities: [
      { name: "[EDU] Test Automation Summit", category: "Course", date: "12-Dec-2025", points: 48 },
      { name: "[EDU] QA Best Practices #5", category: "Course", date: "25-Nov-2025", points: 32 },
      { name: "[EDU] Selenium Advanced Course", category: "Course", date: "10-Nov-2025", points: 48 },
      { name: "[EDU] Performance Testing Masterclass", category: "Course", date: "01-Oct-2025", points: 64 },
    ]
  },
  {
    id: 4, name: "Daniel Kim", title: "Lead QA Engineer", code: "CA.U1.D1.G1.T1",
    avatar: m(55), color: "#FF7043",
    score: 320, monitors: 1, courses: 7,
    activities: [
      { name: "[EDU] Cypress Testing Workshop", category: "Course", date: "11-Dec-2025", points: 48 },
      { name: "[EDU] CI/CD Pipeline Course", category: "Course", date: "20-Nov-2025", points: 32 },
      { name: "[EDU] API Testing Fundamentals", category: "Course", date: "05-Nov-2025", points: 48 },
    ]
  },
  {
    id: 5, name: "Emma Chen", title: "QA Engineer", code: "AU.U1.DQA2.T1",
    avatar: f(28), color: "#AB47BC",
    score: 304, monitors: 0, courses: 7,
    activities: [
      { name: "[EDU] Manual Testing Best Practices", category: "Course", date: "09-Dec-2025", points: 48 },
      { name: "[EDU] Bug Reporting Workshop", category: "Course", date: "18-Nov-2025", points: 32 },
      { name: "[EDU] JIRA Advanced Course", category: "Course", date: "03-Nov-2025", points: 32 },
    ]
  },
  {
    id: 6, name: "James Miller", title: "Software Engineer", code: "UK.U1.D1.G2",
    avatar: m(17), color: "#66BB6A",
    score: 296, monitors: 7, courses: 2,
    activities: [
      { name: "[EDU] Node.js Performance Talk", category: "Public Speaking", date: "08-Dec-2025", points: 32 },
      { name: "[EDU] Backend Architecture Workshop", category: "Public Speaking", date: "22-Nov-2025", points: 64 },
      { name: "[EDU] Database Optimization Course", category: "Course", date: "07-Nov-2025", points: 48 },
    ]
  },
  {
    id: 7, name: "Natasha Brown", title: "HR Manager", code: "PL.TAD.SO",
    avatar: f(63), color: "#FFA726",
    score: 288, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] People Analytics Workshop", category: "Course", date: "06-Dec-2025", points: 48 },
      { name: "[EDU] Talent Acquisition Summit", category: "Course", date: "15-Nov-2025", points: 48 },
      { name: "[EDU] HR Digital Tools Course", category: "Course", date: "28-Oct-2025", points: 32 },
    ]
  },
  {
    id: 8, name: "Rachel Evans", title: "Senior QA Engineer", code: "UK.Services",
    avatar: f(7), color: "#EF5350",
    score: 288, monitors: 0, courses: 4,
    activities: [
      { name: "[EDU] Playwright Testing Course", category: "Course", date: "05-Dec-2025", points: 64 },
      { name: "[EDU] Test Strategy Workshop", category: "Course", date: "14-Nov-2025", points: 48 },
      { name: "[EDU] Regression Testing Best Practices", category: "Course", date: "27-Oct-2025", points: 32 },
    ]
  },
  {
    id: 9, name: "Oliver Davis", title: "QA Engineer", code: "AU.U1.DQA2.T1",
    avatar: m(41), color: "#42A5F5",
    score: 288, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] Mobile Testing Fundamentals", category: "Course", date: "04-Dec-2025", points: 48 },
      { name: "[EDU] Appium Advanced Course", category: "Course", date: "13-Nov-2025", points: 48 },
      { name: "[EDU] iOS Testing Workshop", category: "Course", date: "26-Oct-2025", points: 32 },
    ]
  },
  {
    id: 10, name: "Lucas Martinez", title: "Software Engineer", code: "MX.U1.D3",
    avatar: m(68), color: "#26A69A",
    score: 256, monitors: 0, courses: 4,
    activities: [
      { name: "[EDU] React Hooks Deep Dive", category: "Course", date: "03-Dec-2025", points: 64 },
      { name: "[EDU] TypeScript Advanced Workshop", category: "Course", date: "12-Nov-2025", points: 48 },
      { name: "[EDU] Frontend Performance Course", category: "Course", date: "25-Oct-2025", points: 32 },
    ]
  },
  {
    id: 11, name: "Christopher Lee", title: "Senior Software Engineer", code: "CA.LG6",
    avatar: m(9), color: "#8D6E63",
    score: 256, monitors: 0, courses: 4,
    activities: [
      { name: "[EDU] Cloud Architecture Workshop", category: "Course", date: "02-Dec-2025", points: 64 },
      { name: "[EDU] AWS Certified Solutions Course", category: "Course", date: "11-Nov-2025", points: 48 },
      { name: "[EDU] DevOps Fundamentals", category: "Course", date: "24-Oct-2025", points: 32 },
    ]
  },
  {
    id: 12, name: "Amir Hassan", title: "Software Engineer", code: "PL.U1.D3.T1",
    avatar: m(77), color: "#5C6BC0",
    score: 224, monitors: 1, courses: 2,
    activities: [
      { name: "[EDU] Python for Data Engineers", category: "Course", date: "01-Dec-2025", points: 48 },
      { name: "[EDU] Microservices Design Patterns", category: "Course", date: "10-Nov-2025", points: 32 },
      { name: "[EDU] Kafka Workshop", category: "Public Speaking", date: "23-Oct-2025", points: 32 },
    ]
  },
  {
    id: 13, name: "Kevin Nguyen", title: "Senior Software Engineer", code: "US.U1.D4.NET",
    avatar: m(23), color: "#EC407A",
    score: 224, monitors: 4, courses: 3,
    activities: [
      { name: "[EDU] .NET 8 New Features", category: "Public Speaking", date: "30-Nov-2025", points: 64 },
      { name: "[EDU] C# Advanced Patterns", category: "Course", date: "09-Nov-2025", points: 48 },
      { name: "[EDU] EF Core Optimization", category: "Public Speaking", date: "22-Oct-2025", points: 32 },
    ]
  },
  {
    id: 14, name: "Isabella Wright", title: "QA Engineer", code: "AU.U1.DQA2",
    avatar: f(51), color: "#29B6F6",
    score: 208, monitors: 0, courses: 7,
    activities: [
      { name: "[EDU] Accessibility Testing Course", category: "Course", date: "29-Nov-2025", points: 48 },
      { name: "[EDU] Cross-Browser Testing Workshop", category: "Course", date: "08-Nov-2025", points: 32 },
    ]
  },
  {
    id: 15, name: "Thomas Anderson", title: "QA Engineer", code: "EU.U1.DQA2",
    avatar: m(36), color: "#D4E157",
    score: 208, monitors: 0, courses: 6,
    activities: [
      { name: "[EDU] Load Testing Masterclass", category: "Course", date: "28-Nov-2025", points: 48 },
      { name: "[EDU] Security Testing Basics", category: "Course", date: "07-Nov-2025", points: 32 },
    ]
  },
  {
    id: 16, name: "Hannah Scott", title: "QA Engineer", code: "EU.U1.DQA2.T1",
    avatar: f(33), color: "#FF8A65",
    score: 208, monitors: 0, courses: 7,
    activities: [
      { name: "[EDU] Contract Testing Workshop", category: "Course", date: "27-Nov-2025", points: 48 },
      { name: "[EDU] Postman Advanced Course", category: "Course", date: "06-Nov-2025", points: 32 },
    ]
  },
  {
    id: 17, name: "Benjamin Taylor", title: "HR Manager", code: "PL.TAD.PL",
    avatar: m(48), color: "#A5D6A7",
    score: 200, monitors: 0, courses: 4,
    activities: [
      { name: "[EDU] Compensation & Benefits Trends", category: "Course", date: "26-Nov-2025", points: 48 },
      { name: "[EDU] Employee Experience Design", category: "Course", date: "05-Nov-2025", points: 32 },
    ]
  },
  {
    id: 18, name: "Chloe Robinson", title: "Software Engineer", code: "CA.G3.T1",
    avatar: f(19), color: "#CE93D8",
    score: 192, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] Vue.js Essentials", category: "Course", date: "25-Nov-2025", points: 48 },
      { name: "[EDU] GraphQL Workshop", category: "Course", date: "04-Nov-2025", points: 32 },
    ]
  },
  {
    id: 19, name: "Ethan Walker", title: "Software Engineer", code: "MX.U1.D2.G2.T1",
    avatar: m(61), color: "#80DEEA",
    score: 192, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] Docker & Kubernetes Course", category: "Course", date: "24-Nov-2025", points: 48 },
      { name: "[EDU] Terraform Workshop", category: "Course", date: "03-Nov-2025", points: 32 },
    ]
  },
  {
    id: 20, name: "Mia Thompson", title: "HR Manager", code: "PL.TAD.PL",
    avatar: f(38), color: "#FFCC80",
    score: 192, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] Onboarding Best Practices", category: "Course", date: "23-Nov-2025", points: 48 },
      { name: "[EDU] L&D Strategy Workshop", category: "Course", date: "02-Nov-2025", points: 32 },
    ]
  },
  {
    id: 21, name: "Noah Clark", title: "Team Manager", code: "PL.TAD.PL",
    avatar: m(14), color: "#F48FB1",
    score: 192, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] Scrum Master Workshop", category: "Course", date: "22-Nov-2025", points: 48 },
      { name: "[EDU] OKR Framework Course", category: "Course", date: "01-Nov-2025", points: 32 },
    ]
  },
  {
    id: 22, name: "Victoria Hall", title: "Senior Software Engineer", code: "CA.LG6.T1",
    avatar: f(56), color: "#80CBC4",
    score: 192, monitors: 2, courses: 1,
    activities: [
      { name: "[EDU] Clean Code Principles", category: "Course", date: "21-Nov-2025", points: 48 },
      { name: "[EDU] SOLID Design Patterns", category: "Public Speaking", date: "31-Oct-2025", points: 32 },
    ]
  },
  {
    id: 23, name: "Isaac Patel", title: "Software Engineer", code: "UK.U1.AI.Alliance",
    avatar: m(82), color: "#BCAAA4",
    score: 192, monitors: 2, courses: 2,
    activities: [
      { name: "[EDU] LangChain Workshop", category: "Course", date: "20-Nov-2025", points: 48 },
      { name: "[EDU] Prompt Engineering Basics", category: "Course", date: "30-Oct-2025", points: 32 },
    ]
  },
  {
    id: 24, name: "Zoe Campbell", title: "Senior Software Engineer", code: "NZ.U1.G2",
    avatar: f(72), color: "#90CAF9",
    score: 192, monitors: 0, courses: 3,
    activities: [
      { name: "[EDU] Next.js App Router Course", category: "Course", date: "19-Nov-2025", points: 48 },
      { name: "[EDU] Web Performance Workshop", category: "Course", date: "29-Oct-2025", points: 32 },
    ]
  },
];

export const years = ["All Years", "2025", "2024", "2023"];
export const quarters = ["All Quarters", "Q1", "Q2", "Q3", "Q4"];
export const categories = ["All Categories", "Public Speaking", "Course", "Mentoring", "Knowledge Sharing"];
