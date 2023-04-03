// Wait for the message from the extension to replay.
// You can also provide static content via the HTML page
// or have a different workflow around the events.
/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  localStorage.setItem("recording", request);
  main();
});

function startSpinner() {
  document.getElementById("GO").classList.add("rotate");
}

function stopSpinner() {
  document.getElementById("GO").classList.remove("rotate");
}

function showAlert() {
  document.querySelector(".alertBox").style.display = "block";
}

function hideAlert() {
  document.querySelector(".alertBox").style.display = "none";
}

const initHTML = document.body.innerHTML;
let testResults;
let testId;

async function main() {
  // fetching locations

  async function fetchLocations() {
    const res = await fetch("https://www.webpagetest.org/getLocations.php?f=json&k=a");
    let { data } = await res.json();

    let locations = generateLocationOptions(data);

    locations.forEach((loc) => {
      const formLabel = document.createElement("optgroup");
      formLabel.label = loc.label.text;
      formLabel.classList.add(loc.label.text.split(" ")[0].split(",")[0]);
      document.querySelector(".locationSelect").appendChild(formLabel);
      loc.options.forEach((opt) => {
        const formOption = document.createElement("option");
        formOption.value = opt.value;
        formOption.innerHTML = opt.text.text;
        document
          .querySelector(`.${loc.label.text.split(" ")[0].split(",")[0]}`)
          .appendChild(formOption);
      });
    });
  }

  const generateLocationOptions = (allLocations) => {
    allLocations = Object.values(allLocations);

    let options = [];
    for (let i = 0; i < allLocations.length; i++) {
      const browsers = allLocations[i].Browsers.split(",");
      let browserOptions = [];
      for (let j = 0; j < browsers.length; j++) {
        let optionsObject = {
          text: {
            type: "plain_text",
            text: browsers[j],
            emoji: true,
          },
          value: allLocations[i].location + ":" + browsers[j],
        };
        browserOptions.push(optionsObject);
      }
      let locationOptionObject = {
        label: {
          type: "plain_text",
          text: allLocations[i].Label,
        },
        options: browserOptions,
      };

      options.push(locationOptionObject);
    }

    return options;
  };

  let recording = localStorage.getItem("recording");

  //encoding recording
  recording = encodeURIComponent(recording);

  // Dummy auth flow for testing purposes.
  const token = localStorage.getItem("token");
  if (!token) {
    document.body.innerHTML = `
    <head>
    <title>webpagetest Recorder UI</title>
    <style>
    html {
      height: auto;
      width: auto;
      background: rgb(27, 42, 74);
      background: linear-gradient(
        90deg,
        rgba(27, 42, 74, 1) 0%,
        rgba(58, 2, 81, 1) 35%,
        rgba(137, 11, 143, 1) 100%
      );
    }
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
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      margin-top: 20px;
    }

    .heading {
      color: white;
      margin-bottom: 30px;
    }

    .wptheader_logo {
      width: 20vw;
    }

    .subhead {
      color: white;
      font-size: 15px;
    }

    .subhead a {
      color: rgb(7, 253, 80);
      text-decoration: none;
    }

    form {
      width: 50vw;
      position: relative;
      align-items: center;
    }

    .input_api {
      width: 100%;
      max-width: 100%;
      border: 0px;
      box-sizing: border-box;
      border-radius: 2rem;
      margin-top: 0;
      font-size: 1.4em;
      padding: 20px 30px;
      box-shadow: inset 0 0 5px #000;
    }

    .alertBox {
      display: none;
      margin-top: -15px;
    }

    .alert {
      position: relative;
      top: 10;
      left: 0;
      width: auto;
      height: auto;
      padding: 10px;
      margin: 10px;
      line-height: 1.8;
      border-radius: 5px;
      cursor: hand;
      cursor: pointer;
      font-family: sans-serif;
      font-weight: 400;
    }

    .alertCheckbox {
      display: none;
    }

    .alertText {
      display: table;
      margin: 0 auto;
      text-align: center;
      font-size: 16px;
    }

    .error {
      background-color: #fee;
      border: 1px solid #edd;
      color: #a66;
    }

    input[type="submit"].start_test,
    button.start_test,
    a.btn-primary {
      cursor: pointer;
      justify-self: flex-end;
      position: relative;
      border: 0;
      border-radius: 4px;
      padding: 0.6875em 1em;
      background: #f9d856;
      font-size: 1.2em;
      cursor: pointer;
      color: #111;
      text-decoration: none;
      margin-top: 10px;
    }

    .fieldRow {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
    }
    .fieldRow-btn {
      display: flex;
      justify-content: flex-end;
    }

    select,
    input[type="text"],
    input[type="number"] {
      font-size: 1em;
      padding: 0.6875em 1.3125em;
      border-radius: 4px;
      border: 0px;
      width: 80%;
      max-width: 90%;
    }

    .advanced_settings-container {
      background: rgb(27, 42, 74);
      border-radius: 10px;
      margin-top: 1rem;
      padding: 1rem 0.5rem;
    }

    @media (max-width: 900px) {
      form {
        width: 90vw;
      }
    }

    #loading {
      display: inline-block;
      position: absolute;
      right: 5%;
      top: 25%;
      width: 15px;
      height: 15px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #000000;
      animation: spin 1s ease-in-out infinite;
      -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }

    .hide {
      display: none !important;
    }
  </style>
  </head>
  <body>
  <div class="main">
  <div class="heading">
    <a class="wptheader" href="https://www.webpagetest.org" target="_blank">
      <img
        class="wptheader_logo"
        src="/assets/wpt-logo.svg"
        alt="WebPageTest by Catchpoint: Recorder UI"
      />
    </a>
  </div>
  <form>
    <input
      class="input_api"
      type="password"
      name="apiKey"
      id="apikey"
      placeholder="Enter webpagetest API KEY..."
      required="true"
    />
    <label class="alertBox">
      <input type="checkbox" class="alertCheckbox" autocomplete="off" />
      <div class="alert error">
        <span class="alertText">API Key Invalid OR Expired</span>
      </div>
    </label>
    <div class="subhead">
      <p>
        Don't have one? Get it from
        <a href="https://docs.webpagetest.org/api/keys/" target="_blank">here</a>
      </p>
    </div>

    <div class="advanced_settings-container">
      <div class="fieldRow">
        <label for="lang" style="color: #fff">Locations: </label>
        <select name="location" id="location" class="locationSelect">
          <option value="Dulles:Chrome" selected>Dulles:Chrome</option>
        </select>
      </div>

      <div class="fieldRow">
        <label for="lang" style="color: #fff">Connectivity: </label>

        <select name="connectivity" id="connectivity" class="connectivitySelect">
          <option value="DSL" selected>
            DSL - 1.5 Mbps down, 384 Kbps up, 50 ms first-hop RTT
          </option>
          <option value="Cable">Cable - 5 Mbps down, 1 Mbps up, 28ms first-hop RTT</option>
          <option value="FIOS">FIOS - 20 Mbps down, 5 Mbps up, 4 ms first-hop RTT</option>
          <option value="Dial">Dial - 49 Kbps down, 30 Kbps up, 120 ms first-hop RTT</option>
          <option value="Edge">Edge - 240 Kbps down, 200 Kbps up, 840 ms first-hop RTT</option>
          <option value="2G">2G - 280 Kbps down, 256 Kbps up, 800 ms first-hop RTT</option>
          <option value="3GSlow">3GSlow - 400 Kbps down and up, 400 ms first-hop RTT</option>
          <option value="3G">3G - 1.6 Mbps down, 768 Kbps up, 300 ms first-hop RTT</option>
          <option value="3GFast">
            3GFast - 1.6 Mbps down, 768 Kbps up, 150 ms first-hop RTT
          </option>
          <option value="4G">4G - 9 Mbps down and up, 170 ms first-hop RTT</option>
          <option value="LTE">LTE - 12 Mbps down and up, 70 ms first-hop RTT</option>
          <option value="Native">Native - No synthetic traffic shaping applied</option>
        </select>
      </div>

      <div class="fieldRow">
        <label for="lang" style="color: #fff">Runs: </label>
        <select name="runs" id="runs" class="connectivitySelect">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>

      <div class="fieldRow">
        <label for="rv" style="color: #fff"
          ><input type="checkbox" name="repeatView" id="repeatView" class="checkbox" />
          Include Repeat View
          <small>(Loads the page, closes the browser and then loads the page again)</small></label
        >
      </div>

      <div class="fieldRow fieldRow-btn">
        <button type="submit" class="start_test">Start Test →</button>
        <!-- <input type="submit" value="Start Test →" class="start_test" /> -->
      </div>
    </div>
  </form>
</div>
  </body>
        `;

    fetchLocations();

    let rvCheck = false;

    document.querySelector("#repeatView").addEventListener("click", () => {
      rvCheck = !rvCheck;
    });

    document.querySelector("form").onsubmit = (event) => {
      event.preventDefault();

      const apikey = document.getElementById("apikey").value;
      const location = document.getElementById("location").value;
      const connectivity = document.getElementById("connectivity").value;
      const runs = document.getElementById("runs").value;

      showSpinner();
      hideAlert();

      //Correct URI
      const url = `https://www.webpagetest.org/runtest.php?f=json&label=Recorder&nbsp;Extention&script=${recording}&fvonly=${
        rvCheck ? 0 : 1
      }&k=${apikey}&location=${location}.${connectivity}&runs=${runs}`;
      //const sampleUrl = `https://api.chucknorris.io/jokes/random`;

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
          hideSpinner();
          showAlert();
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

  function showSpinner() {
    document.querySelector(".start_test").innerHTML = `Start Test &nbsp;&nbsp;&nbsp;
          <div id="loading"></div>`;
  }
  function hideSpinner() {
    document.querySelector(".start_test").innerHTML = `Start Test →`;
  }
}
