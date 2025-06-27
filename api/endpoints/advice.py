from fastapi import APIRouter
from api.models.advice_model import ConditionMatch
from ai_prototype.scripts.advice_generator import generate_advice

router = APIRouter()

@router.post("/")
def get_advice(conditions: list[ConditionMatch]):
    return generate_advice([(c.condition, {"match_score": c.match_score, "advice": c.advice}) for c in conditions])
