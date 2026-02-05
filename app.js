function initialize() {
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;

    // Function to save the code as a file
    function saveFile(content, fileName, fileType) {
        var blob = new Blob([content], { type: fileType });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

    document.body.onkeyup = function () {
        code.open();
        code.writeln(
            html.value +
            "<style>" + css.value + "</style>" +
            "<script>" + js.value + "</script>"
        );
        code.close();
    };

    // Add a click event listener to the "Save Code" button
    document.getElementById("save-code").addEventListener("click", function () {
        saveFile(html.value, "index.html", "text/html");
        saveFile(css.value, "style.css", "text/css");
        saveFile(js.value, "script.js", "text/javascript");
    });

    // Function to handle file input change event
    function handleFileInput(inputElement, codeEditor) {
        const file = inputElement.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                codeEditor.value = event.target.result;
            };
            reader.readAsText(file);
        }
    }

    // Add event listeners for file inputs
    document.getElementById("html-file").addEventListener("change", function () {
        handleFileInput(this, html);
    });

    document.getElementById("css-file").addEventListener("change", function () {
        handleFileInput(this, css);
    });

    document.getElementById("js-file").addEventListener("change", function () {
        handleFileInput(this, js);
    });

    function toggleTheme(theme) {
        const body = document.body;
        const mainArea = document.querySelector(".mainarea");
        const editors = document.querySelectorAll(".editors textarea");
        const output = document.querySelector(".output");

        if (theme === 'dark') {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            mainArea.classList.remove('light-theme');
            mainArea.classList.add('dark-theme');
            output.classList.remove('light-theme');
            output.classList.add('dark-theme');
            editors.forEach(editor => {
                editor.classList.remove('light-theme');
                editor.classList.add('dark-theme');
            });
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            mainArea.classList.remove('dark-theme');
            mainArea.classList.add('light-theme');
            output.classList.remove('dark-theme');
            output.classList.add('light-theme');
            editors.forEach(editor => {
                editor.classList.remove('dark-theme');
                editor.classList.add('light-theme');
            });
        }
    }
}    


const htmlTextarea = document.getElementById("html");

// Function to automatically insert closing HTML tags with tag name
function autoInsertClosingTag(textarea) {
  textarea.addEventListener("input", function (event) {
    const text = textarea.value;
    const cursorPosition = textarea.selectionStart;

    if (text.charAt(cursorPosition - 1) === ">") {
      const lastOpeningTagIndex = text.lastIndexOf('<', cursorPosition - 1);

      if (lastOpeningTagIndex !== -1) {
        const openingTag = text.substring(lastOpeningTagIndex, cursorPosition);
        const tagName = getTagName(openingTag);

        if (tagName) {
          const closingTag = `</${tagName}>`;
          textarea.value = text.slice(0, cursorPosition) + closingTag + text.slice(cursorPosition);
          textarea.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    }
  });
}

// Function to get the tag name from an opening tag
function getTagName(openingTag) {
  const match = openingTag.match(/<(\w+)/);
  return match ? match[1] : null;
}

// Call the autoInsertClosingTag function for the HTML textarea
autoInsertClosingTag(htmlTextarea);

/*


 // Add event listener for "Change Theme" button
 document.getElementById("change-theme").addEventListener("click", function () {
    // Change body background color to white
    document.body.style.backgroundColor = "#fff";
    
    // Change output background color to black
    document.querySelector(".output").style.backgroundColor = "#000";
});

*/


const colors = ['#ff6347', '#ffa500', '#ffd700', '#32cd32', '#87ceeb', '#9932cc', '#ff69b4', '#00ffff','#F0FFFF'
                  ,'#008B8B','#006400','#2F4F4F','#008000','#F0E68C','#FFF0F5','#D3D3D3','#20B2AA','#0000CD',
                '#00FA9A','#000080','#2E8B57'];

    // Add event listener for "Change Theme" button
    document.getElementById("change-theme").addEventListener("click", function () {
        // Get two random colors from the array
        let color1, color2;
        do {
            color1 = colors[Math.floor(Math.random() * colors.length)];
            color2 = colors[Math.floor(Math.random() * colors.length)];
        } while (color1 === color2); // Ensure the colors are different
        
        // Apply the random colors to the body and output backgrounds
        document.body.style.backgroundColor = color1;
        document.querySelector(".output").style.backgroundColor = color2;
    });


// Initialize the application
initialize();
