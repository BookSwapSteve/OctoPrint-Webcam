/*
 * View model for OctoPrint-Webcam
 *
 * Author: Stephen Harrison
 * License: AGPLv3
 */
$(function() {
    function WebcamViewModel(parameters) {
        var self = this;

		self.settings = parameters[0];

        // TODO remove with release of 1.3.0 and switch to OctoPrint.coreui usage
        self.tabTracking = parameters[1];

        // this will hold the URL currently displayed by the iframe
		// this is part of self.settings...
        self.streamUrl = ko.observable();

		// this is part of self.settings...
		self.caption = ko.observable();

        // This will get called before the HelloWorldViewModel gets bound to the DOM, but after its
        // dependencies have already been initialized. It is especially guaranteed that this method
        // gets called _after_ the settings have been retrieved from the OctoPrint backend and thus
        // the SettingsViewModel been properly populated.
        self.onBeforeBinding = function() {
            //self.newUrl(self.settings.settings.plugins.helloworld.url());
            //self.goToUrl();
        }

        // TODO: Implement your plugin's view model here.
		self._disableWebcam = function() {
            // only disable webcam stream if tab is out of focus for more than 5s, otherwise we might cause
            // more load by the constant connection creation than by the actual webcam stream
            self.webcamDisableTimeout = setTimeout(function () {
                $("#webcam_image_main").attr("src", "");
            }, 5000);
        };

        self._enableWebcam = function() {
            if (self.tabTracking.selectedTab != "#tab_plugin_webcam" || !self.tabTracking.browserTabVisible) {
                return;
            }

            if (self.webcamDisableTimeout != undefined) {
                clearTimeout(self.webcamDisableTimeout);
            }

			self._configureMainWebcam();	
			self._configureRearWebcam();
        };

		self._configureMainWebcam = function() {
			var webcamImage = $("#webcam_image_main");
            var mainSrc = webcamImage.attr("src");
            if (mainSrc === undefined || mainSrc.trim() == "") {
                var newSrc = self.settings.settings.plugins.webcam.mainStreamUrl
                if (newSrc.lastIndexOf("?") > -1) {
                    newSrc += "&";
                } else {
                    newSrc += "?";
                }
                newSrc += new Date().getTime();

                self.updateRotatorWidth();
                webcamImage.attr("src", newSrc);
            }
		};

		self._configureRearWebcam= function() {
			var webcamImageRear = $("#webcam_image_rear");
            var rearSrc = webcamImage.attr("src");
            if (rearSrc=== undefined || rearSrc.trim() == "") {
				// TODO: Rear src
                var newSrc = self.settings.settings.plugins.webcam.rearStreamUrl
                if (newSrc.lastIndexOf("?") > -1) {
                    newSrc += "&";
                } else {
                    newSrc += "?";
                }
                newSrc += new Date().getTime();

                self.updateRotatorWidth();
                webcamImage.attr("src", newSrc);
            }
		};

        self.onTabChange = function (current, previous) {
            if (current == "#tab_plugin_webcam") {
                self._enableWebcam();
            } else if (previous == "#tab_plugin_webcam") {
                self._disableWebcam();
            }
        };

        self.onBrowserTabVisibilityChange = function(status) {
            if (status) {
                self._enableWebcam();
            } else {
                self._disableWebcam();
            }
        };
    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        WebcamViewModel,
        ["settingsViewModel", "tabTracking"],
        "#tab_plugin_webcam"
    ]);
});
