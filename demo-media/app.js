const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying:false,
    isRandom:false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
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
    setConfig: function (key, value) {
      this.config[key] = value
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
          return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `  
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth
        const _this = this

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
          { transform: 'rotate(360deg)' }
        ],{
          duration: 20000,
          iterations: Infinity,
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function  () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth  = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lí khi click play
        playBtn.onclick = function () {
          if (app.isPlaying) {
            audio.pause()
          } else {
            audio.play()
          }
        }

        // Khi song được play
        audio.onplay = function () {
          app.isPlaying = true
          player.classList.add('playing')
          cdThumbAnimate.play()
        }

        // Khi song pause
        audio.onpause = function () {
          app.isPlaying = false
          player.classList.remove('playing')
          cdThumbAnimate.pause()
        }

        // Update tiến độ bài hát
        audio.ontimeupdate = function () {
          if (audio.duration) {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
          }
        }

        // Xử lý khi tua song
        progress.oninput =  function () {
          const seekTime = audio.duration / 100 * progress.value
          audio.currentTime = seekTime
          audio.play()
        }

        // Khi next Song
        nextBtn.onclick = function () {
          if (app.isRandom) {
              app.playRandomSong()
          } else {
            app.nextSong()
          }
          audio.play()
          _this.render()
          _this.scrollToActiveSong()
        }

        // Khi prev Song
        prevBtn.onclick = function () {
          if (app.isRandom) {
              app.playRandomSong()
          } else {
            app.prevSong()
          }
          audio.play()
          _this.render()
          _this.scrollToActiveSong()
        }

        // Khi random Song
        randomBtn.onclick = function () {
          _this.isRandom = !app.isRandom
          _this.setConfig('isRandom', _this.isRandom)
          randomBtn.classList.toggle('active', app.isRandom)
        }

        // Xử lý repeat song
        repeatBtn.onclick = function () {
          _this.isRepeat = !_this.isRepeat
          _this.setConfig('isRepeat', _this.isRepeat)
          repeatBtn.classList.toggle('active', app.isRepeat)
        }

        // Xử lý next song khi audio hết
        audio.onended = function () {
          if(_this.isRepeat) {
            audio.play()
          }else {
            nextBtn.click()
          }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
          const songNode = e.target.closest('.song:not(.active)')

          if (songNode || e.target.closest('.option')) {
            // Xử lý khi click vào song
            if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }

            // Xử lý khi click vào option
          }
        }

    },

    scrollToActiveSong: function () {
      setTimeout(() => {
        if (this.currentIndex <= 3) {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        } else {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 300);
    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function () {
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat

      // Object.assign(this.this.config)
    },

    nextSong: function () {
      this.currentIndex ++
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong()
    },

    prevSong: function () {
      this.currentIndex --
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1
      }
      this.loadCurrentSong()
    },

    playRandomSong: function () {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * this.songs.length)
      } while (newIndex === this.currentIndex)

      this.currentIndex = newIndex
      this.loadCurrentSong()
      console.log(newIndex)
    },

    start: function () {
      // Gắn cầu hình từ config vào ứng dụng
      this.loadConfig()
    
      // Định nghĩa các thuộc tính cho object
      this.defineProperties()

      // Lắng nghe / xử lý các sự kiện (DOM events)
      this.handleEvents()

      // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
      this.loadCurrentSong()

      //Render playlist
      this.render()

      // Hiển thị trạng thái ban đầu của button Repeat & random
      randomBtn.classList.toggle('active', this.isRandom)
      repeatBtn.classList.toggle('active', this.isRepeat)
    }
}



app.start()