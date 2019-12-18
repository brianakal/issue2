<template>
  <div class="w-full max-w-xs mx-auto">
    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p class="font-bold">This is an input log page</p>
      <p class="text-sm">Send Notification</p>
    </div>
    <div>
      <div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" @submit.prevent="sendMessage">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="from">
          From 
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="from" required/>
        </div>

        <div  class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="to">
          To 
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="to" required/>
        </div>

        <div  class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="to">
          Message 
          </label>
          <input  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="message" required/>
        </div>
        <div class="mb-4">
          <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Send Message</button>
        </div>
        </form>
        <p>
          <ul>
            <li v-for="(msg, i) in incomingMessages" :key="i">
              {{ msg.date }}
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
    from: 'person1',
    to: 'person2',
    message: 'Hello',
    incomingMessages: [],
    connection: null,
  }),

  mounted() {
    this.registerWS()
  },

  methods: {
    sendMessage() {
      const data = JSON.stringify({
        from: this.from,
        to: this.to,
        message: this.message,
      })

      this.connection.send(data)

    },

    /* async addLog() {
      const formData = new FormData()

      const response = await axios.post('logs/addLog/', formData)

      // this.items.push({
      //     name: this.newTask
      // })

      // this.newTask = ''
      // this.getList()
    }, */

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

        if (data.to === this.from) {
          this.incomingMessages.unshift({
            date: (new Date).toISOString(),
            message: data.message
          })

          this.notifier.success(data.message);
        }
      }
    },
  },
}
</script>

<style scoped>
.container {
  margin: auto;
  width: 800px;
}
.flex {
    display: flex;
}
.justify-between {
    justify-content: space-between;
}
</style>
