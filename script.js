const audio = document.getElementById("audioFundo");
const botaoAudio = document.getElementById("botaoAudio");
const iconeAudio = document.getElementById("iconeAudio");
const textoAudio = document.getElementById("textoAudio");

// Volume da música.
// 0.55 representa 55%.
audio.volume = 0.55;

function atualizarBotaoAudio(estaTocando) {
  botaoAudio.setAttribute(
    "aria-pressed",
    String(estaTocando)
  );

  if (estaTocando) {
    iconeAudio.textContent = "🔊";
    textoAudio.textContent = "Pausar música";

    botaoAudio.setAttribute(
      "aria-label",
      "Pausar música"
    );
  } else {
    iconeAudio.textContent = "🔇";
    textoAudio.textContent = "Ativar música";

    botaoAudio.setAttribute(
      "aria-label",
      "Ativar música"
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
  música automática antes de uma interação.

  Por isso, o site tenta tocar depois do primeiro
  toque, clique ou tecla pressionada.
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

atualizarBotaoAudio(false);
