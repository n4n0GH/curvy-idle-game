<template>
  <div class="container-fluid" style="overflow:hidden">
    <!-- <button @click="cheat()">Cheat</button>
    <button @click="hurt()">Force Game Over</button> -->
    <div class="row vh-100 p-4 ">
      <div class="col-9 pr-0">
          <div class="row h-75 ">
            <div class="col ">
              <div class="row h-50 ">
                <div class="col ">
                  <transition name="fade" mode="out-in">
                    <div class="row" v-if="!getBoxActive() && getClickBalance() >= getBoxPrice()">
                      <div class="col">
                        <button 
                          class="btn btn-just btn-block"
                          @click="activateBox()"
                          >
                            Unbox ({{getBoxPrice()}} PP)
                          </button>
                      </div>
                    </div>
                    <box-module v-if="getBoxActive()"></box-module>
                  </transition>
                </div>
              </div>
              <div class="row h-50 ">
                <div class="col ">
                  <transition name="fade" mode="out-in">
                    <div class="row" v-if="!getHackActive() && getBoxPoints() >= getHackPrice()">
                      <div class="col p-0">
                        <button 
                          class="btn btn-just btn-block"
                          @click="activateHack()"
                          >
                            Boot CVM ({{getHackPrice()}} BP)
                          </button>
                      </div>
                    </div>
                    <hack-upgrade v-if="getHackActive()"></hack-upgrade>
                  </transition>
                </div>
              </div>
            </div>
            <div class="col pb-4">
              <transition name="fade" appear>
                <curvy></curvy>
              </transition>
            </div>
            <div class="col">
              <div class="row w-100 ml-1">
                <transition name="fade" mode="out-in">
                  <click-stats v-if="getGameStart()"></click-stats>
                </transition>
              </div>
              <div class="row w-100 ml-1">
                <hacker/>                
              </div>
            </div>
          </div>
          <div class="row h-25 mr-2">
            <div class="col ">
              <transition name="fade">
                <hack-game v-if="getHackActive()"></hack-game>
              </transition>
            </div>
          </div>
      </div>
      <div class="col-3 h-100 ">
        <transition name="fade" mode="out-in">
          <div class="row" v-if="!getChatActive() && getClickBalance() >= getChatPrice()">
            <div class="col">
              <button 
                class="btn btn-just btn-block"
                @click="activateChat()"
                >
                  Establish A.I. Logging ({{getChatPrice()}} PP)
                </button>
            </div>
          </div>
          <chat v-if="getChatActive()"></chat>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import EventBus from './eventBus.js'

import Curvy from './components/MainClick.vue'
import ClickStats from './components/ClickStats.vue'
import Chat from './components/Chat.vue'
import BoxModule from './components/BoxModule.vue'
import HackUpgrade from './components/HackUpgrade.vue'
import HackGame from './components/HackGame.vue'
import Agent232 from './components/Agent232.vue'

export default {
  methods: {
    ...mapGetters([
      'getGameStart',
      'getClickBalance',
      'getChatActive',
      'getChatPrice',
      'getBoxActive',
      'getBoxPoints',
      'getBoxPrice',
      'getHackActive',
      'getHackPrice',
      'getAutoActive',
      'getHackFwallIntegrity'
    ]),
    ...mapActions([
      'setClickBalanceSubtract',
      'setBoxBalanceSubtract',
      'setBoxActive',
      'setChatActive',
      'setChatMessage',
      'setHackActive',
      'setAutoActive',
      'setBoxPoints',
      'setHackFwallIntegrity'
    ]),
    activateBox(){
      if(this.getClickBalance() >= this.getBoxPrice()){
        this.setClickBalanceSubtract(this.getBoxPrice())
        this.setBoxActive()
      }
    },
    activateChat(){
      if(this.getClickBalance() >= this.getChatPrice()){
        this.setClickBalanceSubtract(this.getChatPrice())
        this.setChatActive()
        this.setChatMessage('hey, thanks for waking me up ヽ(‘ ∇‘ )ノ')
      }
    },
    activateHack(){
      if(this.getBoxPoints() >= this.getHackPrice()){
        this.setBoxBalanceSubtract(this.getHackPrice())
        this.setHackActive()
        if(!this.getChatActive()){
          this.setChatActive()
          this.setChatMessage('ooh, my vm is running. that means you got the console.log for free now, you cheapskate (¬‿¬)')
        }
        else {
          this.setChatMessage('aah, my vm. it\'s a bit rusty tho; you might want to upgrade the components to make it faster (✿◠‿◠)')
        }
        if(!this.getAutoActive()){
          this.setAutoActive()
          this.setChatMessage('my vm requires a constant stream of patting, so the A.P.S. is kind of compulsory for this to work out. lucky you (☉▵☉\' )')
          EventBus.$emit('autoActivated') // emits event to start autoclicker
        }
      }
    },
    cheat(){
      this.setClickBalanceSubtract(-100000)
      this.setBoxPoints(100000)
    },
    hurt(){
      this.setHackFwallIntegrity((this.getHackFwallIntegrity()+1)*-1)
    }
  },
  components: {
    Curvy,
    'click-stats': ClickStats,
    Chat,
    'box-module': BoxModule,
    'hack-upgrade': HackUpgrade,
    'hack-game': HackGame,
    'hacker': Agent232
  }
};
</script>