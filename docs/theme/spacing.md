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

# Spacing Tokens

The following tokens offer a scalable system for margins and padding. Applying these tokens helps maintain balanced 
layouts, reinforces visual rhythm, and simplifies the alignment of elements in your UI.



<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>JS Usage</th>
        <th>CSS Token</th>
        <th>Value</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in flattenTokens(spacing, 'spacing')">
        <td><code>tokens.{{ row.path }}</code></td>
        <td><code>--tapsi-{{ row.token }}</code></td>
        <td><code>{{ row.value }}</code></td>
        <td><div :style="{width: row.value,height: '20px', background: 'var(--vp-c-text-2)'}"></div></td>
      </tr>
    </tbody>
  </table>
</div>
