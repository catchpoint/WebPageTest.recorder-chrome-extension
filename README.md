<p align="center"><img width="80%" alt="WebPageTest Logo" src="assets/images/banner.png"></p>

# WEBPAGETEST RECORDER EXTENSION

### An extension for Chrome Recorder to export a recorder session as a WebPageTest Custom Script.

### Download [WPT RECORDER EXTENSION](https://chrome.google.com/webstore/detail/webpagetest-recorder-exte/eklpnjohdjknellndlnepihjnhpaimok) using `Add to Chrome` button. 

#

![How to use the recorder extension](/assets/video/export-extension.gif)

---

**NOTE**
- This extension is only compatible with Chrome v104 and above.
- Before exporting the script, ensure your recording plays back correctly in Chrome (to obtain the expected result).
  
---
## Generate your script using extension

<h3>1. Open the Recorder panel</h3>

- Open DevTools.
- Click on More options --> More tools > Recorder.

![Open Recorder](/assets/images/open_dev-1.png)

<h3>2. Start a new recording</h3>

- Enter recording name.
- Click on start recording button.
- Start surfing on the internet to register your events.
- End recording.

![Start new recording](/assets/images/newrec.png)

Refer to this link: https://developer.chrome.com/docs/devtools/recorder/ to learn more about Chrome Recorder

<h3>3. Export your script</h3>

After you are done with the recording

- Click on export icon and select "Export as a Webpagetest custom script"

![Export Script](/assets/images/export.png)

<h3>4. Run Webpagetest test using script</h3>

- Open https://www.webpagetest.org
- Scroll down to custom script section and paste your WPT script.

![Run Script](/assets/images/script.png)

- Hit Start Test Button

Now you have successfully generated a Webpagetest Custom Script using WEBPAGETEST RECORDER EXTENSION and Run a Webpagetest Test. Play around with the extension and have fun.

## Testing

1. Clone the repo, run `npm run build`
2. Visit chrome://extensions
3. Enable "Developer mode" via toggle switch in upper right corner
4. Click "Load unpacked" button in upper left corner
5. Select the `build` directory produced by `npm run build`

## Currently Supported Recorder Commands

- `navigate` (maps to `navigate`)
- `setViewport` (maps to `setViewportSize`)
- `click` (maps to `execAndWait`)
- `change` (maps to `execAndWait`)
- `keydown` (maps to `execAndWait`)
- `keyup` (maps to `execAndWait`)
- `waitForElement` (maps to `waitFor`)
- `waitForExpression` (maps to `waitFor`)
- `doubleClick` (maps to `execAndWait`)
- `scroll` (maps to `execAndWait`)

## Resources
- [Sample exported script](/REI%20Product%20Flow)
- [Main Recorder-to-WPT repo](https://github.com/WebPageTest/Recorder-To-WPT-Script)
- [Recorder docs](https://developer.chrome.com/docs/devtools/recorder/)



