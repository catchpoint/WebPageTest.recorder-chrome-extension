let jsonPath, flow;

/*Essential for extension*/

class RecorderPlugin {
  stringify(recording) {
    return Promise.resolve(convert(recording));
  }
  stringifyStep(step) {
    return Promise.resolve(convert(step));
  }
}

/*------------------------*/

if (typeof process !== "undefined") {
  jsonPath = process.argv.slice(2)[0];
  flow = require(jsonPath);
} else {
  /* eslint-disable no-undef */
  if (chrome.devtools) {
    chrome.devtools.recorder.registerRecorderExtensionPlugin(
      new RecorderPlugin(),
      /* name=*/ "WebPageTest custom",
      /* mediaType=*/ "text/plain"
    );
  }
}

let convert = function (flow) {
  let wptScript = "";

  let isKeyDown = false;

  //first, is it a valid step?
  function isValid(stepType) {
    if (stepMap[stepType]) {
      return true;
    } else {
      return false;
    }
  }
  function addViewport(step) {
    wptScript += `setViewportSize ${step.width} ${step.height}\n`;
  }
  function addNavigate(url) {
    wptScript += "setEventName Navigate\n";
    wptScript += "navigate " + url + "\n";
  }
  function addClick(selectors) {
    wptScript += "setEventName Click\n";
    //for now, let's skip any aria/ until we figure somethign out there
    for (let index = 0; index < selectors.length; index++) {
      const selector = selectors[index];
      if (!selector[0].startsWith("aria/")) {
        wptScript +=
          'execAndWait document.querySelector("' + selector + '").click();\n';
        break;
      }
    }
  }
  function addChange(selectors, value) {
    if (isKeyDown) {
      wptScript += "setEventName KeyDown\n";

      for (let index = 0; index < selectors.length; index++) {
        const selector = selectors[index];
        if (!selector[0].startsWith("aria/")) {
          wptScript +=
            'execAndWait document.querySelector("' + selector + '").click();\n';
          break;
        }
      }
    } else {
      wptScript += "setEventName Change\n";
      //for now, let's skip any aria/ until we figure somethign out there
      for (let index = 0; index < selectors.length; index++) {
        const selector = selectors[index];
        if (!selector[0].startsWith("aria/")) {
          wptScript +=
            'execAndWait document.querySelector("' +
            selector +
            '").value = "' +
            value +
            '";\n';
          break;
        }
      }
    }
  }
  function addKeyDown(assertedEvents) {
    //Because some keydown events are returning url's as assertedEvents
    if (assertedEvents) {
      assertedEvents.forEach((item) => {
        wptScript += "setEventName KeyDown\n";
        wptScript += "navigate " + item.url + "\n";
      });
    } else {
      //just to fake out to change the state so that change function can behave as expected
      isKeyDown = true;
    }
  }
  function addKeyUp() {
    isKeyDown = false;
  }
  function addScriptLine(step) {
    switch (step.type) {
      case "setViewport":
        addViewport(step);
        break;
      case "navigate":
        addNavigate(step.url);
        break;
      case "click":
        addClick(step.selectors);
        break;
      case "change":
        addChange(step.selectors, step.value);
        break;
      case "keyDown":
        addKeyDown(step.assertedEvents && step.assertedEvents);
        break;
      case "keyUp":
        addKeyUp();
        break;
    }
  }

  flow.steps.forEach((step) => {
    addScriptLine(step);
  });

  return wptScript;
};

if (typeof process !== "undefined") {
  let wptScript = convert(flow);
  console.log(wptScript);
}
