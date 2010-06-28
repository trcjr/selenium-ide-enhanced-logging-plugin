/*
 * Copyright 2009, 2010 Samit Badle, Samit.Badle@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
function chooseLogFile(target) {
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	fp.init(window, "Select log file", nsIFilePicker.modeSave);
	fp.appendFilters(nsIFilePicker.filterAll);
	var res = fp.show();
	if (res == nsIFilePicker.returnOK || res == nsIFilePicker.returnReplace) {
		var e = document.getElementById(target);
		e.value = fp.file.path;
	}
}