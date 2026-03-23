// src/services/additionApi.js

const BASE_URL = "https://quantitative-aptitude-trainer.onrender.com/api";

/**
 * POST /api/addition/generate
 * @param {{ questionCount: number, digits: number, mode: "RANDOM" | "CHAINED" }} config
 * @returns {Promise<{ sessionId: string, questions: Array<{id,operand1,operand2,answer,operator}> }>}
 */
export async function generateSession(config) {
  const response = await fetch(`${BASE_URL}/addition/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
}