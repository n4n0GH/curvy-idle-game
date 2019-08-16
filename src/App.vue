<template>
  <div class="container-fluid">
    <div class="row vh-100 p-4 ">
      <div class="col-9 ">
          <div class="row h-75 ">
            <div class="col ">
              <div class="row h-50 ">
                <div class="col ">
                  <box-module></box-module>
                </div>
              </div>
              <div class="row h-50 ">
                <div class="col ">
                  <hack-upgrade></hack-upgrade>
                </div>
              </div>
            </div>
            <div class="col ">
              <transition name="fade" appear>
                <curvy></curvy>
              </transition>
            </div>
            <div class="col ">
              <transition name="fade" mode="out-in">
                <click-stats v-if="getGameStart()"></click-stats>
              </transition>
            </div>
          </div>
          <div class="row h-25 ">
            <div class="col ">
              <hack-game></hack-game>
            </div>
          </div>
      </div>
      <div class="col-3 h-100 ">
        <chat></chat>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Curvy from './components/MainClick.vue'
import ClickStats from './components/ClickStats.vue'
import Chat from './components/Chat.vue'
import BoxModule from './components/BoxModule.vue'
import HackUpgrade from './components/HackUpgrade.vue'
import HackGame from './components/HackGame.vue'

export default {
  methods: {
    ...mapGetters([
      'getGameStart'
    ])
  },
  components: {
    Curvy,
    'click-stats': ClickStats,
    Chat,
    'box-module': BoxModule,
    'hack-upgrade': HackUpgrade,
    'hack-game': HackGame
  }
};
</script>

<style>
  . {
    border: 1px solid red;
  }
</style>