<template>
  <div id="app">
    <!-- 
    <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/latihan">Latihan</router-link> | 
      <router-link to="/latihan2">Latihan 2</router-link> <br />
      <router-link to="/inputLog">Input Log</router-link> |
      <router-link to="/inputPengumuman">Kirim Pengumuman</router-link> |
      <router-link to="/cobaTailwind">Coba Tailwind</router-link>
    </div>
     -->
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <span class="font-semibold text-xl tracking-tight">Real Time Notification</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Home</router-link>
          <router-link to="/latihan" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Latihan</router-link>
          <router-link to="/latihan2" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Latihan 2</router-link>
          <router-link to="/inputLog" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Input Log</router-link>
          <router-link to="/inputPengumuman" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Kirim Pengumuman</router-link>
          <router-link to="/terimaPengumuman" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Terima Pengumuman</router-link>
          <router-link to="/cobaTailwind" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Coba Tailwind</router-link>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
