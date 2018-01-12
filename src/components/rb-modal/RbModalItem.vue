<template lang="pug">
transition(:name="transition",
           @after-enter="$emit('after-enter')",
           @after-leave="$emit('after-leave')")
  .modal(:id="id", tabindex="-1", role="dialog")
    .modal-dialog
      .modal-content
        // header
        .modal-header(v-if="$slots.header")
          slot(name="header")
        .modal-header(v-else-if="header")
          button.close(type="button", @click="closeModal") ×
          h4.modal-title(v-if="header", v-html="header")
        // body
        slot(v-if="$slots.body", name="body")
        .modal-body(v-else)
          slot
        // footer
        .modal-footer(v-if="$slots.footer")
          slot(name="footer")
        .modal-footer(v-else-if="footer")
          .btn.btn-default(@click="closeModal") {{ cancelText || $t('cancel') }}
          .btn.btn-primary(:disabled="disabled", @click="confirmModal") {{ confirmText || $t('confirm') }}
</template>
<script lang="ts">
export default {
  props: {
    id: [Number, String],
    header: String,
    footer: Boolean,
    disabled: Boolean,
    confirmText: String,
    cancelText: String,
    transition: {
      type: String,
      default: 'fade',
    },
  },
  methods: {
    closeModal() {
      this.$modal.close()
    },
    confirmModal() {
      if (this.disabled) {
        return
      }
      this.$emit('confirm')
    },
  },
}
</script>
<style lang="scss">
$zindex-modal: 1050 !default;
$modal-content-bg: #fff !default;
$modal-content-fallback-border-color: #999 !default;
$modal-content-border-color: rgba(0, 0, 0, 0.2) !default;
$border-radius-large: 6px !default;
$modal-title-padding: 15px !default;
$modal-header-border-color: #e5e5e5 !default;
$modal-footer-border-color: $modal-header-border-color !default;
$modal-title-line-height: (20/14) !default;
$modal-inner-padding: 15px !default;
$modal-lg: 900px !default;
$modal-md: 600px !default;
$modal-sm: 300px !default;
$screen-sm: 768px !default;
$screen-sm-min: $screen-sm !default;
$screen-md: 992px !default;
$screen-md-min: $screen-md !default;

//
// Modals
// --------------------------------------------------

// .modal-open - body class for killing the scroll
// .modal - container to scroll within
// .modal-dialog - positioning shell for the actual modal
// .modal-content - actual modal w/ bg and corners and shit

// Container that the modal scrolls within
.modal {
  //display none
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $zindex-modal;
  -webkit-overflow-scrolling: touch;
  // Prevent Chrome on Windows from adding a focus outline. For details, see
  // https://github.com/twbs/bootstrap/pull/10951.
  outline: 0;
}

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

// Shell div to position the modal with bottom padding
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}

// Actual modal
.modal-content {
  position: relative;
  background-color: $modal-content-bg;
  border: 1px solid $modal-content-fallback-border-color; //old browsers fallback (ie8 etc)
  border: 1px solid $modal-content-border-color;
  border-radius: $border-radius-large;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  outline: 0; // Remove focus outline from opened modal
}

// Modal header
// Top section of the modal w/ title and dismiss
.modal-header {
  padding: $modal-title-padding;
  border-bottom: 1px solid $modal-header-border-color;
  @include clearfix();
}

// Close icon
.modal-header .close {
  margin-top: -2px;
}

// Title text within header
.modal-title {
  margin: 0;
  line-height: $modal-title-line-height;
}

// Modal body
// Where all modal content resides (sibling of .modal-header and .modal-footer)
.modal-body {
  position: relative;
  padding: $modal-inner-padding;
}

// Footer (for actions)
.modal-footer {
  padding: $modal-inner-padding;
  text-align: right; // right align buttons
  border-top: 1px solid $modal-footer-border-color;
  @include clearfix(); // clear it in case folks use .pull-* classes on buttons

  // Properly space out buttons
  .btn + .btn {
    margin-left: 5px;
    margin-bottom: 0; // account for input[type="submit"] which gets the bottom margin like all other inputs
  }
  // but override that for button groups
  .btn-group .btn + .btn {
    margin-left: -1px;
  }
  // and override it for block buttons as well
  .btn-block + .btn-block {
    margin-left: 0;
  }
}

// Measure scrollbar width for padding body during modal show/hide
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}

// Scale up the modal
@media (min-width: $screen-sm-min) {
  // Automatically set modal's width for larger viewports
  .modal-dialog {
    width: $modal-md;
    margin: 30px auto;
  }

  .modal-content {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }
  // Modal sizes
  .modal-sm {
    width: $modal-sm;
  }
}

@media (min-width: $screen-md-min) {
  .modal-lg {
    width: $modal-lg;
  }
}
</style>
