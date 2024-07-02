<template>
  <div
    ref="richTextEditor"
    :style="{'height': height + 'px'}"
  >
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
// import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

// Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'RichTextEditor',
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      quill: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const options = {
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],

            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ align: [] }],

            ['link', 'image'],

            ['clean']
          ]
        },
        placeholder: 'Please enter the content of the article...',
        theme: 'snow'
      }
      this.quill = new Quill(this.$refs.richTextEditor, options)
      // JSON.parse(localStorage.getItem('word_content'))
      if (localStorage.getItem('flag') === 'team') { this.quill.setContents(JSON.parse(localStorage.getItem('team_word_content'))) } else { this.quill.setContents(JSON.parse(localStorage.getItem('user_word_content'))) }
      if (localStorage.getItem('enable') === 'false') {
        this.quill.enable(false)
      }
    },
    getHtmlContent() {
      return this.$refs.richTextEditor.firstChild.innerHTML
    },
    getJsonContent() {
      return JSON.stringify(this.quill.getContents())
    }
  }
}
</script>
