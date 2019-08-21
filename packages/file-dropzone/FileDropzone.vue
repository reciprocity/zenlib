<template>
  <div class="file-upload-dropzone">
    <form ref="uploadForm">
      <label
        :class="dropzoneClass"
        @drop.prevent="fileDropped"
        @dragover.prevent="dragOver"
        @dragenter.prevent="dragOver"
        @drag.prevent="dragOut"
        @dragleave.prevent="dragOut"
        @dragend.prevent="dragOut"
      >
        <span class="text-muted">
          Drag &amp; drop files here or
          <span class="text-primary">click to browse</span>
          for files.
        </span>
        <input
          ref="fileInput"
          :multiple="multiple"
          :accept="accept"
          type="file"
          class="d-none"
          @change="fileSelected"
        />
      </label>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isOver: false
    };
  },
  computed: {
    dropzoneClass() {
      return [
        "dropzone-box",
        {
          "dropzone-drag": this.isOver
        }
      ];
    }
  },
  methods: {
    fileSelected(event) {
      Array.from(event.target.files).forEach(file => {
        this.$emit("input", file);
      });

      this.$refs.uploadForm.reset();
    },
    fileDropped(event) {
      Array.from(event.dataTransfer.files).forEach(file => {
        this.$emit("input", file);
      });

      this.isOver = false;
    },
    dragOver() {
      this.isOver = true;
    },
    dragOut() {
      this.isOver = false;
    },
    browseClick() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@reciprocity/bootstrap/scss/colors";
@import "@reciprocity/bootstrap/scss/variables";

.file-upload-dropzone {
  .dropzone-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed $border-color-default;
    height: 150px;
    text-align: center;
    cursor: pointer;
    background: $color-zircon;
    border-radius: 3px;

    span {
      pointer-events: none;
    }

    &.dropzone-drag {
      border-style: solid;
      background: $color-wild-sand;
    }
  }
}
</style>
