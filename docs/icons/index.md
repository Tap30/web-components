---
prev: false
next: false
outline: false
---

<style>

#icon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons-search-input {
  max-width: 200px;
  display: flex;
  height: 60px;
  border-radius: 8px;
  padding: 0 8px;
  background-color: var(--vp-c-bg-alt);
  margin-left: 20px;
}

.DocSearch-MagnifierLabel {
  color: unset;
}

.DocSearch-Input {
  font-size: 1em;
  height: 100%;
  outline: none;
  padding: 0 0 0 8px;
  width: 80%;
}

#icons-grid {
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
}

.icon-item {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 6px;
}

.icon-item svg {
 color: currentcolor;
  fill: currentcolor;
  width: 100%;
  height: 100%;
  display: block;
}

.tapsi-icon {
  height: 24px;
  width: 24px;
  fill: currentColor;
}

#icon-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  margin-top: 1rem;
}

#icon-wrapper svg {
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
}

</style>

<script setup>
import './DocIconGrid';
</script>

# Icons

## Properties

<div class="table-wrapper">


| Name       | Description                                                                                                                                | Default Value   |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| `viewbox`  | The viewBox of the SVG. Allows you to redefine what the coordinates without units mean inside an SVG element.                              | `0 0 24 24`     |
| `title`    | Provides a human-readable title for the element that contains it. [More Info](https://www.w3.org/TR/SVG-access/#Equivalent)               | -               |
| `size`     | The size of the icon. If set to `"auto"`, the icon will get the parent's width and height.                                                | `"auto"`        |

</div>

## Explore Icons

<doc-icon-grid></doc-icon-grid>
