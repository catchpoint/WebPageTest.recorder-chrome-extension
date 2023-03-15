import { WPTStringifyChromeRecording } from "webpagetest-chrome-recorder";

let view;
let latestRecording;

/* eslint-disable no-undef */
if (chrome.devtools) {
  (async () => {
    view = await chrome.devtools.recorder.createView(
      /* name= */ "WebPageTest",
      /* pagePath= */ "Replay.html"
    );

    view.onShown.addListener(() => {
      // Recorder has shown the view. Send additional data to the view if needed.
      chrome.runtime.sendMessage(latestRecording);
    });

    view.onHidden.addListener(() => {
      // Recorder has hidden the view.
    });
  })();
}
export class RecorderPlugin {
  async stringify(recording) {
    return await WPTStringifyChromeRecording(recording);
  }
  async stringifyStep(step) {
    return await WPTStringifyChromeRecording(step);
  }

  replay(recording) {
    (async () => {
      latestRecording = await WPTStringifyChromeRecording(recording);
    })();
    view.show();
  }
}

/* eslint-disable no-undef */
if (chrome.devtools) {
  chrome.devtools.recorder.registerRecorderExtensionPlugin(
    new RecorderPlugin(),
    /* name=*/ "WebPageTest",
    /* mediaType=*/ "text/plain"
  );
}
