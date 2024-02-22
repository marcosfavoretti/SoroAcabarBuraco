const ort = require('onnxruntime-node');
const Jimp = require('jimp')
// Função para converter uma imagem base64 em um Float32Array

async function loadImageAndConvertToArray(imagePath) {
    try {
        // Carrega a imagem usando Jimp
        const image = await Jimp.read(imagePath);

        // Obtém as dimensões da imagem
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        // Cria um Float32Array para armazenar os valores dos pixels
        const float32Array = new Float32Array(width * height * 3); // 4 canais RGBA por pixel

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
        // await convertArrayToImage(float32Array,640,640)
        //console.log(float32Array)
        return float32Array
        // Agora você tem os valores dos pixels da imagem em um Float32Array
    } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
    }
}

// Use um contexto async para chamar funções onnxruntime
async function main() {
    try {
        const session = await ort.InferenceSession.create('src/model/best.onnx');

        // Recebe a imagem em base64
        const img = "C:/Users/Marcos/Documents/backendHolesDetector/hole-detector/image_2 (2).jpg"
        const array = await loadImageAndConvertToArray(img)
        // Converte a imagem base64 para Float32Array
        //const imageData = base64ToFloat32Array(base64Image);
        // Cria um tensor com os dados da imagem
        
        const imageTensor = new ort.Tensor('float32', array, [1,3,640,640]); // Substitua 1, 3, 168 e 299 pelos valores correspondentes

        // Prepare os feeds usando o nome do input do modelo
        const feeds = { images: imageTensor }; // Substitua 'input_name' pelo nome correto do input do modelo

        // Executa a inferência
        const results = await session.run(feeds);
        
        // Leia os resultados
        const outputData = results.output0.data;
        
        console.log(outputData)
       /// console.log(results)
        const boxes = process_output(outputData,640,640)
        console.log(boxes)
        //await convertArrayToImage(outputData, 8400,6)
    } catch (e) {
        console.error(`Falha ao inferir o modelo ONNX: ${e}`);
    }
}
async function convertArrayToImage(array, width, height) {
    try {
        // Crie uma nova imagem com o Jimp
        const image = new Jimp(width, height);

        // Defina os pixels da imagem com base nos valores do array
        let index = 0;
        image.scan(0, 0, width, height, function(x, y, idx) {
            // Obtenha os valores RGBA do array e converta de volta para o intervalo [0, 255]
            const red = Math.round(array[index++] * 255);
            const green = Math.round(array[index++] * 255);
            const blue = Math.round(array[index++] * 255);
            const alpha = Math.round(array[index++] * 255);

            // Defina o pixel na imagem
            this.bitmap.data[idx + 0] = red;   // R
            this.bitmap.data[idx + 1] = green; // G
            this.bitmap.data[idx + 2] = blue;  // B
            this.bitmap.data[idx + 3] = alpha; // Alpha
        });

        // Salve a imagem ou faça qualquer outra operação desejada
        await image.writeAsync('output_image.jpg');
    } catch (error) {
        console.error('Erro ao gerar a imagem:', error);
    }
}
function process_output(output, img_width, img_height) {
    let boxes = [];
    for (let index=0;index<8400;index++) {
        const [class_id,prob] = [...Array(80).keys()]
            .map(col => [col, output[8400*(col+4)+index]])
            .reduce((accum, item) => item[1]>accum[1] ? item : accum,[0,0]);
        // if (prob <= 0.15) {
        //     continue;
        // }
        const label = yolo_classes[class_id];
        const xc = output[index];
        const yc = output[8400+index];
        const w = output[2*8400+index];
        const h = output[3*8400+index];
        const x1 = (xc-w/2)/640*img_width;
        const y1 = (yc-h/2)/640*img_height;
        const x2 = (xc+w/2)/640*img_width;
        const y2 = (yc+h/2)/640*img_height;
        boxes.push([x1,y1,x2,y2,label,prob]);
    }

    boxes = boxes.sort((box1,box2) => box2[5]-box1[5])
    const result = [];
    while (boxes.length>0) {
        result.push(boxes[0]);
        boxes = boxes.filter(box => iou(boxes[0],box)<0.7);
    }
    return result;
}
function iou(box1,box2) {
    return intersection(box1,box2)/union(box1,box2);
}
function union(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const box1_area = (box1_x2-box1_x1)*(box1_y2-box1_y1)
    const box2_area = (box2_x2-box2_x1)*(box2_y2-box2_y1)
    return box1_area + box2_area - intersection(box1,box2)
}
function intersection(box1,box2) {
    const [box1_x1,box1_y1,box1_x2,box1_y2] = box1;
    const [box2_x1,box2_y1,box2_x2,box2_y2] = box2;
    const x1 = Math.max(box1_x1,box2_x1);
    const y1 = Math.max(box1_y1,box2_y1);
    const x2 = Math.min(box1_x2,box2_x2);
    const y2 = Math.min(box1_y2,box2_y2);
    return (x2-x1)*(y2-y1)
}

const yolo_classes = [
    'hole',
    'hugeHole'
];
main();
