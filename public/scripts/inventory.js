var draggedItem = '';   // global variable for ID of dragged item

// allow drop of items only on according slots to dragged item
function allowDrop(ev) {
    //console.log("dragged id is: " + draggedItem); // debug log
    let idWithoutNumber = ev.target.id.replace(/[0-9]/g, '');
    if (idWithoutNumber == draggedItem + "Slot" || idWithoutNumber == "inventory") {
        ev.preventDefault();
    }
}

// getting ID of dragged item
function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
  let idWithoutNumber = ev.target.id.replace(/[0-9]/g, '');
  draggedItem = idWithoutNumber;
  //console.log("dragged id is set to : " + draggedItem); // debug log
}

// moving dragged item into slot/inventory
function drop(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("id");
  //console.log("is full? " + ev.target.hasChildNodes()); // debug log
  if (ev.target.hasChildNodes() && ev.target.id != "inventory") {
    let oldItem = document.getElementById(ev.target.id).children;
    console.log("normal drop / is full with " + oldItem[0].id); // debug log
    document.getElementById("inventory").appendChild(oldItem[0]);
  }

  ev.target.appendChild(document.getElementById(id));
  //console.log("Moving " + draggedItem + " into " + ev.target.id); // debug log
}

// highlight slot for mouseenter item 
function hoverSlot(ev) {
    let idWithoutNumber = ev.target.id.replace(/[0-9]/g, '');
    let slot = idWithoutNumber + "Slot";
    let slotElement = document.getElementById(slot);

    slotElement.className += " slotHover";
}

// stop highlighting slot on mouseleave item
function offHoverSlot(ev) {
    let idWithoutNumber = ev.target.id.replace(/[0-9]/g, '');
    let slot = idWithoutNumber + "Slot";
    let slotElement = document.getElementById(slot);

    slotElement.className = slotElement.className.replace(" slotHover", "");
}

// switching items between inventory and slots, if there is already item in slot
function switchItem(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("id");
  //console.log("dragged id: " + id); // debug log

  let oldItem = document.getElementById(ev.target.id);
  //console.log("moving " + oldItem.id); // debug log
  document.getElementById("inventory").appendChild(oldItem);

  let idWithoutNumber = ev.target.id.replace(/[0-9]/g, '');
  let slot = idWithoutNumber + "Slot";

  // delay of moving replaced item - had to be done, if there is no delay, cannot move it...
  var delayInMilliseconds = 1;
  setTimeout(function() {
    document.getElementById(slot).appendChild(document.getElementById(id));
  }, delayInMilliseconds);
  
  //console.log("putting " + document.getElementById(id).id + " into " + document.getElementById(slot).id); // debug log
} 

// allow switching item only on item with right type
function allowSwitch(ev) {
  //console.log("dragged id is: " + draggedItem); // debug log
  let idWithoutNumber = ev.target.id.replace(/[0-9]/g, '');
  if (idWithoutNumber == draggedItem) {
      ev.preventDefault();
      //console.log("allow switching");
  }
}