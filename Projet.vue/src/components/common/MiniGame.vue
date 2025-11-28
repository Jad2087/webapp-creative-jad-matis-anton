<template>
  <div class="mini-game-overlay">
    <div class="mini-game-content">

      <!-- Close button -->
      <button class="close-btn" @click="handleClose">Fermer</button>

      <!-- MAIN TERMINAL AREA -->
      <div class="terminal-frame">
        <!-- Header (typed) -->
        <div class="term-header">
          {{ typedHeader }}
        </div>

        <!-- Attempts line + blocks -->
        <div class="term-attempts">
          <span>{{ attemptsRemaining }} ATTEMPTS REMAINING:</span>
          <span v-for="n in maxAttempts" :key="n" class="attempt-block" :class="{ used: n > attemptsRemaining }"></span>
        </div>

        <!-- GRID + LOG AREA -->
        <div class="term-grid-layout">
          <!-- Left address column -->
          <div class="addresses">
            <ul>
              <li v-for="addr in leftAddresses" :key="addr">{{ addr }}</li>
            </ul>
          </div>

          <!-- Character lines -->
          <div class="char-lines">
            <div class="char-line" v-for="(row, rIndex) in visibleGridRows" :key="rIndex">
              <span v-for="(cell, cIndex) in row" :key="cIndex" class="char-span" :class="{
                word: cell.isWord,
                used: cell.used,
                hovered: isHovered(cell)
              }" @click="onCellClick(cell)" @mouseover="hoverWord(cell)" @mouseleave="hoverWord(null)">
                {{ cell.text }}
              </span>
            </div>
          </div>



          <!-- Right address column -->
          <div class="addresses">
            <ul>
              <li v-for="addr in rightAddresses" :key="addr">{{ addr }}</li>
            </ul>
          </div>

          <!-- Log / feedback panel -->
          <div class="log-panel">
            <div class="log-line" v-for="(log, index) in logs" :key="index">
              <div>&gt; {{ log.guess }}</div>
              <div v-if="!log.success">&gt; ENTRY DENIED</div>
              <div v-if="!log.success">
                &gt; {{ log.matches }}/{{ secretWord.length }} CORRECT.
              </div>
              <div v-if="log.success">&gt; ACCESS GRANTED</div>
            </div>
          </div>
        </div>

        <!-- END MESSAGE -->
        <div v-if="gameOver" class="end-message">
          <template v-if="success">
            <p>&gt; TERMINAL CONNECTION SUCCESSFUL...</p>
            <button class="continue-btn" @click="handleContinue">
              CONTINUER
            </button>
          </template>

          <template v-else>
            <p>
              &gt; TERMINAL LOCKED<br />
              &gt; PLEASE CONTACT AN ADMINISTRATOR
            </p>
            <!-- pas de bouton ici : on laisse le parent afficher Échec -->
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useStoryStore } from "@/stores/storyStore";


const CHAR_SET = [
  "?", "$", "_", "{", "}", "^", "!", "|", "-", "=", "+",
  "<", ">", "#", ":", ";", "*", ".", "(", ")", "`", ",", "@"
];

const WORD_LIST = [
  "STARK", "BURST", "CABLE", "SUGAR", "SHAVE", "DONOR", "STUFF", "MATCH",
  "DAIRY", "ALLOW", "RAISE", "LAYER", "CHALK", "START", "MOUTH", "LUNCH",
  "TWIST", "DRINK", "SPARE", "VOICE", "ELECT", "HUMOR", "LEASE", "BRINK",
  "STOOL", "PAUSE", "VALID", "BLEED", "RIFLE", "TOAST", "POINT"
];

