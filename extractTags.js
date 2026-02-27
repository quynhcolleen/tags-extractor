Array.from(document.querySelectorAll("#tag-sidebar li.tag a"))
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
