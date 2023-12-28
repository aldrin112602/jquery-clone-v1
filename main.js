$(document).ready(function() {
    $('button').click(function() {

      // Define a callback function to handle the JSONP response
      function handleJsonpResponse(response, status) {
        if (status === 200) {
          console.log("JSONP Response:", response);
          // Do something with the JSONP response
        } else {
          console.error("Error:", status);
        }
      }

      // Make a JSONP request using your $.get function
      $.get(
        "https://jsonplaceholder.typicode.com/todos/1",
        null,
        handleJsonpResponse,
        "script"
      );
    })
})