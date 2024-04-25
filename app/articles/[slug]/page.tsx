import prisma from "@/app/lib/utils/prisma";
import Buttons from "./buttons";

export default async function Page({ params }: { params: { slug: string } }) {
  //en fonction de params.slug, on va chercher dans la base de données grace a axios les données correspondante qui on comme id le params.slug

  console.log(params.slug);

  let data:any;

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

  return (
    <>
      { data && data.content && (
        <div>
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />

          <Buttons slug={params.slug} />

        </div>
      )}

      { !data && (
        <div>
          <h1>404</h1>
          <p>Page not foundeeeeee</p>
        </div>
      )}
    </>

  );
}