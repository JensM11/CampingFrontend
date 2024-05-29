<template>
  <div class="about-us-page">
    <div class="quote-section">
      <p class="quote">"Our mission is to make your vacation unforgettable."</p>
    </div>
    <h1>About Us</h1>
    <div class="content">
      <p class="intro-text">
        We are a dedicated team of camping enthusiasts, committed to providing the best camping experiences for our clients.
      </p>
      <img src="@/assets/logo.png" alt="About Us" class="about-image" />
      <p class="detailed-text">
        With years of experience in the camping industry, we understand what makes a great camping trip. 
        Our platform connects campers with the best camping sites available, ensuring a seamless and enjoyable experience.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUsPage'
};
</script>

<style scoped>
.about-us-page {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 36;
  margin-bottom: 20px;
}

.quote-section {
  background-color: green;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.quote {
  margin: 0;
  font-size: 40px;
  font-style: italic;
}

.content {
  margin-top: 20px;
}

.intro-text {
  margin-bottom: 20px;
  font-size: 30px;
}

.about-image {
  width: 100%;
  height: auto;
  max-width: 600px;
  margin: 20px 0;
}

.detailed-text {
  margin-top: 20px;
  font-size: 30px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}
</style>