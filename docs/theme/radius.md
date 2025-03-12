---
outline: false
---
<script setup>
import tokens from "@tapsioss/theme/tokens";
import "@tapsioss/theme/css-variables";
import flattenTokens from '../utils/flattenTokens';
</script>

# Radius Tokens

The following tokens define corner rounding (`border-radius`) values across the design system. Whether you need sharp 
edges or gentle curves, consistent radius tokens keep corners uniform and visually appealing in every component.



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
      <tr v-for="row in flattenTokens(tokens.radius, 'radius')">
        <td><code>tokens.{{ row.path }}</code></td>
        <td><code>--tapsi-{{ row.token }}</code></td>
        <td><code>{{ row.value }}</code></td>
        <td>
          <div style="width: 30px;height: 30px;overflow: hidden">
            <div :style="{borderRadius: row.value,width: '60px',height: '60px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--vp-c-text-2)'}"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
