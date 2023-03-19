<template>
  <q-layout view="hHh lpR fFf" class="bg-white bfb__layout">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" title="Bowling for Burgers">
            <span class="logo"
              ><span class="logo__type">BFB</span
              ><span class="logo__emoji">🍔</span></span
            >
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import "quasar/dist/quasar.min.css";
import "@quasar/extras/material-icons/material-icons.css";

export default {
  name: "BfbApp",
  data() {
    return {};
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Courier New", Courier, monospace;
}

.q-toolbar__title a {
  text-decoration: none;
}

.bfb__layout .q-layout__section--marginal {
  background-color: #9e9e9e;
}

.logo__type {
  color: gold;
  font-family: "Georgia", "Times New Roman", "Times", serif;
  font-weight: bold;
  font-size: 24px;
  font-style: italic;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0.25px #000;
}

.logo__emoji {
  font-size: 21px;
  margin-left: 6px;
}

@media print {
  body {
    margin: 0;
    padding: 0;
  }

  .q-header {
    display: none;
  }

  .q-page-container {
    padding-top: 0 !important;
  }
}
</style>
