from dotenv import load_dotenv, find_dotenv
import os, json
import google.generativeai as genai
from pydantic import BaseModel
from typing import Literal, List


load_dotenv(find_dotenv(), override=True)

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("Missing GEMINI_API_KEY in .env")

genai.configure(api_key=API_KEY)


MODEL_NAME = "gemini-1.5-flash"   

class Structure(BaseModel):
    confidence: float
    decision: Literal["Approved", "Needs Manual Review", "Rejected"]
    positive_factors: List[str]
    reason: str
    risk_factors: List[str]
    is_scammer: bool

def evaluate_credit_request(data: dict) -> Structure:
   
    try:
        model = genai.GenerativeModel(
            MODEL_NAME,
            generation_config={
                
                "response_mime_type": "application/json",
            },
            system_instruction=(
                "You are a credit evaluation agent. Return ONLY valid JSON with keys: "
                "decision (Approved/Needs Manual Review/Rejected), confidence (0.0-1.0), "
                "reason (str), risk_factors (list), positive_factors (list), is_scammer (boolean)."
            ),
        )

        prompt = (
            "Evaluate the credit request and return ONLY JSON. "
            "Here is the input JSON:\n" + json.dumps(data)
        )

        resp = model.generate_content(prompt)
        payload = resp.text  

        parsed = json.loads(payload)  
        return Structure(**parsed)

    except Exception as e:
        print(f"[Gemini error] {e}")
        return get_fallback_evaluation("AI evaluation temporarily unavailable")

def get_fallback_evaluation(reason: str) -> Structure:
    return Structure(
        decision="Needs Manual Review",
        confidence=0.5,
        reason=reason,
        risk_factors=["System maintenance"],
        positive_factors=[],
        is_scammer=False,
    )
