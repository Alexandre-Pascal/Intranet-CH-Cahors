import prisma from "@/app/lib/utils/prisma";
import Buttons from "./buttons";
import FilesManager from "@/app/PageEditor/Editor/FilesManager/FilesManager";
import styles from "./styles.module.css";
import { SubCategory, Title } from "@/app/lib/utils/types";

export default async function Page({ params }: { params: { slug: string } }) {
  //en fonction de params.slug, on va chercher dans la base de données grace a axios les données correspondante qui on comme id le params.slug

  let data : any;
  let subCategorie : SubCategory = {} as SubCategory;
  let title : Title = {} as Title;

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

  try {
    subCategorie = await prisma.sub_categories.findFirst({
      where: {
        sub_category_url: `/articles/${params.slug}`,
      },
    }) as SubCategory;

    if (subCategorie == null) {
      title = await prisma.titles.findFirst({
        where: {
          title_url: `/articles/${params.slug}`,
        },
      }) as Title;

      if (title) {
        subCategorie = await prisma.sub_categories.findFirst({
          where: {
            sub_category_id: title.sub_category_id,
          },
        }) as SubCategory;
      }
    }
  }
  catch (error) {
    console.log("Erreur lors de la récupération:");
  }

  const newData = data.content.replace(/data-width="([^"]*)"/g, "width=\"$1\"").replace(/data-align="([^"]*)"/g, "align=\"$1\"");
  return (
    <>
      { data && data.content && (
        <div className="ProseMirror">
          <FilesManager idPage={params.slug} onlyView={true} />
          <h1 style={{ textAlign: "center", marginBottom: "4vh" }}>{data.title}</h1>
          <div className={styles.clear} dangerouslySetInnerHTML={{ __html: newData }} />
          <Buttons slug={params.slug} subCategorie={subCategorie}/>
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