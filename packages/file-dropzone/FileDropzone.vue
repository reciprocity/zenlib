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
        <span class="d-flex align-items-center">
          <i class="fa fa-cloud-upload mr-3" />
          <b>Drag &amp; drop files here</b>
          <span class="mx-2">or</span>
          <div class="fake-button">Browse files</div>
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
@import "@reciprocity/_bootstrap_/scss/colors";

.file-upload-dropzone {
  .dropzone-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    border: 1px dashed $color-ghost;
    padding: 0.5rem;
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

.fa-cloud-upload {
  font-size: 2.4rem;
  color: $color-abs-blue-dark;
}

.fake-button {
  color: $color-white;
  background-color: $color-abs-blue-dark;
  padding: 0.35rem 0.75rem;
  border-radius: 2px;
}
</style>
