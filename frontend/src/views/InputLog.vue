<template>
  <div class="about">
    <h1>This is an log page</h1>
    <div class="flex justify-between">
      <div>
        <h1>Send Notification</h1>
        <form method="POST" @submit.prevent="sendMessage">
        <p>
          From <input type="text" v-model="from" required/>
        </p>
        <p>
          To <input type="text" v-model="to" required/>
        </p>
        <p>
          Message <input type="text" v-model="message" required/>
        </p>
        <button type="submit">Send Message</button>
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

      // const formData = new FormData()

      // const response = await axios.post('logs/addLog/', formData)


    },

    async addLog() {
      const formData = new FormData()

      const response = await axios.post('logs/addLog/', formData)

      // this.items.push({
      //     name: this.newTask
      // })

      // this.newTask = ''
      // this.getList()
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
