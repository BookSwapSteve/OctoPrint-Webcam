# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class WebcamPlugin(octoprint.plugin.StartupPlugin):
    def on_after_startup(self):
        self._logger.info("*** Webcam plugin on after startup ******")

__plugin_name__ = "Webcam"
__plugin_implementation__ = WebcamPlugin()