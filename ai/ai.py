from dotenv import load_dotenv
import os, json
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import Literal, List

load_dotenv()
BASE_URL = os.getenv("DEEPSEEK_BASE_URL")
API_KEY = os.getenv("DEEPSEEK_API_KEY")

client = OpenAI(base_url=BASE_URL, api_key=API_KEY)


class Structure(BaseModel): 
    confidence: float = Field(description="Your confidence in the decision")
    decision: Literal["Approved", "Needs Manual Review", "Rejected"] = Field(description="the decision of the credit request")
    positive_factors: List[str] = Field(description="The positive factors for the credit request")
    reason: str = Field(description="Reasons of the decision")
    risk_factors: List[str] = Field(description="The risk factors for the credit request")
    is_scammer: bool = Field(description="try to detect if he is scammer or not")

def evaluate_credit_request(data):
    try:
        completion = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{
                     "role": "system", 
                     "content": "You are a credit evaluation agent. Always return valid JSON with: decision (Approved/Needs Manual Review/Rejected), confidence (0.0-1.0), reason (str), risk_factors (list), positive_factors (list), is_scammer (boolean)"},
                    {
                        "role": "user",
                        "content": "Return ONLY valid JSON. Evaluate the credit request: " + json.dump(data)
                    }
                    ],
            response_format={"type": "json_object"}
        )
        response_text = completion.choices[0].message.content  
        response_data = json.loads(response_text)              

        evaluation = Structure(**response_data)        
        return evaluation
    except Exception as e:
        print(f"DeepSeek API error: {e}")
        return get_fallback_evaluation(data)

def get_fallback_evaluation(data):
    return Structure(
        decision="Needs Manual Review",
        confidence=0.5,
        reason="AI evaluation temporarily unavailable",
        risk_factors=["System maintenance"],
        positive_factors=[],
        is_scammer=False
    )