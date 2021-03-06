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
        <div class="content">
          <i class="fal fa-cloud-upload mr-3" />
          <b class="mt-0">Drag &amp; drop files here</b>
          <span class="mx-2 my-1">or</span>
          <div class="fake-button">Browse files</div>
        </div>
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
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCloudUpload } from "@fortawesome/pro-light-svg-icons";

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
  mounted() {
    // Add fa replace watcher:
    library.add(faCloudUpload);
    dom.watch();
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
    dragOver(event) {
      event.dataTransfer.dropEffect = "copy";
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
@import "@reciprocity/styles/scss/colors";

.file-upload-dropzone {
  position: relative;
  overflow: hidden;
  min-height: 64px;

  form {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    align-items: center;
  }

  &.blocks .content {
    flex-direction: column;

    > * {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  .dropzone-box {
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed $color-ghost;
    padding: 0.5rem;
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
