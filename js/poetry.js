/* ==========================================================
   poetry.js – YOUR POEM LIVES HERE + the line-by-line reveal
   ----------------------------------------------------------
   HOW TO ADD YOUR POETRY:
   1. Paste your poem between the two backticks ` ` below.
   2. Keep your exact words, spelling and line breaks.
   3. A blank line = a new stanza (small gap on screen).
   Nothing else needs to change.
   ========================================================== */

const MY_POEM = `

# **Ek Kavita… Meri 17 Naam Wali Butki Ke Naam!** 🖤😂

Naam toh aapka Chhaya hai,
Par pehchaan mein Butki bhi samaya hai,
Ek naam se jab mann nahi bhara,
Toh ek dost ne 16 naam aur banaya hai! 😂

Aaj ka din bhi kuch khaas bana hai,
Bhaidooj ke sang aapka janamdin aaya hai,
Lagta hai Rab ne bhi socha hoga,
Aaj khushiyon ka dugna tohfa barsaya hai! 🌸

Ikkis saal ki umr mein kadam rakha hai,
Par bachpana abhi bhi sambhal rakha hai,
Kabhi lagti ho samajhdaaron ki rani,
Toh kabhi Bounisu Doraemon ki deewani! 🤭

Na jaane kitni baatein, kitni shararatein,
Kabhi hasi-mazaak, toh kabhi samajhdari ki baatein,
Chhe mahine ki yaari mein aisa rang chhaya,
Jaise Kumbh ke mele mein bichhde do pagal phir mil paaye! 😂

Par aaj mazaak se hatkar ek baat kahunga,
Aapke har sapne ke liye Rab se dua karunga,
Aapki mehnat ek din zaroor rang laaye,
Aur IAS bankar Papa ka sar garv se ooncha ho jaaye! ❤️

Zindagi ke har mod par khushiyan aapka saath nibhayein,
Aapki aankhon mein hamesha naye sapne jagmagayein,
Kabhi mushkilein aayein toh himmat na haarna,
Apne hauslon se har manzil ko paar karna!

Aur haan, ek baat yaad rakhiyega,
Officer bankar humein bhool mat jaiyega,
Warna 17 naamon ki list mein ek aur naam jod denge,
Aur aapko phir se Butki kehkar hi bulayenge! 😂

Bas itni si dua hai is dost ki taraf se,
Aapki duniya roshan rahe khushiyon ke noor se,
Umar badhe, sapne poore hon,
Par aapki ye pagalpanti kabhi kam na ho!

**Happy Birthday, Chhaya Ji!** 🎂❤️
**Khush rahiye, muskurati rahiye…**
Aur apne is pagal dost ki bakwaas
Thodi-thodi sehati rahiye! 😂🖤
# **Ek Kavita… Meri 17 Naam Wali Butki Ke Naam!** 🖤😂

Naam toh aapka Chhaya hai,
Par pehchaan mein Butki bhi samaya hai,
Ek naam se jab mann nahi bhara,
Toh ek dost ne 16 naam aur banaya hai! 😂

Aaj ka din bhi kuch khaas bana hai,
Bhaidooj ke sang aapka janamdin aaya hai,
Lagta hai Rab ne bhi socha hoga,
Aaj khushiyon ka dugna tohfa barsaya hai! 🌸

Ikkis saal ki umr mein kadam rakha hai,
Par bachpana abhi bhi sambhal rakha hai,
Kabhi lagti ho samajhdaaron ki rani,
Toh kabhi Bounisu Doraemon ki deewani! 🤭

Na jaane kitni baatein, kitni shararatein,
Kabhi hasi-mazaak, toh kabhi samajhdari ki baatein,
Chhe mahine ki yaari mein aisa rang chhaya,
Jaise Kumbh ke mele mein bichhde do pagal phir mil paaye! 😂

Par aaj mazaak se hatkar ek baat kahunga,
Aapke har sapne ke liye Rab se dua karunga,
Aapki mehnat ek din zaroor rang laaye,
Aur IAS bankar Papa ka sar garv se ooncha ho jaaye! ❤️

Zindagi ke har mod par khushiyan aapka saath nibhayein,
Aapki aankhon mein hamesha naye sapne jagmagayein,
Kabhi mushkilein aayein toh himmat na haarna,
Apne hauslon se har manzil ko paar karna!

Aur haan, ek baat yaad rakhiyega,
Officer bankar humein bhool mat jaiyega,
Warna 17 naamon ki list mein ek aur naam jod denge,
Aur aapko phir se Butki kehkar hi bulayenge! 😂

Bas itni si dua hai is dost ki taraf se,
Aapki duniya roshan rahe khushiyon ke noor se,
Umar badhe, sapne poore hon,
Par aapki ye pagalpanti kabhi kam na ho!

**Happy Birthday, Chhaya Ji!** 🎂❤️
**Khush rahiye, muskurati rahiye…**
Aur apne is pagal dost ki bakwaas
Thodi-thodi sehati rahiye! 😂🖤

`;

/* ---------- Everything below builds the page from MY_POEM ---------- */

let poemStarted = false;   // so the reveal only plays once

function startPoetry() {
  if (poemStarted) return;
  poemStarted = true;

  const poemBox = document.getElementById("poem");
  const endBox  = document.getElementById("poem-end");
  const page    = document.getElementById("page3");

  // Split into lines; trim only empty lines at the very start/end
  const lines = MY_POEM.replace(/^\s*\n|\n\s*$/g, "").split("\n");
  const hasPoem = lines.some(l => l.trim() !== "");

  // No poem pasted yet → show a gentle reminder, then the ending
  if (!hasPoem) {
    poemBox.innerHTML =
      '<p class="poem-empty">Your poetry goes here. Paste it into <b>js/poetry.js</b> (MY_POEM).</p>';
    endBox.classList.add("show");
    return;
  }

  // Build one element per line (all are in the page so you can scroll freely)
  const lineEls = [];
  lines.forEach(text => {
    const el = document.createElement("p");
    if (text.trim() === "") {
      el.className = "poem-gap";          // blank line = stanza gap
    } else {
      el.className = "poem-line";
      el.textContent = text;               // textContent keeps your words exactly
      lineEls.push(el);
    }
    poemBox.appendChild(el);
  });

  // Reveal the lines one after another, automatically
  const DELAY = 1100;   // milliseconds between lines
  const START = 1500;   // wait before the first line
  lineEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
      // gently follow the poem only if the reader hasn't scrolled away
      const r = el.getBoundingClientRect();
      if (!page.dataset.userScrolled && r.bottom > window.innerHeight * 0.85) {
        page.scrollBy({ top: r.bottom - window.innerHeight * 0.6, behavior: "smooth" });
      }
    }, START + i * DELAY);
  });

  // Final birthday message after the last line
  setTimeout(() => {
    endBox.classList.add("show");
  }, START + lineEls.length * DELAY + 800);

  // If the reader scrolls by hand, stop auto-following
  ["wheel", "touchmove"].forEach(evt =>
    page.addEventListener(evt, () => { page.dataset.userScrolled = "1"; }, { passive: true })
  );
}
