import unittest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../scripts')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../data')))

from ai_prototype.scripts.symptom_checker import load_symptom_mappings, check_symptoms
from ai_prototype.scripts.advice_generator import generate_advice


class TestHealthAssistant(unittest.TestCase):

    def setUp(self):
        self.mappings = load_symptom_mappings("ai_prototype/data/symptom_advice_mappings.json")

    def test_single_match(self):
        symptoms = ["fever", "chills", "sweating"]
        results = check_symptoms(symptoms, self.mappings)
        conditions = [cond for cond, _ in results]
        self.assertIn("Malaria", conditions)

    def test_multiple_matches(self):
        symptoms = ["fever", "fatigue"]
        results = check_symptoms(symptoms, self.mappings)
        self.assertGreaterEqual(len(results), 2)

    def test_no_match(self):
        symptoms = ["itchy elbow", "green tongue"]
        results = check_symptoms(symptoms, self.mappings)
        self.assertEqual(len(results), 0)

    def test_empty_input(self):
        symptoms = []
        results = check_symptoms(symptoms, self.mappings)
        self.assertEqual(results, [])

    def test_high_score_advice(self):
        sample = [("Malaria", {"match_score": 0.85, "advice": "Mock malaria advice."})]
        response = generate_advice(sample)[0]
        self.assertEqual(response['severity'], "HIGH")

    def test_moderate_score_advice(self):
        sample = [("Flu", {"match_score": 0.5, "advice": "Mock flu advice."})]
        response = generate_advice(sample)[0]
        self.assertEqual(response['severity'], "MODERATE")

    def test_low_score_advice(self):
        sample = [("Sinusitis", {"match_score": 0.2, "advice": "Mock sinus advice."})]
        response = generate_advice(sample)[0]
        self.assertEqual(response['severity'], "LOW")

    def test_advice_output_structure(self):
        sample = [("Diabetes", {"match_score": 0.6, "advice": "Mock diabetes advice."})]
        result = generate_advice(sample)[0]
        for key in ["condition", "likelihood", "severity", "summary", "detailed_advice"]:
            self.assertIn(key, result)

    def test_invalid_json_handling(self):
        try:
            _ = load_symptom_mappings("data/non_existent_file.json")
        except FileNotFoundError:
            self.assertTrue(True)
        else:
            self.fail("Expected FileNotFoundError")

if __name__ == '__main__':
    unittest.main()
