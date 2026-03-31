// =====================================
// LiveLab 10 – AI Recommendation Engine
// Student Starter Code
//
// YOUR MISSION: Complete the TODOs below to build
// your AI-powered recommendation engine!
//
// ⚠️  SETUP REQUIRED: Before you begin, make sure your secrets.js file contains:
//    const api_key = "your-openai-api-key-here";
//    (Replace "your-openai-api-key-here" with your actual API key)
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
  
  // Show loading message while waiting for AI
  responseDiv.textContent = "Thinking...";

  // =====================================
  // STEP 4: Connect to the AI
  // =====================================
  // IMPORTANT: Before starting, make sure your secrets.js file contains:
  // const api_key = "your-actual-api-key-here";
  //
  // The variable name 'api_key' MUST match what you use in the Authorization header below!
  // ⚠️  CRITICAL: If you use Authorization: `Bearer ${api_key}`, then your secrets.js
  //    must have: const api_key = "your-key-here"

  // TODO: Complete the fetch request below to send the user's question to OpenAI
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      // TODO: Set the HTTP method to POST (this is required for sending data to the API)
      // YOUR CODE HERE
      // TODO: Add a headers object with TWO properties:
      //       1. Content-Type header set to "application/json" (tells API we're sending JSON)
      //       2. Authorization header with format: "Bearer <your-api-key-variable>"
      //          Use template literals with ${} to insert your api_key variable
      //          ⚠️  The variable name you use here MUST exist in secrets.js!
      // YOUR CODE HERE
      // TODO: Add a body property that sends JSON data to the API
      //       Use JSON.stringify() to convert an object with these properties:
      //       - model: which AI model to use (use "gpt-3.5-turbo" for this lab)
      //       - messages: an array with ONE message object containing:
      //           * role: set to "user" (tells AI this is from the user)
      //           * content: use the userQuestion variable (the user's input)
      // YOUR CODE HERE
    });

    // TODO: Check if the API response was successful
    //       If not successful (!res.ok), throw an error with the status code
    // YOUR CODE HERE

    // TODO: Parse the JSON response from the API
    //       Store the result in a variable called 'data'
    // YOUR CODE HERE

    // TODO: Extract and display the AI's response
    //       OpenAI returns the message in: data.choices[0].message.content
    //       Set responseDiv.textContent to show this to the user
    // YOUR CODE HERE
  } catch (error) {
    // TODO: Handle errors gracefully by doing TWO things:
    //       1. Log the error to the console so you can debug (use console.error)
    //       2. Show a user-friendly error message in responseDiv
    // YOUR CODE HERE
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
