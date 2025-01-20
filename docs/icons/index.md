---
prev: false
next: false
outline: false
---

<style>
#icon-header {
  display: flex;
  justify-content: space-between;
}

.icons-search-input {
  max-width: 200px;
  display: flex;
  height: unset;
  padding: 0 8px;
  background-color: var(--vp-c-bg-alt);
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
  gap: 23px;
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
}

.tapsi-icon {
  height: 24px;
  width: 24px;
  fill: currentColor;
}
</style>

<script setup>
import './DocIconGrid';
</script>


<doc-icon-grid></doc-icon-grid>
