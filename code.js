//This site helps to give drivers in the railway network simulation game, Stepford County Railway, 
//an intuitive and useful way to randomize what operators, trains, and routes they will drive by
//filtering and randomizing the available options for drivers in the game.

//Each randomization feature filters down all of the operator, train, and route data to provide
//the correct selection of operator, train, and route. The filters ensure that these combination
//of options given by the randomizers are selectable in the actual game.

//Links to the 'SCR Hub Site', which provides more information and statistics about the SCR network
//and its current services and activity across its servers, are provided for convenience.

//The References page details all of the online resources used in creating this program.



//Initialization
//Prepare site for the user,  declare all global variables, get data from lists for site functions.

//List of selectable buttons for randomization enable and disable automatically if another is randomizing.

//The trainIndex preserves the corresponding index of the train that has been selected in order for the
//route filter to function correctly.

setText("loading", "Loading... Please wait a moment.");
playSound("assets/category_points/retro_game_count_points_4.mp3", true);
setProperty("loadingIcon", "image", "assets/loading-7528_512.gif");

//Pixabay - Loading GIF - GIF by fe_da_silva from Pixabay
//Free for personal use under Pixabay Content Policy.
//https://pixabay.com/gifs/loading-animation-spin-highlights-7528/

var preferenceToggler = false;
var operatorList = getColumn("SCR Operators list", "Operator");
var icons = getColumn("SCR Operators list", "Icon");
var trains = getColumn("SCR Trains list", "Train name");
var trainOperatorList = getColumn("SCR Trains list", "Operator");
var trainNoteList = getColumn("SCR Trains list", "Notes");
var routes = getColumn("SCR Routes list", "Route number");
var routeOrigin = getColumn("SCR Routes list", "Origin");
var routeTermini = getColumn("SCR Routes list", "Destination");
var routeThrough = getColumn("SCR Routes list", "Via/Through");
var driveableList = getColumn("SCR Trains list", "Incl/Excl routes");
var selectable = [true, true, true];
var trainIndex;
var prevIndexO = -1;
var prevIndexT = -1;
var prevIndexR = -1;

setTimeout(function() {
  stopSound("sound://category_points/retro_game_count_points_4.mp3");
  hideElement("loadingIcon");
  setText("loading", "Page loaded successfully.");
  playSound("sound://category_collect/retro_game_health_pickup_2.mp3", false);
}, 1000);


//Site actions
//Each onEvent triggers the screen to change based on the button that was pressed.

onEvent("toMainSite", "click", function( ) {
  setScreen("screen1");
  playSound("assets/category_collect/retro_game_health_pickup_1.mp3", false);
});
onEvent("hubSiteButton", "click", function( ) {
  open("https://stepfordcountyrailway.co.uk");
  playSound("assets/category_bell/quiet_belloctave_notification.mp3", false);
});
onEvent("referencesButton", "click", function( ) {
  setScreen("referenceScreen");
  playSound("assets/category_app/app_button_3.mp3", false);
});
onEvent("referencesBack", "click", function( ) {
  setScreen("screen1");
  playSound("assets/category_app/app_button_3.mp3", false);
});


//Operator Selection
//Will let user either select operator of choice using a dropdown,
//or randomize the operator using the randomize button.

//Selecting the dropdown automatically disables opearator randomization,
//until the 'Clear' button is pressed under 'Operator'
//or the dropdown is changed to 'No Preference'.

//Additionally, if any data has been pre-filled in the 'Train / Class' or 'Routes' section,
//they should BOTH be cleared, because the information under Trains and Routes must be
//updated as they must correspond with the operators that operate these trains and routes.

onEvent("operatorDropdown", "change", function() {
  var getDropdown = getText("operatorDropdown");
  setText("dropdownCover", getDropdown);
  if (getText("train") != "" || getText("route") != "") {
    reset("clearT");
    reset("clearR");
  }
  playSound("assets/category_app/modern_ui_sound.mp3", false);
  if (getDropdown == "No Preference") {
    preferenceToggler = false;
    selectable[0] = true;
    setProperty("randomizeO", "background-color", "#2F8CF9");
    setProperty("operator", "background-color", "#ffffff");
    showElement("operatorInfo");
  } else {
    preferenceToggler = true;
    setText("operator", "");
    setProperty("randomizeO", "background-color", "#9c9c9c");
    setProperty("operator", "background-color", "#9c9c9c");
    hideElement("operatorInfo");
  }
  if (getDropdown == "Stepford Connect") {
    setProperty("operatorImage", "image", "assets/764470197138227240.png");
  } else if ((getDropdown == "Waterline")) {
    setProperty("operatorImage", "image", "assets/764470196936245248.png");
  } else if ((getDropdown == "Airlink")) {
    setProperty("operatorImage", "image", "assets/764470196688781312.png");
  } else if ((getDropdown == "Stepford Express")) {
    setProperty("operatorImage", "image", "assets/772448846981627904.png");
  } else if (getDropdown == "Metro") {
    setProperty("operatorImage", "image", "assets/1323990187692527708.png");
  } else {
    setProperty("operatorImage", "image", "");
  }
});


