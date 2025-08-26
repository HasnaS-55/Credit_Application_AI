import os,json
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import Literal, List
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(
    base_url=os.getenv("OPENAI_BASE_URL"),
    api_key=os.getenv("OPENAI_API_KEY"),
)


class CreditEvaluation(BaseModel):
    decision: Literal["Approved", "Needs Manual Review", "Rejected"] = Field(description="The decision on the credit request ") # "Approved", "Needs Manual Review", "Rejected"
    confidence: float = Field(description="The confidence in the decision")  # 0.0 to 1.0
    reason: str = Field(description="The reason for the decision")
    risk_factors: List[str] = Field(description="The risk factors for the credit request") # list of risk factors
    positive_factors: List[str] = Field(description="The positive factors for the credit request") # list of positive factors
    is_scammer: bool = Field(description="try to detect if he is scammer or not") # "This is a real user request"


def evaluate_credit_request(data):  
    completion = client.beta.chat.completions.parse(
        model="openai/gpt-4o",
        messages=[
            {"role": "system", "content": "You are a credit evaluation agent. You are given a credit request and you need to evaluate it. You need to return a JSON object with the following fields: decision, confidence, reason, risk_factors, positive_factors."},
            {
                "role": "user",
                "content": "Evaluate the credit request for the user with the following information: " + json.dumps(data),
            },
        ],
    response_format=CreditEvaluation,
    temperature=0

    )
    evaluation = completion.choices[0].message.parsed
    return evaluation

