const Main = imports.ui.main;
let monitorsChangedEvent = null;
const SessionMode = imports.ui.sessionMode;

function hideIndicator() {
    let indicator = Main.panel.statusArea['activities'];
    if(indicator != null) {
        indicator.hide();
    }
}

function init() {
}

function enable() {
    
    // hides activity button
    monitorsChangedEvent = Main.layoutManager.connect('monitors-changed', hideIndicator);
    hideIndicator(); 
   
    // do nothing if the clock isn't centered in this mode
    if ( Main.sessionMode.panel.center.indexOf('dateMenu') == -1 ) {
        return;
    }

    let centerBox = Main.panel._centerBox;
    let leftbox = Main.panel._leftBox;
    let dateMenu = Main.panel.statusArea['dateMenu'];
    let children = centerBox.get_children();

    // only move the clock if it's in the centre box
    if ( children.indexOf(dateMenu.container) != -1 ) {
        centerBox.remove_actor(dateMenu.container);

        children = leftbox.get_children();
        leftbox.insert_child_at_index(dateMenu.container, children.length-1);
   }
}

function disable() {

    // bring back activity button
    Main.layoutManager.disconnect(monitorsChangedEvent);
    let indicator = Main.panel.statusArea['activities'];
    if(indicator != null) {
        indicator.show();
    }
    
    // do nothing if the clock isn't centred in this mode
    if ( Main.sessionMode.panel.center.indexOf('dateMenu') == -1 ) {
        return;
    }

    let centerBox = Main.panel._centerBox;
    let leftbox = Main.panel._leftBox;
    let dateMenu = Main.panel.statusArea['dateMenu'];
    let children = leftbox.get_children();

    // only move the clock back if it's in the right box
    if ( children.indexOf(dateMenu.container) != -1 ) {
        leftbox.remove_actor(dateMenu.container);
        centerBox.add_actor(dateMenu.container);
    }
}


