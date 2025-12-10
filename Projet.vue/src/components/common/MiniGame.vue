<template>
  <div class="mini-game-overlay">
    <div class="mini-game-content">
      <!-- Close button + header -->
      <div class="header-bar">
        <div class="term-header">{{ typedHeader }}</div>
        <button
          class="close-x"
          @click="handleClose"
          @mouseover="playSound(hoverAudio)"
        >
          ✕
        </button>
      </div>

      <!-- Attempts line -->
      <div class="term-attempts">
        <span>{{ attemptsRemaining }} ESSAIS RESTANTS:</span>
        <span
          v-for="n in maxAttempts"
          :key="n"
          class="attempt-block"
          :class="{ used: n > attemptsRemaining }"
        ></span>
      </div>

      <!-- GRID + LOG AREA -->
      <div class="term-grid-layout">
        <div class="addresses">
          <ul>
            <li v-for="addr in leftAddresses" :key="addr">{{ addr }}</li>
          </ul>
        </div>

        <div class="char-lines">
          <div
            class="char-line"
            v-for="(row, rIndex) in visibleGridRows"
            :key="rIndex"
          >
            <span
              v-for="(cell, cIndex) in row"
              :key="cIndex"
              class="char-span"
              :class="{
                word: cell.isWord,
                used: cell.used,
                hovered: isHovered(cell),
              }"
              @click="onCellClick(cell)"
              @mouseover="hoverWord(cell)"
              @mouseleave="hoverWord(null)"
            >
              {{ cell.text }}
            </span>
          </div>
        </div>

        <div class="addresses">
          <ul>
            <li v-for="addr in rightAddresses" :key="addr">{{ addr }}</li>
          </ul>
        </div>

        <div class="log-panel">
          <div class="log-line" v-for="(log, index) in logs" :key="index">
            <div>&gt; {{ log.guess }}</div>
            <div v-if="!log.success">&gt; ACCÈS REFUSÉ</div>
            <div v-if="!log.success">
              &gt; {{ log.matches }}/{{ secretWord.length }} CORRESPONDANCES.
            </div>
            <div v-if="log.success">&gt; ACCÈS AUTORISÉ</div>
          </div>
        </div>
      </div>

      <!-- END MESSAGE -->
      <div v-if="gameOver" class="end-message">
        <template v-if="success">
          <p>&gt; CONNEXION DU TERMINAL RÉUSSIE...</p>
          <button
            class="continue-btn"
            @click="handleContinue"
            @mouseover="playSound(hoverAudio)"
          >
            Continuer
          </button>
        </template>
        <template v-else>
          <p>
            &gt; TERMINAL VERROUILLÉ<br />
            &gt; ASSISTANCE TECHNIQUE REQUISE
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useStoryStore } from "@/stores/storyStore";
import clickSoundFile from "@/Sounds/futuristic_click.mp3";
import hoverSoundFile from "@/Sounds/futuristic_hover.mp3";
import clickCharSoundFile from "@/Sounds/minigame_click.mp3";
import endMessageSoundFile from "@/Sounds/minigame_win.mp3";

const CHAR_SET = [
  "?",
  "$",
  "_",
  "{",
  "}",
  "^",
  "!",
  "|",
  "-",
  "=",
  "+",
  "<",
  ">",
  "#",
  ":",
  ";",
  "*",
  ".",
  "(",
  ")",
  "`",
  ",",
  "@",
];

const WORD_LIST = [
  "STARK",
  "BURST",
  "CABLE",
  "SUGAR",
  "SHAVE",
  "DONOR",
  "STUFF",
  "MATCH",
  "DAIRY",
  "ALLOW",
  "RAISE",
  "LAYER",
  "CHALK",
  "START",
  "MOUTH",
  "LUNCH",
  "TWIST",
  "DRINK",
  "SPARE",
  "VOICE",
  "ELECT",
  "HUMOR",
  "LEASE",
  "BRINK",
  "STOOL",
  "PAUSE",
  "VALID",
  "BLEED",
  "RIFLE",
  "TOAST",
  "POINT",
];

