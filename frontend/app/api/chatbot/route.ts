import { NextResponse } from "next/server"

// This is a simple mock implementation of a chatbot API
// In a real application, this would connect to an actual language model API
export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 })
    }

    // Simple keyword-based response generation
    // In a real app, this would be replaced with an actual AI model
    const response = generateResponse(message)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chatbot error:", error)
    return NextResponse.json({ message: "An error occurred while processing your message" }, { status: 500 })
  }
}

function generateResponse(message: string): string {
  const input = message.toLowerCase()

  if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
    return "Hello! How can I assist with your health questions today?"
  }

  if (input.includes("headache") || (input.includes("head") && input.includes("pain"))) {
    return "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe, persistent, or accompanied by other symptoms, please consult a healthcare provider."
  }

  if (input.includes("fever") || input.includes("temperature")) {
    return "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take fever-reducing medication if needed. If the fever is high (above 39°C/102°F), persists for more than three days, or is accompanied by severe symptoms, please seek medical attention."
  }

  if (input.includes("cough") || input.includes("cold") || input.includes("flu")) {
    return "For coughs, colds, and flu-like symptoms, rest and hydration are important. Over-the-counter medications can help manage symptoms. If you have difficulty breathing, chest pain, or symptoms that worsen or don't improve after a week, please consult a healthcare provider."
  }

  if (input.includes("tb") || input.includes("tuberculosis")) {
    return "Tuberculosis (TB) is a serious bacterial infection that mainly affects the lungs. Symptoms include persistent cough (often with blood), chest pain, fatigue, weight loss, fever, and night sweats. If you suspect TB, it's important to get tested at a clinic. TB is treatable with antibiotics, but the full course of treatment must be completed."
  }

  if (input.includes("hiv") || input.includes("aids")) {
    return "HIV is a virus that attacks the immune system. Early testing and treatment are crucial. With proper antiretroviral therapy (ART), people with HIV can live long, healthy lives. If you're concerned about HIV, please visit a clinic for confidential testing and counseling."
  }

  if (input.includes("clinic") || input.includes("doctor") || input.includes("hospital")) {
    return "If you need to visit a clinic, you can use our Clinic Queue feature to find nearby clinics and join the queue remotely. This can help reduce your waiting time. Would you like me to help you find a clinic near you?"
  }

  if (input.includes("medicine") || input.includes("medication") || input.includes("pill")) {
    return "It's important to take medications as prescribed by your healthcare provider. Our app can help you set up medication reminders. If you have questions about specific medications, please consult your healthcare provider or pharmacist."
  }

  if (input.includes("thank")) {
    return "You're welcome! If you have any other health questions, feel free to ask. I'm here to help."
  }

  // Default response
  return "I understand you're asking about health information. For more specific guidance, could you provide more details about your question or concern? I'm here to help with health information, but remember I'm not a replacement for professional medical advice."
}