export default {
  name: "MiniGame",
  emits: ["close", "done"],

  props: {
    minigameId: { type: String, required: true }
  },


  data() {
    return {
      hoveredWordIndex: null,

      config: null,

      maxAttempts: null,
      attemptsRemaining: null,

      rows: 15,
      cols: 36,
      cells: [],

      leftAddresses: [],
      rightAddresses: [],

      logs: [],
      secretWord: "",
      gameOver: false,
      success: false,

      // typing header
      headerText:
        "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\nENTER PASSWORD NOW",
      headerIndex: 0,
      headerTimer: null,
    };

  },

  computed: {
    typedHeader() {
      return this.headerText.slice(0, this.headerIndex);
    },

    gridRows() {
      const rows = [];
      for (let r = 0; r < this.rows; r++) {
        const start = r * this.cols;
        rows.push(this.cells.slice(start, start + this.cols));
      }
      return rows;
    },

    // show all rows except the last one → removes the “stray” bottom line
    visibleGridRows() {
      return this.gridRows.slice(0, this.gridRows.length - 1);
    },
  },


  created() {
    const storyStore = useStoryStore();
    this.config = storyStore.storyData.find(
      (c) => c.id === this.minigameId && c.type === "game"
    );

    // ⚠️ Load config FIRST, THEN start the game
    this.initGame();
  },


  beforeUnmount() {
    if (this.headerTimer) {
      clearInterval(this.headerTimer);
    }
  },

  methods: {
    initGame() {
      this.attemptsRemaining = this.maxAttempts;
      this.gameOver = false;
      this.success = false;
      this.logs = [];
      this.headerIndex = 0;

      this.maxAttempts = this.config.maxAttempts;
      this.attemptsRemaining = this.config.maxAttempts;


      // 1) generate addresses
      this.generateAddresses();

      // 2) generate grid with random chars
      this.generateGrid();

      // 3) place words & choose secret word
      this.placeWords();

      // 4) start typing header
      this.startHeaderTyping();
    },

    generateAddresses() {
      this.leftAddresses = [];
      this.rightAddresses = [];
      for (let i = 0; i < this.rows; i++) {
        // just mimic FX01xx pattern
        const addrLeft = `FX01${String(i).padStart(2, "0")}`;
        const addrRight = `FX02${String(i).padStart(2, "0")}`;
        this.leftAddresses.push(addrLeft);
        this.rightAddresses.push(addrRight);
      }
    },

    generateGrid() {
      this.cells = [];
      for (let i = 0; i < this.rows * this.cols; i++) {
        const char =
          CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
        this.cells.push({
          text: char,
          isWord: false,
          used: false,
          wordIndex: null,   // <--- new
        });
      }
    },

    placeWords() {
      const wordCount = this.config.wordCount; // how many words in the grid
      const pool = [...WORD_LIST];     // all possible words
      const words = [];

      // pick some random words from the list
      for (let i = 0; i < wordCount; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        words.push(pool[idx]);
        pool.splice(idx, 1);
      }

      // ✅ fixed secret word
      this.secretWord = this.config.password;

      // make sure the fixed secret word is actually in the list of words
      if (!words.includes(this.secretWord)) {
        words[0] = this.secretWord;
      }

      const usedPositions = new Set();

      let wordIndex = 0;

      for (const word of words) {
        let placed = false;
        let safety = 0; // just in case, avoid infinite loop

        while (!placed && safety < 1000) {
          safety++;

          const row = Math.floor(Math.random() * this.rows);

          // horizontal ONLY
          const maxCol = this.cols - word.length;
          if (maxCol < 0) break; // word longer than row, bail out

          const col = Math.floor(Math.random() * (maxCol + 1));

          // check for conflicts
          let conflict = false;
          for (let i = 0; i < word.length; i++) {
            const pos = `${row},${col + i}`;
            if (usedPositions.has(pos)) {
              conflict = true;
              break;
            }
          }
          if (conflict) continue;

          // place the word horizontally
          for (let i = 0; i < word.length; i++) {
            const pos = `${row},${col + i}`;
            usedPositions.add(pos);
            const index = row * this.cols + (col + i);
            this.cells[index].text = word[i];
            this.cells[index].isWord = true;
            this.cells[index].wordIndex = wordIndex;
          }

          placed = true;
        }

        wordIndex++;
      }
    },


    startHeaderTyping() {
      if (this.headerTimer) {
        clearInterval(this.headerTimer);
      }
      this.headerTimer = setInterval(() => {
        if (this.headerIndex < this.headerText.length) {
          this.headerIndex++;
        } else {
          clearInterval(this.headerTimer);
          this.headerTimer = null;
        }
      }, 35); // speed similar to original
    },

    onCellClick(cell) {
      if (this.gameOver) return;
      if (!cell.isWord) return;
      if (cell.used) return;

      const wordIndex = cell.wordIndex;
      const wordCells = this.cells.filter(c => c.wordIndex === wordIndex);
      const guess = wordCells.map(c => c.text).join("");

      // marque les lettres comme utilisées
      wordCells.forEach(c => {
        c.used = true;
      });

      if (guess === this.secretWord) {
        const matches = this.secretWord.length;
        this.logs.unshift({
          guess,
          matches,
          success: true,
        });
        this.success = true;
        this.gameOver = true;
        // ❌ NE PAS appeler this.emitDone() ici
      } else {
        const matches = this.countMatchingChars(guess, this.secretWord);
        this.logs.unshift({
          guess,
          matches,
          success: false,
        });

        this.attemptsRemaining--;
        if (this.attemptsRemaining <= 0) {
          this.gameOver = true;
          this.success = false;
          this.emitDone();   // ✅ on garde ça pour l’échec
        }
      }
    },



    countMatchingChars(wordA, wordB) {
      // similar spirit to original: count same letters (any position)
      let count = 0;
      for (let i = 0; i < wordA.length; i++) {
        const ch = wordA[i];
        if (wordB.includes(ch)) {
          count++;
        }
      }
      return count;
    },

    emitDone() {
      this.$emit("done", { success: this.success });
    },

    handleClose() {
      this.$emit("close");
    },

    handleContinue() {
      // si le joueur a réussi le mini-jeu
      if (this.success) {
        // 🔽 va au chapitre "intro2" (Acte 2 — Cauchemar)
        this.$router.push({
          name: "game",
          params: { id: this.config.success },
        });

      } else {
        // si jamais on montre le bouton sans succès, on ferme juste
        this.handleClose();
      }
    },



    hoverWord(cell) {
      this.hoveredWordIndex = cell && cell.isWord ? cell.wordIndex : null;
    },

    isHovered(cell) {
      return cell.isWord && cell.wordIndex === this.hoveredWordIndex;
    },

  },



};
</script>

