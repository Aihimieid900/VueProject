<template>
    <v-alert 
      @input="onClose"
      dismissible
        border="left"
      elevation="2"
      colored-border
      :value="true"
      type="error">
      {{ text }}
    </v-alert>
</template>
<script>
export default {
    props:['text'],
    methods: {
        onClose() {
            this.$emit('dismissed')
        }
    }
}
</script>