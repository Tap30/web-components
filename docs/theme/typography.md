---
outline: false
---
<script setup>
import tokens from "@tapsioss/theme/tokens";
import "@tapsioss/theme/css-variables";
import flattenTokens from '../utils/flattenTokens';

const {
  palette,
  color,
  radius,
  spacing,
  stroke,
  typography,
} = tokens;
</script>

# Typography Tokens

The following tokens centralize all font-related details: **family**, **size**, **weight**, and **height**. By unifying text styles 
across headings, paragraphs, and other typographic elements, this set of tokens ensures a seamless and readable user experience.

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
      <tr v-for="row in flattenTokens(typography, 'typography')">
        <td><code>tokens.{{ row.path }}</code></td>
        <td><code>--tapsi-{{ row.token }}</code></td>
        <td><code>{{ row.value }}</code></td>
      </tr>
    </tbody>
  </table>
</div>

