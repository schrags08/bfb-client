<template>
  <q-layout view="hHh lpR fFf" class="bg-white bfb__layout">
    <q-header bordered v-if="!idle">
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
      <router-view v-show="!idle"></router-view>
      <div class="saver" v-show="idle">
        <div class="saver-logo">
          <span class="logo">
            <span class="logo__type">BFB</span>
            <span class="logo__emoji">🍔</span></span
          >
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import "quasar/dist/quasar.min.css";
import "@quasar/extras/material-icons/material-icons.css";

export default {
  name: "BfbApp",
  data() {
    return {
      idle: false,
      timeoutId: null,
      screenSaverDelayMs: 120000,
    };
  },
  methods: {
    onMouseMove() {
      this.resetTimer();
    },
    onIdle() {
      this.idle = true;
    },
    resetTimer() {
      clearTimeout(this.timeoutId);

      this.idle = false;
      this.timeoutId = setTimeout(this.onIdle, this.screenSaverDelayMs);
    },
  },
  mounted() {
    this.resetTimer();
    window.addEventListener("mousemove", this.onMouseMove);
  },
  destroyed() {
    clearTimeout(this.timeoutId);
    window.removeEventListener("mousemove", this.onMouseMove);
  },
};
</script>
<style lang="scss">
:root {
  --ss-logo-width: 100px;
  --ss-logo-height: 40px;
}

html,
body {
  height: 100%;
}

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

.saver {
  background-color: #9e9e9e;
  position: absolute;
  height: 100%;
  width: 100%;
}

.saver-logo {
  width: var(--ss-logo-width);
  height: var(--ss-logo-height);
  animation: moveX 5s linear 0s infinite alternate,
    moveY 6.3s linear 0s infinite alternate;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* animation keyframes */
@-webkit-keyframes moveX {
  /* screen width - width of image */
  from {
    left: 0;
  }
  to {
    left: calc(100% - var(--ss-logo-width));
  }
}
@-moz-keyframes moveX {
  from {
    left: 0;
  }
  to {
    left: calc(100% - var(--ss-logo-width));
  }
}
@-o-keyframes moveX {
  from {
    left: 0;
  }
  to {
    left: calc(100% - var(--ss-logo-width));
  }
}
@keyframes moveX {
  from {
    left: 0;
  }
  to {
    left: calc(100% - var(--ss-logo-width));
  }
}
@-webkit-keyframes moveY {
  /* screen height - height of image */
  from {
    top: calc(100% - var(--ss-logo-height));
  }
  to {
    top: 0;
  }
}
@-moz-keyframes moveY {
  from {
    top: calc(100% - var(--ss-logo-height));
  }
  to {
    top: 0;
  }
}
@-o-keyframes moveY {
  from {
    top: calc(100% - var(--ss-logo-height));
  }
  to {
    top: 0;
  }
}
@keyframes moveY {
  from {
    top: calc(100% - var(--ss-logo-height));
  }
  to {
    top: 0;
  }
}
</style>
