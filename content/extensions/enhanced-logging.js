// ===================================================================
// Copyright 2010 Theodore R Campbell Jr.
//
// Author: Theodore R Campbell Jr. <trcjr@stupidfoot.com>
// WWW: http://stupidfoot.com/
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
// ===================================================================

// HISTORY
// ------------------------------------------------------------------
// 2010-06-24: Initial release
// 2010-06-20: Something else
//              More details go on a new line and no line should be more than
//              80 characters long.

// ------------------------------------------------------------------
// isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------

var useEnhancedLogging = true;

Selenium.prototype.getLoggingStyle= function(locator, text) {
    /**
     * Get the 
     */
    return useEnhancedLogging;
};

Selenium.prototype.getTextLength = function(locator, text) {
    return this.getText(locator).length.toString();
};

try {
    TestLoop.prototype._executeCurrentCommand =  function() {
            /**
             * Execute the current command.
             *
             * @return a function which will be used to determine when
             * execution can continue, or null if we can continue immediately
             */
            var command = this.currentCommand;

            LOG.info("Executing: |" + command.command + " | " + command.target + " | " + command.value + " |");

            var handler = this.commandFactory.getCommandHandler(command.command);
            if (handler == null) {
                throw new SeleniumError("Unknown command: '" + command.command + "'");
            }

            var original_target = command.target;
            var original_value = command.value;
            command.target = selenium.preprocessParameter(command.target);
            command.value = selenium.preprocessParameter(command.value);
            if ((useEnhancedLogging == true) && (command.target != original_target || command.value != original_value)) {
                LOG.info("Evaluated: |" + command.command + " | " + command.target + " | " + command.value + " |");
            }
            LOG.debug("Command found, going to execute " + command.command);
            LOG.debug("Evaluated Command: |" + command.command + " | " + command.target + " | " + command.value + " |");
            this.result = handler.execute(selenium, command);
            this.waitForCondition = this.result.terminationCondition;
    };
} catch(e) {
    LOG.error(e);
}

/*
 * Make this all work in RC automagicly.
 */
try {
    var useEnhancedLogging = true;
    HtmlRunnerTestLoop.prototype.doGetLoggingStyle = TestLoop.prototype.doGetLoggingStyle;
    HtmlRunnerTestLoop.prototype._executeCurrentCommand = TestLoop.prototype._executeCurrentCommand;
} catch (e) {
    /*
     * Not running in Selenium Remote Control. No need to do anything, Just
     * don't want keeping Selenium IDE from complaining.
     */
}
