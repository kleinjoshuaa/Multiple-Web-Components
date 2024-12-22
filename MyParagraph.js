// Create a class for the element
import client from "./split.js";
import updatePage from "./updatepage.js";
import { onStyle, offStyle, controlStyle } from './flagStyles.js';

document.getElementById('MyParagraph').innerHTML = `
<h1>Web Component 2</h1>
<template id="my-paragraph">
  <p><slot name="my-text">My default text</slot></p>
</template>

<my-paragraph id="pg1">
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>

<my-paragraph id="pg2">
  <ul slot="my-text">
    <li>Let's have some different text!</li>
    <li>In a list!</li>
  </ul>
</my-paragraph>
`;

document.addEventListener("DOMContentLoaded", () => {
    client.ready().then(() => {
        console.log("[MyParagraph.js] client.ready().then()");

        const treatment = client.getTreatment("word_style");
        console.log("[MyParagraph.js] word_style treatment:", treatment);

	let styles;
	if (treatment === "on") {
	    styles = onStyle;
	} else if (treatment === "off") {
	    styles = offStyle;
	} else {
	    styles = controlStyle;
	    alert("Unexpected treatment value. Using default styles.");
	}

        // Update styles for all <my-paragraph> instances
        const paragraphs = document.querySelectorAll("my-paragraph");
        paragraphs.forEach((paragraph) => {
            paragraph.updateStyle(styles);
        });
    });
});

class MyParagraph extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById("my-paragraph");
        const templateContent = template.content;

        // Attach shadow DOM
        const shadow = this.attachShadow({ mode: "open" });

        // Create and append the style element
        this.styleElement = document.createElement("style");
        shadow.appendChild(this.styleElement);

        // Add template content
        shadow.appendChild(templateContent.cloneNode(true));
    }

    updateAllParagraphStyles(newStyles) {
        // Select all <my-paragraph> instances
        const paragraphs = document.querySelectorAll("my-paragraph");

        // Loop through each instance and call updateStyle
        paragraphs.forEach((paragraph) => {
            paragraph.updateStyle(newStyles);
        });

        console.log(`[MyParagraph] Updated styles for ${paragraphs.length} elements.`);
    }

    // Public method to update styles dynamically
    updateStyle(newStyles) {
        // Update the style element in the shadow DOM
        this.styleElement.textContent = newStyles;
        //console.log(`[MyParagraph] Updated styles to:\n${newStyles}`);
    }

}

customElements.define("my-paragraph", MyParagraph);

