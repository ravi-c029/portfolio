import { NextResponse } from "next/server";
import { portfolioData } from "../../../lib/portfolioData";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const lowerMsg = message.toLowerCase(); // Converts "NaME" to "name"

    let reply = "";

    // 1. IDENTITY & NAME
    if (lowerMsg.includes("name") || lowerMsg.includes("who are you") || lowerMsg.includes("intro")) {
      reply = `I am VirtualRavi, the AI assistant for ${portfolioData.personal.name}. I am here to showcase his portfolio.`;
    }

    // 2. LOCATION
    else if (lowerMsg.includes("live") || lowerMsg.includes("location") || lowerMsg.includes("from") || lowerMsg.includes("stay")) {
      reply = `Ravi is currently based in ${portfolioData.personal.location}.`;
    }

    // 3. EDUCATION / COLLEGE / CPI
    else if (lowerMsg.includes("college") || lowerMsg.includes("study") || lowerMsg.includes("university") || lowerMsg.includes("education") || lowerMsg.includes("degree")) {
      reply = `He is pursuing a ${portfolioData.personal.education.degree} at ${portfolioData.personal.education.university}.`;
    }
    else if (lowerMsg.includes("cpi") || lowerMsg.includes("cgpa") || lowerMsg.includes("grade") || lowerMsg.includes("marks")) {
      // Make sure you added 'cpi' to portfolioData.ts!
      reply = `He currently holds a CPI of ${portfolioData.personal.education || "excellent standing"} at IIT.`;
    }

    // 4. SKILLS (Existing)
    else if (lowerMsg.includes("skill") || lowerMsg.includes("stack") || lowerMsg.includes("tech")) {
      const skills = portfolioData.skills;
      reply = `His tech stack includes ${skills.frontend.join(", ")} and ${skills.backend.join(", ")}. He is also proficient in AI tools like ${skills.ai.join(", ")}.`;
    }
    
    // 5. PROJECTS (Existing)
    else if (lowerMsg.includes("project") || lowerMsg.includes("work") || lowerMsg.includes("built")) {
      const projectNames = portfolioData.projects.map(p => p.title).join(", ");
      reply = `He has built incredible projects like ${projectNames}. Ask me about a specific one!`;
    }

    // 6. CONTACT
    else if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach") || lowerMsg.includes("hire")) {
      reply = `You can reach him at: ${portfolioData.personal.email}. He is ${portfolioData.personal.availability}`;
    }

    // 7. GREETINGS & THANKS
    else if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
      reply = "Hello! I am ready to answer questions about Ravi's work, skills, and education.";
    }
    else if (lowerMsg.includes("thank") || lowerMsg.includes("cool") || lowerMsg.includes("good")) {
      reply = "You're welcome! Let me know if you need anything else.";
    }

    // DEFAULT FALLBACK
    else {
      reply = "I am tuned to answer professional questions. Ask me about Ravi's 'Education', 'CPI', 'Skills', or 'Projects'.";
    }

    // Fake delay for realism
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({ reply: "System operational. Ask me anything." });
  }
}