(async function () {
  /**
   * 从网络获取当前的英雄数据
   * @returns Promise
   */
  async function getHeroes() {
    return fetch("https://study.duyiedu.com/api/herolist")
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }
  const doms = {
    ul: document.querySelector(".list"),
    radios: document.querySelectorAll(".radio"),
    input: (dou = document.querySelector(".input input")),
  };
  //初始化
  const allHeros = await getHeroes();

  function setHeros(hero) {
    doms.ul.innerHTML = hero
      .map(
        (
          h
        ) => `<li  class="hero"><a href="https://pvp.qq.com/web201605/herodetail/${h.ename}.shtml" target = "_blank">
            <img
              src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.ename}/${h.ename}.jpg"
              alt=""
            />
            <span>${h.cname}</span>
          </a></li>`
      )
      .join("");
  }
  setHeros(allHeros);
  //用户交互
  for (const radio of doms.radios) {
    radio.addEventListener("click", function () {
      //被点击改变样式
      setChoose(this);
      searchHero(this);
    });
  }

  doms.input.addEventListener("input", function () {
    const heros = allHeros.filter((h) => h.cname.includes(this.value));
    setHeros(heros);
    setChoose(document.querySelector(".radio[data-type='all']"));
  });

  function searchHero(radio) {
    let heros;
    const type = radio.dataset.type;
    const value = radio.dataset.value;
    if (type === "all") {
      heros = allHeros;
    } else if (type === "pay_type") {
      heros = allHeros.filter((h) => h.pay_type === +value);
    } else {
      heros = allHeros.filter(
        (h) => h.hero_type === +value || h.hero_type2 === +value
      );
    }
    setHeros(heros);
  }

  function setChoose(radio) {
    const checkedRadio = document.querySelector(".radio.checked");
    checkedRadio && checkedRadio.classList.remove("checked");
    radio.classList.add("checked");
  }
})();
