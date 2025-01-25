import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face client
const hf = new HfInference(process.env.NEXT_PUBLIC_HF_ACCESS_TOKEN)

export const summarizeText = async (text) => {
  try {
    const response = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: text,
      parameters: {
        max_length: 300,
        min_length: 100,
        do_sample: false
      }
    })
    return response.summary_text
  } catch (error) {
    console.error('Summarization error:', error)
    throw error
  }
}

export const generateAbstract = async (title, wordNumber) => {
  try {
    // console.log(hf, 'hf')
    // return
    const prompt = `
    [START_INSTRUCTIONS]
    
    As an academic writing assistant, generate a scholarly abstract for a research paper with the following title: "${title}".

    Instructions:
    - Write approximately ${wordNumber??'250-300'} words
    - Follow this structure strictly!:
      1. Do not repeat the question or instructions in the response
      1. Do not specify the title again in the response
      2. Research context and problem statement
      3. Objectives and methodology
      4. Key findings or expected outcomes
      5. Significance and implications
    - Use formal academic language
    - Be specific and avoid vague statements
    - Focus on the main contributions
    - Use present tense for established facts and past tense for specific findings
    
    [END_INSTRUCTIONS]
    `;
    // const context = `You are an expert assistant generating abstracts for research papers. Follow these rules:
    // - Do not repeat the question or instructions in the response.
    // - Only generate the text of the abstract.
    // - Ensure the abstract is ${wordNumber??'250-300'} words.`;
    // const prompt = `Research paper title: "${title}"`;
    // const prompt = `Write a scholarly abstract for the research paper titled "${title}," highlighting the research problem, methodology, key findings, and significance.`;
    // const task = `Generate a scholarly abstract highlighting the research problem, methodology, key findings, and significance.`;

    const response = await hf.textGeneration({
    //   model: 'gpt2',
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        // inputs: `Generate a scholarly abstract for a research paper titled: "${title}".  
        //         The abstract should be approximately 250-300 words, highlighting the research problem, 
        //         methodology, key findings, and significance. Do not repeat my question or prompt to me. just continue with the output. Do not include the title or the word "Abstract" 
        //         in the response; only generate the abstract text. `,
        // inputs: `Write a scholarly abstract of approximately ${wordNumber??'250-300'} words for a research paper titled "${title}" focusing on the research problem, methodology, key findings, and significance.`,
        // inputs: `${context}\n\n${prompt}\n\n${task}`,
        // inputs: `${context}\n\n${prompt}`,
        inputs: prompt,

        parameters: {
            max_new_tokens: 600,
            temperature: 0.5,
            top_p: 0.95
        }
    })
    // return response.generated_text
    return cleanOutput(response.generated_text);

  } catch (error) {
    console.error('Abstract generation error:', error)
    throw error
  }
}

export const generateRecommendations = async (title) => {
  try {

    // {
    //     "authors": "Author names",
    //     "year": "Publication year",
    //     "title": "Publication title",
    //     "journal": "Journal",
    //     "publisher": "Publisher",
    //     "volume": "Volume",
    //     "issue": "Issue",
    //     "pages": "Pages",
    //     "doi": "Doi",
    //     "description": "Brief description"
    //   }
    const prompt = `
    [START_INSTRUCTIONS]
    
    As an academic writing assistant, generate recommendations related this research in about 5 researches: "${title}".

    Instructions:
    - Follow this structure strictly!:
        1. Format your response as a JSON array of objects with the following structure:
        {
            "title": "Publication title",
            "authors": "Author names (Publication year)",
            "doi": "Publication Doi",
            "journal": "Journal",
            "description": "Brief description (15 words)"
        }
        2. Do not repeat the question or instructions in the response
        3. should be in the format Author(s) (Year). Title. Journal/Publisher. DOI if available
    - Use formal academic language
    - Be specific and avoid vague statements
    - Focus on the main contributions    
    [END_INSTRUCTIONS]
    `;
    const response = await hf.textGeneration({
    //   model: 'gpt2',
        // model: 'mistralai/Mistral-7B-Instruct-v0.2',
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', // or any other model
        inputs: prompt,
        parameters: {
            max_new_tokens: 1200,
            temperature: 0.5,
            top_p: 0.95,
            return_full_text: false,
            do_sample: true,

        }
    })
      
    console.log(response.generated_text)

    const cleanedOutput = cleanOutput(response.generated_text);
    console.log(cleanedOutput, 'dsdsd')
    return JSON.parse(cleanedOutput);

  } catch (error) {
    console.error('Recommendation generation error:', error)
    throw error
  }
}

const cleanRecommendations = (text) => {
    // Extract only the actual recommendations content
    const startIndex = text.indexOf('<ul>');
    const endIndex = text.lastIndexOf('</ul>');
    
    if (startIndex === -1) {
      // If no <ul> tags found, try to extract individual <li> items
      const recommendations = [];
      const liRegex = /<li>(.*?)<\/li>/g;
      let match;
      
      while ((match = liRegex.exec(text)) !== null) {
        recommendations.push(match[1].trim());
      }
      
      return recommendations;
    }
    
    // Get the content between <ul> tags
    const content = text.slice(startIndex, endIndex !== -1 ? endIndex + 5 : undefined);
    
    // Extract individual recommendations from complete <li> tags only
    const liRegex = /<li>(.*?)<\/li>/g;
    const recommendations = [];
    let match;
    
    while ((match = liRegex.exec(content)) !== null) {
      // Clean up the recommendation text
      let recommendation = match[1].trim();
      recommendations.push(recommendation);
    }
    
    return recommendations;
  };

const cleanResponse = (responseText) => {
    // Remove occurrences of the title
    // const cleanedText = responseText.replace(new RegExp(`\\b${title}\\b`, 'gi'), '');
    let cleanedAbstract = responseText.replace(/^(Title|Abstract):.*$/m, '').trim();

    // Remove the word "Abstract" if present
    // return cleanedText.replace(/^Abstract:?\s+/i, '').trim();
    return cleanedAbstract;
};



// const cleanOutput = (responseText) => {
//   try{
//     return responseText
//       .replace(/\[START_INSTRUCTIONS\][\s\S]*?\[END_INSTRUCTIONS\]/, '') // Remove markers and content
//       .trim(); // Remove any leading or trailing whitespace
//   } catch(err){
// console.log(err)
//   }
//   };
  const cleanOutput = (responseText) => {
    try {
      // Remove markers and content
      let cleanedText = responseText
        .replace(/\[START_INSTRUCTIONS\][\s\S]*?\[END_INSTRUCTIONS\]/, '')
        .trim();
  
      // Ensure the JSON is properly closed
      // if (!cleanedText.endsWith('}]')) {
      //   cleanedText += '}]'; // Attempt to close the JSON array
      // }
      // if (cleanedText.substring(cleanedText.length - 2) !== '}]') {
      //   cleanedText += '}]';
      // }
  
      return cleanedText;
    } catch (err) {
      console.error('Error cleaning output:', err);
      throw err;
    }
  };

export const testToken = async () => {
    try {
      const response = await hf.textGeneration({
        model: "gpt2",
        inputs: "Hello",
      });
      console.log('Token works:', response);
    } catch (error) {
      console.error('Token error:', error);
    }
}