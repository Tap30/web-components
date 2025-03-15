---
outline: false
---
<script setup>
import tokens from "@tapsioss/theme/tokens";
import "@tapsioss/theme/css-variables";
import flattenTokens from '../utils/flattenTokens';
</script>

# Palette Tokens


The following tokens form the foundational colors of Tapsi’s visual language. By using these curated hues—including brand colors, neutrals, and complementary tones—you maintain a unified and balanced color scheme across your application.

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
      <tr v-for="row in flattenTokens(tokens.palette, 'palette')">
        <td><code>tokens.{{ row.path }}</code></td>
        <td><code>--tapsi-{{ row.token }}</code></td>
        <td>
          <div>
            <div :style="{marginRight: '4px', verticalAlign: 'middle', background: row.value,width: '20px',height: '20px', display: 'inline-block', borderRadius: '4px'}"></div>
            <code>
              {{ row.value }}
            </code>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
