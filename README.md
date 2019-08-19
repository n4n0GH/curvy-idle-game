# curvy-idle-game
A short idle game to pass some time while waiting for soon(c) to end and Team JUST to drop JUST.Game

Game was made with VueJS.

![Image of Game Over screen](https://raw.githubusercontent.com/n4n0GH/curvy-idle-game/master/github-screen.gif)

Save her from an infinite wave of hackers! [Play it right here on Github!](https://n4n0gh.github.io/curvy-idle-game/)

## Local Setup
If you want to run this on your own machine and tweak some of the code, here's how to

```
git clone https://github.com/n4n0GH/curvy-idle-game
cd curvy-idle-game
npm install
npm run serve
```
Afterwards use any browser you want and visit localhost:8080

## TODO
### Critical
- [ ] firewall sometimes doesn't deplete 100%, making it impossible to lose
- [ ] attacker sometimes doesn't visually spawn, but mechanics do
- [x] create game over state
- [ ] if A.P.S. is activated, it won't auto-start on reload with saved states

### Non-Critical
- [x] make proper README.md with todo list and stuff
- [ ] restructure UI to be able to play on smartphones/tablets
- [ ] animated +n floaties stop animation if clicking too damn fast
- [ ] auto scroll chat module to newest message
- [ ] add fancy graphs for systems module to indicate usage
- [ ] add tween animation for numbers displayed
- [ ] add more messages to chat
- [ ] balancing

### Maybe
- [ ] add music/sounds to play on certain things like unlocks or hacker spawn