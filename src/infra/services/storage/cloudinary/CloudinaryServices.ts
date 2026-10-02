import cloudinary from "../../../config/cloudinaryConfig";

class CloudinaryServices {
  
    /**
   * Faz upload de uma imagem para o Cloudinary
   * @param imagePath Caminho do arquivo (ex.: ./uploads/foto.jpg)
   * @returns URL segura da imagem no Cloudinary
   */
  async upload(
    fileBuffer: Buffer, 
    fileName: string, 
    folder: string, 
    resourceType: 'image' | 'video' = 'image'
  ): Promise<string> {
    
    return new Promise((resolve, reject) => {

      //monta as opçoes dinamicamente independente do tipo
      const uploadOptions: Record<string, any> = {
        folder,
        public_id: fileName,
        overwrite: true,
        resource_type: resourceType,
      }

      //se for imagem, define a formatação/conversão padrao
      if(resourceType === 'image') {
        uploadOptions.format = 'jpg'
      }
      
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error : any, result : any) => {
          
            if (error) return reject(error);
          
            resolve(result?.secure_url);
        }

      )
      .end(fileBuffer);
  });
  }

  /**
   * Remove uma imagem do Cloudinary
   * @param publicId
   */
  async destroy(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
    
    return new Promise((resolve, reject) => {
      
        cloudinary.uploader.destroy(
        
            publicId,
        
            { resource_type: resourceType },
        
            (error, result) => {
          
                if (error) return reject(error);
          
                resolve();
        }
      );
    });
  }
}

export default new CloudinaryServices();