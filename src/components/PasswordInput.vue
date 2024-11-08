<script setup lang="ts">
import { ref, computed } from 'vue';
import { CRITERIA , COMMON_PASSWORDS} from "../Constants/constants"

const password = ref('');
const feedback = ref<string[]>([]);
const strengthScore = ref(0);
const inputUsername = ref(''); 

function evaluatePassword(password: string): number {
  let score = 0;
  feedback.value = [];

  if (password.length < 8) return showFeedback("Password must be at least 8 characters long.", 0);
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) return showFeedback("Password is too common. Please choose a more secure one.", 0);

  if (inputUsername.value.trim() && password === inputUsername.value) {
    return showFeedback("Password cannot be the same as the username.", 0);
  }

  CRITERIA.forEach(({ regex, points, message }) => {
    if (regex.test(password)) score += points;
    else feedback.value.push(message);
  });

  return score;
}

function showFeedback(message: string, score: number): number {
  feedback.value.push(message);
  return score;
}

function onPasswordInput() {
  if (password.value.trim() === '') {
    feedback.value = [];
    strengthScore.value = 0;
    return;
  }
  strengthScore.value = evaluatePassword(password.value);
}

const strengthLabel = computed(() => {
  if (!password.value.trim()) return ''; 
  return strengthScore.value >= 8 ? 'Strong' : strengthScore.value >= 5 ? 'Moderate' : 'Weak';
});

const scoreMessage = computed(() => {
  if (password.value.trim() === '') return '';
  return `Score: ${strengthScore.value}/10`;
});
</script>

<template>
  <div class="password-container">
    <label for="password" class="password-label">Please enter your password:</label>
    <input
      type="password"
      id="password"
      class="password-input"
      placeholder="Enter your password"
      v-model="password"
      @input="onPasswordInput"
    />
    <div class="strength-container">
      <p v-if="strengthLabel.length">Password Strength: <strong :class="strengthLabel">{{ strengthLabel }}</strong></p>
      <p v-if="password.trim() !== ''">{{ scoreMessage }}</p> 
    </div>
    <ul v-if="feedback.length" class="password-feedback">
      <li v-for="(message, index) in feedback" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>

<style scoped>
.password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  margin: 0 auto;
}

.password-label {
  font-size: 1.3rem;
  font-weight: bold;
  color: #555;
}

.password-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.password-input:focus {
  border-color: #5d83c9;
}

.strength-container {
  font-size: 1rem;
  font-weight: bold;
  color: #555;
}

.strength-container strong {
  font-size: 1rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.strength-container .Strong {
  color: #4caf50;
}

.strength-container .Moderate {
  color: #ff9800;
}

.strength-container .Weak {
  color: #f44336;
}

.password-feedback {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #d32f2f;
  font-size: 1 rem;
}

.password-feedback li {
  margin: 0.25rem 0;
}
</style>
