import { html, render, TemplateResult } from 'lit';

import { cleanUpBlock } from 'Utils/cleanUpBlock';
import { getChildNodeText } from 'Utils/getChildNodeText';
import './info-card.scss';

interface InfoCardArgs {
  title: string;
  description: string;
}

enum blockRows {
  title,
  description,
}

/**
 * The template function is used to generate the markup for your block and
 * respond to the arguments coming from your table/block.
 * @param {InfoCardArgs} args
 * @returns {TemplateResult}
 */
const template = ({ title, description }: InfoCardArgs): TemplateResult => {
  return html`<div class="container">
    <div class="info-card">
      <h2 class="info-card-title">${title}</h2>
      <p class="info-card-description">${description}</p>
    </div>
  </div>`;
};

/**
 * Each block has an exported default function. It receives the raw block
 * provided by EDS and is used to extract the arguments from it.
 * @param {HTMLElement} block The raw block element provided by EDS.
 */
export default function (block: HTMLElement) {
  const args = {
    title: getChildNodeText(block, blockRows.title),
    description: getChildNodeText(block, blockRows.description),
  };

  // Removes the generative content of the eds block
  cleanUpBlock(block);
  render(template(args), block);
}
