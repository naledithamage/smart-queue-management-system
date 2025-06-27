import { NextResponse } from "next/server"

// Mock health topics database
const healthTopics = [
  {
    id: "tb",
    title: "Tuberculosis (TB)",
    description: "Information about TB symptoms, prevention, and treatment",
    content: `
      Tuberculosis (TB) is a bacterial infection that primarily affects the lungs. It is caused by Mycobacterium tuberculosis.
      
      Symptoms:
      - Persistent cough that lasts more than 3 weeks
      - Coughing up blood or mucus
      - Chest pain, or pain with breathing or coughing
      - Unintentional weight loss
      - Fatigue
      - Fever
      - Night sweats
      - Chills
      - Loss of appetite
      
      Prevention:
      - BCG vaccination for children
      - Early detection and treatment
      - Good ventilation in homes and workplaces
      - Covering mouth when coughing or sneezing
      
      Treatment:
      - TB is treated with antibiotics for at least 6 months
      - It's essential to complete the full course of treatment
      - Directly Observed Treatment (DOT) may be used to ensure medication adherence
    `,
  },
  {
    id: "hiv",
    title: "HIV/AIDS",
    description: "Resources for HIV prevention, testing, and management",
    content: `
      HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. If not treated, it can lead to AIDS (Acquired Immunodeficiency Syndrome).
      
      Symptoms:
      - Many people don't have symptoms in the early stages
      - Flu-like symptoms within 2-4 weeks after infection
      - Later symptoms include weight loss, fever, night sweats, and fatigue
      
      Prevention:
      - Using condoms during sex
      - Not sharing needles
      - Pre-exposure prophylaxis (PrEP) for high-risk individuals
      - Post-exposure prophylaxis (PEP) within 72 hours of potential exposure
      
      Testing:
      - Regular testing is recommended for those at risk
      - Home testing kits are available
      - Free testing is available at many clinics
      
      Treatment:
      - Antiretroviral therapy (ART) can control the virus
      - With proper treatment, people with HIV can live long, healthy lives
      - Treatment also prevents transmission to others
    `,
  },
  {
    id: "malaria",
    title: "Malaria",
    description: "Prevention and treatment of malaria in endemic areas",
    content: `
      Malaria is a serious disease caused by a parasite that is transmitted through the bite of infected mosquitoes.
      
      Symptoms:
      - Fever
      - Chills
      - Headache
      - Nausea and vomiting
      - Muscle pain and fatigue
      
      Prevention:
      - Use insecticide-treated bed nets
      - Apply mosquito repellent
      - Wear long-sleeved clothing
      - Take antimalarial medications when traveling to endemic areas
      - Eliminate standing water where mosquitoes breed
      
      Treatment:
      - Early diagnosis and treatment is critical
      - Antimalarial medications
      - Supportive care for complications
    `,
  },
  {
    id: "common-illnesses",
    title: "Common Illnesses",
    description: "Information about common illnesses and self-care",
    content: `
      Common illnesses include colds, flu, diarrhea, and minor infections. Many can be managed at home with proper care.
      
      Cold and Flu:
      - Rest and stay hydrated
      - Over-the-counter medications for symptom relief
      - Wash hands frequently to prevent spread
      
      Diarrhea:
      - Stay hydrated with water and electrolyte solutions
      - Eat bland foods
      - Seek medical attention if severe or persistent
      
      Fever:
      - Rest and stay cool
      - Take appropriate fever reducers
      - Seek medical attention for high or persistent fevers
      
      When to seek medical help:
      - Symptoms persist or worsen after several days
      - High fever (above 39°C/102°F)
      - Difficulty breathing
      - Severe pain
      - Confusion or unusual drowsiness
    `,
  },
  {
    id: "medications",
    title: "Medications Guide",
    description: "Information about common medications and proper usage",
    content: `
      Proper medication use is important for effective treatment and to avoid complications.
      
      General Guidelines:
      - Always follow prescription instructions
      - Complete the full course of antibiotics
      - Store medications properly
      - Check expiration dates
      - Don't share prescription medications
      
      Common Medications:
      - Painkillers: Paracetamol, ibuprofen
      - Antibiotics: Only use when prescribed for bacterial infections
      - Antimalarials: Follow dosing schedule exactly
      - ARVs: Take consistently at the same time each day
      
      Side Effects:
      - All medications can have side effects
      - Report severe side effects to a healthcare provider
      - Don't stop medication without consulting a healthcare provider
    `,
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    description: "Tips for staying healthy and preventing illness",
    content: `
      Preventive care helps you stay healthy and catch potential health problems early.
      
      Vaccinations:
      - Keep vaccinations up to date for all family members
      - Follow the recommended childhood vaccination schedule
      - Get seasonal flu vaccines
      
      Regular Check-ups:
      - Annual health examinations
      - Regular blood pressure checks
      - TB screening in high-risk areas
      - HIV testing as recommended
      
      Healthy Lifestyle:
      - Balanced diet rich in fruits and vegetables
      - Regular physical activity
      - Adequate sleep
      - Stress management
      - Avoid smoking and limit alcohol
      
      Hygiene:
      - Regular handwashing
      - Safe food preparation
      - Clean drinking water
      - Proper waste disposal
    `,
  },
]

