"use client";
import { article } from "@/app/lib/utils/types";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function SelectorArticle({ setArticle, articlee, setUrl, url } : {setArticle : React.Dispatch<React.SetStateAction<article | null>>, articlee : article, setUrl? : React.Dispatch<React.SetStateAction<string>>, url? : string}){
  const [articles, setArticles] = useState<article[]>([]);
  useEffect(() => {
    const fetchArticles = async() => {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        setArticles(data.result);

      }
      catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchArticles();
  }, []);

  if (articles.length > 0) {
    // alert(articles);
    const article = articles.find((article) => url === "/articles/" + article.id);
    setArticle(article ? article : null);
  }

  //   alert(articles.length);

  return (
    <select
      name="article"
      id="article"
      onChange={(event) => {
        const articleId = event.target.value;
        // alert(JSON.stringify(articleId));
        const article = articles.find((article) => article.id === articleId);
        // alert(article);
        setArticle(article ? articlee : null);
        alert(articleId);
        // setUrl ? (articleId == "internet" ? setUrl(url ? url : "") : setUrl("/articles/" + articleId)) : " ";
        setUrl ? (articleId === "internet" ? setUrl(url || "") : (articleId === "" ? setUrl("") : setUrl("/articles/" + articleId))) : " ";

      }}
    >
      <option value={url?.startsWith("http://") ? "internet" : ""}>Lien Externe</option>
      {articles.length > 0 && articles.map((article) => (
        <option {...(url == ("/articles/" + article.id) ? { selected: true } : {})} key={article.id} value={article.id}>
          {article.title}
        </option>
      ))}
    </select>
  );
}