// Wait for the message from the extension to replay.
// You can also provide static content via the HTML page
// or have a different workflow around the events.
/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  localStorage.setItem("recording", request);
  main();
});

const initHTML = document.body.innerHTML;
let testResults;
let testId;

async function main() {
  let recording = localStorage.getItem("recording");

  //encoding recording
  recording = encodeURIComponent(recording);

  // Dummy auth flow. Please use the best practices for authenticating users.
  const token = localStorage.getItem("token");
  if (!token) {
    document.body.innerHTML = `
    <head>
    <title>webpagetest Recorder UI</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Open Sans", sans-serif;
      }
      .main {
        background: rgb(27, 42, 74);
        background: linear-gradient(
          90deg,
          rgba(27, 42, 74, 1) 0%,
          rgba(58, 2, 81, 1) 35%,
          rgba(137, 11, 143, 1) 100%
        );
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .heading {
        color: white;
      }

      .subhead {
        color: white;
      }

      .subhead a {
        color: rgb(7, 253, 80);
        text-decoration: none;
      }

      form {
        width: 50vw;
        position: relative;
        display: flex;
        align-items: center;
      }

      .input_api {
        width: 100%;
        max-width: 100%;
        border: 0px;
        box-sizing: border-box;
        border-radius: 2rem;
        margin-top: 0;
        font-size: 1em;
        padding: 20px 30px;
        box-shadow: inset 0 0 5px #000;
      }

      .input_submit {
        position: absolute;
        width: 45px;
        height: 45px;
        margin: 5px;
        border-radius: 50px;
        right: 0;
        border: none;
        font-size: 15px;
        background-color: #2f74c0;
        color: #fff;
        transition: all 0.2s;
        box-shadow: 0 0 10px #000;
      }

      .input_submit:active {
        transform: scale(0.8);
        box-shadow: 0 0 5px #000;
      }

      .input_submit:hover {
        background-color: #388ae2;
      }

      .rotate {
        animation: rotation 1s infinite linear;
      }

      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(359deg);
        }
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="heading"><h1>ENTER WEBPAGETEST API KEY</h1></div>
      <form>
        <input class="input_api" type="password" name="apiKey" id="apikey" required="true" />
        <button type="submit" class="input_submit" id="GO">GO</button>
      </form>
      <div class="subhead">
        <h3>
          Don't have one? Get it from
          <a href="https://docs.webpagetest.org/api/keys/" target="_blank">here</a>
        </h3>
      </div>
    </div>
  </body>
        `;

    document.getElementById("GO").addEventListener("click", () => {
      document.getElementById("GO").classList.add("rotate");
    });

    document.querySelector("form").onsubmit = (event) => {
      event.preventDefault();

      const apikey = document.getElementById("apikey").value;

      console.log("Webpagetest Custom Script Test Result: \n");

      //Correct URI
      const url = `https://www.webpagetest.org/runtest.php?f=json&label=Recorder&nbsp;Extention&script=${recording}&fvonly=1&k=${apikey}`;
      const sampleUrl = `https://api.chucknorris.io/jokes/random`;

      (async () => {
        try {
          const data = await fetch(url);
          localStorage.setItem("token", "token");

          const testResults = await data.json();

          if (testResults && testResults.data) {
            testId = testResults.data.testId;
          }
          main();
        } catch (err) {
          document.getElementById("GO").classList.remove("rotate");

          alert("API key ivalid/expired");
        }
      })();
    };
    return;
  }

  document.body.innerHTML = initHTML;
  document.getElementById("newTest").addEventListener("click", () => {
    localStorage.removeItem("token");
    main();
  });

  document.getElementById("testResults").addEventListener("click", () => {
    window.open(`https://www.webpagetest.org/result/${testId}`, "_blank");
  });

  if (!testId) {
    document.getElementById("testResults").style.display = "none";
  }

  // Emulating replay
  // document.querySelector("#recording").innerHTML = `Running ${recording.title}<br>`;
  // for (let i = 0; i < recording.steps.length; i++) {
  //   document.querySelector("#recording").innerHTML += `Running step ${i}: ${JSON.stringify(
  //     recording.steps[i]
  //   )}<br>`;
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // }
}
