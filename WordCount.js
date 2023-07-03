import client from "./split.js";

const newStyle = `color:blue;font-weight: bold;`;

const currentStyle = `color:red`;

document.getElementById('WordCount').innerHTML = `
<h1>Web Component 1</h1>

<article contenteditable>
  <h2>Sample heading</h2>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  </p>

  <p>
    Pellentesque ornare tellus sit amet massa tincidunt congue. 
  </p>

  <text-count letters ></text-count>
  </article>
`;
client.ready().then(() => {

  customElements.define('text-count', class extends HTMLElement {
    constructor() {
      const new_word_count_style = client.getTreatment("word_count_text");
      let style;
      if (new_word_count_style == "on") {
              style = newStyle;
            } else if (new_word_count_style == "off") {
              style = currentStyle;
            } else {
              style= currentStyle;
              // also do some alerting here as this was unexpected
            }
      super().attachShadow({mode:'open'})
             .innerHTML=`<style>span{${style}}</style>`+
                        `<span><!--counter--></span>`;
    }
    connectedCallback() {
      let article = this.closest("article");
      if (article) {
        let updatecount  = () => {
          let text = article.innerText.trim();
          this.shadowRoot.querySelector("span").innerText = 
            (this.hasAttribute("letters") ? text.length               + " letters " : "") ;
        }
        article.onkeyup = (evt) => updatecount();
        updatecount();
      } else {
        console.warn("I can't find a parent <article>!");
      }
    }
  });


});