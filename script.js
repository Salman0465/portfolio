<script type="text/javascript" src="js/darkmode.js"></script>
    <!-- <script src="/js/preventInspect.js"></script> -->
    <script>
        const form = document.getElementById('form');
        const result = document.getElementById('result');
    
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(form);
          const object = Object.fromEntries(formData);
          const json = JSON.stringify(object);
          
          // Show the popup with the "Please wait..." message
        //   result.innerHTML = "Please wait...";
            document.getElementById("result").innerHTML = "Please wait...";
            
          result.classList.add("show");
          result.style.display = "flex"; // Ensures it's visible
    
          fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: json
          })
          .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                  result.innerHTML = '<i class="fa-solid fa-circle-check"></i> Form submitted successfully!';
              } else {
                  console.log(response);
                  result.innerHTML = json.message;
              }
          })
          .catch(error => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
          })
          .then(function() {
              form.reset();
              // Hide the popup after 3 seconds
              setTimeout(() => {
                  result.style.display = "none";
              }, 3000);
          });
        });
      </script>