// Get all paragraph elements
let allElements = document.querySelectorAll(Config.usedElements);

function bionifyWord(word) {
  const length = word.length;
  const splitPoint = Math.ceil(length * Config.boldAmount);

  // Get first 2/3rds of the word and make it bold
  const boldPart = word.slice(0, splitPoint);
  const remainder = word.slice(splitPoint);

  return `<b>${boldPart}</b>${remainder}`;
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
  // Cycle through each element and split them by space bar to get each word
  for (const element of allElements) {
    let newInner = "";

    for (const child of element.childNodes) {
      // A child with a nodeValue means it is a text object
      if (!child.nodeValue) {
        newInner += child.outerHTML;
        continue;
      }

      // Split by space and filter invalid objects
      const inner = child.nodeValue;
      const splittedElement = inner.split(" ");

      // Check for each word if it's a valid word
      for (const word of splittedElement) {
        if (word && !/\w*\d\w*/.test(word)) {
          newInner += bionifyWord(word) + " ";
        } else {
          newInner += word + " ";
        }
      }
    }

    element.innerHTML = newInner;
  }

  if (Config.initMessage.enabled) {
    console.log(Config.initMessage.message);
  }
}