export default {
  name: "MiniGame",
  emits: ["close", "done"],
  props: { minigameId: { type: String, required: true } },
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
      headerText:
        "SYSTÈME-NUCLÉON v3.1\n> PROTOCOLE D’ACCÈS VERROUILLÉ\n> ENTRER LE MOT DE PASSE",
      headerIndex: 0,
      headerTimer: null,
      clickAudio: new Audio(clickSoundFile),
      hoverAudio: new Audio(hoverSoundFile),
      clickCharAudio: new Audio(clickCharSoundFile),
      endMessageAudio: new Audio(endMessageSoundFile),
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
visibleGridRows() {
  return this.gridRows; // show all rows
},
  },
  created() {
    const storyStore = useStoryStore();
    this.config = storyStore.storyData.find(
      (c) => c.id === this.minigameId && c.type === "game"
    );
    this.initGame();
  },
  beforeUnmount() {
    if (this.headerTimer) clearInterval(this.headerTimer);
  },
  methods: {
    playSound(audio) {
      audio.currentTime = 0;
      audio.play();
    },
    initGame() {
      this.maxAttempts = this.config.maxAttempts;
      this.attemptsRemaining = this.config.maxAttempts;
      this.gameOver = false;
      this.success = false;
      this.logs = [];
      this.headerIndex = this.headerText.length;
      this.generateAddresses();
      this.generateGrid();
      this.placeWords();
    },
    generateAddresses() {
      this.leftAddresses = [];
      this.rightAddresses = [];
      for (let i = 0; i < this.rows; i++) {
        this.leftAddresses.push(`FX01${String(i).padStart(2, "0")}`);
        this.rightAddresses.push(`FX02${String(i).padStart(2, "0")}`);
      }
    },
    generateGrid() {
      this.cells = [];
      for (let i = 0; i < this.rows * this.cols; i++) {
        const char = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
        this.cells.push({
          text: char,
          isWord: false,
          used: false,
          wordIndex: null,
        });
      }
    },
    placeWords() {
      const pool =
        this.config.words?.length > 0 ? [...this.config.words] : [...WORD_LIST];
      const wordCount = this.config.wordCount;
      const words = [];
      for (let i = 0; i < wordCount; i++) {
        if (!pool.length) break;
        const idx = Math.floor(Math.random() * pool.length);
        words.push(pool[idx]);
        pool.splice(idx, 1);
      }
      this.secretWord = this.config.password;
      if (!words.includes(this.secretWord)) words[0] = this.secretWord;

      const usedPositions = new Set();
      let wordIndex = 0;
      for (const word of words) {
        let placed = false,
          safety = 0;
        while (!placed && safety < 1000) {
          safety++;
          const row = Math.floor(Math.random() * this.rows);
          const maxCol = this.cols - word.length;
          if (maxCol < 0) break;
          const col = Math.floor(Math.random() * (maxCol + 1));
          let conflict = false;
          for (let i = 0; i < word.length; i++)
            if (usedPositions.has(`${row},${col + i}`)) conflict = true;
          if (conflict) continue;
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
    onCellClick(cell) {
      if (this.gameOver || !cell.isWord || cell.used) return;

      this.playSound(this.clickCharAudio);

      const wordIndex = cell.wordIndex;
      const wordCells = this.cells.filter((c) => c.wordIndex === wordIndex);
      const guess = wordCells.map((c) => c.text).join("");
      wordCells.forEach((c) => (c.used = true));

      if (guess === this.secretWord) {
        this.logs.unshift({
          guess,
          matches: this.secretWord.length,
          success: true,
        });
        this.success = true;
        this.gameOver = true;
        this.playSound(this.endMessageAudio);
      } else {
        const matches = this.countMatchingChars(guess, this.secretWord);
        this.logs.unshift({ guess, matches, success: false });
        this.attemptsRemaining--;
        if (this.attemptsRemaining <= 0) {
          this.gameOver = true;
          this.success = false;
          this.playSound(this.endMessageAudio);
          this.$emit("done", { success: false });
        }
      }
    },
    countMatchingChars(wordA, wordB) {
      let count = 0;
      for (let i = 0; i < wordA.length; i++)
        if (wordB.includes(wordA[i])) count++;
      return count;
    },
    handleClose() {
      this.playSound(this.clickAudio);
      this.$emit("close");
    },
    handleContinue() {
      this.playSound(this.clickAudio);
      if (this.success)
        this.$emit("done", { success: true, target: this.config.success });
    },
    hoverWord(cell) {
      const newWordIndex = cell?.isWord ? cell.wordIndex : null;
      if (newWordIndex !== this.hoveredWordIndex && newWordIndex !== null) {
        this.playSound(this.hoverAudio);
      }
      this.hoveredWordIndex = newWordIndex;
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
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  align-items: center; /* center vertically */
  justify-content: center; /* center horizontally */
} /* MAIN BOX */
.mini-game-content {
  width: 90%;
  height: 88%;
  max-width: 1100px;
  max-height: calc(85vh - 80px); /* do NOT grow higher than the screen */
  background-color: rgb(17, 17, 17);
  border: 2px solid #03ab5e;
  color: #03ab5e;
  font-family: "Courier New", monospace;
  padding: 40px; /* a bit smaller than 80px */
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* stop horizontal/vertical bleed */
  box-shadow: 0 0 25px 5px rgba(3, 171, 94, 0.5),
    /* halo vert */ 0 0 60px 15px rgba(0, 0, 0, 0.9),
    /* ombre profonde */ inset 0 0 20px rgba(0, 0, 0, 0.7),
    /* ombre interne pour effet vitre */ inset 0 0 40px rgba(3, 171, 94, 0.15); /* lueur interne légère */
} /* inner scroll area: only this part can scroll */
.terminal-frame {
  width: 100%;
  max-height: calc(85vh - 80px);
  overflow-y: auto; /* ⬇️ add this */
  padding-bottom: 24px;
  box-sizing: border-box;
} /* Close button */
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
}
.close-btn:hover {
  background-color: #03ab5e;
  color: #000;
  transform: scale(1.05);
} /* HEADER + ATTEMPTS */
.term-header {
  white-space: pre-wrap;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.term-attempts {
  font-size: 0.9rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.attempt-block {
  width: 12px;
  height: 12px;
  background-color: #1aff80;
  margin-left: 3px;
}
.attempt-block.used {
  background-color: #044422;
} /* GRID + LOG layout */
.term-grid-layout {
  margin-top: 10px;
  display: grid; /* force columns to stay inside width */
  grid-template-columns: 80px minmax(0, 1fr) 80px 200px;
  gap: 12px;
  align-items: flex-start;
} /* Addresses */
.addresses ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.addresses li {
  font-size: 0.87rem;
  margin: 1px 0;
} /* === new, line-based “Fallout” layout === */
.char-lines {
  font-size: 0.87rem;
  line-height: 1.3;
  width: 100%;
}
.char-line {
  white-space: pre;
} /* each slot is exactly one character wide */
.char-span {
  display: inline-block;
  width: 1ch;
  text-align: center;
} /* it's part of a word (clickable) */
.char-span.word {
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
} /* whole word hovered */
.char-span.word.hovered {
  background: #1aff80;
  color: #000;
} /* already tried word */
.char-span.used {
  color: #555;
} /* Log panel */
.log-panel {
  font-size: 0.87rem;
  border-left: 1px solid #03ab5e;
  padding-left: 8px;
  max-height: 260px; /* own scroll, does not push layout */
  overflow-y: auto;
  word-break: break-word; /* long text wraps instead of pushing width */
}
.log-line {
  margin-bottom: 8px;
} /* End message */
.end-message {
  margin-top: 20px;
  font-size: 0.9rem;
}
.end-message p {
  margin: 4px 0;
}
.continue-btn {
  background-color: rgb(17, 17, 17);
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  margin: 0.5rem 0;
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
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.close-x {
  background: none;
  border: 2px solid #03ab5e;
  color: #03ab5e;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 10px;
  height: fit-content;
  font-family: "Courier New", monospace;
  transition: 0.2s ease;
}
.close-x:hover {
  background: #03ab5e;
  color: black;
}
@media (max-width: 1080px) {
  /* Mise à l'échelle générale */
  .mini-game-content {
    width: 92%;
    padding: 1rem;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }
  .terminal-frame {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 2rem;
  } /* En-tête plus lisible */
  .term-header {
    font-size: 1.1rem;
  }
  .term-attempts {
    font-size: 1rem;
  } /* ENLÈVE LES BARRES LATÉRALES (addresses) */
  .addresses {
    display: none;
  } /* SUPPRIME LA GRID COMPLEXE — ON GARDE SEULEMENT LE CENTRE */
  .term-grid-layout {
    display: block;
    padding: 0;
  } /* Zone centrale : caractères */
  .char-lines {
    font-size: 1rem; /* plus gros */
    line-height: 1.3;
    white-space: pre-wrap;
    width: 100%;
  }
  .char-span {
    width: auto;
  } /* Log panel en bas, simple et lisible */
  .log-panel {
    border-top: none; /* supprime la ligne */
    padding-top: 8px;
    margin-top: 16px;
    font-size: 1rem;
    max-height: 100px;
    overflow-y: auto;
  }
  .log-line {
    margin-bottom: 6px;
  } /* Bouton X */
  .close-x {
    font-size: 15px;
  } /* Bouton CONTINUER plus petit et ne déborde pas */
  .continue-btn {
    width: 80%;
    max-width: 300px;
    font-size: 1rem;
    padding: 10px;
    align-self: center; /* centre horizontalement */
  }
}
</style>
