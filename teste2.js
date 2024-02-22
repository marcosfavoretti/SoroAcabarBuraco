const ort = require('onnxruntime-node');

async function inspectModel() {
    try {
        // Carrega o modelo ONNX
        const session = await ort.InferenceSession.create('src/model/best.onnx');

        // Obtém os nomes das entradas e saídas do modelo
        const inputNames = session.inputNames;
        const outputNames = session.outputNames;
        console.log(session)
        console.log("Nomes das entradas do modelo:", inputNames);
        console.log("Nomes das saídas do modelo:", outputNames);
    } catch (e) {
        console.error(`Falha ao carregar o modelo ONNX: ${e}`);
    }
}

inspectModel();