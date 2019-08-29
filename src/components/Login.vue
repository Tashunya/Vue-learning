<template>
<main class="login">
  <h1>Please login to continue</h1>
  <form>
    <FormInput
      name="username"
      v-model="username"
      placeholder="Username" />
  </form>
</main>
</template>

<script>
export default {
  data() {
    return {
      mode: 'login',
      username: '',
      password: '',
      password2: '',
      email: '',
    }
  },
  computed: {
    title () {
      switch (this.mode) {
        case 'login': return 'Login'
        case 'signup': return 'Create a new account'
      }
    },
  }
}
</script>
