<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>


# WEBPAGETEST RECORDER EXTENSION

An extension for Chrome Recorder to export a recorder session as a WebPageTest Custom Script.

Download your WPT RECORDER EXTENSION using [this](https://www.amazon.com) link.

## Generate your script using extension

<h3>#Open the Recorder panel</h3>

- Open DevTools.
- Click on More options --> More tools > Recorder.

![Open Recorder](/assets/images/open_dev-1.png)

<h3>#Start a new recording</h3>

- Enter recording name.
- Click on start recording button.
- Start surfing on the internet to register your events.
- End recording.

![Start new recording](/assets/images/newrec.png)

Refer to this link: https://developer.chrome.com/docs/devtools/recorder/ to learn more about Chrome Recorder

<h3>#Export your script</h3>

After you are done with the recording

- Click on export icon and select "Export as a Webpagetest custom script"

![Export Script](/assets/images/export.png)

<h3>#Run Webpagetest test using script</h3>

- Open https://www.webpagetest.org
- Scroll down to custom script section

![Run Script](/assets/images/script.png)

- Hit Start Test Button

Now you have successfully generated a Webpagetest Custom Script using WEBPAGETEST RECORDER EXTENSION and Run a Webpagetest Test. Play around with the extension and have fun.

## Currently Supported Recorder Commands

- `navigate` (maps to `navigate`)
- `click` (maps to `execAndWait`)
- `change` (maps to `execAndWait`)
- `keydown` (maps to `execAndWait`)
- `keyup` (maps to `execAndWait`)

## Resources
- [Sample exported script](/REI%20Product%20Flow)
- [Main Recorder-to-WPT repo](https://github.com/WebPageTest/Recorder-To-WPT-Script)
- [Recorder docs](https://developer.chrome.com/docs/devtools/recorder/)



