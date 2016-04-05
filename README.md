# OctoPrint-Webcam

An OctoPrint plugin to view a second webcam connected to a Pi via OctoPrint. e.g. a webcam at the back to watch the filament (get tangled, run out and all the other horrible things filament does when you're not watching).

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/BookSwapSteve/OctoPrint-Webcam/archive/master.zip

**TODO:** Describe how to install your plugin, if more needs to be done than just installing it via pip or through
the plugin manager.

Assumes:
Raspi camera for main camera.
USB attached camera for rear /filament/other. This is the one we are interested in.

Set-up your pi as described here: http://www.thedoble.com/3d-printing/running-two-webcams-with-octoprint-for-hd-timelapses/

except use Video0 for the device (unless you are using 2 USB camera, in which case, goodluck!)

Edit /boot/octopi.txt

// Force USB otherwise it doesn't start for second camera.
camera="raspi" 

## Configuration

**TODO:** Describe your plugin's configuration options (if any).
