const Jimp = require('jimp');

// Função para carregar uma imagem e transformá-la em Float32Array
async function loadImageAndConvertToArray(imagePath) {
    try {
        // Carrega a imagem usando Jimp
        const image = await Jimp.read(imagePath);

        // Obtém as dimensões da imagem
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        // Cria um Float32Array para armazenar os valores dos pixels
        const float32Array = new Float32Array(width * height * 4); // 4 canais RGBA por pixel

        // Itera sobre cada pixel da imagem
        let index = 0;
        image.scan(0, 0, width, height, function(x, y, idx) {
            // Obtém os valores RGBA do pixel
            const red = this.bitmap.data[idx];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];
            const alpha = this.bitmap.data[idx + 3];

            // Converte os valores RGBA para o intervalo [0, 1] e armazena no Float32Array
            float32Array[index++] = red / 255;     // R
            float32Array[index++] = green / 255;   // G
            float32Array[index++] = blue / 255;    // B
            float32Array[index++] = alpha / 255;   // Alpha
        });

        // Agora você tem os valores dos pixels da imagem em um Float32Array
        console.log('Float32Array da imagem:', float32Array.length);
    } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
    }
}
const imagePath = 'C:/Users/Marcos/Documents/backendHolesDetector/hole-detector/images.jpg';
loadImageAndConvertToArray(imagePath);