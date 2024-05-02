//post pour ajouter une image
export async function POST(req, { params }, res) {
    // recu^ère le formulaire qui contient l'image et retourner l'image
    const formData = await req.formData();
    const image = formData.getAll("image")[0];
    if (!image) {
        return NextResponse.json({ status: "fail", data: "No image uploaded" });
    }
    //chemin de l'image
    const filePath = `./public/uploadedImages/${image.name}`;
    