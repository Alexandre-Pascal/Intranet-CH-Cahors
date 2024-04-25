"use client";
export default function Buttons({ slug } : { slug : string }){

  const handleEditArticle = () => {
    window.location.href = `/PageEditor/?CreateOrUpdate=update&idPage=${slug}/`;
  };

  return (
    <div>
      <button onClick={() => handleEditArticle()}>Edit</button>
      <button onClick={() => console.log("delete")}>Delete</button>
    </div>
  );
}