//Operator Randomiser
//Randomly selects operator, with animation.

//Time loops for all randomisers allow for the randomization animation to play.

//This will not run, even if the button is pressed, if the dropdown input
//has been changed to filter for a specific operator.

onEvent("randomizeO", "click", function( ) {
  if (selectable[0] == true && preferenceToggler == false) {
    setProperty("operatorDropdown", "hidden", true);
    if (getText("train") != "" || getText("route") != "") {
      reset("clearT");
      reset("clearR");
    }
    var animationInterval = 100;
    selectable[1] = false;
    selectable[2] = false;
    setProperty("randomizeT", "background-color", "#9c9c9c");
    setProperty("randomizeR", "background-color", "#9c9c9c");
    hideElement("operatorInfo");
    timedLoop(80, function() {
      var index = randomNumber(0, operatorList.length-1);
      while ((prevIndexO == index)) {
        index = randomNumber(0, operatorList.length-1);
      }
      prevIndexO = index;
      setProperty("operator", "text", operatorList[index]);
      setProperty("operatorImage", "image", icons[index]);
      animationInterval = animationInterval + 100;
      playSound("assets/category_app/perfect_organic_button.mp3", false);
      playSound("assets/category_app/perfect_app_button_4.mp3", false);
      if (animationInterval >= randomNumber(800, 2000)) {
        stopTimedLoop();
        animationInterval = 100;
        selectable[1] = true;
        selectable[2] = true;
        setProperty("randomizeT", "background-color", "#2F8CF9");
        setProperty("randomizeR", "background-color", "#2F8CF9");
        setProperty("operatorDropdown", "hidden", false);
      }
    });
  } else {
    playSound("assets/category_collect/puzzle_game_item_select_04.mp3", false);
  }
});


//Train Randomiser
//Will either randomly select a train (if) or (else) filter possible trains to generate,
//based on pre-existing operator selections.

//Clears ONLY the route field to allow for new filters based on the train that is selected.
//Toggles selectability as the randomization animation runs.

onEvent("randomizeT", "click", function( ) {
  setProperty("operatorDropdown", "hidden", true);
  setProperty("route", "text", "");
  setProperty("Route_info", "text", "");
  if (selectable[1] == true) {
    selectable[0] = false;
    selectable[2] = false;
    var getOperator = getText("operator");
    var getDropdown = getText("operatorDropdown");
    var animationInterval = 100;
    setProperty("randomizeO", "background-color", "#9c9c9c");
    setProperty("randomizeR", "background-color", "#9c9c9c");
    if (getDropdown == "No Preference" && getOperator == "") {
      var index;
      timedLoop(80, function() {
        index = randomNumber(0, trains.length-1);
        while ((prevIndexT == index)) {
          index = randomNumber(0, trains.length-1);
        }
        prevIndexT = index;
        setProperty("train", "text", trains[index]);
        setProperty("train_Info", "text", trainNoteList[index]);
        animationInterval = animationInterval + 100;
        playSound("assets/category_app/perfect_organic_button.mp3", false);
        playSound("assets/category_app/perfect_app_button_1.mp3", false);
        if (animationInterval >= randomNumber(800, 2000)) {
          stopTimedLoop();
          animationInterval = 100;
          if (getText("operatorDropdown") == "No Preference" && preferenceToggler == false) {
            selectable[0] = true;
            setProperty("randomizeO", "background-color", "#2F8CF9");
          }
          selectable[2] = true;
          setProperty("randomizeR", "background-color", "#2F8CF9");
          setProperty("operatorDropdown", "hidden", false);
        }
        for (var i = 0; i < trains.length; i++) {
          if (trains[index] == trains[i] && trainNoteList[index] == trainNoteList[i]) {
            trainIndex = i;
            break;
          }
        }
      });
    } else {
      var filteredOpList = [];
      var filteredNoteList = [];
      for (var i = 0; i < trains.length; i++) {
        if (trainOperatorList[i] == getDropdown || trainOperatorList[i] == getOperator) {
          appendItem(filteredOpList, trains[i]);
          appendItem(filteredNoteList, trainNoteList[i]);
        }
      }
      timedLoop(80, function() {
        var index;
        index = randomNumber(0, filteredOpList.length-1);
        setProperty("train", "text", filteredOpList[index]);
        setProperty("train_Info", "text", filteredNoteList[index]);
        animationInterval = animationInterval + 100;
        playSound("assets/category_app/perfect_organic_button.mp3", false);
        playSound("assets/category_app/perfect_app_button_1.mp3", false);
        if (animationInterval >= randomNumber(800, 2000)) {
          stopTimedLoop();
          animationInterval = 100;
          if (getText("operatorDropdown") == "No Preference" && preferenceToggler == false) {
            selectable[0] = true;
            setProperty("randomizeO", "background-color", "#2F8CF9");
          }
          selectable[2] = true;
          setProperty("randomizeR", "background-color", "#2F8CF9");
          setProperty("operatorDropdown", "hidden", false);
        }
        for (var j = 0; j < trains.length; j++) {
          if (filteredOpList[index] == trains[j] && filteredNoteList[index] == trainNoteList[j]) {
            trainIndex = j;
            break;
          }
        }
      });
    }
  } else {
    playSound("assets/category_collect/puzzle_game_item_select_04.mp3", false);
  }
});

