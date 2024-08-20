<template>
  <div class="contact-page">
    <h1>Contact Me</h1>
    <div class="profile-section">
      <img src="@/assets/profile-picture.jpg" alt="Profile Picture" class="profile-picture">
      <p class="about-text">
        Hi, I'm Jens Marteaux. I am passionate about creating the best camping experiences for you. Feel free to reach out to me with any questions or inquiries.
      </p>
    </div>
    <div class="contact-info">
      <h2>Contact Information</h2>
      <p>Email: jens.marteaux@live.be</p>
      <p>Phone: +32 476 50 02 76</p>
      <p>Address: Oudenbos 90, 3202 Rillaar, België</p>
    </div>
    <div class="contact-form-section">
      <h2>Send Me a Message</h2>
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="name">Name*</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email*</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="message">Message*</label>
          <textarea id="message" v-model="form.message" rows="6" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <div v-if="confirmationMessage" class="confirmation-message">
        {{ confirmationMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      confirmationMessage: ''
    };
  },
  methods: {
    sendEmail() {
      const serviceID = 'Camping_Mail';
      const templateID = 'template_Camping';
      const userID = 'yo_ZqVqfVMaNwMXZ0';

      if (this.form.name && this.form.email && this.form.message) {
        emailjs.send(serviceID, templateID, this.form, userID)
          .then(() => {
            this.confirmationMessage = 'Message sent';
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';
            setTimeout(() => {
              this.confirmationMessage = '';
            }, 5000); // Message disappears after 5 seconds
          })
          .catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send your message. Please try again later.');
          });
      } else {
        alert('Please fill out all fields.');
      }
    }
  }
};
</script>

<style scoped>
.contact-page {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.profile-section {
  margin-bottom: 40px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.about-text {
  font-size: 30px;
  margin-bottom: 20px;
}

.contact-info {
  margin-top: 20px;
}

.contact-info h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 30px;
  margin-bottom: 10px;
}

.contact-form-section {
  margin-top: 40px;
}

.contact-form-section h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 30px;
}

.form-group input,
.form-group textarea {
  width: 40%;
  padding: 10px;
  font-size: 24px;
}

.form-group textarea {
  resize: vertical;
}

button {
  padding: 20px 60px;
  font-size: 30px;
  color: white;
  background-color: green;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darkgreen;
}

.confirmation-message {
  margin-top: 20px;
  padding: 30px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  font-size: 30px;
}
</style>