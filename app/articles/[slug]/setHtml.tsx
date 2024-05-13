"use client";

import { useState, useEffect } from "react";

export default function SetHtml({ title, content } : {title : string, content: any}) {
//a supprimer si j'ai le temps et à remplacer par une requete sql qui remplace dans la bd les src des images
  useEffect(() => {
    alert(content);
    content.replace(/\/tempFiles\/\d+\//, `/savedFiles/${title}`);
    //remplacer data-align par style="text-align: data-align"
    content.replace(/data-width="([^"]*)"/g, "width=\"$1\"");
    content.replace(/data-align="([^"]*)"/g, "align=\"$1\"");

    alert("newContent" + content);
  });

  return (
    <div dangerouslySetInnerHTML={{ __html : content }} />
  );
}