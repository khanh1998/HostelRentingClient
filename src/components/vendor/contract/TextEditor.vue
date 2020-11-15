<template>
  <div class="editor">
    <v-overlay :value="isLoadingTemplate">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-divider class="mt-2" />
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon>format_bold</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon>format_italic</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon>format_strikethrough</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon>format_underline</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <v-icon>code</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <v-icon>fas fa-paragraph</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon>format_list_bulleted</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon>format_list_numbered</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon>format_quote</v-icon>
        </v-btn>

        <v-btn
          icon
          class="menubar__v-btn"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <v-icon>code</v-icon>
        </v-btn>

        <v-btn icon class="menubar__v-btn" @click="commands.horizontal_rule">
          <v-icon>horizontal_rule</v-icon>
        </v-btn>

        <v-btn icon class="menubar__v-btn" @click="commands.undo">
          <v-icon>undo</v-icon>
        </v-btn>

        <v-btn icon class="menubar__v-btn" @click="commands.redo">
          <v-icon>redo</v-icon>
        </v-btn>
      </div>
    </editor-menu-bar>
    <v-switch v-model="isUsingTemplate" :label="`Phụ lục hợp đồng mẫu`"></v-switch>
    <v-divider class="my-2" />
    <editor-content class="editor__content" :editor="editor" />
    <v-divider class="mb-2" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: ['editorContent', 'templateUrl'],
  computed: {
    htmlContent() {
      if (this.editor) {
        return this.editor.getHTML();
      }
      return '';
    },
  },
  methods: {
    setEditorContent() {
      return new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h3>
            Nội dung của phụ lục hợp đồng,
          </h3>
        `,
      });
    },
  },
  data() {
    return {
      editor: null,
      isLoadingTemplate: false,
      template: null,
      isUsingTemplate: false,
      initContent: null,
    };
  },
  created() {
    this.editor = this.setEditorContent();
    if (this.templateUrl) {
      try {
        fetch(this.templateUrl).then(async (res) => {
          console.log(res);
          this.template = await res.text();
          // this.editor.setContent(this.template);
          this.isLoadingTemplate = false;
        });
      } catch (error) {
        console.log(error);
        this.isLoadingTemplate = false;
      }
    }
    if (this.editorContent) {
      this.editor.setContent(this.editorContent);
      this.initContent = this.editorContent;
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    htmlContent: {
      handler() {
        this.$emit('appendixContent', this.htmlContent);
      },
    },
    isUsingTemplate: {
      handler(using) {
        if (using) {
          this.editor.setContent(this.template);
        } else {
          this.editor.setContent(this.initContent);
        }
      },
    },
  },
};
</script>