//Route Randomiser
//Will either:
//1) Generate a random route from all four operators
//2) Generate random route for selected operator only
//3) Generate random route for selected train only (operator-specific).
//Certain trains can only complete certain routes.
//Each in/ex notation in the 'Incl/Excl' column for the SCR trains list translates to:

//in1: CN 68 - Access to exclusive routes R026 and R036, HOWEVER:
//they CANNOT drive routes R001,05,46 + all metro transfer routes (***see ex5)

//in2: EX Class 220S, 221S, 800/2S - Access to route R086 (CURRENTLY UNUSED)
//in3: AL Class 345 only - This train can only drive route R060

//in4: SM DMUs (e.g. 756) - Access R137 (& exclude CN routes)

//in5: CN 156 * - Access R102, only 37,38,39,40,41,42,43,44,49,50,100,101

//in6: CN 444 * - Access R026,36, exclude metro routes + DMU routes + 1,5,46

//ex1: EX Class 43 (HST) ALL CONSISTS, 220D (8C), 800/1 (9C), 180S (ALL VARIANTS): exclude R086.
//ex2: WL DMUs that are not two coaches long cannot drive the Morganstown Shuttle (R015)

//ex3: ALL This train cannot drive this route as it is not a DMU (cannot drive 12, 15, 18, 20, 22, 49,
// 50, 83, 84, 85, 86, 87, 100, 101, 102, 103, 120, 137)

//ex4: EX 221D, 800/2D (10C), 180D (ALL VARIANTS): exclude R085 (length).

//ex5: CN+SM ALL CN TRAINS: due to metro route transfer: exclude 2,6,8,21,23,27,28,29,30,31,34,47 (& 130+)

//ex6: CN EMUs: combined ex3 and ex5

//ex7: opposite ex5

