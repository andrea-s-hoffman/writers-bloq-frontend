const deepai = require('deepai');

deepai.setApiKey('78c42fb8-cc4a-4387-989e-0965972b85e9');

export const getRandomText = async (sentence: string): Promise<any> => {
    const response = await deepai.callStandardApi("text-generator", {
        text: sentence
    })
    const textOutput = response.output.substring(0, 200).split(" ")
    textOutput.pop()

    return textOutput.join(" ")
}
