# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class WebcamPlugin(octoprint.plugin.StartupPlugin,
                       octoprint.plugin.TemplatePlugin,
                       octoprint.plugin.SettingsPlugin,
                       octoprint.plugin.AssetPlugin):
	def on_after_startup(self):
		self._logger.info("****** Webcam plugin after startup! streamUrl: (more: %s)" % self._settings.get(["streamUrl"]))

	def get_settings_defaults(self):
		return dict(
			url="https://en.wikipedia.org/wiki/Hello_world", #remove
			streamUrl="/webcam/?action=stream",
			caption="Filament Webcam"
			)

	def get_template_configs(self):
		return [
			dict(type="navbar", custom_bindings=False),
			dict(type="settings", custom_bindings=False),
			dict(type="tab", name="Printer Webcam")
			#dict(type="tab", name=self._settings.get(["caption"])
		]

	def get_assets(self):
		return dict(
			js=["js/webcam.js"],
			#css=["css/webcam.css"],
			#less=["less/webcam.less"]
		)

__plugin_name__ = "Webcam"
__plugin_implementation__ = WebcamPlugin()