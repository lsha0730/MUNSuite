/**
 * Estimates the pixel width of a string.
 *
 * @param {string} text - The string being estimated.
 * @param {number} fontSize - The font size in use.
 * @returns {number} The estimated pixel width of the string.
 */
export function getTextWidth(text, fontSize = 16, fontFamily = "Inter") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = fontSize + "px " + fontFamily;
  const metrics = context.measureText(text);
  const width = metrics.width;

  return width * 1.05;
}
