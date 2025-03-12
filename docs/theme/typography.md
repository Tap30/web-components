---
outline: "deep"
---
<script setup>
import tokens from "@tapsioss/theme/tokens";
import "@tapsioss/theme/css-variables";
import flattenTokens from '../utils/flattenTokens';

const { 'font-family': fontFamily,  ...typographyTokens} = tokens.typography;

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const sizeText = {
  xxs: '2x Small',
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large'
};




</script>

# Typography Tokens

The following tokens centralize all font-related details: **family**, **size**, **weight**, and **height**. By unifying text styles 
across headings, paragraphs, and other typographic elements, this set of tokens ensures a seamless and readable user experience.


## Font Family

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>JS Usage</th>
        <th>CSS Token</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>tokens.typography.["font-family"]}</code></td>
        <td><code>--tapsi-typography-font-familyfont-family</code></td>
        <td><code>{{ fontFamily }}</code></td>
      </tr>
    </tbody>
  </table>
</div>


<section v-for="([type, data]) in Object.entries(typographyTokens)">


## {{ capitalizeFirstLetter(type) }} Tokens

<div v-for="([size, row]) in Object.entries(data)">

### {{ sizeText[size] }}

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>JS Usage</th>
          <th>CSS Token</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in flattenTokens(typographyTokens[type][size], size)">
          <td><code>tokens.typography.{{ type }}.{{ row.path }}</code></td>
          <td><code>--tapsi-typography-{{ type }}-{{ row.token }}</code></td>
          <td><code>{{ row.value }}</code></td>
        </tr>
      </tbody>
    </table>
  </div>

</div>


</section>
