import { WPTStringifyChromeRecording } from "webpagetest-chrome-recorder";

export class RecorderPlugin {
  async stringify(recording) {
    return await WPTStringifyChromeRecording(recording);
  }
  async stringifyStep(step) {
    return await WPTStringifyChromeRecording(step);
  }
}

/*------------------------*/

/* eslint-disable no-undef */
if (chrome.devtools) {
  chrome.devtools.recorder.registerRecorderExtensionPlugin(
    new RecorderPlugin(),
    /* name=*/ "WebPageTest custom",
    /* mediaType=*/ "text/plain"
  );
}
