//Code from The Selenium-IDE 1.x plugin API (Part 4) – Extending the Selenium API
//http://adam.goucher.ca/?p=1348
function initSideFileLoggerObserver() {
    sideFileLoggerObserver.register();
}
 
var sideFileLoggerObserver = {
    _uninstall : false,
    observe : function(subject, topic, data) {
        if (topic == "em-action-requested") {
            subject.QueryInterface(Components.interfaces.nsIUpdateItem);
            if (subject.id == "selenium-ide__enhanced-logging@theodore.campbell") {
                if (data == "item-uninstalled") {
                    this._uninstall = true;
                } else if (data == "item-disabled") {
                    this._uninstall = true;
                } else if (data == "item-cancel-action") {
                    this._uninstall = false;
                }
            }
        } else if (topic == "quit-application-granted") {
            if (this._uninstall) {
            	// your uninstall stuff goes here
            	// this section removes the extension we added
                var branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.selenium-ide.");
                var plugin_pref = branch.getCharPref("ideExtensionsPaths");
                if (typeof plugin_pref != "undefined") {
			if (plugin_pref.search("chrome://enhancedlogging/content/extensions/enhanced-logging.js") != -1) {
				var split_pref = plugin_pref.split(",");
				for (var pi = 0; pi < split_pref.length; pi++) {
					if (split_pref[pi].search("chrome://enhancedlogging/content/extensions/enhanced-logging.js") != -1) {
						split_pref.splice(pi, 1);
						branch.setCharPref("ideExtensionsPaths", split_pref.join(", "));
						break;
					}
				}
			}
                }
            }
            this.unregister();
        }
    },
    register : function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"].     getService(Components.interfaces.nsIObserverService);
        observerService.addObserver(this, "em-action-requested", false);
        observerService.addObserver(this, "quit-application-granted", false);
    },
    unregister : function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"].      getService(Components.interfaces.nsIObserverService);
        observerService.removeObserver(this,"em-action-requested");
        observerService.removeObserver(this, "quit-application-granted");
    }
}
window.addEventListener("load", initSideFileLoggerObserver, false);
