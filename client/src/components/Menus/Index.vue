<template>
  <div>
    <h1>Get All Menus</h1>

    <p>
      <button @click="goCreate">
        Create Menu
      </button>
    </p>

    <p>
      <button @click="goEdit(1)">
        Edit Menu (ID = 1)
      </button>
    </p>

    <p>
      <button @click="goShow(1)">
        Show Menu (ID = 1)
      </button>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    goCreate () {
      this.$router.push('/menu/create')
    },
    goEdit (id) {
      this.$router.push(`/menu/edit/${id}`)
    },
    goShow (id) {
      this.$router.push(`/menu/${id}`)
    }
  }
}
</script>

<style scoped>
button {
  margin-right: 10px;
  padding: 6px 12px;
}
</style>
