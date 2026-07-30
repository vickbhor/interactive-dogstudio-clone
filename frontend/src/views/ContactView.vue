<script setup>
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const status = ref('')

const submitForm = async () => {
  status.value = 'Sending...'
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      status.value = 'Message sent successfully!'
      form.value = { name: '', email: '', message: '' }
    } else {
      status.value = 'Failed to send message.'
    }
  } catch (error) {
    status.value = 'An error occurred. Make sure backend is running.'
  }
}
</script>

<template>
  <main role="main" class="page-contact" data-router-view="contact">
    <div class="center">
      <header class="page-header" v-reveal>
        <h1 class="title">Contact Us</h1>
      </header>

      <section class="contact-content" v-reveal="{ delay: 0.1 }">
        <p class="large-text">Ready to start a project? Or just want to say hi? Drop us a line.</p>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model="form.message" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Send Message</button>
          <p v-if="status" class="status-msg">{{ status }}</p>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.page-contact {
  padding-top: 150px;
  padding-bottom: 150px;
}
.page-header {
  margin-bottom: 100px;
}
.title {
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}
.large-text {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.4;
  max-width: 1000px;
  margin-bottom: 80px;
}

.contact-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  color: var(--accent-color);
}

input, textarea {
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  font-family: inherit;
  font-size: 18px;
  padding: 10px 0;
  transition: border-color 0.3s;
}
input:focus, textarea:focus {
  outline: none;
  border-bottom-color: var(--accent-color);
}

.submit-btn {
  background-color: transparent;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  padding: 15px 40px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
}
.submit-btn:hover {
  background-color: var(--accent-color);
  color: var(--bg-color);
}

.status-msg {
  margin-top: 20px;
  font-size: 14px;
}
</style>
