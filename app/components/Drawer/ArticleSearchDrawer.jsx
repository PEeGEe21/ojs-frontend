import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import Link from 'next/link';

function ArticleSearchDrawer({ isOpen, onClose, currentArticle, recommendation }) {
  
    return (
      <>
        <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`${currentArticle?.title}`}</DrawerHeader>
            <DrawerBody>
              <div>
                <h4 className='mb-3 underline underline-offset-1 font-semibold'>Recommendations</h4>
              </div>

              <ol className="space-y-6">
                {recommendation.map((citation, index) => (
                  <li key={index} className="border-b pb-4">
                    <div className="mb-2">
                      <span className="font-semibold">{citation.authors}</span><br/>
                      <span className="italic">{citation.title}. </span>
                      {citation.journal && (
                        <span>
                          {citation.journal}
                        </span>
                      )}
                      {citation.publisher && <span>{citation.publisher}. </span>}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      DOI: <Link href={`https://doi.org/${citation.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{citation.doi}</Link>
                    </div>
                    <p className="text-gray-700">{citation.description}</p>
                  </li>
                ))}
              </ol>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default ArticleSearchDrawer;