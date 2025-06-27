from pydantic import BaseModel
from typing import List

class ConditionMatch(BaseModel):
    condition: str
    match_score: float
    advice: str

class AdviceOutput(BaseModel):
    condition: str
    likelihood: str
    severity: str
    summary: str
    detailed_advice: str
