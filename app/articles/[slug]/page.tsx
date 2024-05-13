import prisma from "@/app/lib/utils/prisma";
import Buttons from "./buttons";
import FilesManager from "@/app/PageEditor/Editor/FilesManager/FilesManager";
import SetHtml from "./setHtml"; // Import the setHtml component
import styles from "./styles.module.css";
export default async function Page({ params }: { params: { slug: string } }) {
  //en fonction de params.slug, on va chercher dans la base de données grace a axios les données correspondante qui on comme id le params.slug

  console.log(params.slug);

  let data:any;

  // const images = document.querySelectorAll("img");
  // images.forEach((image) => {
  //   if (image.src.includes("tempFiles")) {
  //     alert(image.src);
  //     console.log(editor?.getHTML());
  //     image.src = image.src.replace("tempFiles", "savedFiles");
  //     alert(image.src);
  //     console.log(editor?.getHTML());
  //   }
  // });

  try {
    data = await prisma.datas_articles.findUnique({
      where: {
        id: params.slug,
      },
    });
  }
  catch (error) {
    console.error("Erreur lors de la récupération de la page:", error);
  }

  const newData = data.content.replace(/data-width="([^"]*)"/g, "width=\"$1\"").replace(/data-align="([^"]*)"/g, "align=\"$1\"");
  console.log(newData);
  return (
    <>
      { data && data.content && (
        <div className="ProseMirror">
          <FilesManager idPage={params.slug} onlyView={true} />
          <h1 style={{ textAlign: "center", marginBottom: "4vh" }}>{data.title}</h1>
          <div className={styles.clear} dangerouslySetInnerHTML={{ __html: newData }} />
          <Buttons slug={params.slug} />
        </div>
      )}

      { !data && (
        <div>
          <img> </img>
          <h1>404</h1>
          <p>Page not foundeeeeee</p>
        </div>
      )}
    </>

  );
}