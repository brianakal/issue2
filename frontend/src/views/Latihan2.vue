<template>
  <div class="w-full max-w-xs mx-auto">
    <div class="flex justify-between">
      <div>
        <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
          <p>Send Notification</p>
        </div>
        <br />
        <form  class="w-full max-w-lg" method="POST" @submit.prevent="sendMessage">
           <div class="flex flex-wrap -mx-3 mb-6">
             <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Me
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" v-model="me" required />
             </div>
             <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                To
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"  type="text" v-model="to" required/>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Message
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" v-model="message" required />
              <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like to annouce</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button  class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" @click="privateMessage">Private Message</button>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button  class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Public Message</button>
            </div>
          </div>
        </form>

        <p>
          <ul>
            <li v-for="(msg, i) in incomingMessages" :key="i">
              {{ msg.name }}
              {{ msg.message }}
            </li>
          </ul>
          <ul>
            <li v-for="(msg, i) in incomingPrivateMessages" :key="i">
              {{ msg.name }}
              {{ msg.message }}
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default {

  data: () => ({
    notifier: new Notyf(),
    me: 'person1',
    to: 'person2',
    message: 'Hello',
    incomingMessages: [],
    incomingPrivateMessages: [],
    connection: null,
  }),

  mounted() {
    this.registerWS()
  },

  methods: {
    sendMessage() {
      const data = JSON.stringify({
        private: false,
        from: this.me,
        to: this.to,
        message: this.message,
      })

      this.connection.send(data)
    },

    privateMessage() {
      const data = JSON.stringify({
        private: true,
        from: this.me,
        to: this.to,
        message: this.message,
      })

      const payload = {
        name: this.me,
        date: (new Date).toISOString(),
        message: this.message
      }

      this.incomingPrivateMessages.unshift(payload)

      this.connection.send(data)
    },

    registerWS() {
      const url = 'ws://localhost:8000'
      this.connection = new WebSocket(url)

      this.connection.onopen = event => {
        console.log('We are connected', event)
      }

      this.connection.onerror = error => {
        console.log(`WebSocket error: ${error}`)
      }

      this.connection.onmessage = event => {
        const data = JSON.parse(event.data)

        // console.log(data)

        if (data.private && data.to === this.me) {
          const payload = {
            name: data.from,
            date: (new Date).toISOString(),
            message: data.message
          }

          this.incomingPrivateMessages.unshift(payload)

          this.notifier.success(data.message);
        } else if (!data.private) {
          const payload = {
            name: data.from,
            date: (new Date).toISOString(),
            message: data.message
          }

          this.incomingMessages.unshift(payload)

          this.notifier.success(data.message);
        }
      }
    },
  },
}
</script>

<style scoped>
/* .container {
  margin: auto;
  width: 800px;
}
.flex {
    display: flex;
}
.justify-between {
    justify-content: space-between;
} */
</style>
