document.getElementById('story-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    
    const storyText = event.target.querySelector('textarea').value;

    if (storyText.trim() === "") {
        alert("Please enter a story before submitting.");
        return;
    }

    document.getElementById('submit').style.display = 'none';
    document.getElementById('options').style.display = 'block';
    
    // Store the story text for later use
    localStorage.setItem('submittedStory', storyText);
});

// Event listeners for options
document.getElementById('review-option').addEventListener('click', function() {
    const storyText = localStorage.getItem('submittedStory');
    const prompt = `Please review this story and provide a rating:\n\n${storyText}`;
    getGPTResponse(prompt);
});

document.getElementById('update-option').addEventListener('click', function() {
    const currentStory = localStorage.getItem('submittedStory');
    const newStory = prompt("Update your story:", currentStory);
    
    if (newStory !== null && newStory.trim() !== "") {
        localStorage.setItem('submittedStory', newStory);
        alert("Story updated successfully!");

        // Hide options and show the submit section again
        document.getElementById('options').style.display = 'none';
        document.getElementById('submit').style.display = 'block';

        // Optionally, clear the textarea to let the user enter a new story if desired
        document.querySelector('#story-form textarea').value = newStory; // Pre-fill with updated story
    }
});

// Function to interact with the GPT API
function getGPTResponse(prompt) {
    fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // If needed
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response-output').innerText = data.response; // Adjust based on API response structure
        document.getElementById('gpt-response').style.display = 'block'; // Show GPT response section
    })
    .catch(error => console.error('Error:', error));
}
