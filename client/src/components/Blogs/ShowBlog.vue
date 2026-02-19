<template>
  <div>
    <h1>Show Blog</h1>

    <div v-if="blog">

      <div class="mb-3">
        <h3>{{ blog.title }}</h3>
      </div>

      <!-- Thumbnail -->
      <div v-if="blog.thumbnail" class="mb-3">
        <img
          :src="thumbnailUrl"
          width="300"
        />
      </div>

      <!-- Content -->
      <div class="mb-3 ck-content" v-html="blog.content"></div>

      <div class="mb-3">
        <strong>Category:</strong> {{ blog.category }}
      </div>

      <div class="mb-3">
        <strong>Status:</strong> {{ blog.status }}
      </div>

      <button
        @click="navigateTo('/blog/edit/' + blog.id)"
        class="btn btn-primary"
      >
        แก้ไข blog
      </button>

      <button
        @click="navigateTo('/blogs')"
        class="btn btn-secondary"
      >
        กลับ
      </button>

    </div>

  </div>
</template>

<script>
import BlogsService from '../../services/BlogsService'

export default {
  data () {
    return {
      blog: {}
    }
  },

  computed: {
    thumbnailUrl () {
      return `http://localhost:8081/public/uploads/${this.blog.thumbnail}`
    }
  },

  async created () {
    const blogId = this.$route.params.blogId
    const res = await BlogsService.show(blogId)
    this.blog = res.data
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
