<template>
  <div class="home-page">
    <div class="image-container">
      <img src="@/assets/mainfoto.jpg" alt="Wide Picture" class="wide-image">
      <div class="slogan-container">
        <p class="slogan">Your vacation, our priority</p>
      </div>
    </div>
    <div class="content">
      <p class="intro-text">
        Welcome to our camping site platform. We offer a wide range of camping sites for rent and an easy way for property owners to list their sites.
      </p>
      <div class="content-section">
        <p class="content-text">Are you looking for an amazing site to go camping? 
          Look no further than our service! With multiple new locations added each day, our offer is continously growing.
          Check locations with a click of a button, view their specifications and availability and find your perfect match!
          Wether it's for a small group of friends or for a large group of any kind, we've got something for you!
          Register nog using the button below to view the different locations and find the perfect camping site for your needs!
          Already registered? Use the button in the top right to log in to your account.
          </p>
        <div class="vertical-line"></div>
        <img src="@/assets/camping2.jpg" alt="Camping Site 2" class="content-image" />
      </div>
      <div>
        <router-link to="/client-register">
            <button class="register-button">Register as a Client</button>
          </router-link>
      </div>
      <div class="content-section">
        <img src="@/assets/camping1.jpg" alt="Camping Site 1" class="content-image" />
        <div class="vertical-line"></div>
        <p class="content-text">Are you the owner of one or multiple campsites? 
          Do you want to rent them out but it's to much of a hassle? This is the solution for you!
          Using our platform you can easily rent out your properties, go over their details, see who wants to rent them and check the availabilities.
          Curious as to what your previous clients thought of your location? Check out the reviews and see how you can improve your sites!
          The first step to join us is simple, just register your owner account using the button below!
          Already have an owner account? Use the button in the top right to quickly log in to your account.
      </p>
      </div>
      <div>
        <router-link to="/owner-register">
            <button class="register-button">Register as an Owner</button>
          </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
.header-spacer {
  height: 20px; /* Adjust the height as needed */
}

.image-container {
  position: relative;
  text-align: center;

}

.wide-image {
  width: 100%;
  height: auto;
  max-height: 300px; /* Adjust the height as needed */
}

.slogan-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px; /* Increase padding to make the rectangle bigger */
  border-radius: 10px;
}

.slogan {
  margin: 0;
  font-size: 2em; /* Increase font size */
  color: #333;
}

.content {
  padding: 20px;
  text-align: center;
}

.intro-text {
  font-size: 36px;
  margin-bottom: 20px;
}

.content-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.content-section.reverse {
  flex-direction: row-reverse;
}

.content-section img {
  width: 800px;
  height: 600px;
  margin: 0 20px;
}

.content-image {
  width: 200px;
  height: auto;
}

.content-text {
  display: flex;
  flex-direction: column; /* Stack the text and button vertically */
  align-items: flex-start; /* Align items to the start of the flex container */
  flex: 1;
  padding: 0 20px;
  font-size: 30px;
  text-align: left;
}

.vertical-line {
  width: 5px;
  background-color: green;
  height: 600px; /* Adjust the height to match the image height */
  margin: 0 20px;

}

.register-button {
  display: inline-block;
  padding: 30px 80px;
  margin-top: 30px; /* Add margin to create space between the text and button */
  background-color: green;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-bottom: 30px;
  font-size: 24px;
}

.login-button:hover {
  background-color: darkgreen;
}
</style>