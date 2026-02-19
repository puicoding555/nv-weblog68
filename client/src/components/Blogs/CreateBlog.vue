<template>
  <div>
    <h1>Create Blog</h1>

    <form @submit.prevent="createBlog">

      <!-- Title -->
      <div class="mb-3">
        <label class="form-label">Title:</label>
        <input
          type="text"
          v-model="blog.title"
          class="form-control"
          placeholder="Enter blog title"
        />
      </div>

      <!-- Upload Thumbnail -->
      <div class="mb-3">
        <label>Upload Thumbnail:</label>
        <input type="file" @change="uploadFile" />
      </div>

      <!-- Preview -->
      <div v-if="blog.thumbnail" class="mb-3">
        <img
          :src="thumbnailUrl"
          width="200"
        />
      </div>

      <!-- CKEditor -->
      <div class="mb-3 editor-wrapper">
        <label class="form-label">Content:</label>
        <ckeditor
          :editor="editor"
          v-model="blog.content"
          :config="editorConfig"
        />
      </div>

      <!-- Category -->
      <div class="mb-3">
        <label class="form-label">Category:</label>
        <input
          type="text"
          v-model="blog.category"
          class="form-control"
        />
      </div>

      <!-- Status -->
      <div class="mb-3">
        <label class="form-label">Status:</label>
        <input
          type="text"
          v-model="blog.status"
          class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Create Blog
      </button>

    </form>
  </div>
</template>

<script>
import BlogsService from '../../services/BlogsService'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        licenseKey: 'GPL',
        toolbar: [
          'heading', '|',
          'bold', 'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote'
        ]
      },
      blog: {
        title: '',
        thumbnail: '',   
        pictures: '',
        content: '',
        category: '',
        status: 'saved'
      }
    }
  },

  computed: {
    thumbnailUrl() {
      return `http://localhost:8081/public/uploads/${this.blog.thumbnail}`
    }
  },

  methods: {

    async uploadFile(event) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('image', file)

      try {
        const res = await axios.post(
          'http://localhost:8081/upload',
          formData
        )

        this.blog.thumbnail = res.data.filename
      } catch (err) {
        console.error(err)
      }
    },

    async createBlog() {
      try {
        await BlogsService.post(this.blog)
        this.$router.push({ name: 'blogs' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.editor-wrapper {
  text-align: left;
}

:deep(.ck-editor__editable) {
  min-height: 300px;
}
</style>
