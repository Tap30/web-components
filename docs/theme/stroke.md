---
outline: false
---

<script setup>
import tokens from "@tapsioss/theme/tokens";
import "@tapsioss/theme/css-variables";
import flattenTokens from '../utils/flattenTokens';
</script>

# Stroke Tokens

The following tokens specify standardized stroke widths for borders, outlines,
and dividers. Using these tokens keeps line-based elements—from subtle
separators to prominent outlines—consistent, giving the interface a polished
look.

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
      <tr v-for="row in flattenTokens(tokens.stroke, 'stroke')">
        <td><code>tokens.{{ row.path }}</code></td>
        <td><code>--tapsi-{{ row.token }}</code></td>
        <td><code>{{ row.value }}</code></td>
      </tr>
    </tbody>
  </table>
</div>