onEvent("randomizeR", "click", function( ) {
  if (selectable[2] == true) {
    setProperty("operatorDropdown", "hidden", true);
    selectable[0] = false;
    selectable[1] = false;
    var getOperator = getText("operator");
    var getDropdown = getText("operatorDropdown");
    var getTrain = getText("train");
    var animationInterval = 100;
    setProperty("randomizeO", "background-color", "#9c9c9c");
    setProperty("randomizeT", "background-color", "#9c9c9c");
    if (preferenceToggler == false && getOperator == "" && getTrain == "") {
      timedLoop(80, function() {
        var index = randomNumber(0, routes.length-1);
        while ((prevIndexR == index)) {
          index = randomNumber(0, routes.length-1);
        }
        prevIndexR = index;
        if (routes[index].length== 1) {
          setProperty("route", "text", "R00" + routes[index]);
        } else if (routes[index].length== 2) {
          setProperty("route", "text", "R0" + routes[index]);
        } else {
          setProperty("route", "text", "R" + routes[index]);
        }
        setProperty("Route_info", "text", addInfo(routeOrigin[index], routeTermini[index], routeThrough[index]));
        animationInterval = animationInterval + 100;
        playSound("assets/category_app/app_menu_button_5.mp3", false);
        playSound("assets/category_app/app_button_5.mp3", false);
        if (animationInterval >= randomNumber(800, 2000)) {
          stopTimedLoop();
          animationInterval = 100;
          if (getText("operatorDropdown") == "No Preference" && preferenceToggler == false) {
            selectable[0] = true;
            setProperty("randomizeO", "background-color", "#2F8CF9");
          }
          selectable[1] = true;
          setProperty("randomizeT", "background-color", "#2F8CF9");
          setProperty("operatorDropdown", "hidden", false);
        }
      });
    } else if (getTrain === "") {
      timedLoop(80, function() {
        var index;
        if (preferenceToggler == true) {
          index = selectRoute(getDropdown);
        } else {
          index = selectRoute(getOperator);
        }
        //setProperty("route", "text", "R0" + routes[index]);
        if (routes[index].length== 1) {
          setProperty("route", "text", "R00" + routes[index]);
        } else if (routes[index].length== 2) {
          setProperty("route", "text", "R0" + routes[index]);
        } else {
          setProperty("route", "text", "R" + routes[index]);
        }
        setProperty("Route_info", "text", addInfo(routeOrigin[index], routeTermini[index], routeThrough[index]));
        animationInterval = animationInterval + 100;
        playSound("assets/category_app/app_menu_button_5.mp3", false);
        playSound("assets/category_app/app_button_5.mp3", false);
        if (animationInterval >= randomNumber(800, 2000)) {
          stopTimedLoop();
          animationInterval = 100;
          if (getText("operatorDropdown") == "No Preference" && preferenceToggler == false) {
            selectable[0] = true;
            setProperty("randomizeO", "background-color", "#2F8CF9");
          }
          selectable[1] = true;
          setProperty("randomizeT", "background-color", "#2F8CF9");
          setProperty("operatorDropdown", "hidden", false);
        }
      });
    } else {
      var index;
      timedLoop(80, function() {
        index = filterRoutes(trainIndex);
        //setProperty("route", "text", "R0" + routes[index]);
        if (routes[index].length== 1) {
          setProperty("route", "text", "R00" + routes[index]);
        } else if (routes[index].length== 2) {
          setProperty("route", "text", "R0" + routes[index]);
        } else {
          setProperty("route", "text", "R" + routes[index]);
        }
        setProperty("Route_info", "text", addInfo(routeOrigin[index], routeTermini[index], routeThrough[index]));
        animationInterval = animationInterval + 100;
        if (index != 56) {
          playSound("assets/category_app/app_menu_button_5.mp3", false);
          playSound("assets/category_app/app_button_5.mp3", false);
        }
        if (animationInterval >= randomNumber(800, 2000)) {
          stopTimedLoop();
          animationInterval = 100;
          if (getText("operatorDropdown") == "No Preference" && preferenceToggler == false) {
            selectable[0] = true;
            setProperty("randomizeO", "background-color", "#2F8CF9");
          }
          selectable[1] = true;
          setProperty("randomizeT", "background-color", "#2F8CF9");
          setProperty("operatorDropdown", "hidden", false);
        }
      });
    }
  } else {
    playSound("assets/category_collect/puzzle_game_item_select_04.mp3", false);
  }
});


//Reset buttons
//When clicked the fields for the respective button (or all) will be cleared.

onEvent("clearO", "click", function( ) {
  reset("clearO");
});
onEvent("clearT", "click", function( ) {
  reset("clearT");
});
onEvent("clearR", "click", function( ) {
  reset("clearR");
});
onEvent("resetall", "click", function( ) {
  reset("all");
});


//addInfo function
//This function will automatically take the data from the route Origin and Terminus fields in the
//SCR Routes data table, and promptly display the route information on the routeInfo text box that
//is concise and easy to understand.

function addInfo(start, end, via) {
  var info;
  var flip = randomNumber(1, 2);
  if (via == "") {
    if (end == "") {
      info = start;
      return info;
    }
    if (flip == 1) {
      info = (start + " to ") + end;
    } else {
      info = (end + " to ") + start;
    }
    return info;
  } else {
    if (flip == 1) {
      info = ((start + " to ") + end) + " via " + via;
    } else {
      info = ((end + " to ") + start) + " via " + via;
    }
    return info;
  }
}

//selectRoute function
//This function will select a route when only the operator is specified by the user.
//Since the exact route can only be determined by the chosen operator, the operator from the output text
//is used as the parameter.

//A switch case is used to distinguish the possible outcomes for each operator, with the default case
//representing the 'Stepford Express' operator.

