<script setup lang="ts">
import { Content, useData } from "vitepress";
const { frontmatter: fm } = useData()
</script>

<template>
  <div class="VPDoc has-sidebar has-aside">
    <div class="content">
      <div class="content-container">
        <main class="main">
          <div class="vp-doc">
            <h1 v-if="fm.title">{{ fm.title }}</h1>
            <p v-if="fm.description">{{ fm.description }}</p>
            <img v-if="fm.banner" class="banner" :src="fm.banner" alt="banner" />
            <section class="guidelines" v-if="fm.guideline?.dont || fm.guideline?.do">
              <div class="do">
                <div class="label">Do</div>
                <ul>
                  <li v-for="i in fm.guideline?.do">{{i}}</li>
                </ul>
              </div>

              <div class="divider" v-if="fm.guideline?.dont && fm.guideline?.do"></div>

              <div class="dont">
                <div class="label">Don't</div>
                <ul>
                  <li v-for="i in fm.guideline?.dont">{{i}}</li>
                </ul>
              </div>
            </section>
            <Content />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPDoc {
  padding: 32px 24px 96px;
  width: 100%;
}

@media (min-width: 768px) {
  .VPDoc {
    padding: 48px 32px 128px;
  }
}

@media (min-width: 960px) {
  .VPDoc {
    padding: 48px 32px 0;
  }
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 960px) {
  .content {
    padding: 0 32px 128px;
  }
}

@media (min-width: 1280px) {
  .content {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}

.content-container {
  margin: 0 auto;
}

.VPDoc.has-aside .content-container {
  max-width: 688px;
}

.guidelines {
  background-color: var(--vp-custom-block-info-bg);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 16px 16px 8px;
  line-height: 24px;
  font-size: var(--vp-custom-block-font-size);
  margin: 16px 0;
  display: flex;
  align-items: stretch;
  gap: 16px
}

.label {
  color: #ffffff;
  display: inline-block;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(-2px);
}

.do, .dont {
  flex: 1;
}

.do .label {
  background-color: var(--tap-palette-green-400);
}

.dont .label {
  background-color: var(--tap-palette-red-400);
}

.divider {
  background-color: var(--vp-c-divider);
  margin: 8px;
  width: 1px;
}

@media (max-width: 960px) {
  .guidelines {
    flex-direction: column;
  }

  .divider {
    height: 1px;
    width: unset;
  }
}

.banner {
  margin: auto;
  border-radius: 8px;
}
</style>
