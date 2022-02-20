import AppTheme from "../infrastructure/apptheme/index";

export const PlayStatus = (play_status) => {
  let ps = "",
    color = AppTheme.colors.ui.primary,
    icon = require("../images/animated/default-animated.gif"),
    ms = "";
  switch (play_status) {
    case "NS":
      ps = "Upcoming";
      icon = require("../images/animated/upcoming-animated.gif");
      ms = "upcoming";
      break;
    case "1st Innings":
    case "2nd Innings":
    case "3rd Innings":
    case "4th Innings":
      ps = "Live";
      icon = require("../images/animated/live-animated.gif");
      ms = "live";
      break;
    case "Stump Day 1":
    case "Stump Day 2":
    case "Stump Day 3":
    case "Stump Day 4":
      ps = "Stumps";
      icon = require("../images/animated/stumps-animated.gif");
      ms = "live";
      break;
    case "Finished":
      ps = "Completed";
      icon = require("../images/animated/completed-animated.gif");
      ms = "results";
      break;
    case "Tea Break":
      ps = "Drinks Break";
      icon = require("../images/animated/drinks-animated.gif");
      ms = "live";
      break;
    case "Lunch":
      ps = "Lunch Break";
      icon = require("../images/animated/lunch-animated.gif");
      ms = "live";
      break;
    case "Dinner":
      ps = "Dinner Break";
      icon = require("../images/animated/lunch-animated.gif");
      ms = "live";
      break;
    case "Innings Break":
      ps = "Innings Break";
      icon = require("../images/animated/innings-animated.gif");
      ms = "live";
      break;
    case "Delayed":
      ps = "Start Delay";
      icon = require("../images/animated/start-animated.gif");
      ms = "upcoming";
      break;
    case "Aban.":
      ps = "Abandoned";
      icon = require("../images/animated/canceled-animated.gif");
      ms = "results";
      break;
    case "Cancl.":
      ps = "Cancelled";
      icon = require("../images/animated/canceled-animated.gif");
      ms = "results";
      break;
    case "Int.":
      ps = "Play Suspended";
      icon = require("../images/animated/canceled-animated.gif");
      ms = "results";
      break;
    case "Postp.":
      ps = "Postponed";
      icon = require("../images/animated/start-animated.gif");
      ms = "upcoming";
      break;
  }
  return { status: ps, icon: icon, color: color, type: ms };
};
