import { NextResponse } from "next/server"

// Mock symptom analysis function
// In a real app, this would use an AI model or medical database
function analyzeSymptoms(symptoms: string, selectedSymptoms: string[]) {
  // Combine all symptoms
  const allSymptoms = [symptoms, ...selectedSymptoms].filter(Boolean).join(", ")

  // Simple keyword-based analysis
  // This is just for demonstration purposes
  const predictions = []

  // Common Cold / Flu
  if (allSymptoms.match(/fever|temperature|chills|sweating|cough|sore throat|runny nose|congestion/i)) {
    predictions.push({
      illness: "Common Cold",
      likelihood: 65,
      severity: "Low",
      recommendation: "Rest, drink fluids, and take over-the-counter cold medications if needed.",
      seekMedicalAttention: false,
    })

    predictions.push({
      illness: "Influenza",
      likelihood: 45,
      severity: "Medium",
      recommendation: "Rest, stay hydrated, and take fever reducers. Monitor symptoms for worsening.",
      seekMedicalAttention: false,
    })
  }

  // Respiratory Conditions
  if (allSymptoms.match(/cough|phlegm|mucus|chest|breathing|shortness of breath|wheezing/i)) {
    predictions.push({
      illness: "Bronchitis",
      likelihood: 40,
      severity: "Medium",
      recommendation: "Rest, use a humidifier, and drink plenty of fluids. Avoid smoke and pollutants.",
      seekMedicalAttention: false,
    })

    if (allSymptoms.match(/night|sweat|weight loss|fatigue|persistent/i)) {
      predictions.push({
        illness: "Tuberculosis",
        likelihood: 25,
        severity: "High",
        recommendation: "Seek medical attention for proper diagnosis and treatment.",
        seekMedicalAttention: true,
      })
    }

    if (allSymptoms.match(/wheezing|shortness of breath|chest tightness|difficulty breathing/i)) {
      predictions.push({
        illness: "Asthma",
        likelihood: 35,
        severity: "Medium",
        recommendation:
          "Use prescribed inhalers if available. Avoid triggers. Seek medical attention if breathing becomes difficult.",
        seekMedicalAttention: false,
      })
    }
  }

  // Head-related conditions
  if (allSymptoms.match(/headache|pain|pressure|sinus|nasal/i)) {
    predictions.push({
      illness: "Sinusitis",
      likelihood: 55,
      severity: "Low",
      recommendation: "Use saline nasal spray, take decongestants, and apply warm compresses.",
      seekMedicalAttention: false,
    })

    if (allSymptoms.match(/severe|worst|vomiting|stiff neck|light|sensitivity/i)) {
      predictions.push({
        illness: "Meningitis",
        likelihood: 15,
        severity: "High",
        recommendation: "Seek immediate medical attention for diagnosis and treatment.",
        seekMedicalAttention: true,
      })
    }

    if (allSymptoms.match(/migraine|aura|visual|nausea|light sensitivity|sound sensitivity/i)) {
      predictions.push({
        illness: "Migraine",
        likelihood: 50,
        severity: "Medium",
        recommendation: "Rest in a dark, quiet room. Take prescribed migraine medication if available.",
        seekMedicalAttention: false,
      })
    }
  }

  // Gastrointestinal conditions
  if (allSymptoms.match(/diarrhea|vomiting|nausea|stomach|abdominal|pain/i)) {
    predictions.push({
      illness: "Gastroenteritis",
      likelihood: 70,
      severity: "Medium",
      recommendation: "Stay hydrated, eat bland foods, and rest. Seek medical attention if symptoms persist.",
      seekMedicalAttention: false,
    })

    if (allSymptoms.match(/blood in stool|black stool|severe pain|persistent/i)) {
      predictions.push({
        illness: "Gastrointestinal Bleeding",
        likelihood: 20,
        severity: "High",
        recommendation: "Seek immediate medical attention.",
        seekMedicalAttention: true,
      })
    }

    if (allSymptoms.match(/heartburn|acid reflux|chest pain|bitter taste|regurgitation/i)) {
      predictions.push({
        illness: "Gastroesophageal Reflux Disease (GERD)",
        likelihood: 45,
        severity: "Low",
        recommendation:
          "Avoid trigger foods, eat smaller meals, don't lie down after eating, and consider over-the-counter antacids.",
        seekMedicalAttention: false,
      })
    }
  }

  // Skin conditions
  if (allSymptoms.match(/rash|itching|skin|spots|bumps/i)) {
    predictions.push({
      illness: "Contact Dermatitis",
      likelihood: 60,
      severity: "Low",
      recommendation: "Avoid irritants, use anti-itch creams, and take antihistamines if needed.",
      seekMedicalAttention: false,
    })

    if (allSymptoms.match(/fever|joint pain|muscle pain|headache/i)) {
      predictions.push({
        illness: "Measles",
        likelihood: 20,
        severity: "High",
        recommendation: "Seek medical attention for diagnosis and treatment.",
        seekMedicalAttention: true,
      })
    }

    if (allSymptoms.match(/blisters|painful|cluster|tingling/i)) {
      predictions.push({
        illness: "Herpes Zoster (Shingles)",
        likelihood: 30,
        severity: "Medium",
        recommendation: "Seek medical attention for antiviral medication, especially if caught early.",
        seekMedicalAttention: true,
      })
    }
  }

  // Infectious diseases
  if (allSymptoms.match(/fever|fatigue|joint pain|muscle pain|headache|rash/i)) {
    if (allSymptoms.match(/mosquito|tropical|travel/i)) {
      predictions.push({
        illness: "Malaria",
        likelihood: 35,
        severity: "High",
        recommendation: "Seek immediate medical attention for testing and treatment.",
        seekMedicalAttention: true,
      })

      predictions.push({
        illness: "Dengue Fever",
        likelihood: 30,
        severity: "High",
        recommendation: "Seek medical attention. Stay hydrated and take fever reducers (avoid aspirin).",
        seekMedicalAttention: true,
      })
    }
  }

  // Chronic conditions
  if (allSymptoms.match(/thirst|frequent urination|weight loss|fatigue|hunger/i)) {
    predictions.push({
      illness: "Diabetes",
      likelihood: 40,
      severity: "High",
      recommendation: "Seek medical attention for proper diagnosis and management.",
      seekMedicalAttention: true,
    })
  }

  if (allSymptoms.match(/chest pain|shortness of breath|fatigue|swelling|legs/i)) {
    predictions.push({
      illness: "Heart Failure",
      likelihood: 25,
      severity: "High",
      recommendation: "Seek immediate medical attention.",
      seekMedicalAttention: true,
    })
  }

  if (allSymptoms.match(/headache|dizziness|blurred vision|chest pain|shortness of breath/i)) {
    predictions.push({
      illness: "Hypertension (High Blood Pressure)",
      likelihood: 35,
      severity: "High",
      recommendation: "Seek medical attention for proper diagnosis and management.",
      seekMedicalAttention: true,
    })
  }

  // If no matches, provide generic results
  if (predictions.length === 0) {
    predictions.push({
      illness: "Unknown Condition",
      likelihood: 30,
      severity: "Medium",
      recommendation: "Monitor your symptoms. If they persist or worsen, consult a healthcare provider.",
      seekMedicalAttention: false,
    })
  }

  // Sort by likelihood
  return predictions.sort((a, b) => b.likelihood - a.likelihood)
}

export async function POST(request: Request) {
  try {
    const { symptoms, selectedSymptoms } = await request.json()

    // Analyze symptoms
    const predictions = analyzeSymptoms(symptoms, selectedSymptoms)

    // Return results
    return NextResponse.json({ predictions })
  } catch (error) {
    console.error("Symptom checker error:", error)
    return NextResponse.json({ message: "An error occurred while analyzing symptoms" }, { status: 500 })
  }
}
