def load_symptom_mappings(path="data/symptom_advice_mappings.json"):
    with open(path) as f:
        mappings = eval(f.read())  # Safe if file is trusted and already formatted correctly
    return mappings

def check_symptoms(user_symptoms, mappings):
    matched_conditions = {}
    user_symptoms_set = set(symptom.lower() for symptom in user_symptoms)

    for condition, details in mappings.items():
        condition_symptoms = set(symptom.lower() for symptom in details["symptoms"])
        match_count = len(user_symptoms_set & condition_symptoms)
        if match_count > 0:
            matched_conditions[condition] = {
                "match_score": match_count / len(condition_symptoms),
                "advice": details["advice"]
            }

    sorted_conditions = sorted(matched_conditions.items(), key=lambda x: x[1]["match_score"], reverse=True)
    return sorted_conditions

# Example usage
if __name__ == "__main__":
    mappings = load_symptom_mappings()
    user_input = ["fever", "night sweats", "cough"]
    results = check_symptoms(user_input, mappings)

    for condition, info in results:
        print(f"{condition} ({info['match_score']*100:.1f}% match): {info['advice']}")
