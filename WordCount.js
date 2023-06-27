import client from "./split.js";

const newStyle = `color:blue;font-weight: bold;`;

const currentStyle = `color:red`;

client.ready().then(() => {
  // Create a class for the element
  class WordCount extends HTMLParagraphElement {
    constructor() {
      // Always call super first in constructor
      super();

      // count words in element's parent element
      const wcParent = this.parentNode;

      function countWords(node) {
        const text = node.innerText || node.textContent;
        return text
          .trim()
          .split(/\s+/g)
          .filter((a) => a.trim().length > 0).length;
      }

      const count = `Words: ${countWords(wcParent)}`;

      // Create a shadow root
      const shadow = this.attachShadow({ mode: "open" });

      // Create text node and add word count to it
      const text = document.createElement("span");

      text.textContent = count;

      const new_word_count_style = client.getTreatment("word_count_text");
      if (new_word_count_style == "on") {
        text.style = newStyle;
      } else if (new_word_count_style == "off") {
        text.style = currentStyle;
      } else {
        text.style = currentStyle;
        // also do some alerting here as this was unexpected
      }

      // Append it to the shadow root
      shadow.appendChild(text);

      // Update count when element content changes
      setInterval(function () {
        const count = `Words: ${countWords(wcParent)}`;
        text.textContent = count;
      }, 200);
    }
  }

  // Define the new element

  customElements.define("word-count", WordCount, { extends: "p" });
});