function selectRoute(operator) {
  var lowIndex;
  var highIndex;
  var finalIndex;
  switch (operator) {
  case "Stepford Connect":
    lowIndex = 0;
    highIndex = 46;
    finalIndex = randomNumber(lowIndex, highIndex);
    while ((finalIndex >= 9 && finalIndex <= 17)) {
      finalIndex = randomNumber(lowIndex, highIndex);
    }
    return finalIndex;
  case "Waterline":
    lowIndex = 9;
    highIndex = 17;
    finalIndex = randomNumber(lowIndex, highIndex);
    return finalIndex;
  case "Airlink":
    lowIndex = 47;
    highIndex = 56;
    finalIndex = randomNumber(lowIndex, highIndex);
    return finalIndex;
  default:
    lowIndex = 57;
    highIndex = 68;
    finalIndex = randomNumber(lowIndex, highIndex);
    return finalIndex;
  
}
  
  
//filterRoutes function
//This function specifies what routes can be generated based on the specific train in the randomiser.
//

}
function filterRoutes(index) {
  var lowIndex;
  var highIndex;
  var finalIndex;
  var includeExclude = driveableList[index];
  var operator = trainOperatorList[index];
  switch (operator) {
    case "Stepford Connect":
      lowIndex = 0;
      highIndex = 46;
      finalIndex = randomNumber(lowIndex, highIndex);
      while ((finalIndex >= 9 && finalIndex <= 18)) {
        finalIndex = randomNumber(lowIndex, highIndex);
      }
      if (includeExclude == "") {
        while ((finalIndex == 24 || finalIndex == 34)) {
          finalIndex = randomNumber(lowIndex, highIndex);
        }
      }
      if (includeExclude == "in1") {
        while (finalIndex == 0 || finalIndex == 1 || finalIndex == 4 || finalIndex == 7 || (finalIndex >= 9 && finalIndex <= 18) || finalIndex == 18 || finalIndex == 19 || finalIndex == 21 || finalIndex == 25 || finalIndex == 44) {
          finalIndex = randomNumber(lowIndex, highIndex);
        }
      }
      return finalIndex;
    case "Waterline":
      lowIndex = 9;
      highIndex = 17;
      finalIndex = randomNumber(lowIndex, highIndex);
      if (includeExclude != "") {
        while ((finalIndex == 14)) {
          finalIndex = randomNumber(lowIndex, highIndex);
        }
      }
      return finalIndex;
    case "Airlink":
      lowIndex = 47;
      highIndex = 56;
      finalIndex = randomNumber(lowIndex, highIndex);
      if (includeExclude == "") {
        while ((finalIndex == 56)) {
          finalIndex = randomNumber(lowIndex, highIndex);
        }
      } else {
        return 56;
      }
      return finalIndex;
    default:
      lowIndex = 57;
      highIndex = 68;
      finalIndex = randomNumber(lowIndex, highIndex);
      if (includeExclude == "") {
        while ((finalIndex == 68)) {
          finalIndex = randomNumber(lowIndex, highIndex);
        }
      }
      if (includeExclude == "ex1") {
        while (finalIndex == 57 || finalIndex == 59 || finalIndex == 61 || finalIndex == 62 || finalIndex == 64 || finalIndex == 68) {
          finalIndex = randomNumber(lowIndex, highIndex);
        }
      }
      return finalIndex;
  }
}

function reset(id) {
if (id == "clearO") {
  preferenceToggler = false;
  playSound("assets/category_app/perfect_clean_app_button_click_2.mp3", false);
  setProperty("operator", "text", "");
  setProperty("operatorDropdown", "index", 0);
  setText("dropdownCover", "No Preference");
  setProperty("operatorImage", "image", "");
  setProperty("randomizeO", "background-color", "#2F8CF9");
  setProperty("operator", "background-color", "#ffffff");
  showElement("operatorInfo");
  selectable[0] = true;
} else if (id == "clearT") {
  playSound("assets/category_app/perfect_clean_app_button_click_2.mp3", false);
  setProperty("train", "text", "");
  setProperty("train_Info", "text", "");
  selectable[1] = true;
} else if (id == "clearR") {
  playSound("assets/category_app/perfect_clean_app_button_click_2.mp3", false);
  setProperty("route", "text", "");
  setProperty("Route_info", "text", "");
  selectable[2] = true;
} else if (id == "all") {
    preferenceToggler = false;
    playSound("assets/category_app/perfect_clean_app_button_click_2.mp3", false);
    playSound("assets/category_app/perfect_organic_button.mp3", false);
    setProperty("operator", "text", "");
    setProperty("operatorDropdown", "index", 0);
    setText("dropdownCover", "No Preference");
    setProperty("operatorImage", "image", "");
    setProperty("randomizeO", "background-color", "#2F8CF9");
    setProperty("operator", "background-color", "#ffffff");
    showElement("operatorInfo");
    selectable[0] = true;
    setProperty("train", "text", "");
    setProperty("train_Info", "text", "");
    selectable[1] = true;
    setProperty("route", "text", "");
    setProperty("Route_info", "text", "");
    selectable[2] = true;
  }
}




