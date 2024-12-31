import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'
import { frequentlyAskedQuestions } from '../../lib/constants'

const Faq = () => {
  return (
    <>
        <section className="py-24 sectionspace">
            <div className="container max-w-[90rem] mx-auto px-4 py-5">
                    <div className='mb-5 lg:mb-[64px] text-center max-w-3xl mx-auto space-y-4'>
                        <h2 className='font-semibold text-xl md:text-2xl lg:text-4xl leading-[37.8px]'>
                            Frequently <span className='underline underline-offset-8' style={{textDecorationColor: '#008080'}}>Asked Questions</span>
                        </h2>
                        <p className='text-base leading-[28px]'>
                            Easy answers to the product questions we get most often.
                        </p>
                        
                    </div>

                <div className='max-w-[720px] mx-auto'>
                    <Accordion allowToggle>
                        {frequentlyAskedQuestions.map((question, index) =>(
                            <AccordionItem key={index} className='pb-5 border-t-0 border-b pl-0'>
                                <h2 >
                                    <AccordionButton className='pt-3 pb-5 text-[#101828] font-medium'>
                                        <div className='text-left flex-1 text-lg'>
                                            {question?.question}  
                                        </div>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {question?.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    </>
  )
}

export default Faq
