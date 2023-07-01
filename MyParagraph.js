// Create a class for the element
import client from "./split.js";

const newStyle = `          
p {
  color: white;
  background-color: #666;
  padding: 5px;
  margin-left: 40px
}`;

const currentStyle = `      
p {
  color: black;
  background-color: #c0c5ff;
  padding: 5px;
  margin-left: 40px
}`;



document.getElementById('component2').innerHTML = `
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



client.ready().then(() => {




   const style = document.createElement("style");
  const new_component2_style = client.getTreatment("component2_style");

  if (new_component2_style == "on") {
    style.textContent = newStyle;
  } else if (new_component2_style == "off") {
    style.textContent = currentStyle;
  } else {
    style.textContent = currentStyle;
    // also do some alerting here as this was unexpected
  }

  class MyParagraph extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById("my-paragraph");
      const templateContent = template.content;
      const shadow = this.attachShadow({ mode: "open" });
      templateContent.appendChild(style);
      shadow.appendChild(templateContent.cloneNode(true));
    }
  }

  customElements.define("my-paragraph", MyParagraph);
});
