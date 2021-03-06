const btn = document.querySelector("#deformat");
const copy = document.querySelector("#copy");
const textarea = document.querySelector("#code");
const notification = document.querySelector("#notification");
const notification_message = notification.querySelector("#text");
const clear = document.querySelector("#clear");
const btns = document.querySelectorAll(".button");
const menu = document.querySelector("#navigation"),
  menu_content = document.querySelector("#navigation-content"),
  menu_stateButton = document.querySelector("#navigation-button");

let isMobile = window.innerWidth <= 860 ? true : false;
window.addEventListener("resize", () => {
  let width = window.innerWidth;
  isMobile = width <= 860 ? true : false;
});
const messages = {
  emptyError: "Najpierw coś napisz!",
  formatted: "Pomyślnie z(de)formatowano zawartość!",
  cleared: "Wyczyszczono zawartość!",
  copied: "Skopiowano!",
  copyError: "Zawartość znajduje się już w schowku",
  endText: "Spacje i entery obciążają procesor!",
};

btns.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let target = e.target;
    target.classList.add("anim");
    target.addEventListener("animationend", () => {
      target.classList.remove("anim");
    });
  });
});

let isShowing = false;
btn.addEventListener("click", (e) => {
  var value = textarea.value;
  if (value === "") {
    showNotification(messages.emptyError);
    return;
  }
  var splitted = value.split(/\r?\n/);
  var converted = "";
  for (i = 0; i < splitted.length; i++) {
    let line = splitted[i];
    if (line == "") continue;
    if (line.startsWith("#")) {
      converted += "\n" + line;
      if (!splitted[i + 1].startsWith("#")) {
        converted += "\n";
      }
      continue;
    }
    converted += line
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/^\s+/g, "")
      .replace(/(\+){2}/g, " - = - 1") //TODO ++a
      .replace(/(\-){2}/g, " + = - 1") //TODO --a
      .replace("&&", `&& !1.420==13.37 && "Pablo"=="Pablo" &&`)
      .replace(
        "true",
        `!(!(!(1 == 1 && (2*2)/4==2*2*2*2*2*2*8+16/(int)3.0) || "siquel" == "siquel op"))`
      )
      .replace(
        "false",
        `!(!(1 == 1 && (2*2)/4==2*2*2*2*2*2*8+16/(int)2.0*5) || "siquel" == "siquel op")`
      )
      // detect for correct comments that are not inside quotation
      .replace(
        /(?:(?=["'][^"']*$)|(?=^[^"']*\/\/.*$))(.*?)\/\/(.*)/gm,
        "$1/*$2*/"
      );
  }

  document.body.classList.add("anim2");
  document.body.addEventListener("animationend", () => {
    document.body.classList.remove("anim2");
  });

  if (!textarea.value.endsWith(`/*${messages.endText}*/`))
    textarea.value =
      converted !== "" ? converted + `/*${messages.endText}*/` : "";
  showNotification(messages.formatted);
});

clear.addEventListener("click", () => {
  closeIfMobile();
  if (textarea.value === "") {
    showNotification(messages.emptyError);
    return;
  }

  textarea.value = "";
  showNotification(messages.cleared);
});

copy.addEventListener("click", () => {
  closeIfMobile();
  if (textarea.value === "") {
    showNotification(messages.emptyError);
    return;
  }
  navigator.clipboard.writeText(textarea.value);
  showNotification(messages.copied);
});

menu_stateButton.addEventListener("click", (e) => {
  e.target.querySelector("i").classList.toggle("fa-angle-right");
  e.target.querySelector("i").classList.toggle("fa-angle-left");
  toggleMenu();
});

function showNotification(message) {
  if (!isShowing) {
    isShowing = true;
    notification.style.display =
      notification.style.display === "block" ? "none" : "flex";
    setTimeout(() => {
      isShowing = false;
      notification.style.display = "none";
    }, 3000);
  }
  notification.innerText = message;
}

let menuShown = true;
function toggleMenu() {
  menu.classList.toggle("hidden");
  menuShown = !menuShown;
}

function hideMenu() {
  if (!menu.classList.contains("hidden")) menu.classList.add("hidden");
}

function closeIfMobile() {
  if (isMobile) hideMenu();
}
