import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // 1. CLEAN INPUT: Message ko lowercase aur clean karo
    const userQuery = message.toLowerCase();
    
    // Words split karo taaki hum ek-ek word match kar sakein
    // e.g. "Where is 10th school?" -> ["where", "10th", "school"]
    const queryWords = userQuery.split(" ").filter((w: string) => w.length > 2);

    // 2. FETCH BRAIN: Saara data le aao (Fast hai kyunki data kam hai)
    const { data: allFacts } = await supabase
      .from('ai_knowledge_base')
      .select('*');

    if (!allFacts || allFacts.length === 0) {
      return NextResponse.json({ reply: "My memory is empty. Please feed me data in the Admin Panel." });
    }

    // 3. THE SCORING ENGINE (Ye hai asli logic)
    const scoredFacts = allFacts.map(fact => {
      let score = 0;
      const factText = fact.fact.toLowerCase();
      const category = fact.category;

      // --- RULE 1: EXACT KEYWORD MATCH (Sabse Zaroori) ---
      // Agar user ne "10th" poocha aur fact mein "10th" hai -> JACKPOT!
      if (userQuery.includes("10th") && factText.includes("10th")) score += 100;
      if (userQuery.includes("12th") && factText.includes("12th")) score += 100;
      if (userQuery.includes("college") && (factText.includes("college") || factText.includes("iit") || factText.includes("btech"))) score += 50;
      
      // --- RULE 2: CATEGORY MATCH ---
      // Agar "Project" poocha toh Project category boost karo
      if (userQuery.includes("project") && category === "Projects") score += 30;
      if (userQuery.includes("skill") && category === "Skills") score += 30;
      if ((userQuery.includes("name") || userQuery.includes("who")) && category === "Personal") score += 50;
      if ((userQuery.includes("email") || userQuery.includes("contact")) && category === "Contact") score += 50;

      // --- RULE 3: GENERAL WORD MATCH ---
      // Jitne words match honge, utna score badhega
      queryWords.forEach((word: string) => {
        if (factText.includes(word)) score += 5;
      });

      return { fact: fact.fact, score };
    });

    // 4. PICK WINNER
    // Jiska score sabse zyada, wo sabse upar
    scoredFacts.sort((a, b) => b.score - a.score);

    // Agar best match ka score 0 hai, matlab kuch nahi mila
    if (scoredFacts[0].score === 0) {
      return NextResponse.json({ 
        reply: "I am specifically tuned for Ravi's professional life. Ask me about his 'Projects', 'Skills', or 'Education'." 
      });
    }

    // Top 1-2 facts ko jod kar bhejo
    const topFacts = scoredFacts.slice(0, 2).filter(f => f.score > 10).map(f => f.fact);
    const reply = topFacts.join("\n\n");

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({ reply: "System Malfunction." });
  }
}