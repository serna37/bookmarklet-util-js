window.utilfunc = {};
window.utilfunc._showMsg = async (msg, level = "info") => {
    const $ = v => document.querySelector(v);
    const $$ = (e = "div") => document.createElement(e);
    const DOM = str => new DOMParser().parseFromString(str, "text/html").body.firstElementChild;
    const attr = (e, att) => Object.entries(att).map(([k, v]) => e[k] = v);
    const css = (e, sty) => Object.entries(sty).map(([k, v]) => e.style[k] = v);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const st = $$("style");
    attr(st, {"media": "screen", "type": "text/css"});
    st.appendChild(document.createTextNode(
      `@keyframes anime-fadein-right {${[
        "0% { opacity: 0; transform: translateX(10px); }",
        "100% { opacity: 1; transform: translateY(0); }"
      ].join(' ')}}`
    ));
    st.appendChild(document.createTextNode(
      `@keyframes anime-fadeout-up {${[
        "0% { opacity: 1; transform: translateY(0); }",
        "100% { opacity: 0; transform: translateY(-100px); }"
      ].join(' ')}}`
    ));
    st.appendChild(document.createTextNode(
        `.fadeout-up {
            animation: anime-fadeout-up 0.3s ease-out;
        }`
    ));
    document.head.appendChild(st);
    const link = $$("link");
    attr(link, {
        "rel": "stylesheet",
        "href": "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    })
    document.head.appendChild(link);
    const color = {
        "info": "green",
        "warn": "yellow",
        "error": "red",
    };
    const wrap = $$();
    css(wrap, {
        "position": "fixed",
        "inset": "400px 0px 1px 200px",
        "margin": "auto",
        "width": "300px",
        "height": "70px",
        "padding": "10px",
        "borderRadius": "7px",
        "background": "gray",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "zIndex": "1000",
        "animation": "anime-fadein-right 0.5s 1 ease-out",
    });
    const inner = $$();
    css(inner, {
        "width": "100%",
        "height": "100%",
        "borderRadius": "7px",
        "background": "black",
        "display": "grid",
        "gridTemplateColumns": "20% 80%",
    });
    const iconWrap = $$();
    const span = DOM(`
        <span class="material-symbols-outlined">
            ${level == "info" ? "task_alt" : "error"}
        </span>
    `);
    css(span, {
        "width": "80%",
        "height": "80%",
        "marin": "10px",
        "fontSize": "50px",
        "color": color[level],
    });
    const msgBox = $$();
    css(msgBox, {
        "width": "90%",
        "height": "80%",
        "display": "flex",
        "justifyContent": "left",
        "alignItems": "center",
    });
    const text = $$();
    css(text, {
        "fontSize": "40px",
        "color": color[level],
    });
    attr(text, {
        "innerText": msg
    });
    wrap.appendChild(inner);
    inner.appendChild(iconWrap);
    inner.appendChild(msgBox);
    iconWrap.appendChild(span);
    msgBox.appendChild(text);
    $("body").appendChild(wrap);
    await sleep(1000).then(_ => wrap.style.animation = "anime-fadeout-up 0.3s ease-out");
    await sleep(300).then(_ => [st, link, wrap].forEach(v => v.remove()));
};
