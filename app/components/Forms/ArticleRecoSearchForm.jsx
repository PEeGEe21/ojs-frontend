import { SearchNormal1 } from 'iconsax-react';
import React, {useState} from 'react'
import { generateRecommendations } from '../../utils/ai';
import { useToast } from '@chakra-ui/react';

const ArticleRecoSearchForm = ({onOpen, article, setRecommendation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();

  const searchReco = async () => {
    
    let fullTitle  = '';
    fullTitle += `${article?.prefix ? article?.prefix + ' ' : ''}${article?.title}`;
    fullTitle += `${article?.subTitle ? ' - ' + article?.subTitle : ''}`;

    console.log(fullTitle, 'generated')
    // return;
    
    if (!fullTitle.trim()) {
        toast({
            title: "Please enter a title.",
            description: "Failed",
            status: "error",
            duration: 2000,
            position: "top-right",
        });
        return;
    }

    // onOpen();
    // return;
    setIsGenerating(true)
    try {

      // testToken();
      const generatedRecommendation = await generateRecommendations(searchQuery??fullTitle)
      setRecommendation(generatedRecommendation);
      onOpen();
      toast({
        title: "Recommendations Generated successfully",
        status: "success",
        duration: 2000,
        position: "top-right",
      });
    } catch (error) {
        toast({
            title: "An Error Occured",
            description: "Failed",
            status: "error",
            duration: 2000,
            position: "top-right",
        });
      console.error('Error Generating Recommendation:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div>
            <div className=" relative rounded  items-center  w-full max-w-[563px] h-10 ">
            
            <input
                type="text"
                name="search"
                id="search"
                value={searchQuery}
                onChange={(event) => {
                const value = event.target.value;
                    setSearchQuery(value);
                }}
                className="border border-gray-300 py-2 px-4  block w-full pr-12 sm:text-sm rounded h-full focus:outline-none bg-transparent text-[#3B3939]"
                placeholder="Search"
            />
            <button disabled={isGenerating} onClick={searchReco} type='button' className="absolute inset-y-0 right-0 flex items-center h-full pr-1">
                <span className="px-3 text-gray-500">
                    {isGenerating ? <><span className="animate-spin">⏳</span></> : <SearchNormal1 size={22} />}
                </span>
            </button>
            </div>
        </div>
    </>
  )
}

export default ArticleRecoSearchForm
