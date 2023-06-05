<script setup lang="ts">
import Checklist from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import EditorJS from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'

// import List from '@editorjs/list';
import Image from '@editorjs/image'
import Link from '@editorjs/link'
import Marker from '@editorjs/marker'
import NestedList from '@editorjs/nested-list'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import Table from '@editorjs/table'
import TextVariantTune from '@editorjs/text-variant-tune'
import Warning from '@editorjs/warning'
import { randomStr } from '@/utils/random'

interface Props {
  modelValue?: object
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void
}>()

const elementId = randomStr()
const editor = new EditorJS({
  holder: elementId,
  onChange(api, event) {
    editor.save().then(data => {
      emit('update:modelValue', data)
    })
  },

  onReady() {
    setValue()
  },

  tools: {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
      class: Header,
      inlineToolbar: ['marker', 'link'],
      config: {
        placeholder: 'Header',
      },
      shortcut: 'CMD+SHIFT+H',
    },

    textVariant: TextVariantTune,

    /**
     * Or pass class directly without any configuration
     */
    image: {
      class: Image,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        },
      },
    },

    list: {
      class: NestedList,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L',
      config: {
        defaultStyle: 'unordered',
      },
    },

    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },

    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: "Quote's author",
      },
      shortcut: 'CMD+SHIFT+O',
    },

    warning: Warning,

    marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },

    code: {
      class: Code,
      shortcut: 'CMD+SHIFT+C',
    },

    delimiter: Delimiter,

    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C',
    },

    linkTool: Link,

    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },

    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: 'CMD+ALT+T',
    },

    raw: Raw,
  },

  tunes: ['textVariant'],

  data: props.modelValue ?? { blocks: {} },
})

// watch(() => props.modelValue, () => {

//     setValue()
// })

function setValue() {
  if (!props.modelValue?.blocks || !editor.render) return

  editor.render(props.modelValue)
}
</script>

<template>
  <VSheet
    border
    rounded
    class="py-4 editor"
  >
    <div :id="elementId" />
  </VSheet>
</template>

<style>
.ce-block__content,
.ce-toolbar__content {
  max-width: 700px;

  /* example value, adjust for your own use case */
}

.editor {
  padding: 0 80px;
}
</style>
