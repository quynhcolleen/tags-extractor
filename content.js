(function () {
  const siteName = location.hostname.replace(/^www\./, "");
  const url = location.href;

  let isValidPost = false;
  let result = "";

  if (siteName === "danbooru.donmai.us") {
    isValidPost = /^\/posts\/\d+/.test(location.pathname);
  }

  if (siteName === "gelbooru.com") {
    const params = new URLSearchParams(location.search);
    isValidPost =
      params.get("page") === "post" &&
      params.get("s") === "view" &&
      params.get("id");
  }

  if (siteName === "rule34.xxx") {
    const params = new URLSearchParams(location.search);
    isValidPost =
      params.get("page") === "post" &&
      params.get("s") === "view" &&
      params.get("id");
  }

  if (!isValidPost) {
    return {
      site: siteName,
      valid: false,
      tags: "",
    };
  }

  if (siteName === "rule34.xxx") {
    result = Array.from(document.querySelectorAll("#tag-sidebar li.tag a"))
      .map((a) =>
        a.textContent
          .normalize("NFKC")
          .replace(/[^\p{L}\p{N}\s_-]/gu, "")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/ /g, "_"),
      )
      .filter(Boolean)
      .join(" ");
  }

  if (siteName === "danbooru.donmai.us") {
    result = Array.from(
      document.querySelectorAll("#tag-list li[data-tag-name]"),
    )
      .map((li) => li.getAttribute("data-tag-name"))
      .filter(Boolean)
      .join(" ");
  }

  if (siteName === "gelbooru.com") {
    result = Array.from(
      document.querySelectorAll("#tag-list li[class^='tag-type-'] a"),
    )
      .map((a) => {
        const raw = Array.from(a.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.nodeValue)
          .join("");

        return raw
          .normalize("NFKC")
          .replace(/[^\p{L}\p{N}\s_-]/gu, "")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/ /g, "_");
      })
      .filter(Boolean)
      .join(" ");
  }

  return {
    site: siteName,
    valid: true,
    tags: result,
  };
})();
