// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import DesignGuidelineLayout from '../../components/DesignGuidelineLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('design', DesignGuidelineLayout)
  }
}
