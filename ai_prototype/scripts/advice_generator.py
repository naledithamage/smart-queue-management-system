def classify_severity(match_score):
    """
    Classifies severity based on match score.
    """
    if match_score >= 0.7:
        return "HIGH", "🚨 Urgent attention needed"
    elif match_score >= 0.4:
        return "MODERATE", "⚠️ Monitor symptoms and consider seeing a doctor"
    else:
        return "LOW", "✅ Mild symptoms – monitor at home"

def generate_advice(condition_matches):
    """
    Generates formatted advice from symptom checker results.

    Parameters:
        condition_matches (list): List of tuples like (condition, {"match_score": float, "advice": str})

    Returns:
        List of dicts containing condition, score, severity, and advice
    """
    advice_list = []

    for condition, info in condition_matches:
        score = info["match_score"]
        user_advice = info["advice"]
        severity_level, guidance = classify_severity(score)

        advice_list.append({
            "condition": condition,
            "likelihood": f"{score * 100:.1f}%",
            "severity": severity_level,
            "summary": guidance,
            "detailed_advice": user_advice
        })

    return advice_list


# Example usage
if __name__ == "__main__":
    example_results = [
        ("Malaria", {"match_score": 0.8, "advice": "Seek immediate medical attention for blood testing and antimalarial drugs."}),
        ("Flu", {"match_score": 0.5, "advice": "Rest, hydrate, and take antipyretics. Visit a clinic if breathing worsens."}),
        ("Sinusitis", {"match_score": 0.2, "advice": "Use nasal sprays, warm compress, and consult a doctor if symptoms persist."})
    ]

    for item in generate_advice(example_results):
        print(f"\n🩺 {item['condition']} ({item['likelihood']})")
        print(f"{item['summary']} [{item['severity']}]")
        print(f"💡 Advice: {item['detailed_advice']}")
