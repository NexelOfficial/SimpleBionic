let allElements = document.querySelectorAll(Config.usedElements);

function bionifyWord(word) {
  const length = word.length;
  const splitPoint = Math.ceil(length * Config.boldAmount);

  // Get first 2/3rds of the word and make it bold
  const boldPart = word.slice(0, splitPoint);
  const remainder = word.slice(splitPoint);

  const boldedWord = document.createElement("b");
  boldedWord.textContent = boldPart;

  const container = document.createElement("div");
  container.appendChild(boldedWord);
  container.appendChild(document.createTextNode(remainder));

  return container;
}

// Check if this page should be made bionic
const baseUrl = getBaseUrl(window.location.href);

isSiteDisabled(baseUrl).then((siteDisabled) => {
  if (!siteDisabled) {
    enableBionicReading();
  }
});

// Do not call.
function enableBionicReading() {
  for (const element of allElements) {
    let newInner = document.createDocumentFragment();

    for (const child of element.childNodes) {
      if (child.nodeType !== Node.TEXT_NODE) {
        newInner.appendChild(child.cloneNode(true));
        continue;
      }

      const inner = child.nodeValue;
      const splittedElement = inner.split(" ");

      for (const word of splittedElement) {
        if (word && !/\w*\d\w*/.test(word)) {
          const bionifiedWord = bionifyWord(word);

          newInner.appendChild(bionifiedWord.firstChild);
          newInner.appendChild(bionifiedWord.lastChild);
          newInner.appendChild(document.createTextNode(" "));
        } else {
          newInner.appendChild(document.createTextNode(word + " "));
        }
      }
    }

    element.innerHTML = "";
    element.appendChild(newInner);
  }

  if (Config.initMessage.enabled) {
    console.log(Config.initMessage.message);
  }
}