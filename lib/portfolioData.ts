export const portfolioData = {
  personal: {
    name: "Ravi Kumar Keshari",
    role: "Computer Science Student (IIT) & Full Stack Developer",
    location: "India",
    email: "ravi.keshari029@gmail.com", // ⚠️ REPLACE WITH REAL EMAIL
    bio: "I am a Computer Science student at an IIT and a video editor. I specialize in building futuristic, high-performance web applications using Next.js and AI.",
    availability: "Open to freelance and internship opportunities.",
    education: {
      degree: "B.Tech in Computer Science",
      university: "Indian Institute of Technology (IIT)",
      status: "Currently Enrolled"
    }
  },
  
  skills: {
    frontend: ["Next.js 15", "React", "Tailwind CSS", "Framer Motion", "Three.js", "React Three Fiber"],
    backend: ["Node.js", "Supabase", "PostgreSQL", "Python"],
    ai: ["RAG Architecture", "Google Gemini API", "OpenAI API"],
    creative: ["Video Editing", "3D Web Design", "UI/UX Architecture"]
  },

  projects: [
    {
      title: "GLASS OS",
      description: "A premium, product-grade personal website with a 'Glass OS' theme. It features an admin panel for content management, visitor analytics, and this very AI assistant.",
      tech: ["Next.js", "TypeScript", "Gemini AI"]
    },
    {
      title: "CIVICRISE INDIA",
      description: "A civic awareness platform empowering citizens to report local issues. Features real-time issue reporting and environmental data visualization.",
      tech: ["React.js", "Node.js", "Mapbox"]
    },
    {
      title: "COGNITIQ MAP",
      description: "A capstone project modeling academic concept dependencies. It identifies student learning gaps using graph theory algorithms.",
      tech: ["HTML", "CSS", "JavaScript", "Graph Theory"]
    },
    {
      title: "RAVI MEDICAL AGENCY",
      description: "A web application for inventory management with an owner dashboard to monitor live visitors.",
      tech: ["Full Stack Web"]
    }
  ],

  // ⚠️ THE SECRET SAUCE: The Persona Instructions
  systemPrompt: `
    You are VirtualRavi, a digital twin of Ravi Kumar Keshari.
    
    YOUR GOAL:
    Answer questions for recruiters and visitors as if you are Ravi.
    
    YOUR PERSONALITY:
    - Professional but enthusiastic.
    - Confident about your skills in Next.js and AI.
    - Concise (don't write long essays, keep it chatty).
    
    RULES:
    1. STRICTLY use the provided JSON data to answer. If the answer isn't in the data, say "I don't have that specific data right now, but you can email Ravi directly."
    2. Never invent false projects.
    3. If asked about contact info, provide the email.
    4. Speak in the first person ("I built this...", "My skills are...") OR as an assistant ("Ravi built this...").
  `
};