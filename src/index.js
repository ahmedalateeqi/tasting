import htmlContent from "../index.html";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve HTML Front-End
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(htmlContent, {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // Process Test Case Generation Request
    if (request.method === "POST" && url.pathname === "/api/chat") {
      try {
        const body = await request.json();
        const criteria = body.message;

        if (!criteria) {
          return new Response(
            JSON.stringify({ success: false, reply: "Acceptance Criteria is required." }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ success: false, reply: "GEMINI_API_KEY is not configured." }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        const prompt = `Act as an expert Senior QA Engineer. Analyze the provided Acceptance Criteria and generate structured QA test cases covering Positive, Negative, and Edge scenarios.

Acceptance Criteria:
"${criteria}"

Return the output STRICTLY as a JSON array of objects without markdown formatting or backticks. Each object must contain these exact keys:
- "id": String (e.g., "TC-001")
- "title": String (Brief scenario title)
- "preconditions": String
- "steps": String (Numbered steps separated by newline)
- "expected": String (Expected result)
- "actual": String (Must be empty string "")
- "status": String (Must be set to "Untested")`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

        const geminiResponse = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const resData = await geminiResponse.json();

        if (resData.error) {
          return new Response(
            JSON.stringify({ success: false, reply: "Google API Error: " + resData.error.message }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        let rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

        const jsonStart = rawText.indexOf('[');
        const jsonEnd = rawText.lastIndexOf(']');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          rawText = rawText.substring(jsonStart, jsonEnd + 1);
        }

        const testCases = JSON.parse(rawText);

        return new Response(
          JSON.stringify({ success: true, testCases }),
          { headers: { "Content-Type": "application/json" } }
        );

      } catch (err) {
        return new Response(
          JSON.stringify({ success: false, reply: "Server Exception: " + err.message }),
          { headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};