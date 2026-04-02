// =====================================
// LiveLab 10 – AI Recommendation Engine
// Student Starter Code
//
// YOUR MISSION: Complete the TODOs below to build
// your AI-powered recommendation engine!
//
// ✅ SETUP COMPLETE: Your Cloudflare Worker is configured as a secure backend!
//    The API key is safely stored on the backend, not in your frontend code.
// =====================================

// =====================================
// STEP 1: Select DOM Elements (COMPLETED FOR YOU)
// =====================================
const button = document.getElementById("askBtn");
const input = document.getElementById("userInput");
const responseDiv = document.getElementById("response");

// =====================================
// STEP 2: Add Event Listener (COMPLETED FOR YOU)
// =====================================
button.addEventListener("click", async () => {
  // Get and trim the user's question
  const userQuestion = input.value.trim();

  // =====================================
  // STEP 3: Implement Error Handling
  // =====================================
  // TODO: Check if the user's input is empty, and if so:
  //       1. Display a helpful message asking them to enter a question
  //       2. Stop the function from continuing (exit early)
  //
  // GUIDANCE:
  // - Use an if statement to check if userQuestion is falsy (empty, null, etc.)
  // - Update the responseDiv element to show your message
  // - Use the return keyword to exit the function early
  // YOUR CODE HERE
  if (!userQuestion) {
    responseDiv.textContent = "Please enter a question.";
    return;
  }

  // Show loading message while waiting for AI
  responseDiv.textContent = "Thinking...";

  // =====================================
  // STEP 4: Connect to the AI via Cloudflare Worker
  // =====================================
  // Your Cloudflare Worker securely handles the OpenAI API connection!
  // The API key is stored safely on the backend, never exposed to the frontend.
  // This worker acts as a secure proxy between your frontend and OpenAI.

  // TODO: Complete the fetch request below to send the user's question to the Cloudflare Worker
  try {
    const res = await fetch("https://divine-sea-b20e.lchaker921.workers.dev/", {
      // TODO: Set the HTTP method to POST (this is required for sending data to the API)
      // YOUR CODE HERE
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Note: The Authorization header is NOT needed here because the Cloudflare Worker
        // handles authentication with OpenAI on the backend!
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a professional workplace assistant. Use a formal, serious tone. Structure responses clearly with concise sections using headings when helpful, and provide direct, practical recommendations. Avoid slang, jokes, emojis, and overly casual phrasing, and do not diverge too far from the topic.",
          },
          { role: "user", content: userQuestion },
        ],
        max_completion_tokens: 500, // Limit response length for better performance
        temperature: 0.2, // Lower temperature for more focused, deterministic responses
        frequency_penalty: 0.2, // Slightly discourage repetition for more varied responses
        presence_penalty: 0.2, // Slightly encourage diversity for more varied responses
      }),

      // TODO: Add a headers object with ONE property:
      //       1. Content-Type header set to "application/json" (tells API we're sending JSON)
      //       ⚠️  NO Authorization header needed! The Cloudflare Worker handles that securely!
      // YOUR CODE HERE
      // TODO: Add a body property that sends JSON data to the Cloudflare Worker
      //       Use JSON.stringify() to convert an object with these properties:
      //       - model: which AI model to use (use "gpt-3.5-turbo" for this lab)
      //       - messages: an array with ONE message object containing:
      //           * role: set to "user" (tells AI this is from the user)
      //           * content: use the userQuestion variable (the user's input)
      //       - max_completion_tokens, temperature, frequency_penalty, presence_penalty: for fine-tuning responses
      // YOUR CODE HERE
    });

    // TODO: Check if the API response was successful
    //       If not successful (!res.ok), throw an error with the status code
    // YOUR CODE HERE
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    // TODO: Parse the JSON response from the Cloudflare Worker
    //       Store the result in a variable called 'data'
    // YOUR CODE HERE
    const data = await res.json();

    // TODO: Extract and display the AI's response
    //       OpenAI returns the message in: data.choices[0].message.content
    //       Set responseDiv.textContent to show this to the user
    // YOUR CODE HERE
    responseDiv.textContent =
      data.choices?.[0]?.message?.content || "No response received.";
  } catch (error) {
    // TODO: Handle errors gracefully by doing TWO things:
    //       1. Log the error to the console so you can debug (use console.error)
    //       2. Show a user-friendly error message in responseDiv
    // YOUR CODE HERE
    console.error(error);
    responseDiv.textContent = "Sorry, something went wrong. Please try again.";
    alert(
      "An error occurred while fetching the AI response. Please check your network connection and the console for more details.",
    );
  }
    alert(
      "An error occurred while fetching the AI response. Please check your network connection and the console for more details.",
    );
  }
});

// =====================================
// INSTRUCTOR TALKING POINTS
// =====================================
// - Why async/await improves readability
// - Why try/catch is critical for AI apps
// - Why we NEVER expose API keys in frontend
// - How this directly supports the L'Oréal project
// =====================================

/* =====================================
   NEXT STEPS AFTER COMPLETING TODOs:
   1. Test your app with sample queries
   2. Add custom styling to match your concept
   3. OPTIONAL: Display multiple responses (last 3)
   4. OPTIONAL: Add chat bubble styling
   5. OPTIONAL: Add emojis or themed design
===================================== */
