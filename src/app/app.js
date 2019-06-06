let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function processTrainingData(data) {
    return data.map(d => {
        return{
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
    console.log('Finished training...')
};

function execute(input) {
    let results = trainedNet(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.trump > results.kardashian){
        output = 'Donald Trump'
        certainty = Math.floor(results.trump * 100)
    } else {
        output = 'Kim Kardashian'
        certainty = Math.floor(results.kardashian * 100)
    }
    return "I'm " + certainty + "% sure that tweet was written by " + output;
}

train(trainingData);
console.log(execute("Feeling Blue (wearing @kkwbeauty powder contour in medium & dark contour kit as eye shadow, & a new lip coming soon)"));