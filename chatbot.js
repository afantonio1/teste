// Backend URL.
var apiUrl = "URL of api.php";
// Variable for the conversation state.
var context = "";

$(function(){
  // Initialization of the chatbot.
  chatbot("");

  // Send a Message, When the form will be submitted.
  $("form").submit(function(e){
    // Prevent the form submission.
    e.preventDefault();
    if($("input").val()){
      // Send the message.
      chatbot($("input").val());
      // Display the message.
      $('#messages').append('<p>'+$("input").val()+'</p>');
    }
  })
})

// A function for sending message to the backend and getting result.
function chatbot(message){
  $.ajax({
    url: apiUrl,
    type: 'post',
    dataType: 'json',
    data: {
      message: message,
      context: context
    },
    timeout:1000
  }).done(function (response) {
    // Check the result.
    console.log(response);
    if(response.error){
      // Failed at getting result.
      // Display a error message.
      $('#messages').append('<p>A communication error occurred.</p>');
    }else{
      // Succeeded at getting result.
      // Clear the input element.
      $("input").val("");
      // Display the message.
      $('#messages').append('<p>'+JSON.parse(response).output.text+'</p>');
      // Upodate the conversation state.
      context = JSON.stringify(JSON.parse(response).context);
    }
  }).fail(function () {
    // Display a error message.
    $('#messages').append('<p>A communication error occurred.</p>');
  });
}