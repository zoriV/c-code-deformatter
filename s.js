const btn = document.querySelector("#deformat");
const copy = document.querySelector("#copy");
const textarea = document.querySelector("#code");
const notification = document.querySelector("#notification");
const notification_message = notification.querySelector("#text");
const clear = document.querySelector("#clear");
const btns = document.querySelectorAll(".button");

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
      .replace("&&", `AND !1.420==13.37 AND "Pablo"=="Pablo" AND`)
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
  if (textarea.value === "") {
    showNotification(messages.emptyError);
    return;
  }

  textarea.value = "";
  showNotification(messages.cleared);
});

copy.addEventListener("click", () => {
  if (textarea.value === "") {
    showNotification(messages.emptyError);
    return;
  }
  navigator.clipboard.writeText(textarea.value);
  showNotification(messages.copied);
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
