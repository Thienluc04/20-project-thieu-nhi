const playlist = document.querySelector('.playlist')
const cdThumb = document.querySelector('.cd-thumb')
const header = document.querySelector('header h2')
const repeatBtn = document.querySelector('.btn-repeat')
const prevBtn = document.querySelector('.btn-prev')
const playBtn = document.querySelector('.btn-toggle-play')
const nextBtn = document.querySelector('.btn-next')
const randomBtn = document.querySelector('.btn-random')
const progress = document.querySelector('.progress')
const audio = document.querySelector('#audio')
const cd = document.querySelector('.cd')
const player = document.querySelector('.player')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    

    songs: [
        {
            name: "Take Me To Church",
            singer: "Hozier",
            path: "./mp3/y2mate.com - Hozier  Take Me To Church Official Video.mp3",
            image: "./img/take-me-to-church.jpg"
          },
          {
            name: "Shape of You",
            singer: "Ed Sheeran",
            path: "./mp3/y2mate.com - Ed Sheeran  Shape of You Official Video.mp3",
            image:
              "./img/hqdefault.jpg"
          },
          {
            name: "Monsters",
            singer: "Katie Sky",
            path:
              "./mp3/y2mate.com - Katie Sky  Monsters Lyrics.mp3",
            image: "./img/monsters.jpg"
          },
          {
            name: "Lemon Tree",
            singer: "Fools Garden",
            path: "./mp3/y2mate.com - VietsubLyrics Lemon Tree  Fools Garden.mp3",
            image:
              "./img/lemon-tree.jpg"
          },
          {
            name: "Something Just Like This",
            singer: "The Chainsmokers x Coldplay",
            path: "./mp3/y2mate.com - The Chainsmokers  Coldplay  Something Just Like This Lyric.mp3",
            image:
              "./img/something-just-like-this.jpg"
          },
          {
            name: "That Girl",
            singer: "Olly Murs",
            path:
              "./mp3/y2mate.com - Vietsub  Kara That Girl  Olly Murs lyrics  Tik Tok.mp3",
            image:
              "./img/that-girl.jpg"
          },
          {
            name: "Bad Liar",
            singer: "Imagine Dragons",
            path: "./mp3/y2mate.com - Vietsub  Edit Bad Liar  Imagine Dragons live.mp3",
            image:
              "./img/Bad liar lyrics.jpg"
          }
    ],

    // Render playlist
    renderMusic: function() {
        const htmls = this.songs.map((song, index) =>{
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                            <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                            <div class="body">
                        <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })

        playlist.innerHTML = htmls.join('')
    },

    defineProperty: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return app.songs[app.currentIndex]
            }
        })
    },

    // Load song hiện tại 
    loadCurrentSong: function() {
        const currentSong = this.songs[this.currentIndex]
        header.innerText = currentSong.name
        cdThumb.style.backgroundImage = `url('${currentSong.image}')`
        audio.src = currentSong.path

    },

    nextSong: function() {
      this.currentIndex++
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
      }
      this.loadCurrentSong()
    },

    prevSong: function() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1
      }
      this.loadCurrentSong()
    },
    
    playRandomSong: function() {

    },

    handleEvent: function() {
      const cdWidth = cd.offsetWidth
      const _this = this

      // Animation cd quay khi play bài hát
      const animateCDThumb = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ],{
        duration: 20000,
        iterations: Infinity,
      })
      animateCDThumb.pause()

      // Khi click play
      playBtn.onclick = function() {
        if (_this.isPlaying) {
          audio.pause()
        }else {
          audio.play()
        }
      }

      // Khi bài hát chạy
      audio.onplay = function() {
        _this.isPlaying = true
        player.classList.add('playing')
        animateCDThumb.play()
      }

      // Khi bài hát dừng
      audio.onpause = function() {
        _this.isPlaying = false
        player.classList.remove('playing')
        animateCDThumb.pause()
      }
        
      // Update tiến độ bài hát
      audio.ontimeupdate = function() {
        if (audio.duration) {
          const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value = progressPercent
        }
      }

      // Khi tua bài hát
      progress.oninput = function() {
        const seekTime = audio.duration / 100 * progress.value
        audio.currentTime = seekTime
        audio.play()
      }

      // Khi nhấn next 
      nextBtn.onclick = function() {
        if (_this.isRandom) {
          _this.playRandomSong()
        }else {
          _this.nextSong()
        }
        audio.play()
        _this.renderMusic()
        
      }

      // Khi nhấn prev
      prevBtn.onclick = function() {
        if (_this.isRandom) {
          _this.playRandomSong()
        }else {
          _this.prevSong()
        }
        audio.play()
        _this.renderMusic()

      }

      // Khi nhấn vào bài hát muốn nghe
      playlist.onclick = function(e) {
        const songNode = e.target.closest('.song:not(.active)')

        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong()
          _this.renderMusic()
          audio.play()
        }
      }
    },

    

    start: function() {
        // Render playlist
        this.renderMusic()

        // Load bài hát hiện tại
        this.loadCurrentSong()

        // Lắng nghe các sự kiện
        this.handleEvent()
        
        this.defineProperty()
        
    }
}

app.start()