from fastapi import APIRouter
from ai_prototype.scripts.symptom_checker import check_symptoms, load_symptom_mappings
from api.models.symptom_model import SymptomInput

router = APIRouter()
mappings = load_symptom_mappings("ai_prototype/data/symptom_advice_mappings.json")

@router.post("/")
def match_symptoms(input: SymptomInput):
    matches = check_symptoms(input.symptoms, mappings)
    return [{"condition": c, **info} for c, info in matches]
