import client from "./split.js";
import { onStyle, offStyle, controlStyle } from './flagStyles.js';

function updatePage() {
  console.log('[updatepage.js] updatePage');

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

  const myParagraph = document.querySelector("my-paragraph");

  // Update the styles using the public method
  console.log('[updatepage.js] updateAllParagraphStyles');
  myParagraph.updateAllParagraphStyles(styles);
}

export default updatePage
