/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/* Kurt Stubbings - GRG linkid Remover */
/* Remove linkid's from emails taken out of EMP */
/* Written by Kurt Stubbings 2016 */

define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        Menus = brackets.getModule("command/Menus");


    // Function to run when the menu item is clicked
    function removeLinkids() {

        var mainWindow = EditorManager.getActiveEditor(),
            activeText = mainWindow.document;

        if (activeText) {

            var htmlContent = activeText.getText();

            // store current cursor and scroll positions
            var cursorPos = mainWindow.getCursorPos(),
                scrollPos = mainWindow.getScrollPos();

           // Find and remove whole linkid="" attribute 
            htmlContent = htmlContent.replace(/(linkid=)"([^"]*)"/g, "");

            activeText.setText(htmlContent);

            // restore cursor and scroll positions
            mainWindow.setCursorPos(cursorPos);
            mainWindow.setScrollPos(scrollPos.x, scrollPos.y);

            return true;
        }

        return false;
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "grg.remove.linkids"; // package-style naming to avoid collisions
    CommandManager.register("Remove LINKIDs", MY_COMMAND_ID, removeLinkids);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    //menu.addMenuItem(MY_COMMAND_ID);

    // We could also add a key binding at the same time:
    menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-8");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)

    exports.removeLinkids = removeLinkids;
});