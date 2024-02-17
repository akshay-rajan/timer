# Timer for Chrome

Welcome to Timer for Chrome! This extension displays a timer in your browser, which help keep track of time while you are taking a test, or just surfing the internet.

### Chrome Extensions

Chrome extensions are small software programs that customize the browsing experience.
They enable users to tailor Chrome functionality and behavior to individual needs or preferences. They are built on web technologies such as HTML, CSS and JavaScript. A typical Chrome extension contains

1. A `manifest.json` file, which provides information about the extension to the browser.
2. An optional `content script`, which reads a web page using the standard document-object model, make changes to the page, or pass information to the extension.
3. An optional background script, `background.js`, which run in the background, and is used to maintain the state of the extension.
4. The `popup` files, which are *html, css* and *javascript* files that renders the popup to be displayed.


#### Contents

The program contains a [manifest.json](manifest.json) file, which is an essential file for any chrome extension. 
It is a metadata file which provides important information about the extension to the browser, helping it understand how to display the extension to the user.
It contains details like the extension's name, version, permissions, resources used, and other metadata required for the extension to work properly. Here, we are using the latest version of the manifest, Manifest Version 3.

The next file is [popup.html](popup.html) which contains the web page or popup to be displayed when the extension is enabled. This HTML is linked to [popup.css](popup.css) (which contains the styles used in the extension) and [popup.js](popup.js), which is the most important file in the program. This file contains the program which is enabling the timer. Functions to calculate the time, update the display and enable buttons in the extensions are included in this file.
A folder, [assets](assets) is included, which contains all the static files required. It consists of [timer.png](assets/timer.png), (icon of the extension), [start.png](assets/start.png), [pause.png](assets/pause.png) and [reset.png](assets/reset.png) (icon for buttons).


#### Usage
There is a field "hh: mm: ss" and two buttons next to it. Set the timer by entering the time in the order 'hour : minute : second' in the above field. The first button is the "start timer" button, and the next one, "reset timer". After entering the duration, click "Start timer" and the timer is started. The first button now works as the "pause timer" button. Click it again to stop the timer. The first button now returns to "start timer". Click the first button to continue running the timer, or the second one to reset the timer.

#### Features
* As the timer runs on the web browser, it uses less resource than external applications.
* The timer is simple to use, and much helpful to students who test themselves using online forms.

#### Support and Feedback
If you encounter some issues while using the extension, or have suggestions for improvement, please reach out to us. Here's how you can get in touch:

 **GitHub:** [Creator](https://github.com/gojo-mkv/)