// Mock AI assistant for health questions
function getHealthAnswer(question: string) {
  // Simple keyword matching for demo purposes
  // In a real app, this would use a more sophisticated NLP approach

  let answer =
    "I don't have specific information about that health topic. Please consult a healthcare professional for accurate advice."
  let relatedTopic = null

  // TB related questions
  if (question.match(/tb|tuberculosis|cough|lung|sputum/i)) {
    answer =
      "Tuberculosis (TB) is a bacterial infection that primarily affects the lungs. Common symptoms include a persistent cough lasting more than 3 weeks, coughing up blood, chest pain, weight loss, fatigue, fever, and night sweats. If you suspect TB, it's important to get tested at a clinic. TB is treatable with a course of antibiotics that typically lasts 6 months."
    relatedTopic = healthTopics.find((topic) => topic.id === "tb")
  }

  // HIV related questions
  else if (question.match(/hiv|aids|cd4|immune|virus|arv/i)) {
    answer =
      "HIV is a virus that attacks the immune system. Many people don't have symptoms in early stages, but may experience flu-like symptoms 2-4 weeks after infection. HIV is preventable through safe sex practices and not sharing needles. It's manageable with antiretroviral therapy (ART), allowing people to live long, healthy lives. Regular testing is recommended for those at risk."
    relatedTopic = healthTopics.find((topic) => topic.id === "hiv")
  }

  // Malaria related questions
  else if (question.match(/malaria|mosquito|fever|chills|headache/i)) {
    answer =
      "Malaria is caused by a parasite transmitted through mosquito bites. Symptoms include fever, chills, headache, nausea, and fatigue. Prevention methods include using insecticide-treated bed nets, applying mosquito repellent, and taking antimalarial medications when in endemic areas. If you suspect malaria, seek medical attention promptly as early treatment is critical."
    relatedTopic = healthTopics.find((topic) => topic.id === "malaria")
  }

  // Medication related questions
  else if (question.match(/medicine|medication|pill|drug|dosage|prescription/i)) {
    answer =
      "Always follow prescription instructions when taking medications. Complete the full course of antibiotics even if you feel better. Store medications properly and check expiration dates. Don't share prescription medications with others. If you experience severe side effects, contact a healthcare provider immediately."
    relatedTopic = healthTopics.find((topic) => topic.id === "medications")
  }

  // Prevention related questions
  else if (question.match(/prevent|healthy|lifestyle|exercise|diet|nutrition/i)) {
    answer =
      "Preventive care includes staying up to date with vaccinations, getting regular check-ups, maintaining a healthy lifestyle with a balanced diet and regular physical activity, practicing good hygiene, and avoiding risky behaviors like smoking. Regular screenings can help catch potential health problems early when they're easier to treat."
    relatedTopic = healthTopics.find((topic) => topic.id === "preventive-care")
  }

  return { answer, relatedTopic }
}

export async function GET() {
  // Return list of health topics
  return NextResponse.json({ topics: healthTopics })
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ message: "Question is required" }, { status: 400 })
    }

    // Get answer to health question
    const { answer, relatedTopic } = getHealthAnswer(question)

    // Return answer and related topic
    return NextResponse.json({ answer, relatedTopic })
  } catch (error) {
    console.error("Health info error:", error)
    return NextResponse.json({ message: "An error occurred while processing your question" }, { status: 500 })
  }
}
