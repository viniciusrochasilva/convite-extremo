const audio = document.getElementById("audioFundo");
const botaoAudio = document.getElementById("botaoAudio");
const iconeAudio = document.getElementById("iconeAudio");
const textoAudio = document.getElementById("textoAudio");

// Volume do áudio.
// 0.55 representa 55%.
audio.volume = 0.55;

function atualizarBotaoAudio(estaTocando) {
  botaoAudio.setAttribute(
    "aria-pressed",
    String(estaTocando)
  );

  if (estaTocando) {
    iconeAudio.textContent = "⏸️";

    textoAudio.textContent = "Pausar recado";

    botaoAudio.setAttribute(
      "aria-label",
      "Pausar recado da Extremo"
    );

    botaoAudio.setAttribute(
      "title",
      "Pausar recado da Extremo"
    );
  } else {
    iconeAudio.textContent = "▶️";

    textoAudio.textContent =
      "Aperte o play e ouça o recado da Extremo";

    botaoAudio.setAttribute(
      "aria-label",
      "Aperte o play e ouça o recado da Extremo"
    );

    botaoAudio.setAttribute(
      "title",
      "Ouvir recado da Extremo"
    );
  }
}

async function tocarAudio() {
  try {
    await audio.play();

    atualizarBotaoAudio(true);

    localStorage.setItem(
      "extremoAudioAtivado",
      "true"
    );
  } catch (erro) {
    atualizarBotaoAudio(false);

    console.log(
      "O navegador bloqueou a reprodução automática."
    );
  }
}

function pausarAudio() {
  audio.pause();

  atualizarBotaoAudio(false);

  localStorage.setItem(
    "extremoAudioAtivado",
    "false"
  );
}

botaoAudio.addEventListener(
  "click",
  async function () {
    if (audio.paused) {
      await tocarAudio();
    } else {
      pausarAudio();
    }
  }
);

/*
  Navegadores de celular normalmente bloqueiam
  reprodução automática antes de uma interação.

  Por isso, o áudio também tenta iniciar após
  o primeiro toque ou clique do visitante.
*/

async function iniciarNoPrimeiroToque() {
  const audioFoiDesativado =
    localStorage.getItem("extremoAudioAtivado") === "false";

  if (audioFoiDesativado) {
    return;
  }

  await tocarAudio();
}

document.addEventListener(
  "pointerdown",
  iniciarNoPrimeiroToque,
  {
    once: true
  }
);

document.addEventListener(
  "keydown",
  iniciarNoPrimeiroToque,
  {
    once: true
  }
);

audio.addEventListener(
  "play",
  function () {
    atualizarBotaoAudio(true);
  }
);

audio.addEventListener(
  "pause",
  function () {
    atualizarBotaoAudio(false);
  }
);

audio.addEventListener(
  "ended",
  function () {
    atualizarBotaoAudio(false);
  }
);

atualizarBotaoAudio(false);