<style scoped>
.mini-game-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  /* center vertically */
  justify-content: center;
  /* center horizontally */
}

/* MAIN BOX */
.mini-game-content {
  width: 90%;
  max-width: 1100px;
  max-height: 85vh;
  /* do NOT grow higher than the screen */
  background: #111;
  border: 2px solid #03ab5e;
  color: #03ab5e;
  font-family: "Courier New", monospace;
  padding: 40px;
  /* a bit smaller than 80px */
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  /* stop horizontal/vertical bleed */
}

/* inner scroll area: only this part can scroll */
.terminal-frame {
  width: 100%;
  max-height: calc(85vh - 80px);
  overflow-y: auto;

  /* ⬇️ add this */
  padding-bottom: 24px;
  box-sizing: border-box;
}

/* Close button */
.close-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin: 0.5rem;
  cursor: pointer;
  width: 250px;
  transition: 0.3s ease;
  font-family: "Courier New", monospace;
}

.close-btn:hover {
  background-color: #03ab5e;
  color: #000;
  transform: scale(1.05);
}

/* HEADER + ATTEMPTS */
.term-header {
  white-space: pre-wrap;
  font-size: 1.1rem;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.term-attempts {
  font-size: 1rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.attempt-block {
  width: 14px;
  height: 14px;
  background-color: #1aff80;
  margin-left: 3px;
}

.attempt-block.used {
  background-color: #044422;
}

/* GRID + LOG layout */
.term-grid-layout {
  margin-top: 10px;
  display: grid;
  /* force columns to stay inside width */
  grid-template-columns: 80px minmax(0, 1fr) 80px 200px;
  gap: 12px;
  align-items: flex-start;
}

/* Addresses */
.addresses ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.addresses li {
  font-size: 0.9rem;
  margin: 2px 0;
}

/* === new, line-based “Fallout” layout === */
.char-lines {
  font-size: 0.95rem;
  line-height: 1.3;
  width: 100%;
}

.char-line {
  white-space: pre;
}

/* each slot is exactly one character wide */
.char-span {
  display: inline-block;
  width: 1ch;
  text-align: center;
}

/* it's part of a word (clickable) */
.char-span.word {
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

/* whole word hovered */
.char-span.word.hovered {
  background: #1aff80;
  color: #000;
}

/* already tried word */
.char-span.used {
  color: #555;
}



/* Log panel */
.log-panel {
  font-size: 0.9rem;
  border-left: 1px solid #03ab5e;
  padding-left: 8px;
  max-height: 260px;
  /* own scroll, does not push layout */
  overflow-y: auto;
  word-break: break-word;
  /* long text wraps instead of pushing width */
}

.log-line {
  margin-bottom: 8px;
}

/* End message */
.end-message {
  margin-top: 20px;
  font-size: 1rem;
}

.end-message p {
  margin: 4px 0;
}

.continue-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin: 0.5rem;
  cursor: pointer;
  width: 250px;
  transition: 0.3s ease;
  font-family: "Courier New", monospace;
}

.continue-btn:hover {
  background-color: #03ab5e;
  color: #000;
  transform: scale(1.05);
}
</style>
