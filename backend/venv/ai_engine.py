import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

def analyze_resume(text, role):

    prompt = f"""
    You are an expert ATS Resume Analyzer.

    Target Role: {role}

    Return output EXACTLY in this format:

    ATS Score: <number>

    Matched Skills:
    - skill 1
    - skill 2

    Missing Skills:
    - skill 1
    - skill 2

    Improvement Suggestions:
    - suggestion 1
    - suggestion 2

    Rewritten Professional Summary:
    <3-4 professional lines>

    Resume Content:
    {text}
    """

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return response.choices[0].message.content