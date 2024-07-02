<template>
  <div class="main-container">
    <div class="editor-container">
      <MarkdownEditor
        ref="markdownEditor"
        v-model="editorText"
        :height="400"
        placeholder="Insert here…"
      />
    </div>
    <div class="margin-top-lg">
      <el-button
        size="small"
        @click="addText"
      >Add Text</el-button>
      <el-button
        size="small"
        @click="addImage"
      >Add Image</el-button>
      <el-button
        size="small"
        type="primary"
        @click="getHTML"
      >Preview HTML</el-button>
    </div>
    <div
      v-if="previewContent"
      class="preview-content padding-xs margin-top"
      v-html="previewContent"
    ></div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/common/MarkdownEditor'
import SimpleMDE from 'simplemde'

export default {
  name: 'Markdown',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      editorText: '',
      previewContent: ''
    }
  },
  methods: {
    addText() {
      this.$refs.markdownEditor.addText('\n### New Content')
    },
    addImage() {
      this.$refs.markdownEditor.addImage(
        '\n![](https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png)'
      )
    },
    getHTML() {
      this.previewContent = SimpleMDE.prototype.markdown(this.editorText)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  position: relative;
}
.theme-dark .preview-content {
  background: #5a5a5a;
  color: #fff;
}
.preview-content {
  background: #fff;
  color: #333;
}
</style>
